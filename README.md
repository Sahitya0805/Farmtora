# FarmTora

An installable, offline-capable web app that puts a farmer's local weather, crop guidance and market prices in one place, in **English, Kannada and Hindi**.

**Live demo:** https://farmtora-q28o.vercel.app

## Features

- **Location-based weather** – finds the user's place with OpenStreetMap (Nominatim) reverse geocoding or a city search, then loads the forecast from the Open-Meteo API.
- **Crop problem guide** – add an optional photo (checked on-device with TensorFlow.js MobileNet to confirm it shows a plant), then pick the problem that matches what you see to get treatment and prevention steps.
- **Livestock and soil guides** – breed care tips with the usual vaccination schedule, and typical nutrients and suitable crops for each soil type.
- **Official sources** – links to IMD agromet advisories, Agmarknet mandi prices, the Soil Health Card scheme, ICAR and the Kisan Call Centre (1800-180-1551).
- **Market prices dashboard** – searchable, filterable commodity price cards with trend indicators. *Prices are sample data and are labelled as such in the app.*
- **Three languages** – the whole UI switches between English, Kannada and Hindi; the choice is remembered on the device.
- **Works offline (PWA)** – a service worker caches the app shell, and the app can be installed to the home screen.
- **Farm login / registration** – stored locally in the browser.

## Tech stack

JavaScript (no framework) · HTML/CSS · PWA (Web App Manifest + Service Worker) · TensorFlow.js MobileNet · IndexedDB · Chart.js · Open-Meteo API · OpenStreetMap Nominatim · Vercel

## Run locally

It is a static site, so any static server works:

```bash
npx serve .
```

Then open http://localhost:3000. (The service worker needs `localhost` or HTTPS.)

`npm run build` copies the site into `dist/` for deployment.

## Project structure

```
index.html      App shell and service-worker registration
script.js       UI, routing, translations, weather and market logic
styles.css      Styles
sw.js           Service worker (offline cache)
manifest.json   PWA manifest
public/         Logo and images
vercel.json     Vercel static deployment config
```

## Roadmap

- Replace sample market prices with a live source (e.g. the Agmarknet / data.gov.in mandi price API).
- Move accounts from browser storage to a real backend.
