"""
Hotel Dnyaneshwari Guest House & Villa — Flask app
----------------------------------------------------
This simply serves the existing static website (HTML/CSS/JS/images)
through Flask so it can be deployed on Render (or any host that runs
a Python web service instead of static hosting).

No routes/paths inside the HTML files needed to change — every page
already links to files like "css/style.css", "images/villa.jpeg",
"about.html" etc. using plain relative paths, and this app serves
exactly those paths from disk.
"""

import os
from flask import Flask, send_from_directory, abort

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=None)

# Pages that don't have a .html file extension in the URL
# e.g. yoursite.com/rooms -> rooms.html
PAGES = {
    "": "index.html",
    "index": "index.html",
    "about": "about.html",
    "rooms": "rooms.html",
    "deluxe-room": "deluxe-room.html",
    "normal-room": "normal-room.html",
    "menu": "menu.html",
    "gallery": "gallery.html",
    "contact": "contact.html",
}


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<page>")
def clean_page(page):
    """Allow /rooms as well as /rooms.html to both work."""
    if page in PAGES:
        return send_from_directory(BASE_DIR, PAGES[page])
    # fall through to generic file serving (e.g. /rooms.html, /favicon.ico)
    return serve_any_file(page)


@app.route("/<path:filename>")
def serve_any_file(filename):
    """Serves css/, js/, images/ and any other real file by its path."""
    full_path = os.path.join(BASE_DIR, filename)
    if os.path.isfile(full_path):
        directory, name = os.path.split(full_path)
        return send_from_directory(directory, name)
    abort(404)


@app.errorhandler(404)
def not_found(_e):
    return (
        "<h1>404 — Page not found</h1><p><a href='/'>Back to home</a></p>",
        404,
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
