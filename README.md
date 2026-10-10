# NexaAI — React.js Project

A standalone React + Vite version of the NexaAI workspace, using JavaScript/JSX, CSS, Tailwind utilities, Radix UI, and Lucide icons. No Next.js, Cloudflare account, or API key is required.

## Run in VS Code

1. Install Node.js 22.13 or newer.
2. Extract this ZIP.
3. Open the NexaAI-React folder in VS Code (the folder containing package.json).
4. Open Terminal → New Terminal and run:

```bash
npm install
npm run dev
```

Open the Local URL printed in the terminal. Keep the terminal running. Do not open index.html directly.

## Production build

```bash
npm run build
npm run preview
```

The build produces dist/. It can be hosted on a static web host. Navigation uses URL hashes.

## Included screens

- Dashboard, landing page, and mobile navigation
- Chat with curated offline learning responses
- Code editor with local pattern checks
- Study lessons in three subjects
- Five-question JavaScript quiz with score and answer review
- TXT/Markdown upload, preview, and passage search
- Editable writing templates with copy and download
- Activity history, profile settings, and light/dark theme
- Demonstration signup/login/password-reset screens

## Demo limitations

This is a frontend demo, not a live AI or authentication service. Chat uses prepared responses, writing uses templates, and code checks recognize a few patterns only. No email is sent and passwords are not saved. PDF/DOCX extraction is not implemented. Uploaded text files remain in memory until a reload or tab close. Profile, theme, messages, and history use browser localStorage.

## Files

- src/App.jsx: application views and interactions
- src/styles.css: theme and responsive layouts
- src/components/ui/: reusable interface components
- src/hooks/: mobile detection
- src/lib/: styling utilities
- src/main.jsx: React entry point

The source contains no account credentials or hosting identifiers.
