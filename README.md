# Personal Website & Countries Explorer

A multi-page static website built with HTML, CSS, and vanilla JavaScript. The project combines a personal portfolio-style website with client-side form validation, media content, and an interactive country-data table.

## Overview

This project demonstrates the fundamentals of front-end web development without a framework or build system. It contains three linked pages—Home, Interests, and Expertise—and uses JavaScript for both form validation and country-data rendering.

The Home page includes a visitor form and a country explorer. Country information can come from the REST Countries API when an API key is supplied, while a bundled local dataset provides a fallback so the table can still work without an external request.

## Features

- Multi-page static website with shared navigation and styling
- Home, Interests, and Expertise pages
- Responsive HTML/CSS layout
- Visitor information and message form
- Client-side validation for names, phone numbers, and Canadian postal codes
- Clear validation messages without sending the form to a server
- Country table rendered dynamically with JavaScript
- Country flags, native names, capitals, and regions/subregions
- Optional REST Countries API integration
- Bundled local country dataset as a fallback
- Static images and video content
- No framework, package manager, or build step required

## Technology Stack

- HTML5
- CSS3
- JavaScript
- DOM APIs
- Fetch API
- REST-style API consumption
- Regular expressions for input validation

## Project Structure

```text
personal-website-rest-countries/
├── index.html
├── interests.html
├── expertise.html
├── styles.css
├── validation.js
├── ajax.js
├── countries-data.js
├── header-image.jpg
├── moviePoster.jpg
├── Marvel's Guardians.mp4
├── README.md
└── .gitignore
```

## Pages

### `index.html` — Home

The main page introduces the site and contains two interactive areas:

1. A visitor information/message form
2. A dynamically generated countries table

The page loads `validation.js` for form handling and both `countries-data.js` and `ajax.js` for the country explorer.

### `interests.html` — Interests

Displays personal interests such as coding, movies, and writing. The page demonstrates the use of static media including an image and local video asset.

### `expertise.html` — Expertise

Presents web-development and programming skills using regular HTML content, lists, and a small skills table.

## Form Validation

The visitor form is validated entirely in the browser.

`validation.js` checks:

- First name
- Last name
- Phone number
- Postal code when Canada is selected

### Name rules

Names must:

- Contain at least two characters
- Use letters, spaces, periods, or hyphens

### Phone format

The expected format is:

```text
999-999-9999
```

### Canadian postal-code format

When Canada is selected, values such as the following are accepted:

```text
A1A 1A1
A1A-1A1
```

The form is intentionally a static demonstration. A successful validation displays a status message, but the entered information is not transmitted or stored on a server.

## Country Explorer

The country table is rendered by `ajax.js`.

Each row displays:

- Sequence number
- Flag
- Native/common country name
- Capital
- Region or subregion

### Local fallback data

`countries-data.js` contains a bundled country dataset. This makes the project usable without a live API request or API key.

When no API key is configured, the application automatically renders the bundled dataset.

### Optional REST Countries integration

`ajax.js` also contains support for the REST Countries Countries API.

The script reads an optional browser variable:

```js
window.REST_COUNTRIES_API_KEY
```

If that value exists, the page attempts a live API request. If the request fails, the app falls back to `countries-data.js`.

Because this is a completely static client-side project, do **not** commit a private API key into the repository or JavaScript source. Any key placed in browser code can be viewed by visitors.

## Data Flow

```text
Browser loads index.html
        ↓
countries-data.js creates window.unMembers
        ↓
ajax.js runs when the page loads
        ↓
API key available?
   ↙             ↘
 No               Yes
 ↓                 ↓
Local data      REST API request
   \               /
    \             /
     → normalize data
            ↓
      renderCountries()
            ↓
       HTML table
```

## Running Locally

There is no installation step.

### Option 1 — Open directly

You can double-click:

```text
index.html
```

Most of the site works directly from the filesystem.

### Option 2 — Run a local static server

This is the recommended development method.

If Python is installed, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploying

Because the project is fully static, it can be hosted on services such as:

- GitHub Pages
- Netlify
- Cloudflare Pages
- Any standard static web server

For GitHub Pages, the repository root already contains `index.html`, so no build output folder is required.

## JavaScript Responsibilities

### `validation.js`

Responsible for:

- Preventing the static form from navigating away
- Validating first and last names
- Validating Canadian postal codes
- Validating phone-number formatting
- Clearing previous validation messages
- Showing a success/error status message

### `ajax.js`

Responsible for:

- Normalizing local country data
- Normalizing API country data
- Loading the optional REST Countries API
- Falling back to local data when necessary
- Generating the country table markup

### `countries-data.js`

Contains the bundled country records used by the country explorer when a live API call is not available.

## Front-End Concepts Demonstrated

- Semantic HTML structure
- Multi-page navigation
- CSS layout and styling
- Form controls
- Client-side form validation
- Regular expressions
- DOM selection and updates
- Arrays and array transformations
- Template literals
- Promise-based Fetch API calls
- Error handling and fallback behavior
- Static media integration

## Public-Repo Cleanup

The public version removes course submission declarations, student identifiers, duplicate source/archive folders, and an old deployment-reference text file. The personal content itself remains because this project is intentionally a personal website.

The form-validation flow was also cleaned up so both first and last names are included in the final validation result and the static demo does not accidentally attempt a real submission.

## Current Limitations

- The site uses a handcrafted visual design rather than a modern component system.
- The visitor form has no backend and therefore does not send or save messages.
- The local country dataset is a snapshot and does not automatically update.
- A REST Countries API key cannot be kept secret in a purely static browser application.
- Some layout and typography choices reflect an earlier-stage front-end project and could be modernized.
- The bundled movie/video media increases repository size.

## Possible Improvements

- Rebuild the layout with modern responsive CSS Grid/Flexbox patterns
- Add mobile navigation
- Replace the static contact demo with a backend or form service
- Add country search and region filters
- Add loading and retry states for API requests
- Improve accessibility and keyboard navigation
- Add automated form-validation tests
- Optimize/compress image and video assets
- Convert repeated page navigation/footer markup into reusable components using a framework or static-site generator

## Purpose

The project represents an early full front-end website that combines static content with real JavaScript behavior. It demonstrates an understanding of page structure, styling, validation, DOM manipulation, API-oriented programming, and graceful fallback to local data without relying on a front-end framework.
