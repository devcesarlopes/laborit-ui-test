// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Destructure transformer and resolver from the default config
  const { transformer, resolver } = config;

  // Configure react-native-svg-transformer
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  // Apply NativeWind configuration
  return withNativeWind(config, { input: './global.css' });
})();
