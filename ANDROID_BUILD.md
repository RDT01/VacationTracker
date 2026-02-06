# Building the VacationTracker Android APK

The app is set up with **Capacitor** to run as a native Android app. Follow these steps to build an installable APK for your tablet.

## Prerequisites

### 1. Install Java JDK 17

Android builds require Java. On macOS with Homebrew:

```bash
brew install openjdk@17
```

Or download from [Adoptium](https://adoptium.net/).

Set `JAVA_HOME` (add to `~/.zshrc` or `~/.bash_profile`):

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

### 2. Install Android Studio

Download and install [Android Studio](https://developer.android.com/studio).

During setup, Android Studio will install the Android SDK. Note the SDK location (typically `~/Library/Android/sdk`).

Set `ANDROID_HOME` (add to `~/.zshrc` or `~/.bash_profile`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Build the APK

**Option A: Command line**

```bash
npm run android:build
```

The APK will be at:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Option B: Android Studio (recommended)**

1. Run `npm run cap:open` to open the project in Android Studio
2. In Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. When the build finishes, click **Locate** to find the APK

## Install on your tablet

1. Copy `app-debug.apk` to your tablet (USB, cloud drive, or email)
2. On the tablet: enable **Install from unknown sources** in Settings → Security
3. Open the APK file and tap **Install**

---

**Quick reference:**
- `npm run cap:sync` — Rebuild web app and copy to Android project
- `npm run cap:open` — Open Android project in Android Studio
