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


**题目**

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

示例 1：

输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
示例 2：

输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]

**解题**

双指针思想

1. 定义头尾指针
2. 找出迭代停止条件：数组中间的数
3. 交换头尾指针，交换后头指针后移，尾部指针前移

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

# 
