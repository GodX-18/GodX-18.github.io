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

## [找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)

给你两个字符串 `haystack` 和 `needle` ，请你在 `haystack` 字符串中找出 `needle` 字符串的第一个匹配项的下标（下标从 0 开始）。如果 `needle` 不是 `haystack` 的一部分，则返回 `-1` 。

 

**示例 1：**

```
输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
```

**示例 2：**

```
输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
```

 

**提示：**

- `1 <= haystack.length, needle.length <= 104`
- `haystack` 和 `needle` 仅由小写英文字符组成

### 暴力破解

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    for (let i = 0; i < haystack.length; i++) {
        let flag = true
        for (j = 0; j < needle.length; j++) {
            if (haystack[i + j] !== needle[j]) {
                flag = false
                break;
            }
        }
        if (flag) return i
    }
    return -1
};
```

### KMP

```js
var strStr = function(haystack, needle) {
    // 获取输入字符串的长度
    const n = haystack.length, m = needle.length;

    // 如果要查找的字符串为空，则返回 0
    if (m === 0) {
        return 0;
    }

    // 创建一个长度为 m 的数组 pi，用于存储部分匹配表（partial match table）
    const pi = new Array(m).fill(0);

    // 构建部分匹配表
    for (let i = 1, j = 0; i < m; i++) {
        // 当 j 大于 0 且当前字符不匹配时，回溯 j 的值
        while (j > 0 && needle[i] !== needle[j]) {
            j = pi[j - 1];
        }

        // 如果当前字符匹配，增加部分匹配值 j
        j++;

        // 将部分匹配值保存到部分匹配表中
        pi[i] = j;

        // 注意：以上过程构建了 needle 字符串的部分匹配表
    }

    // 在 haystack 字符串中查找 needle 字符串
    for (let i = 0, j = 0; i < n; i++) {
        // 当 j 大于 0 且当前字符不匹配时，回溯 j 的值
        while (j > 0 && haystack[i] !== needle[j]) {
            j = pi[j - 1];
        }

        // 如果当前字符匹配，增加 j
        j++;

        // 如果 j 的值等于 needle 字符串的长度 m，说明找到了匹配，返回匹配的起始位置
        if (j === m) {
            return i - m + 1;
        }
    }

    // 没有找到匹配，返回 -1
    return -1;
};

```

