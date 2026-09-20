# OCTA

A mobile-first interactive theatre tournament experience for Aurora Theatre. The current build is the complete game framework with placeholder questions. QR generation is intentionally left for the final phase.

## Run locally

```bash
npm install
npm run dev
```

Vite serves the UI at the local URL it prints. During plain Vite development, question and role-selection requests fall back to safe placeholder UI data if Vercel functions are not running. On Vercel, the functions under `api/` are used automatically.

## Deploy

1. Import this repository into Vercel.
2. Set `VITE_GOOGLE_FORM_URL` to the published Google Form URL.
3. Deploy with the default Vite build settings (`npm run build`).
4. Replace the placeholder questions and `correctOption` values in `api/_questions.js`.
5. Publish the Google Form with Team Number and Final 8-Digit Code fields, then connect it to Google Sheets.

The client never receives `correctOption`. The API returns only role metadata, question text, and four options.

## API contract

The game exposes exactly these nine internal routes:

- `POST /api/role/select`
- `GET /api/question/1` through `GET /api/question/8`

The tenth interaction is the external Google Form submission. There are no answer, timer, progress, analytics, leaderboard, or authentication APIs.

## Google Sheets validation

If the official code is stored in a protected cell such as `Settings!B1`, a response-sheet formula can mark each submission:

```text
=IF(C2=Settings!$B$1,"CORRECT","WRONG")
```

Rank only correct submissions by timestamp, for example in a separate result range:

```text
=IFERROR(SORT(FILTER(A2:E,C2:C=Settings!$B$1),1,TRUE),"No correct submissions yet")
```

Protect the settings cell and limit edit access to organizers.

## Event readiness checklist

- Replace all eight placeholder question records.
- Confirm the four options and one correct option for each role.
- Add the final Google Form URL in Vercel.
- Test one team flow on several phones over the same mobile network.
- Verify the question API responses do not contain `correctOption`.
- Generate and print the eight role QR codes and final submission QR code as the final phase.
