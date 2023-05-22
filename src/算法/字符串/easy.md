---
title: 简易难度
icon: leaf
date: 2023-03-09
order: 1
category:
  - 算法
tag:
  - 数组
---

## 1. [反转字符串](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/xnhbqj/)

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

**示例 1：**

```js
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

**示例 2：**

```js
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]\
```

:::info 解题思路

双指针思想

1. 定义头尾指针
2. 找出迭代停止条件：数组中间的数
3. 交换头尾指针，交换后头指针后移，尾部指针前移

:::

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    const mid = Math.floor(s.length / 2);
    let left = 0;
    let right = s.length - 1;
    while(left < mid) {
        [s[left],s[right]] = [s[right],s[left]]
        left ++;
        right --;
    }
};
```

## [2.有效的括号](https://leetcode.cn/problems/valid-parentheses/)

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
let isValid = function(s) {
    let stack = [], length = s.length;
    if(length % 2) return false;
    for(let item of s){
        switch(item){
            case "{":
            case "[":
            case "(":
                stack.push(item);
                break;
            case "}":
                if(stack.pop() !== "{") return false;
                break;
            case "]":
                if(stack.pop() !== "[") return false;
                break;
            case ")":
                if(stack.pop() !== "(") return false;
                break;
        }
    }
    return !stack.length;
};
```

