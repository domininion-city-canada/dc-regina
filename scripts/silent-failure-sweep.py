#!/usr/bin/env python3
"""Find Supabase calls that discard `error`, where a failure reads as "no rows".

`const { data } = await supabase.from(...)` throws nothing and logs nothing when
the query FAILS -- an enum value outside the type (22P02), a column that does not
exist (42703), a missing function or constraint. The caller sees `data === null`
and concludes there is nothing there. Temple shipped six of these in one week;
`sync-subscription-status` had errored for every user for months, and
`process-donations-cron` concluded "no pending emails" every 15 minutes since it
was written. Nothing failed loudly enough to notice.

This flags the destructuring, not the semantics: a bare `data` pulled from an
awaited Supabase call with no `error` alongside it.

Usage:  python3 silent-failure-sweep.py [root] [--exclude a,b,c]
        python3 silent-failure-sweep.py <repo> --baseline .silent-failure-baseline
        python3 silent-failure-sweep.py <repo> --baseline <file> --write
        python3 silent-failure-sweep.py <repo> --all   # include single-row reads

Every hit is a candidate, not a verdict. Some sites genuinely do not care
whether the query failed. Silence those in place rather than leaving them to
resurface every run -- an annotated finding that stays a finding trains everyone
to ignore the whole report:

    // silent-ok: presence probe, a DB blip and an absent row are handled alike
    const { data } = await admin.from("leads").select("id").maybeSingle();

`--baseline` turns the sweep into a ratchet for CI: it records today's count per
repo and fails only when the count goes UP. Existing sites stay visible without
blocking a build on a cleanup nobody scheduled.
"""
import json, re, sys
from pathlib import Path

DEFAULT_EXCLUDE = {"node_modules", "dist", "build", ".git", "bulletproof-react"}
SCAN_DIRS = ("src", "supabase/functions", "app", "lib", "server")
EXTS = (".ts", ".tsx", ".js", ".jsx", ".mjs")

# A destructure taking `data` out of an awaited call, bounded so it cannot run
# past the end of the statement.
DESTRUCTURE = re.compile(
    r"const\s*\{([^{}]*)\}\s*=\s*await\s+([^;]{0,600}?)(?=;|\n\s*(?:const|let|return|if|\}))",
    re.S)
# The RHS must look like a Supabase client call -- otherwise this fires on
# `const { data } = await axios.get(...)`, which is a different library with
# different failure semantics (it throws).
SUPABASE_CALL = re.compile(r"\.(from|rpc|storage|auth|functions)\s*[.(]")
SUPPRESSED = re.compile(r"//\s*silent-ok:", re.I)
# A write that fails silently never happened -- and the caller reads the null
# result as "nothing came back" rather than "the row was not stored".
MUTATION = re.compile(r"\.(insert|update|delete|upsert)\s*\(")
# A single-row read already has to handle a null (`.single()` errors when the
# row is absent), so its caller carries a guard that fires either way. Imprecise,
# but not the failure this sweep is for -- reported only under --all.
SINGLE_ROW = re.compile(r"\.(single|maybeSingle)\s*\(\s*\)")


def scan_file(path, scan_all=False):
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return []
    lines = text.splitlines()
    hits = []
    for m in DESTRUCTURE.finditer(text):
        names, rhs = m.group(1), m.group(2)
        keys = {k.split(":")[0].strip() for k in names.split(",")}
        if "data" not in keys or "error" in keys:
            continue
        if not SUPABASE_CALL.search(rhs):
            continue
        mutation = bool(MUTATION.search(rhs))
        if not scan_all and not mutation and SINGLE_ROW.search(rhs):
            continue
        lineno = text.count("\n", 0, m.start()) + 1
        # Suppression may sit on the statement itself or the line above it.
        window = "\n".join(lines[max(0, lineno - 2):lineno])
        if SUPPRESSED.search(window):
            continue
        hits.append((lineno, " ".join(m.group(0).split())[:150]))
    return hits


def scan_repo(repo, scan_all=False):
    hits = []
    for sub in SCAN_DIRS:
        base = repo / sub
        if not base.is_dir():
            continue
        for path in sorted(base.rglob("*")):
            if path.suffix not in EXTS or not path.is_file():
                continue
            if any(part in DEFAULT_EXCLUDE for part in path.parts):
                continue
            if path.name.endswith((".test.ts", ".test.tsx", ".spec.ts")):
                continue
            for lineno, snippet in scan_file(path, scan_all):
                hits.append((path.relative_to(repo), lineno, snippet))
    return hits


def main():
    args = [a for a in sys.argv[1:]]
    # resolve(): `.` must still yield a real directory name, since the baseline
    # is keyed by repo name and an empty key matches nothing on the next run.
    root = (Path(args[0]).expanduser() if args and not args[0].startswith("-")
            else Path.cwd()).resolve()
    exclude = set(DEFAULT_EXCLUDE)
    baseline_path = write_baseline = None
    scan_all = "--all" in args
    for i, a in enumerate(args):
        if a.startswith("--exclude="):
            exclude |= {x.strip() for x in a.split("=", 1)[1].split(",") if x.strip()}
        elif a == "--baseline" and i + 1 < len(args):
            baseline_path = Path(args[i + 1])
        elif a == "--write":
            write_baseline = True

    repos = [root] if (root / "package.json").exists() else [
        d for d in sorted(root.iterdir())
        if d.is_dir() and d.name not in exclude and (d / ".git").exists()]

    counts, total = {}, 0
    for repo in repos:
        hits = scan_repo(repo, scan_all)
        if not hits:
            continue
        # lowercased: a local checkout at `LAYOUT/` and a GitHub Actions
        # checkout at `layout/` must hash to the same baseline key, or CI
        # reads REGRESSION on every push (0 -> N) after a Mac dev writes it.
        counts[repo.name.lower()] = len(hits)
        total += len(hits)
        print(f"\n{repo.name} ({len(hits)})")
        for rel, lineno, snippet in hits:
            print(f"  {rel}:{lineno}  {snippet}")

    print(f"\n{total} candidate(s) across {len(counts)} repo(s). "
          f"Silence an accepted site with `// silent-ok: <reason>`.")

    if baseline_path:
        if write_baseline:
            baseline_path.write_text(json.dumps(counts, indent=2, sort_keys=True) + "\n")
            print(f"Baseline written to {baseline_path}.")
            return 0
        try:
            prior = json.loads(baseline_path.read_text())
        except (OSError, ValueError):
            print(f"No readable baseline at {baseline_path}; run with --write first.")
            return 1
        regressed = {k: (prior.get(k, 0), v) for k, v in counts.items() if v > prior.get(k, 0)}
        if regressed:
            for name, (was, now) in sorted(regressed.items()):
                print(f"REGRESSION {name}: {was} -> {now}")
            print("Destructure `error` alongside `data`, or annotate with `// silent-ok:`.")
            return 1
        improved = {k: (v, counts.get(k, 0)) for k, v in prior.items() if counts.get(k, 0) < v}
        for name, (was, now) in sorted(improved.items()):
            print(f"improved {name}: {was} -> {now} (lower the baseline with --write)")
        print("No new silent-failure sites.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
