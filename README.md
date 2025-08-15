Modern React Portfolio
A clean, responsive, and modern personal portfolio website built with React and styled using Tailwind CSS. This project serves as a template to showcase personal projects, skills, and contact information.

🚀 Features
Responsive Design: Optimized for a seamless experience on all devices (mobile, tablet, and desktop).

Dark Mode Toggle: Easily switch between light and dark themes.

Component-Based: Organized and easy-to-read code using React components.

Tailwind CSS: Utilizes a utility-first CSS framework for rapid and consistent styling.

Formspree Integration: A functional contact form that sends messages directly to your email without a backend.

GitHub Pages Deployment: A simple and automated process for deploying the site.

🛠️ Technologies Used
React: A JavaScript library for building user interfaces.

Tailwind CSS: For styling.

JavaScript (ES6+): The core language.

Vite: A build tool that provides a fast development experience.

Heroicons: A set of free MIT-licensed high-quality SVG icons.

Lucide React: A set of beautiful and consistent icons for React.

Formspree: For handling form submissions.

🏁 Getting Started
Prerequisites
You need to have Node.js and npm (Node Package Manager) installed on your machine.

Installation
Clone the repository:

git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name

Install dependencies:

npm install

Running Locally
To start the development server and view the website in your browser:

npm run start

This will run the app in development mode. Open http://localhost:3000 to view it in the browser. The page will automatically reload if you make edits.

Deployment
This project is configured to be easily deployed to GitHub Pages.

Configure homepage in package.json:

Add the homepage property with your repository URL.

"homepage": "https://your-username.github.io/your-repository-name",

Deploy the application:

npm run deploy

This command will build your project and push it to the gh-pages branch, making your site live in minutes.

✍️ Customizing the Portfolio
All the content for the portfolio is managed in a single portfolioData object inside the src/App.js file.

To change your name, title, or bio: Modify the portfolioData object.

To change your profile picture: Replace the profilePicUrl with a direct URL to your image.

To add your projects: Add new objects to the projects array with your project details and image URLs.

To make the contact form functional: Sign up for a free Formspree account and replace YOUR_FORMSPREE_ENDPOINT with your unique form ID in the Contact component.