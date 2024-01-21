# POC project WorkFloW  

## Setup
>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1:  Install package
```bash
# using npm
npm install

# OR using Yarn
yarn start
```

## Step 2:  Start the Metro Server
  
First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.
To start Metro, run the following command from the _root_ of your React Native project:
```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Run app for specific environment dev, staging, production. In project root folder:

### For Android


```bash

# using npm
npm run android:dev
npm run android:staging
npm run android:prod

# OR using Yarn
yarn android:dev
yarn android:staging
yarn android:prod
```

### For iOS
```bash
# using npm
npm run ios:dev
npm run ios:staging
npm run ios:prod

# OR using Yarn
yarn ios:dev
yarn ios:staging
yarn ios:prod
```
Check more command on `packages.json` for your information
  
If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

  ## App Architecture
  root
  --ios: code native for ios platform
  --android: code native for android platfrom
  --source: main folder of react-native
  ----screens: Define screen UI which users see on phone screen
  ----components: contains small piece of UI
  ------core: core component if we have design system (like text, button, input,..)
  ------business components: component to support app business
  ----redux: keep global state management and storage
  ----hooks: contains main business logic for specific function/feature
  ----themes: define font,size, colors,... whichs relate to ui
  ----utils: ultilitiy function

##Dependencies libs: 
```bash
@react-navigation/native : handle screens navigation
@reduxjs/toolkit, redux, redux-persist: for global management state
react-native-picker-select: For picker UI
d3, react-native-svg: to calculate and render workflow graphical, it totally use native performance to compare with other libraries like highchart, reactflow, or otherchart,... ( webview )
react-native-actionsheet: for showing ui as action sheet
react-native-mmkv: for storage data with high performance (compare with async-storage) 
react-native-splash-screen: for splash screen
react-native-config: create multiple app for multiple environment. 
```

## CI/CD
- Host using github action for free (because of public repo). 
- CI: include code quality checks: lint, typescript check and jest testing. 
- CD: Not implement yet, but can use appcenter + fastlane to do it.

## Consider future app growth and its use as an intranet app not exposed to seach engine:

For internal public we can use enterprise account to do this. Test flight + alpha testing of google console supported public to specific user only. 

For the app growth, we can have some feature/improvement to improve current POC:
- Authenticaton, permission 
- User action on workflow
- Help user to manage workflow easier
- Improve workflow UI , Dealing with large workflow ( scrollable, zoomable, ability to set size of node in workflow,...)
- Template work flow
- Tracking progress of workflow in fact
- Export workflow to image/pdf to share to other people,
...

