## Sip Timer

A tiny, friendly timer for mindful breaks. Watch a drink or meal visual slowly reduce while you rest. Built with React, Vite, Tailwind, and shadcn UI.

### Features

- Tea, Coffee, Water visuals (with realistic waves for water)
- Meal plate and Red Bull can sections
- Quick presets and URL start (example: `/tea?time=5`)
- Pause/Resume by tapping/clicking the screen
- Completion chime (works in background/minimized)
- Optional push notifications (for alerts when the app is closed)
- Dark mode toggle with system detection

### Quick start

Prerequisites: Node.js 18+ and npm

```bash
npm i
npm run dev
```

Open the printed local URL. Try these routes:

- `/tea`, `/coffee`, `/water`
- `/meal`
- `/redbull`

You can auto-start a timer with minutes in the query string, e.g. `/water?time=10`.

### Scripts

- `npm run dev` – start the dev server
- `npm run build` – production build
- `npm run preview` – preview the production build

### Controls

- Select a preset to start
- Tap/click the background to pause/resume
- Use “Reset timer” to stop and clear

### Dark mode

The site uses CSS variables for light/dark themes. Click the toggle on the home page to switch, or leave it on “System”.

### Background notifications (optional)

Browsers don’t allow web pages to play audio after they’re closed. To get alerts when the app is closed, enable push notifications:

1) Generate VAPID keys (once):

```bash
npx web-push generate-vapid-keys
```

2) Configure env vars in a `.env` file:

```
VITE_VAPID_PUBLIC_KEY=YOUR_PUBLIC_KEY
VITE_PUSH_API_BASE=https://your-scheduler.example.com
```

3) Provide a simple server that schedules a Web Push to your subscription at the target time (endpoints: `POST /schedule`, `POST /cancel`). If you want, open an issue and we can share a minimal Express sample.

Without a server, the in-page completion chime still works in foreground/minimized tabs.

### Assets

Place custom images in `src/assets/` and import them into components. Current assets include `indianMeal.jpg` and `redbull.png`.

### Tech stack

- React + TypeScript with Vite
- Tailwind CSS + shadcn UI
- next-themes for dark mode

---

Made just for fun and personal curiosity.
