# SafePassage - Yellow Team

> COMP_SCI 394 - Winter 2025 - Northwestern University

[![GitHub License][license-badge]][license-link]
[![Node.js][node-badge]][node-link]
[![pnpm Version][pnpm-badge]][pnpm-link]|
[![React][react-badge]][react-link]
[![Vite][vite-badge]][vite-link]
[![Vitest][vitest-badge]][vitest-link]
[![Firebase][firebase-badge]][firebase-link]
[![Eslint][eslint-badge]][eslint-link]

## Table of Contents

- [SafePassage - Yellow Team](#safepassage---yellow-team)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [File Structure and Logic](#file-structure-and-logic)
  - [Getting Started](#getting-started)
    - [Preparation](#preparation)
      - [0. Clone this Repo and open in VS Code](#0-clone-this-repo-and-open-in-vs-code)
      - [1. Node.js Environment Setup](#1-nodejs-environment-setup)
      - [2. Firebase Configuration](#2-firebase-configuration)
      - [3. `.env` Configuration](#3-env-configuration)
    - [Installation](#installation)
      - [1. Dependencies Installation (with pnpm)](#1-dependencies-installation-with-pnpm)
      - [2. Firebase connection](#2-firebase-connection)
      - [3. Backend](#3-backend)
    - [Development](#development)
    - [Production (Preview)](#production-preview)
    - [Deploy to Firebase Hosting](#deploy-to-firebase-hosting)
    - [Linting](#linting)
  - [Dev Team Members](#dev-team-members)
  - [License](#license)

## Project Description

SafePassage is a React based web application that allows users with medical conditions who want to traveling abroad to generate a QR code that contains their medical information. This QR code can be scanned by medical professionals in the destination country to access the user's medical information in translated language. The application also auto-send SMS messages to the user's emergency contacts when the emergency medical QR code is scanned.

See [Issues](https://github.com/394-w25/SafePassage/issues) and [Pull Requests](https://github.com/394-w25/SafePassage/pulls) for more development progress and details.

## File Structure and Logic

This project uses a component-based structure with a focus on clear separation of concerns. Key files and folders:

```plaintext
.
├── LICENSE
├── README.md                  # Project documentation and usage guide
├── vite.config.ts             # Vite configuration file
├── tsconfig.json              # Typescript config file
├── firebase.json              # Firebase configuration for hosting
├── eslint.config.mjs          # Eslint configuration
├── package.json               # Dependencies
├── pnpm-lock.yaml             # pnpm lock file
└── src                        # Source code
│   ├── App.tsx                # Main application component
│   ├── index.tsx              # Entry point of the application
│   ├── routes.tsx             # Application routes
│   ├── global.css             # Global styles
│   ├── components             # Shared components and features
│   │   ├── common             # Common components used across the app
│   │   ├── Home               # Home page components
│   │   ├── Me                 # Me page components
│   │   └── ...                # Other pages' components
│   ├── stores                 # Zustand related global state management
│   ├── hooks                  # Custom hooks for specialized logic
│   ├── pages                  # Application pages
│   ├── utils                  # Utility functions and Firebase configurations
│   │   ├── firebase           # Firebase configurations
│   │   └── ...
│   ├── contexts               # React context providers
│   └── types                  # Global types define here (such as schemas).
└── backend                    # Backend for sending emergency SMS (See backend README)
    └── README.md              # Backend documentation
```

The main components and utilities are organized under `src/components` and `src/utils`.

## Getting Started

### Preparation

#### 0. Clone this Repo and open in VS Code

```bash
git clone https://github.com/394-w25/SafePassage.git
```

We highly recommend using [Visual Studio Code](https://code.visualstudio.com/) as the IDE for this project.

> We have awesome extensions and configurations set up for this project in VSCode.
>
> Auto-formatting, linting, and lots other helpful features are already set up.

Once you open this project (SafePassage) inside VSCode, it will prompt you with a message saying that some recommended extensions are required for this project. Install them.

#### 1. Node.js Environment Setup

Make sure you have Node.js (>= 20.0.0) installed on your machine. Recommend using LTS version.

Check whether you have `pnpm` installed by running:

```bash
pnpm --version
```

If you don't have `pnpm` installed, you can install it by running:

```bash
npm install --global corepack@latest
corepack enable pnpm
```

If any error occurs, please refer to the [official installation documentation](https://pnpm.io/installation).

#### 2. Firebase Configuration

To run the application, you need to set up a Firebase project and configure it with the application. You can follow the steps below:

1. Create a new Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Add a new **web app** to the project (since we are using React).
3. Copy the Firebase configuration values from the Firebase SDK snippet.
4. Open `src/utils/firebase/firebaseConfig.ts` and replace line `10` to `17` with the copied values.

   ```typescript
   const firebaseConfig = {
     apiKey: "",
     authDomain: "",
     projectId: "",
     storageBucket: "",
     messagingSenderId: "",
     appId: "",
   };
   ```

5. Enable the **Firestore**, **Authentication**, and **Hosting** services in the Firebase console.
6. Manually add a value to the Firestore database for Bearer Auth Token to the backend.

   ```plaintext
   Collection: `tokens`
   Document: `message`
   Field: `token`
   Value: `YOUR_AUTH_TOKEN(SAME_AS_BACKEND_AUTH_TOKEN)`
   ```

#### 3. `.env` Configuration

We have a `.env` file in the root directory. This file is used to store the only 2 environment variables that are used in the application.

> ⚠️ **Warning**
>
> **This is not a secure env file since its for frontend only.**
>
> **Do not include trailing slashes in the URLs.**

1. `VITE_BASE_URL`: The base URL of the frontend application (used for QR code generation).
2. `VITE_API_URL`: The base URL of the backend API (used for sending SMS messages).

### Installation

#### 1. Dependencies Installation (with pnpm)

Run the following command to install all dependencies (in the root directory):

```bash
pnpm install
```

#### 2. Firebase connection

Run the following command to connect the Firebase project with the application:

```bash
pnpm firebase login
```

Then use the following command to deploy the Firestore database rules:

```bash
pnpm firebase deploy --only firestore
```

#### 3. Backend

Go to [backend README](backend/README.md) to set up the backend. The backend is required for the sending emergency SMS feature (not required for development).

### Development

To start the development server, run:

```bash
pnpm dev
```

And open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production (Preview)

To build the production version, run:

```bash
pnpm build
```

And to start the production server, run:

```bash
pnpm start
```

### Deploy to Firebase Hosting

Only do this after the production build.

To deploy the application to Firebase Hosting, run:

> ⚠️ Make sure you have already connected the Firebase project with the application.
>
> ⚠️ Make sure you have already built the production version.

```bash
pnpm run deploy
```

### Linting

> **Note**: This step is only for developing purpose.

Auto linting on save and commit is already set up. You can also run the following command to lint the code:

```bash
pnpm run lint:fix
```

## Dev Team Members

Thanks goes to all our dev team members who contributed to this project. 🎉

Any issue? Contact @ZL-Asica.

![Contributors](https://contrib.rocks/image?repo=394-w25/SafePassage)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<!-- Badges / Links -->

[eslint-badge]: https://img.shields.io/badge/eslint-4B32C3?logo=eslint&logoColor=white
[eslint-link]: https://www.npmjs.com/package/eslint-config-zl-asica
[firebase-badge]: https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black
[firebase-link]: https://firebase.google.com/
[license-badge]: https://img.shields.io/github/license/394-w25/SafePassage
[license-link]: https://github.com/394-w25/SafePassage/blob/main/LICENSE
[node-badge]: https://img.shields.io/badge/node%3E=20.00-339933?logo=node.js&logoColor=white
[node-link]: https://nodejs.org/
[pnpm-badge]: https://img.shields.io/github/package-json/packageManager/394-w25/SafePassage?label=&logo=pnpm&logoColor=fff&color=F69220
[pnpm-link]: https://pnpm.io/
[react-badge]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB
[react-link]: https://react.dev/
[vite-badge]: https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff
[vite-link]: https://vitejs.dev/
[vitest-badge]: https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff
[vitest-link]: https://vitejs.dev/guide/
