# Backend for SafePassage

This backend is built with [Hono][hono-link] and [Cloudflare Workers][cloudflare-link].

> COMP_SCI 394 - Winter 2025 - Northwestern University

[![Hono][hono-badge]][hono-link]
[![Cloudflare][cloudflare-badge]][cloudflare-link]

## Table of Contents

- [Backend for SafePassage](#backend-for-safepassage)
  - [Table of Contents](#table-of-contents)
  - [File Structure](#file-structure)
  - [Install Dependencies (with pnpm)](#install-dependencies-with-pnpm)
  - [Local development](#local-development)
    - [Deploy to Cloudflare Workers](#deploy-to-cloudflare-workers)
    - [Post-Deployment](#post-deployment)
      - [1. Update the Frontend `.env`](#1-update-the-frontend-env)
      - [2. Update the Cloudflare Workers Environment Variables](#2-update-the-cloudflare-workers-environment-variables)

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

## Install Dependencies (with pnpm)

> ⚠️ If you have no idea what is pnpm, follow the instruction in frontend [README](../README.md) to install pnpm.

```bash
pnpm install
```

## Local development

Before you start, create `.dev.vars` file in the root directory of this `backend` directory with the following content:

> ⚠️ **WARNINGS**
>
> **Do not commit this file to the repository.**
>
> **Do include http(s) or trailing slashes in the URLs.**
>
> **Use the same `AUTH_TOKEN` as the frontend README told you to set in Firestore.**

```plaintext
FRONTEND_URL="your-frontend-url.com"
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

### Deploy to Cloudflare Workers

Make sure you have a Cloudflare account already. If not, create one [here](https://dash.cloudflare.com/sign-up/workers).

Then, run the following command to deploy the backend to Cloudflare Workers (follow the instructions):

```bash
pnpm run deploy
```

### Post-Deployment

#### 1. Update the Frontend `.env`

After the deployment, you will get a URL for the backend. You can use this URL in the frontend `.env` to make requests to the backend.

#### 2. Update the Cloudflare Workers Environment Variables

Make sure copy your whole `.dev.vars` content to the Cloudflare Workers environment variables through the Cloudflare Workers dashboard.

1. Open your project on the Cloudflare Workers dashboard
2. Go to the `Workers` tab, and click on the `Settings` button
3. Then, go to the `Variables and Secrets` tab
4. Click on `+Add` and change the `Type` to `Secret`
5. Then paste the content of `.dev.vars` into the `Variable name` (it will auto detect and split).

<!--Badges & Links-->

[cloudflare-badge]: https://img.shields.io/badge/Cloudflare-F38020?logo=Cloudflare&logoColor=white
[cloudflare-link]: https://workers.cloudflare.com/
[hono-badge]: https://img.shields.io/badge/Hono-E36002?logo=hono&logoColor=fff
[hono-link]: https://hono.dev/
