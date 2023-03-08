import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "烜",
      description: "生而无畏，战至终章！"
    }
  },
  theme
  // Enable it with pwa
  // shouldPrefetch: false,
});
