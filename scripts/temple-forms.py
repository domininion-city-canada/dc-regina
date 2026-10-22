"""SQL for Dominion City Regina's three website forms in Temple.

Same setup as the other branches' forms (see docs/TEMPLE_FORMS.md); Regina's
small groups are Believers' Circles. Prints SQL to stdout:

    python3 scripts/temple-forms.py <Regina's Temple church id> > forms.sql
    supabase db query --linked --project-ref blvxyvvtoetcvvnakfxi -f forms.sql

then paste the three returned ids into TEMPLE_FORMS in src/data/site.ts.
"""
import json
import sys

CHURCH = sys.argv[1]
INBOX = "dcregina@dominioncitycanada.org"

THEME = {
    "brandColor": "#2563eb",
    "radius": 6,
    "font": "custom",
    "customFont": "DM Sans",
    "showLogo": False,
    "transparentBackground": True,
}


def opts(bid, texts):
    return [{"id": f"{bid}:o{i + 1}", "text": t} for i, t in enumerate(texts)]


def settings(message, confirm=True):
    return {
        "confirmationMessage": message,
        "notificationEmails": [INBOX],
        "submitterConfirmationEnabled": confirm,
        "theme": THEME,
    }


def auto(p, action, **fields):
    return {"id": f"{p}:auto-{action}", "action": action, "fieldMap": {k: f"{p}:{v}" for k, v in fields.items()}}


FORMS = [
    dict(
        title="Tell us you're coming",
        blocks=[
            {"id": "pv:name", "type": "NAME", "label": "Your name", "required": True},
            {"id": "pv:email", "type": "INPUT_EMAIL", "label": "Email", "required": True},
            {"id": "pv:phone", "type": "INPUT_PHONE_NUMBER", "label": "Phone", "required": False},
        ],
        automations=[auto("pv", "first_timer_followup", name="name", email="email", phone="phone")],
        settings=settings("Thank you! We can't wait to meet you. Someone from the team will be in touch before Sunday."),
    ),
    dict(
        title="I gave my life to Christ",
        blocks=[
            {"id": "nl:name", "type": "NAME", "label": "Your name", "required": True},
            {"id": "nl:phone", "type": "INPUT_PHONE_NUMBER", "label": "Phone number", "required": True},
        ],
        automations=[],
        settings=settings("Welcome to the family of God! Someone from our team will call you soon to pray with you.", confirm=False),
    ),
    dict(
        title="Next steps",
        blocks=[
            {"id": "ns:name", "type": "NAME", "label": "Your name", "required": True},
            {"id": "ns:email", "type": "INPUT_EMAIL", "label": "Email", "required": True},
            {"id": "ns:phone", "type": "INPUT_PHONE_NUMBER", "label": "Phone", "required": False},
            {"id": "ns:steps", "type": "CHECKBOXES", "label": "My next step (pick as many as apply)", "required": True,
             "options": opts("ns:steps", [
                 "I gave my life to Christ",
                 "I want to be baptised",
                 "I need prayer",
                 "I want to join a Believers' Circle",
                 "I want to serve on a team",
                 "I'm not sure — I'd just like someone to reach out",
             ])},
            {"id": "ns:reach", "type": "CHECKBOXES", "label": "How should we reach you?", "required": True,
             "options": opts("ns:reach", ["Call", "Text", "Email"])},
            {"id": "ns:notes", "type": "TEXTAREA", "label": "Anything you'd like us to know", "required": False},
        ],
        automations=[auto("ns", "create_member", name="name", email="email", phone="phone")],
        settings=settings("Thank you! Someone from our team will reach out to you this week."),
    ),
]


def lit(s):
    return "'" + s.replace("'", "''") + "'"


rows = []
for f in FORMS:
    data = {"blocks": f["blocks"], "settings": f["settings"], "automations": f["automations"]}
    rows.append(f"({lit(CHURCH)}::uuid, {lit(f['title'])}, {lit(json.dumps(data, ensure_ascii=False))}::jsonb, true)")

print(
    "insert into forms (church_id, title, form_data, is_published) values\n"
    + ",\n".join(rows)
    + "\nreturning id, title;"
)
