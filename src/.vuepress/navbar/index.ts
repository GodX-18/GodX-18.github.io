import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // "/",
  // { text: "演示", icon: "discover", link: "/demo/" },
  { text: "大前端", icon: "workingDirectory", link: "/大前端/基础/gulp" },
  { text: "算法", icon: "function", link: "/算法/动态规划/easy" },
  { text: "阅读", icon: "leaf", prefix: "/阅读/", children: ["如何阅读一本书", "Vuejs设计与实现", "学习之道"] },
  { text: "面试", icon: "mark", link: "/面试/HTML" },
  { text: "语言", icon: "language", prefix: "/语言/", children: ["JavaScript", "TypeScript", "NodeJS", "Java", "Python", "C", "C++"] },
  { text: "试验场", icon: "workingDirectory", link: "/试验场/CSS/grid" },
  { text: "其它", icon: "workingDirectory", prefix: "/其它/", children: ["PMP","设计模式"] }
  // {
  //   text: "V2 文档",
  //   icon: "note",
  //   link: "https://theme-hope.vuejs.press/zh/"
  // }
]);
