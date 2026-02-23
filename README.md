# Nike Clone (Expo + React Native)

Nike-inspired mobile shopping app built with Expo Router.  
Project includes product browsing, favorites, cart, and a UI checkout flow.

## Features

- Home feed with dynamic sneaker data from a local proxy API
- Shop tab with category top navigation (`Men`, `Women`, `Kids`)
- Product detail page with add-to-bag flow
- Favorites tab with saved products
- Bag tab with quantity control, order summary, and checkout UI
- Bottom-tab navigation with bag item badge

## Tech Stack

- Expo SDK 54
- React Native + React 19
- Expo Router (file-based routing)
- TypeScript
- Express (`server/sneaks-proxy.js`) for Sneaks API proxy

## Project Structure

```text
app/
  (tabs)/
    index.tsx       # Home
    shop.tsx        # Shop page
    bag.tsx         # Bag + checkout UI
    favorites.tsx   # Favorites
    profile.tsx     # Profile
  detailproduct.tsx # Product details
context/
  cart-context.tsx
  favorites-context.tsx
server/
  sneaks-proxy.js   # Local API proxy
```

## Requirements

- Node.js 18+ (recommended: latest LTS)
- npm
- Expo Go app (Android/iOS) or emulator/simulator

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Create env file

```bash
copy .env.example .env
```

3. Run local sneaker API proxy (terminal 1)

```bash
npm run api
```

4. Run Expo app (terminal 2)

```bash
npm start
```

## Environment Variables

Defined in `.env`:

```env
EXPO_PUBLIC_SNEAKS_API_URL=http://localhost:4000
```

If testing on a physical phone, replace `localhost` with your laptop local IP:

```env
EXPO_PUBLIC_SNEAKS_API_URL=http://192.168.x.x:4000
```

## Available Scripts

- `npm start` - start Expo dev server
- `npm run android` - open Android target
- `npm run ios` - open iOS simulator
- `npm run web` - run web target
- `npm run api` - run local Sneaks proxy API (`server/sneaks-proxy.js`)
- `npm run lint` - run lint checks

## API Endpoints (Local Proxy)

Base URL: `http://localhost:4000`

- `GET /health`
- `GET /api/sneakers?q=Nike%20shoes&limit=12`

## Notes

- This project is for educational/demo purposes.
- Checkout flow is UI-only (no real payment processing).
- Product data is fetched through the local proxy from `sneaks-api`.

## Troubleshooting

- Products not loading:
  - Make sure `npm run api` is running.
  - Verify `EXPO_PUBLIC_SNEAKS_API_URL` points to the correct host.
- Works on emulator but not on phone:
  - Use your laptop IP in `.env` (not `localhost`).
  - Ensure phone and laptop are on the same network.

