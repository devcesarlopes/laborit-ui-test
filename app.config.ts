import { withPlugins } from '@expo/config-plugins'
import { ConfigContext, ExpoConfig } from 'expo/config'

import { withAndroidExpoSSEPatch } from './plugins'

const baseConfig: ExpoConfig = {
  name: 'PickupApp',
  slug: 'PickupApp',
  version: '1.0.0',
  scheme: 'com.laborit.LaboritUiTest',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  extra: {
    eas: {
      projectId: 'd425f60a-5c0e-4ca9-8558-989669fcd947',
    },
  },
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.laborit.LaboritUiTest',
  },
  android: {
    package: 'com.laborit.LaboritUiTest',
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-font',
      {
        fonts: [
          'node_modules/@expo-google-fonts/roboto-mono/RobotoMono_400Regular.ttf',
          'node_modules/@expo-google-fonts/roboto-mono/RobotoMono_500Medium.ttf',
          'node_modules/@expo-google-fonts/raleway/Raleway_600SemiBold.ttf',
        ],
      },
    ],
    'expo-secure-store',
    [
      'expo-build-properties',
      {
        android: {
          usesCleartextTraffic: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
}

export default function setupConfig({ config }: ConfigContext) {
  const expoConfig = {
    ...config,
    ...baseConfig,
  }

  if (process.env.SSE_NO_FIX === 'true') {
    return expoConfig
  }

  withPlugins(expoConfig, [withAndroidExpoSSEPatch])

  return expoConfig
}