# what the **hex**

A fast, minimal color lookup tool for developers and designers. Paste a hex code, get the color name, preview, and ready-to-use CSS/SCSS variables, all in one place.

## Features

- **Instant color lookup** — Enter any hex code (3 or 6 digit) and get its name, RGB, and HSL values
- **Live preview** — See the color rendered as a full-width swatch
- **CSS/SCSS variables** — Auto-generated and ready to copy into your stylesheets
- **One-click copy** — Copy any value to your clipboard with visual confirmation
- **Debounced API calls** — Fetches color data efficiently with a 400ms debounce and request cancellation
- **Real-time validation** — Visual feedback for invalid hex inputs

## Tech Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Framework     | React 19 + TypeScript 5.9   |
| Build         | Vite 7                      |
| Styling       | Tailwind CSS 4              |
| Code Quality  | ESLint 9 + Prettier         |
| Color Data    | [The Color API](https://www.thecolorapi.com) |
| Package Mgr   | pnpm                        |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- [pnpm](https://pnpm.io)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/RChaubey16/what-the-hex.git
cd what-the-hex

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Other Scripts

```bash
pnpm build      # Production build (TypeScript compile + Vite bundle)
pnpm preview    # Preview the production build locally
pnpm lint       # Run ESLint
pnpm format     # Format code with Prettier
```

## Project Structure

```
src/
├── components/
│   ├── ColorResult.tsx    # Color swatch, name, values, and generated variables
│   ├── CopyButton.tsx     # Reusable copy-to-clipboard button with feedback
│   └── HexInput.tsx       # Hex code input with live validation
├── hooks/
│   └── useColorLookup.ts  # Debounced API integration with The Color API
├── utils/
│   └── color.ts           # Hex validation, normalization, and formatting helpers
├── App.tsx                # Root component
├── main.tsx               # Entry point
└── index.css              # Tailwind imports and custom animations
```

## How It Works

1. Enter a hex color code (e.g. `#00FFA6` or `3B82F6`)
2. The input is validated and normalized in real-time
3. A debounced request is sent to [The Color API](https://www.thecolorapi.com)
4. Results appear with:
   - A color swatch preview
   - The color name
   - Hex, RGB, and HSL values
   - Generated CSS (`--color-sky-blue: #87CEEB;`) and SCSS (`$color-sky-blue: #87CEEB;`) variables
5. Click any value to copy it to your clipboard

## License

MIT
