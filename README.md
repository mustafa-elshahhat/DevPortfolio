# Mostafa Elshahat - Portfolio

A clean, modern, and responsive portfolio website built with React, TypeScript, and Vite. Designed to showcase my development projects, skills, and experience with a polished UI and smooth animations.

## Features
- **Responsive Layout**: Adapts seamlessly to mobile, tablet, and desktop screens.
- **Modern UI/UX**: Uses glassmorphism, gradient meshes, and Framer Motion for smooth animations and transitions.
- **Accessible Design**: Keyboard-navigable project modals and semantic HTML structure.
- **Dynamic Projects Showcase**: A dedicated section to highlight key projects and technologies used.
- **Contact Form Integration**: A fully functional contact form to get in touch directly from the site.

## Tech Stack
- **Framework**: React 19
- **Tooling**: Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod

## Project Structure
```text
├── src/
│   ├── assets/       # Static assets like images and global CSS
│   ├── components/   # Reusable UI components and page sections
│   │   ├── layout/   # Navbar, Footer
│   │   ├── sections/ # Hero, About, Skills, Projects, Contact
│   │   └── ui/       # Buttons, Badges, Containers
│   ├── data/         # Mock data for projects and social links
│   ├── hooks/        # Custom React hooks (e.g., useScrollSpy)
│   ├── lib/          # Utilities and animation configs
│   └── main.tsx      # Application entry point
├── public/           # Publicly served assets
├── package.json      # Dependencies and scripts
└── vite.config.ts    # Vite configuration
```

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mustafaelshahhat-art/DevPortfolio.git
   cd DevPortfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Formspree endpoint. If `VITE_FORMSPREE_ENDPOINT` is not configured, the contact form will fall back to a `mailto` link.
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_endpoint_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
