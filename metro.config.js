const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.extraNodeModules = {
  "@": path.resolve(__dirname, "src"),
  "@/components": path.resolve(__dirname, "src/components"),
  "@/screens": path.resolve(__dirname, "src/screens"),
  "@/utils": path.resolve(__dirname, "src/utils"),
  "@/hooks": path.resolve(__dirname, "src/hooks"),
  "@/constants": path.resolve(__dirname, "src/constants"),
  "@/forms": path.resolve(__dirname, "src/forms"),
  "@/store": path.resolve(__dirname, "src/store"),
  "@/navigation": path.resolve(__dirname, "src/navigation"),
  "@/@types": path.resolve(__dirname, "src/@types"),
}

module.exports = config
