# Branciforte Plaza — leasing site

A one-page site for leasing space at Branciforte Plaza, 555 Soquel Ave, Santa Cruz. It's plain HTML, CSS and JS with no build step.

```
index.html              The page
assets/css/styles.css   Styles (colors and fonts at the top)
assets/js/spaces.js     ← The list of available spaces. Edit this to update the site.
assets/js/config.js     ← Where inquiries are emailed
assets/js/main.js       Spaces table, photo viewer, inquiry form
assets/img/             Photos (each in full size plus a -800 version)
```

## Update the available spaces

Edit `assets/js/spaces.js`. Each space has a name, use, size, rent, summary, details and features. The table, the space count and the form's "Space of interest" list all update from this file.

**Add photos to a space:**

1. Put a full-size JPG (about 1600px wide) and an 800px version named `<name>-800.jpg` in `assets/img/`.
2. List the photo in that space's `photos` array.

A space with no photos shows "Photos coming soon".

## Receive inquiries by email

Set `inquiryEmail` in `assets/js/config.js`. The form sends inquiries through [FormSubmit](https://formsubmit.co), which needs no account.

The first inquiry triggers a one-time activation email to that address. Click the link in it, and every inquiry after that arrives in your inbox. The subject line includes the space the visitor picked.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
