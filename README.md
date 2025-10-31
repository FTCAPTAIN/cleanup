Cleanzup Full Package
=====================

This package contains a minimal, ready-to-run Cleanzup project (Customer app, Cleaner app, Server for Razorpay).
Customize config files, add Firebase keys, and deploy to Vercel/Heroku + Vercel for frontend.

PROJECT SETTINGS (user choice):
- Project name: cleanzup
- Default city: Nellore (lat: 14.4426, lng: 79.9865)
- Default cleanup price: INR 500
- Theme: auto-switch (system preference), setting available in app
- Navigation: opens Google Maps app if available (fallback to web)

How to run locally:
1. Install dependencies: npm install
2. Start dev server: npm run dev
3. Start server (server folder): cd server && npm install && npm start
4. Update shared/firebase.ts with your Firebase config values
5. For Razorpay, update server/.env with keys and set webhook secret

Contents summary:
- /customer : React app for customers
- /cleaner  : React app for cleaners
- /server   : Node/Express server for Razorpay order creation and webhook verification
- /shared   : Firebase config template + settings
- README with deploy steps
