module.exports = function (api) {
  api.cache(true)
  return {
    // zustand's ESM build uses import.meta, which breaks the (non-module) web bundle.
    presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
    plugins: [
      ["react-native-unistyles/plugin", { root: "src" }],
      "react-native-reanimated/plugin",
    ],
  }
}
