---
title: 案例
date: 2024-02-10
order: 8
category:
  - 算法
tag:
  - 区间
---

## [有效的括号(简)](https://leetcode.cn/problems/valid-parentheses/)

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。

**示例 1：**

```js
输入：s = "()"
输出：true
```

**示例 2：**

```js
输入：s = "()[]{}"
输出：true
```

**示例 3：**

```js
输入：s = "(]"
输出：false
```


:::tip 提示

* 1 <= s.length <= 104
* s 仅由括号 '()[]{}' 组成

:::

:::info 解题思路

* 有效括号字符串的长度，一定是偶数！
* 右括号前面，必须是相对应的左括号，才能抵消！
* 右括号前面，不是对应的左括号，那么该字符串，一定不是有效的括号！

:::

```js
var isValid = function (s) {
    // 如果字符串长度为奇数，直接返回false
    if(s.length % 2) return false;
    // 创建一个栈
    const stack = []
    // 创建一个映射表，用来存储括号的对应关系
    const map = {
        "(": ")",
        "{": "}",
        "[": "]"
    };
    // 遍历输入字符串中的每个字符
    for (const x of s) {
        // 如果字符是左括号，则将其推入栈中
        if (x in map) {
            stack.push(x);
            continue;
        };
        // 如果字符是右括号，则与栈顶元素进行匹配
        // 如果匹配失败，说明不是有效的括号序列，直接返回false
        if (map[stack.pop()] !== x) return false;
    }
    // 最后栈为空，则说明是有效的括号序列，返回true，否则返回false
    return !stack.length;
};
```