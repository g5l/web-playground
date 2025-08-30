# React-Spring Presentation

A presentation built with **React**, **React-Spring**, **HTML**, and
**CSS**.\
Each slide is a standalone React component, making it easy to add,
remove, or reorder slides.\
The project includes keyboard navigation (← →) and navigation buttons.

------------------------------------------------------------------------

## ✨ Features

-   📑 **Modular slides** -- each slide is its own file\
-   🎨 **Reusable layout** for titles, descriptions, code snippets, and
    animations\
-   🎥 **React-Spring animations** to demonstrate concepts in practice\
-   ⌨️ **Keyboard navigation** (left/right arrows)\
-   🖱️ **Buttons** for manual navigation\
-   💻 **Beautifully styled code blocks**

------------------------------------------------------------------------

## 📂 Project Structure

    react-spring-presentation/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   ├── styles/
    │   │   ├── global.css
    │   │   └── code.css
    │   ├── components/
    │   │   ├── SlideLayout.js
    │   │   ├── SlideNavigation.js
    │   └── slides/
    │       ├── Slide1.js
    │       ├── Slide2.js
    │       ├── Slide3.js
    │       └── index.js
    ├── package.json
    └── README.md

------------------------------------------------------------------------

## 🚀 Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/your-username/react-spring-presentation.git
cd react-spring-presentation
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Run the development server

``` bash
npm start
```

This will start a local server (via **Parcel**) and open the
presentation in your browser.

### 4. Build for production

``` bash
npm run build
```

The optimized output will be in the `dist/` folder.

------------------------------------------------------------------------

## 📝 Adding New Slides

1.  Create a new file in `src/slides/`, e.g. `Slide4.js`\
2.  Export your React component (reuse `SlideLayout` for consistency)\
3.  Import it into `src/slides/index.js` and add it to the exported
    array

Example:

``` js
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide4 from "./Slide4";

export default [Slide1, Slide2, Slide3, Slide4];
```

------------------------------------------------------------------------

## ⌨️ Controls

-   **→** Next slide\
-   **←** Previous slide\
-   **Buttons** at the bottom for manual navigation

------------------------------------------------------------------------

## 📦 Tech Stack

-   [React](https://react.dev/) -- UI library\
-   [React-Spring](https://react-spring.dev/) -- animations\
-   [Parcel](https://parceljs.org/) -- bundler, zero config\
-   [Prism.js](https://prismjs.com/) *(optional)* -- syntax highlighting
    for code blocks
