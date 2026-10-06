# Project 01: Calculator 🧮

A polished, production-quality digital calculator web application built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. 

This application is part of the **40 Web Projects** monorepo collection, designed to remain completely isolated within its own directory.

---

## 🌟 Features

- **Standard Arithmetic Operations**:
  - Addition (`+`), Subtraction (`−`), Multiplication (`×`), and Division (`÷`).
- **Mathematical Correctness & Precedence**:
  - Evaluates expressions with strict operator precedence (PEMDAS/BODMAS: multiplication and division precede addition and subtraction, e.g. `2 + 3 * 4 = 14`).
  - Safe parsing engine without using dangerous `eval()`.
- **Continuous & Chained Calculations**:
  - Seamlessly chain operations (e.g. `5 + 5 = 10`, then `+ 2 = 12`).
  - Change operators on the fly before typing the next number.
- **Floating-Point Accuracy**:
  - Normalizes IEEE 754 precision issues (e.g. `0.1 + 0.2 = 0.3`).
  - Supports decimal inputs with multiple-decimal prevention.
- **Percentage Calculation (`%`)**:
  - Supports unary percentages (`50% = 0.5`) and additive/subtractive percentages (`100 + 20% = 120`).
- **Sign Toggle (`±`)**:
  - Easily invert the sign of the active operand.
- **Error Handling**:
  - Graceful division-by-zero detection (`Cannot divide by zero`) without application crashes.
- **Calculation History Log**:
  - Slide-over drawer recording past equations with results.
  - One-click recall to reload past values into the calculator display.
  - Clear history action.
- **Full Physical Keyboard Support**:
  - Type numbers with `0-9`.
  - Perform operations with `+`, `-`, `*` or `x`, `/`.
  - Calculate with `Enter` or `=`.
  - Delete with `Backspace`.
  - Clear/reset with `Escape` or `C`.
  - Visual button feedback when keys are pressed.
- **Responsive & Tactile UI**:
  - Autosizing typography that prevents text clipping on large numbers.
  - Copy-to-clipboard button with visual feedback.
  - Dark/Light mode theme toggle.
  - Works smoothly across mobile, tablet, and desktop devices.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Bundler & Dev Server**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

---

## 🚀 How to Run

### Standalone (from this directory)

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server (runs on http://localhost:3001)
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build
npm run preview
```

### From the Monorepo Root

```bash
# Start calculator directly from repository root
npm --prefix projects/01-calculator run dev
```

---

## ⌨️ Keyboard Shortcuts Reference

| Key | Action |
| :--- | :--- |
| `0` – `9` | Input digits |
| `.` or `,` | Input decimal point |
| `+`, `-`, `*`, `/` | Arithmetic operators |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last character |
| `Escape` or `C` | Clear all (reset) |
| `%` | Percentage |

---

## 📂 Architecture

```
01-calculator/
├── package.json               # Standalone dependencies & scripts
├── vite.config.ts             # Vite server config (port 3001)
├── tailwind.config.js         # Theme & tactile button animations
├── tsconfig.json              # TypeScript strict configuration
├── index.html                 # App entry HTML
├── src/
│   ├── types.ts               # State, Token, and History interfaces
│   ├── utils/
│   │   ├── evaluator.ts       # Shunting-yard precedence parser & float normalizer
│   │   └── formatter.ts       # Localized number grouping & dynamic font scaling
│   ├── hooks/
│   │   ├── useCalculator.ts   # Core calculator state machine
│   │   └── useKeyboard.ts     # Global keyboard event listener
│   ├── components/
│   │   ├── Header.tsx         # Title, theme toggle, and drawer triggers
│   │   ├── Display.tsx        # Screen with formula tape, autosizing & copy
│   │   ├── Keypad.tsx         # Tactile button grid with keyboard highlights
│   │   ├── HistoryDrawer.tsx  # History record panel with recall capability
│   │   ├── KeyboardModal.tsx  # Shortcuts cheat sheet
│   │   └── Calculator.tsx     # Main container component
│   ├── App.tsx                # App wrapper with navigation link
│   ├── main.tsx               # React DOM render root
│   └── index.css              # Tailwind styles
└── README.md                  # Project documentation
```
