# NOVARA - Innovate Medical Intelligence

Landing page for NOVARA, a medical AI company that designs, validates, and deploys reliable machine-learning models for healthcare and clinical research.

## Tech Stack

- **Framework:** [Next.js 12](https://nextjs.org) (static export)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com) (JIT mode) + PostCSS
- **Animations:** [Framer Motion](https://www.framer.com/motion/) + custom canvas animations
- **Icons:** [Heroicons](https://heroicons.com/)
- **Smooth Scroll:** [react-scroll](https://github.com/fisshy/react-scroll)

## Getting Started

### Prerequisites

- Node.js
- Yarn

### Install dependencies

```bash
yarn
```

### Run development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for production

```bash
yarn build-prod
```

This cleans the output directory, builds the project, and exports static HTML to the `out/` folder.

### Lint

```bash
yarn lint
```

### Type check

```bash
yarn build-types
```

## Project Structure

```
src/
  components/    # React components (Header, HeroSection, Product, etc.)
  config/        # index.json - all page content (text, images, team, projects)
  hooks/         # Custom hooks (useCanvas, useResponsiveSize)
  pages/         # Next.js pages (single-page app)
  styles/        # Global CSS with Tailwind
  utils/         # Canvas animation classes (HexNet, NetworkAnimation)
public/
  assets/images/ # All images referenced from config
```

## Content Management

All page content is driven by `src/config/index.json`. To update text, images, team members, or projects, edit this file. Images are stored in `public/assets/images/`.

## Customization

- **Theme colors:** Edit `tailwind.config.js` (primary: `#2685ba`, secondary: `#24272B`)
- **Fonts:** Google Sans (configured in `tailwind.config.js` and loaded in `_document.tsx`)

## Deployment

The site can be deployed as static HTML. The `out/` directory contains the production build after running `yarn build-prod`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsaraearly%2Fnovara_testing)

## License

Licensed under the MIT License.
