# Futevo

A footvolley (futevôlei) match tracker built as a hybrid project: one TypeScript codebase that ships as a native iOS/iPad app and as a web app (Expo + React Native Web). Both share the same Firebase backend, so data stays in live sync across mobile and web. Record matches point by point — who scored, where the point landed on the court, and which attack decided it — then review stats and history.

## Features

- **Roster**: manage the players on your account (name + color).
- **Live matches**: two teams of two, configurable `targetScore` and `winBy` margin (default 2). No sets — first to the target with the required margin wins.
- **Point entry**: log each point with its 3x3 court zone (1–9, row-major) and attack type (Pingo, Loby, Shark), or mark it as ball out.
- **Undo**: scores are always recomputed from the point list (`src/utils/matchScoring.ts`), so dropping the last point can never drift.
- **Tournaments**: group matches under a tournament and round.
- **Sync**: Firebase Auth (Google Sign-In) + Firestore, with live sync between iOS and web.

## Stack

- React Native + Expo (managed workflow), TypeScript (strict)
- React Navigation
- Zustand + MMKV (localStorage on web)
- react-native-unistyles
- Firebase via `@react-native-firebase` (native) and the `firebase` JS SDK (web)

## Getting started

### Prerequisites

- Node.js and npm
- Xcode (for iOS)
- A Firebase project

### Firebase setup

1. Create a Firebase project and add an iOS app with bundle id `com.furlany.futevo`.
2. Download `GoogleService-Info.plist` into the project root (git-ignored).
3. Enable Google Sign-In in Firebase Auth.
4. Copy `.env.example` to `.env` and fill in `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`.
5. For web: add a Web app in the Firebase console, fill the `EXPO_PUBLIC_FIREBASE_*` vars in `.env`, and add your dev/hosting domains under Auth → Settings → Authorized domains.

> `npx expo prebuild -p ios` fails at the `@react-native-firebase/app` plugin step until `GoogleService-Info.plist` is in place — that's expected.

### Run

```bash
npm install
npm run ios      # build and run on iOS simulator/device
npm run web      # start the web build
```

## Scripts

| Script              | Description                    |
| ------------------- | ------------------------------ |
| `npm start`         | Start the Expo dev server      |
| `npm run ios`       | Build and run the iOS app      |
| `npm run web`       | Run the web app                |
| `npm run build:web` | Export the web build to `dist` |
| `npm test`          | Run Jest in watch mode         |
| `npm run lint`      | Lint with Expo ESLint config   |
| `npm run format`    | Format `src/` with Prettier    |

## Project layout

```
src/
  @types/       shared TypeScript types (futevo.ts)
  assets/       fonts, images
  components/   shared UI components
  constants/    Collections, AttackTypes, App
  forms/        form components
  hooks/        custom React hooks
  lib/          icons and third-party re-exports
  navigation/   navigators and typed param lists
  screens/      one folder per screen
  store/        Zustand stores
  styles/       unistyles theme and config
  utils/        pure utility functions
  App.tsx       root component
```

Path alias: `@/*` → `./src/*`. See [CLAUDE.md](CLAUDE.md) for coding conventions (component structure, styling, hooks, web platform splits).

## Web notes

Platform splits use Metro `*.web.ts` extensions (Firebase, Firestore, storage, `confirmAction`). Always import Firestore functions from `@/lib/firestore`, never directly from the Firebase packages. Native and web point at the same Firebase project, so a signed-in user sees the same data on both.
