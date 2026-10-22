# The site's forms in Temple

Plan a visit (on /find-us, where "Plan a Visit" lands), New Life (/new-life)
and Next Steps (/next-steps) are Temple forms (templeadmin.com), framed by
`TempleForm`. Temple stores the answers, adds people to People and emails
dcregina@dominioncitycanada.org. The links live in `TEMPLE_FORMS` in
`src/data/site.ts`; while one is null, that form shows "Opening soon" with the
church email.

**Status (2026-10-22): waiting on a Temple account.** Dominion City Regina
isn't in Temple yet. Once someone signs it up at templeadmin.com, create the
forms with `scripts/temple-forms.py <church id>` and paste the ids.

How they're set up (the same as Brampton's, Mississauga's, Hamilton's and
Saskatoon's):

- Embedded with `?embed=1`: no Temple header, a transparent page, and the form
  reports its height so `TempleForm` sizes the frame to fit. When it's sent,
  the form posts `temple-form:submitted` and the page shows its own thank-you.
  Theme: blue-600 buttons, DM Sans, no logo.
- Name is one Name question (first and last, both required).
- Forms with an email send the person a copy of their answers.
- Plan a visit adds a first-timer follow-up; Next steps adds the person to
  People; New Life has no email, so it only notifies the inbox.

### Next steps options

My next step: I gave my life to Christ; I want to be baptised; I need prayer;
I want to join a Believers' Circle; I want to serve on a team; I'm not sure —
I'd just like someone to reach out. How should we reach you: Call, Text, Email.
