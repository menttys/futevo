# Futevo — Claude Code Rules

## Stack

- React Native + Expo (managed workflow)
- TypeScript (strict mode)
- React Navigation (no expo-router)
- Zustand + MMKV for state/persistence
- react-native-unistyles for styling
- Firebase (auth + firestore via `@react-native-firebase`)
- Path alias: `@/*` → `./src/*`
- iOS/iPad native app plus an Expo web build (`npm run web`, `npm run build:web`) — no Android config yet

## Project layout

```
src/
  @types/         — shared TypeScript types (futevo.ts)
  assets/         — fonts, images
  components/     — shared UI components
  constants/      — Collections, AttackTypes, App
  forms/          — form components
  hooks/          — custom React hooks
  lib/            — icons and third-party re-exports
  navigation/     — navigators and typed param lists
  screens/        — one folder per screen
  store/          — Zustand stores
  styles/         — unistyles theme and config
  utils/          — pure utility functions
  App.tsx         — root component
```

## Domain model

- **Player**: a roster entry (`name`, `color`), scoped to the signed-in user.
- **Match**: two teams of two players, a `targetScore`, `winBy` margin (default 2),
  and an ordered `points` array. No sets — first to `targetScore` with the required
  margin wins.
- **MatchPoint**: which team scored, the 3x3 `CourtZone` (1-9, row-major) where the
  point was decided, the `AttackTypeId` used (Pingo/Loby/Shark, extend via
  `ATTACK_TYPES` in `src/@types/futevo.ts`), and the running score after the point.
- Scores are always **recomputed from the point list**, never incremented in place —
  see `src/utils/matchScoring.ts`. This is what makes undo correct: dropping the
  last point and recomputing can never drift.

## File and component rules

### Naming

- Components and screens: `PascalCase` (e.g., `ScoreBoard.tsx`, `MatchesScreen.tsx`)
- Hooks: `camelCase` prefixed with `use` (e.g., `useMatches.ts`)
- Stores: `camelCase` suffixed with `State` (e.g., `matchState.ts`)
- Utilities and helpers: `camelCase` (e.g., `matchScoring.ts`)

### Where new files go

| What                | Where              |
| ------------------- | ------------------ |
| Screen component    | `src/screens/`     |
| Shared UI component | `src/components/`  |
| Custom hook         | `src/hooks/`       |
| Zustand store       | `src/store/`       |
| Form component      | `src/forms/`       |
| Utility function    | `src/utils/`       |
| TypeScript types    | `src/@types/futevo.ts` |

After adding a new screen, register it in the appropriate stack under `src/navigation/`.

### Component and screen structure

Every component and screen must live in a named folder with a barrel export — no loose `.tsx` files:

```
src/components/MyComponent/
  MyComponent.tsx          ← implementation
  MyComponent.styles.ts    ← all styles (see Styling)
  MyComponent.d.ts         ← prop types (see Props) — only when the component takes props
  index.ts                 ← export { MyComponent } from "./MyComponent"
```

### Props

- Every component's prop type must be named after the component: `MyComponentProps`.
- Prop types live in a co-located `MyComponent.d.ts` file — never inline in the function signature, never inside the `.tsx` file.
- Import the type in the component with `import type { MyComponentProps } from "./MyComponent.d"`.
- A screen with no custom props (only navigation/route params, read via `useNavigation`/`useRoute`) doesn't need a `.d.ts` file.

### Exports

- Always use **named exports**, never default exports (the sole exception is `App.tsx`, which Expo requires as a default export).
- Folder components re-export from `index.ts`.

### Styling

- All styles live in a co-located `ComponentName.styles.ts` file — never inline, never inside the component file.
- Use `StyleSheet.create` from `react-native-unistyles`, always with the theme callback:

  ```ts
  // MyComponent.styles.ts
  import { StyleSheet } from "react-native-unistyles"

  export const styles = StyleSheet.create((theme) => ({
    container: {
      backgroundColor: theme.colors.background,
    },
  }))
  ```

- Never use `StyleSheet` from `react-native` directly.
- Never use the React Native `style` prop with an object literal (inline style).
- Access theme values inside components with `useUnistyles()`.

### Imports

- Use the `@/` alias for all internal imports (never relative `../../`).
- Group imports in this order:
  1. React and `react-native`
  2. Third-party libraries, alphabetized
  3. `@/` alias imports
  4. Relative imports (`./`, `../`)

### Hooks

- One hook per file.
- Keep hooks free of UI — return data and handlers only.
- Writes (`usePlayers`, `useMatches`) patch the Zustand store first, then fire the
  Firestore write with `.catch(console.error)` — never `await` a write before
  updating local state. The `useFirebase()` listener reconciles once it lands.

### Zustand stores

- One store per domain file under `src/store/`.
- Persist with MMKV via `zustandStorage` (exported from `src/store/userState.ts`)
  when the state must survive app restarts.
- Export the store hook (e.g., `useMatchStore`) and any actions from the same file.

### Navigation

- Typed param lists live in `src/navigation/types/navigation.d.ts`.
- When adding a new screen to a stack, add its params to the relevant `ParamList` type there.
- Use `StackNavigationProp` and `RouteProp` for screen prop types.

### TypeScript

- Strict mode is on — no `any`, no type assertions unless unavoidable.
- Shared domain types go in `src/@types/futevo.ts`.

## Web build

- Platform splits use Metro extensions (`*.web.ts`): `src/lib/firebase(.web).ts` (auth + Firestore
  instance), `src/lib/firestore(.web).ts` (modular Firestore re-exports — always import Firestore
  functions from `@/lib/firestore`, never from `@react-native-firebase/*` or `firebase/*` directly),
  `src/store/zustandStorage(.web).ts` (MMKV vs localStorage), `src/utils/confirmAction(.web).ts`
  (`Alert.alert` is a no-op on web — use `confirmAction`).
- Native uses `@react-native-firebase`; web uses the `firebase` JS SDK with `EXPO_PUBLIC_FIREBASE_*`
  vars. Both point at the same Firebase project, so a signed-in uid sees the same data and
  Firestore `onSnapshot` keeps iOS and web in live sync (no webhook needed).

## Setup this repo still needs

Firebase is wired the same way as the rest of the app, but the actual Firebase
project is account-specific and can't be scaffolded from code:

1. Create a Firebase project, add an iOS app with bundle id `com.furlany.futevo`.
2. Download `GoogleService-Info.plist` into the project root (git-ignored).
3. Enable Google Sign-In in Firebase Auth, and set `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
   in a local `.env` (copy `.env.example`).
4. `npx expo prebuild -p ios` will fail at the `@react-native-firebase/app` plugin
   step until step 2 is done — that's expected, not a bug.
5. For web: add a Web app in the Firebase console, fill the `EXPO_PUBLIC_FIREBASE_*` vars in `.env`,
   and add your dev/hosting domains under Auth → Settings → Authorized domains.
