import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // { text: "演示", icon: "discover", link: "/demo/" },
  { text: "大前端", icon: "qianduan", link: "/大前端/Nodejs全栈开发/01-Node基础" },
  { text: "算法", icon: "suanfaku", link: "/算法/数组/案例" },
  { text: "阅读", icon: "yuedu", link: "/阅读/" },
  { text: "面试", icon: "interview", link: "/面试/HTML" },
  { text: "语言", icon: "duoyuyan", prefix: "/语言/", children: ["TypeScript/"] },
  { text: "项目管理", icon: "xiangmuguanli", link: "/项目管理/index.html" },
  { text: "其它", icon: "qita", prefix: "/其它/", children: ["设计模式/", "试验场/"] }
  // {
  //   text: "V2 文档",
  //   icon: "note",
  //   link: "https://theme-hope.vuejs.press/zh/"
  // }
]);
