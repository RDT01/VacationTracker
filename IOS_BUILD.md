# Building the VacationTracker iOS App

The app is set up with **Capacitor** to run as a native iOS app. Follow these steps to build and run on your iPhone or iPad.

## Prerequisites

- **macOS** (required for iOS development)
- **Xcode** — install from the Mac App Store or [developer.apple.com/xcode](https://developer.apple.com/xcode)

## Build & Run

### Option 1: Open in Xcode

```bash
npm run ios:open
```

This syncs the web build and opens the project in Xcode. Then:

1. Select your device or simulator in the toolbar
2. Click the **Run** button (▶) or press **⌘R**

### Option 2: Command line

```bash
npm run cap:sync
npx cap open ios
```

## Create an IPA for distribution

To create an installable app (e.g., for TestFlight or Ad Hoc):

1. Open the project in Xcode: `npm run cap:open:ios` or `npx cap open ios`
2. **Product → Archive**
3. When the archive finishes, use **Distribute App** to export an IPA

## Sync web changes

After updating the React app:

```bash
npm run cap:sync
```

Or for both platforms:

```bash
npm run build
npx cap sync
```
