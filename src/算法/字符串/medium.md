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

## [N 字形变换](https://leetcode.cn/problems/zigzag-conversion/)

将一个给定字符串 `s` 根据给定的行数 `numRows` ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 `"PAYPALISHIRING"` 行数为 `3` 时，排列如下：

```
P   A   H   N
A P L S I I G
Y   I   R
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如：`"PAHNAPLSIIGYIR"`。

请你实现这个将字符串进行指定行数变换的函数：

```
string convert(string s, int numRows);
```

**示例 1：**

```
输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
```

**示例 2：**

```
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
```

**示例 3：**

```
输入：s = "A", numRows = 1
输出："A"
```

**提示：**

- `1 <= s.length <= 1000`
- `s` 由英文字母（小写和大写）、`','` 和 `'.'` 组成
- `1 <= numRows <= 1000`

:::tip 解题思路

这题刚开始看没看懂。。。后面发现要转过来看，相当于写倒 `N`。

字符串 s 是以 z 字形为顺序存储的字符串，目标是按行打印。

设 numRows 行字符串分别为s1，s2，…，sn，则容易发现：按顺序遍历字符串 s 时，每个字符在 N 字形中对应的行索引先从 s1增大至 sn，再从 sn，减小至 s1 .如此反复。
因此解决方案为：模拟这个行索引的变化，在遍历 s 中把每个字符填到正确的行 res[i]。

:::

```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    // 如果 numRows 小于 2，则无需进行变换，直接返回原字符串
    if (numRows < 2) return s;

    // 创建一个长度为 numRows 的数组 res，用于存储变换后的结果
    let res = new Array(numRows).fill("");
    
    // 初始化变量 i 为 0，flag 为 -1，flag 用于控制行号的递增或递减
    let i = 0, flag = -1;

    // 遍历输入字符串 s 中的每个字符
    for (let c of s) {
        // 将当前字符 c 添加到对应行号 i 的字符串中
        res[i] += c;

        // 如果当前行号 i 为首行或末行，改变 flag 的方向（正负号取反）
        if (i === 0 || i === numRows - 1) flag = -flag;

        // 更新行号 i，根据 flag 的值递增或递减
        i += flag;
    }

    // 将结果数组 res 中的字符串拼接起来并返回
    return res.join("");
};

```

