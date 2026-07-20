# Hotel Dnyaneshwari Guest House & Villa — Website

A Flask web app that serves the hotel's website (home, about, rooms,
deluxe/normal room pages, digital menu, gallery, contact).

## What's inside

```
app.py              Flask app — serves all the pages, css, js, images
requirements.txt     Python dependencies (Flask, gunicorn)
Procfile              Tells Render how to start the app
index.html            Home page (hero slider, 3-photo strip, rooms, amenities)
about.html            About Us page
rooms.html            Rooms overview (Deluxe + Normal)
deluxe-room.html    Deluxe Room detail page
normal-room.html    Normal Room detail page
menu.html              Digital Menu (browsing only, no ordering/payment)
gallery.html          Photo gallery with filters + lightbox
contact.html          Contact page, map, enquiry form
css/style.css          All styling
js/script.js            All animations & interactivity
images/                  All photos used on the site
```

## Run it on your own computer (optional, to test first)

1. Make sure Python 3 is installed.
2. Open a terminal in this folder and run:
   ```
   pip install -r requirements.txt
   python app.py
   ```
3. Open your browser to `http://127.0.0.1:5000`

## Deploy to Render (free)

1. Put this whole folder in a GitHub repository (create a free GitHub
   account if you don't have one, create a new repo, upload all these
   files — `app.py`, `requirements.txt`, `Procfile`, the `.html`
   files, and the `css/`, `js/`, `images/` folders).
2. Go to https://render.com and sign up / log in.
3. Click **New +** → **Web Service**.
4. Connect your GitHub account and select this repository.
5. Fill in the settings:
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Instance Type:** Free
6. Click **Create Web Service**. Render will build and deploy the
   site — this takes a couple of minutes the first time.
7. Once it's live, Render gives you a free URL like
   `https://your-app-name.onrender.com` — that's your website.

Notes on the free plan: a free Render web service goes to sleep after
15 minutes of no visitors, and the next visit takes ~30-50 seconds to
wake back up. If you want the site always instantly fast, you'd need
a paid Render instance.

## Editing photos

1. Put your photo file inside the `/images` folder.
2. Open the relevant `.html` file, find the photo (search for the
   old filename in `src="..."` or `background-image:url('...')`),
   and swap in the new filename.
3. Save, then re-deploy (push to GitHub — Render redeploys
   automatically on every push).

## Editing phone numbers / WhatsApp

- Open `contact.html`, find `tel:` links and replace the number.
- Search every `.html` file for `wa.me/` and replace with
  `wa.me/91YOURNUMBER` (10-digit number, no spaces or `+`).

## About the hero photos / three-photo strip sizing

The homepage hero slider and the three-photo strip under it ("Ridge &
Forest Views" / "Comfortable Rooms" / directions block) are now sized
to be smaller on tablets and phones so they don't fill the whole
screen on a mobile visit — this is controlled in `css/style.css`
under the `/* RESPONSIVE */` section near the bottom of the file, if
you ever want to adjust the sizes further.
