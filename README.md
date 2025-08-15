# Modern React Portfolio

A clean, responsive, and modern personal portfolio website built with React and styled using Tailwind CSS. Use this template to showcase your projects, skills, and contact information.

---

## 🚀 Features

- **Responsive Design:** Seamless experience on mobile, tablet, and desktop.
- **Dark Mode Toggle:** Switch between light and dark themes.
- **Component-Based:** Organized, readable React components.
- **Tailwind CSS:** Utility-first CSS for rapid, consistent styling.
- **Formspree Integration:** Contact form sends messages directly to your email—no backend required.
- **GitHub Pages Deployment:** Simple, automated deployment.

---

## 🛠️ Technologies Used

- **React:** UI library for building interfaces.
- **Tailwind CSS:** Utility-first CSS framework.
- **JavaScript (ES6+):** Core language.
- **Heroicons:** MIT-licensed SVG icons.
- **Lucide React:** Beautiful, consistent React icons.
- **Formspree:** Handles form submissions.
- **gh-pages:** Deploys to GitHub Pages.

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Installation

```sh
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
npm install
```

### Running Locally

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page reloads automatically on edits.

---

## 🚢 Deployment

This project is ready for GitHub Pages.

1. **Configure homepage in [`package.json`](package.json):**

   ```json
   "homepage": "https://your-username.github.io/your-repository-name"
   ```

2. **Deploy:**

   ```sh
   npm run deploy
   ```

Your site will be live at your GitHub Pages URL.

---

## ✍️ Customizing Your Portfolio

All content is managed in the [`portfolioData`](src/App.js) object in [`src/App.js`](src/App.js):

- **Change your name, title, or bio:** Edit the `portfolioData` object.
- **Update your profile picture:** Replace `profilePicUrl` with your image URL.
- **Add projects:** Add objects to the `projects` array with details and image URLs.
- **Contact form:** Sign up at [Formspree](https://formspree.io/) and replace the endpoint in the Contact component with your unique form ID.

---

## 📄 License

This project is MIT licensed. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Credits

- [Heroicons](https://heroicons.com/)
- [Lucide React](https://lucide.dev/)
- [Formspree](https://formspree.io/)