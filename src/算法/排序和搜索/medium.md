---
title: 中等难度
icon: contrast
date: 2023-03-09
order: 2
category:
  - 算法
tag:
  - 数组
---

## [字母异位词分组](https://leetcode.cn/problems/group-anagrams/)

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。

**示例 1:**

```js
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**示例 2:**

```js
输入: strs = [""]
输出: [[""]]
```

**示例 3:**

```js
输入: strs = ["a"]
输出: [["a"]]
```


:::tip 提示

* 1 <= strs.length <= 104
* 0 <= strs[i].length <= 100
* strs[i] 仅包含小写字母

:::

:::info 解题思路

* 用一个 hash 表来记录同类型的字符串
* 将不同字符串进行排序，如果排序结果相同，则为同类型

:::

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();
  strs.forEach((item) => {
    let temp = item.split("");
    temp.sort();
    let s = temp.join("");
    if (map.has(s)) {
      map.set(s, [...map.get(s), item]);
    } else {
      map.set(s, [item]);
    }
  });
  return Array.from(map.values());
};
```

