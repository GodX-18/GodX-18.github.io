import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    // "",
    {
      text: "如何使用",
      icon: "creative",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    // {
    //   text: "文章",
    //   icon: "note",
    //   prefix: "posts/",
    //   children: "structure"
    // },
    // "intro",
    {
      text: "大前端",
      icon: "note",
      prefix: "大前端/",
      children: "structure"
    },
    {
      text: "Vuejs设计与实现",
      icon: "note",
      prefix: "Vuejs设计与实现/",
      children: "structure"
    },
    {
      text: "算法",
      icon: "note",
      prefix: "算法/",
      children: "structure"
    },
  ]
});
