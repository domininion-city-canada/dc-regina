# The site's forms in Temple

The site's forms live in Dominion City Regina's Temple account
(templeadmin.com, church id `938934ef-2923-4bb5-bb9b-dba459c8f696`). Temple
stores the answers, adds people to People and sends the notification and
confirmation emails. All three are built and published (2026-10-22, copied from Saskatoon's); their
links are in `TEMPLE_FORMS` in `src/data/site.ts`. Edit questions in Temple
(Forms); the site picks changes up with no deploy. A form set to null shows
"Opening soon" with the church email.

How they're set up (the same as Brampton's, Mississauga's and Hamilton's):

- Embedded with `?embed=1`: no Temple header, a transparent page, and the form
  reports its height so `TempleForm` sizes the frame to fit. When it's sent,
  the form posts `temple-form:submitted` and the page shows its own thank-you.
  Theme: blue-600 buttons, DM Sans, no logo.
- Name is one Name question (first and last, both required).
- Notifications go to dcregina@dominioncitycanada.org. Forms with an
  email send the person a copy of their answers.
- Plan a visit adds a first-timer follow-up; Next steps adds the person to
  People; I gave my life to Christ has no email, so it only notifies the inbox.
- Cloudflare Turnstile guards every submission.

### Plan a visit (`planVisit`, on /find-us#plan-a-visit)

"Plan a Visit" in the nav opens /find-us. Titled "Tell us you're coming".
Your name (required), Email (required), Phone.

### I gave my life to Christ (`newLife`, on /new-life)

Your name (required), Phone number (required). Someone calls to pray with them.

### Next steps (`nextSteps`, on /next-steps)

| Question | Type | Required | Options |
|---|---|---|---|
| Your name | Name | Yes | |
| Email | Email | Yes | |
| Phone | Phone | | |
| My next step (pick as many as apply) | Checkboxes | Yes | I gave my life to Christ; I want to be baptised; I need prayer; I want to join DCA training; I want to serve on a team; I'm not sure — I'd just like someone to reach out |
| How should we reach you? | Checkboxes | Yes | Call, Text, Email |
| Anything you'd like us to know | Long text | | |

New Life and Next Steps sit under "Grow" in the nav and in the footer.
