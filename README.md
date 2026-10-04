# 40 Web Projects 🚀

A curated collection of 40 modern web applications progressively built inside a single monorepo. This repository features an interactive project gallery landing page, isolated application directories, and standardized architectures for each project.

---

## 🗂️ Monorepo Architecture

To ensure each application remains isolated, clean, and independently runnable or deployable, this repository follows a clean modular structure:

```
40-web-projects/
├── gallery/                     # Interactive Project Gallery (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/          # Reusable UI components (Cards, Filters, Stats, Modals)
│   │   ├── data/projects.ts     # Central metadata structure for all 40 projects
│   │   ├── types/project.ts     # TypeScript interface definitions
│   │   └── App.tsx              # Main gallery dashboard
│   ├── package.json
│   └── vite.config.ts
├── projects/                    # Individual isolated web applications (01 to 40)
│   ├── 01-calculator/           # Project 01: Calculator [In Progress]
│   ├── 02-quiz-app/             # Project 02: Quiz App [Coming Soon]
│   └── ...                      # Projects 03 - 40
├── package.json                 # Monorepo root helper scripts
└── README.md                    # Main repository documentation
```

### Isolation Strategy
- **Independent Dependencies**: Each application inside `projects/` maintains its own configuration and dependencies.
- **Pluggable Integration**: The main gallery dynamically reads project metadata from `gallery/src/data/projects.ts`. When an application is completed, updating its status and link seamlessly connects it to the showcase.
- **Zero Pollution**: Sub-projects do not pollute the gallery's bundle or styling rules.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm, yarn, or pnpm

### Running the Project Gallery
From the root directory:

```bash
# Install gallery dependencies
cd gallery
npm install

# Start the local development server
npm run dev
```

Alternatively, from the repository root:
```bash
npm run dev
```

---

## 📋 40 Projects Roadmap

| # | Project | Category | Status | Tech Stack |
|---|---------|----------|--------|------------|
| 01 | **Calculator** | Utility | 🟡 In Progress | React, TypeScript, Tailwind CSS |
| 02 | **Quiz App** | Game & EdTech | ⚪ Coming Soon | React, TypeScript, Tailwind CSS |
| 03 | **Rock Paper Scissors** | Game | ⚪ Coming Soon | JavaScript, Canvas, CSS3 |
| 04 | **Note App** | Productivity | ⚪ Coming Soon | React, IndexedDB, Tailwind CSS |
| 05 | **Stopwatch App** | Utility | ⚪ Coming Soon | TypeScript, Web Audio API, CSS3 |
| 06 | **QR Code Reader** | Utility | ⚪ Coming Soon | HTML5 Video, jsQR, Tailwind CSS |
| 07 | **Weather App** | Utility | ⚪ Coming Soon | OpenWeather API, React, Tailwind |
| 08 | **Ecommerce Website** | Commerce | ⚪ Coming Soon | React, Cart Context, Stripe SDK |
| 09 | **Landing Page** | Marketing | ⚪ Coming Soon | HTML5, Tailwind CSS, Framer Motion |
| 10 | **Password Generator** | Security | ⚪ Coming Soon | Crypto API, React, Tailwind CSS |
| 11 | **Tic Tac Toe Game** | Game | ⚪ Coming Soon | Minimax Algorithm, React, CSS3 |
| 12 | **Link Shortener Website** | Utility | ⚪ Coming Soon | React, REST API, Tailwind CSS |
| 13 | **Portfolio Website** | Personal | ⚪ Coming Soon | React, Tailwind CSS, Lucide |
| 14 | **Drawing App** | Creative | ⚪ Coming Soon | HTML5 Canvas API, TypeScript |
| 15 | **Food Order Website** | Commerce | ⚪ Coming Soon | React, State Management, Tailwind |
| 16 | **Meme Generator** | Creative | ⚪ Coming Soon | Canvas API, React, Meme API |
| 17 | **Movie App** | Media | ⚪ Coming Soon | TMDB API, React, Tailwind CSS |
| 18 | **Chat App** | Communication | ⚪ Coming Soon | WebSockets / Socket.io, React |
| 19 | **Twitter Clone** | Social Media | ⚪ Coming Soon | React, Tailwind CSS, Mock API |
| 20 | **Survey App** | Productivity | ⚪ Coming Soon | React, Form Validation, Charts |
| 21 | **E-Book Site** | Media | ⚪ Coming Soon | React, ePub Reader, Tailwind CSS |
| 22 | **Instagram Clone** | Social Media | ⚪ Coming Soon | React, Tailwind CSS, Photo Filter |
| 23 | **WhatsApp Clone** | Communication | ⚪ Coming Soon | React, WebSockets, Audio Messages |
| 24 | **Netflix Clone** | Streaming | ⚪ Coming Soon | React, TMDB API, Video Player |
| 25 | **File Sharing App** | Utility | ⚪ Coming Soon | WebRTC, File API, Tailwind CSS |
| 26 | **Parallax Website** | Showcase | ⚪ Coming Soon | HTML5, CSS Parallax, GSAP |
| 27 | **Job Search App** | Career | ⚪ Coming Soon | React, Job Search API, Filters |
| 28 | **Pinterest Clone** | Social Media | ⚪ Coming Soon | Masonry Grid, React, Tailwind CSS |
| 29 | **Dating App** | Social | ⚪ Coming Soon | React, Swipe Gestures, Tailwind |
| 30 | **Social Media Dashboard** | Analytics | ⚪ Coming Soon | React, Recharts, Tailwind CSS |
| 31 | **Tracker App** | Finance & Habit | ⚪ Coming Soon | React, Chart.js, LocalStorage |
| 32 | **Memory App** | Game | ⚪ Coming Soon | CSS 3D Transforms, React, Sound |
| 33 | **Giphy Clone** | Media | ⚪ Coming Soon | Giphy API, Infinite Scroll, React |
| 34 | **User Activity Tracker** | Productivity | ⚪ Coming Soon | React, Activity Heatmap, Storage |
| 35 | **Stock-Trading App** | Finance | ⚪ Coming Soon | Finnhub API, Candlestick Charts |
| 36 | **Chess Game** | Game | ⚪ Coming Soon | Chess.js, React Chessboard, AI |
| 37 | **Music Player** | Media | ⚪ Coming Soon | Web Audio API, React, Visualizer |
| 38 | **To-Do List App** | Productivity | ⚪ Coming Soon | React, Drag & Drop, LocalStorage |
| 39 | **Random User API** | Utility | ⚪ Coming Soon | RandomUser API, React, Data Export |
| 40 | **Typing Speed Test** | Productivity | ⚪ Coming Soon | React, WPM & Accuracy Engine |

---

## 🛠️ Tech Stack Guidelines
Each application is self-contained. The gallery uses **React + TypeScript + Vite + Tailwind CSS**. Sub-applications can use appropriate modern frontend tools while adhering to the shared design principles.
