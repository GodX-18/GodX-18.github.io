import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // "/",
  // { text: "演示", icon: "discover", link: "/demo/" },
  { text: "大前端", icon: "workingDirectory", link: "/大前端/基础/gulp" },
  { text: "算法", icon: "function", link: "/算法/动态规划/easy" },
  { text: "阅读", icon: "leaf", prefix: "/阅读/", children: ["Vuejs设计与实现"] },
  { text: "面试", icon: "mark", link: "/面试/HTML" }
  // {
  //   text: "V2 文档",
  //   icon: "note",
  //   link: "https://theme-hope.vuejs.press/zh/"
  // }
]);
