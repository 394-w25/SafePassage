# Backend for SafePassage

This backend is built with [Hono](https://hono.dev/) and [Cloudflare Workers](https://workers.cloudflare.com/).

> COMP_SCI 394 - Winter 2025 - Northwestern University

## Table of Contents

- [Backend for SafePassage](#backend-for-safepassage)
  - [Table of Contents](#table-of-contents)
  - [File Structure](#file-structure)
  - [Setup](#setup)

## File Structure

```plaintext
.
├── README.md                  # This documentation for backend
├── tsconfig.json              # Typescript config file
├── wrangler.jsonc             # Cloudflare Workers configuration
├── .dev.vars                  # (Create by youself) Dev Vars
├── package.json               # Dependencies for backend
└── src                        # Source code
    ├── index.ts               # Main and Only Entry Point
    └── backend.d.ts           # Backend Types
```

## Setup

1. Install [pnpm](https://pnpm.io/)

   Enable through Corepack

   ```bash
   npm install --global corepack@latest
   corepack enable pnpm
   ```

2. Install dependencies with pnpm

   ```bash
   pnpm install
   ```

3. Local development

   Before you start, create `.dev.vars` file in the root directory of this `backend` directory with the following content:

   ```plaintext
   TWILIO_ACCOUNT_SID="YOUR_TWILIO_ACCOUNT_SID"
   TWILIO_AUTH_TOKEN="YOUR_TWILIO_AUTH_TOKEN"
   TWILIO_PHONE_NUMBER="YOUR_TWILIO_PHONE_NUMBER"
   AUTH_TOKEN="YOUR_AUTH_TOKEN(FOR_FRONTEND_BEARER_TOKEN)"
   ```

   Then, run the following command:

   ```bash
   pnpm run dev
   ```

   This will start a local server at `http://localhost:8787`.

4. Deploy to Cloudflare Workers

   ```bash
   pnpm run deploy
   ```
