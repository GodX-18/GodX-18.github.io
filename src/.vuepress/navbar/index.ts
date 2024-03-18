import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // "/",
  // { text: "演示", icon: "discover", link: "/demo/" },
  { text: "大前端", icon: "workingDirectory", link: "/大前端/Nodejs全栈开发/01-Node基础" },
  { text: "算法", icon: "function", link: "/算法/数组/案例" },
  { text: "阅读", icon: "leaf", prefix: "/阅读/", children: ["如何阅读一本书", "Vuejs设计与实现", "学习之道"] },
  { text: "面试", icon: "mark", link: "/面试/HTML" },
  { text: "语言", icon: "language", prefix: "/语言/", children: ["JavaScript", "TypeScript", "NodeJS", "Java", "Python", "C", "C++"] },
  { text: "项目管理", icon: "tree", link: "/项目管理/index.html" },
  { text: "其它", icon: "branch", prefix: "/其它/", children: ["设计模式", "试验场"] }
  // {
  //   text: "V2 文档",
  //   icon: "note",
  //   link: "https://theme-hope.vuejs.press/zh/"
  // }
]);
