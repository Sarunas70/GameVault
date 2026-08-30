# GameVault

GameVault is a video-game collection management web application created for an academic assignment. It allows users to organise game collections, manage individual game details, and view collection statistics in a responsive browser-based interface.

## Features

- Welcome homepage with an introduction to GameVault
- Featured top-three games section with player-count information
- Dashboard for viewing game collections
- Add and delete game collections
- Open individual collection details
- Add, edit, and delete games from a collection
- Store game details including title, genre, platform, and rating
- Search collections by title or description
- Sort collections alphabetically or by number of games
- Upload, preview, and change collection images
- Save dashboard collection data in browser localStorage
- About page with application information, contact details, location, and statistics
- Login and sign-up pages for a front-end authentication prototype
- Responsive styling for desktop and smaller screen sizes

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser localStorage
- FileReader API for image previews
- Git and GitHub

## Project Structure

```text
GameVault/
├── index.html
├── dashboard.html
├── collection-details.html
├── about.html
├── login.html
├── signup.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── dashboard.js
│   ├── collection-details.js
│   ├── about.js
│   └── auth.js
└── images/
```

## How to Run

1. Download or clone the repository.
2. Open the GameVault folder in IntelliJ IDEA, Visual Studio Code, or another code editor.
3. Open `index.html` in a web browser, or run the project using a local development server such as Live Server.
4. Use the navigation menu to visit the Dashboard, Collection Details, About, Login, and Sign Up pages.

## Dashboard Functions

The Dashboard provides collection management functions:

- Add a collection title and description.
- Optionally choose an image for the collection.
- Preview the image before adding the collection.
- Change an existing collection image.
- Delete a collection.
- Search collection titles and descriptions.
- Sort collections by title or game total.

Dashboard collections are stored with `localStorage`, so data remains available after refreshing the browser on the same device and browser.

## Authentication Note

The login and sign-up pages are a front-end academic prototype. User information is stored locally in the browser and the authentication code is not designed for a live production website. A production application would use a secure backend, HTTPS, a database, and server-side password hashing.

## Author

Created by Sarunas for an academic assignment.
