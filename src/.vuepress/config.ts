import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

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
  theme,
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page: any) => page.frontmatter.category,
          formatter: "分类：$content"
        },
        {
          getter: (page: any) => page.frontmatter.tag,
          formatter: "标签：$content"
        }
      ]
    })
  ],
  // Enable it with pwa
  shouldPrefetch: false
});
