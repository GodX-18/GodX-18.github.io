---
title: 中等难度
icon: contrast
date: 2024-01-08
order: 2
category:
  - 算法
tag:
  - 双指针
---

## [两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)

给你一个下标从 **1** 开始的整数数组 `numbers` ，该数组已按 **非递减顺序排列** ，请你从数组中找出满足相加之和等于目标数 `target` 的两个数。如果设这两个数分别是 `numbers[index1]` 和 `numbers[index2]` ，则 `1 <= index1 < index2 <= numbers.length` 。

以长度为 2 的整数数组 `[index1, index2]` 的形式返回这两个整数的下标 `index1` 和 `index2`。

你可以假设每个输入 **只对应唯一的答案** ，而且你 **不可以** 重复使用相同的元素。

你所设计的解决方案必须只使用常量级的额外空间。

**示例 1：**

```
输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
```

**示例 2：**

```
输入：numbers = [2,3,4], target = 6
输出：[1,3]
解释：2 与 4 之和等于目标数 6 。因此 index1 = 1, index2 = 3 。返回 [1, 3] 。
```

**示例 3：**

```
输入：numbers = [-1,0], target = -1
输出：[1,2]
解释：-1 与 0 之和等于目标数 -1 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
```

**提示：**

- `2 <= numbers.length <= 3 * 104`
- `-1000 <= numbers[i] <= 1000`
- `numbers` 按 **非递减顺序** 排列
- `-1000 <= target <= 1000`
- **仅存在一个有效答案**

:::tip 解题思路

1. **双指针**

   初始时两个指针分别指向第一个元素位置和最后一个元素的位置。每次计算两个指针指向的两个元素之和，并和目标值比较。如果两个元素之和等于目标值，则发现了唯一解。如果两个元素之和小于目标值，则将左侧指针右移一位。如果两个元素之和大于目标值，则将右侧指针左移一位。移动指针之后，重复上述操作，直到找到答案。

2. **二分查找**

   在数组中找到两个数，使得它们的和等于目标值，可以首先固定第一个数，然后寻找第二个数，第二个数等于目标值减去第一个数的差。利用数组的有序性质，可以通过二分查找的方法寻找第二个数。为了避免重复寻找，在寻找第二个数时，只在第一个数的右侧寻找。


:::

::: code-tabs#shell

@tab 双指针

```js
var twoSum = function (numbers, target) {
    const len = numbers.length;
    let L = 0;
    let R = len - 1;
    while (L < R) {
        const sum = numbers[L] + numbers[R]
        if (sum === target) {
            return [L + 1, R + 1]
        } else if(sum > target){
            R--
        } else {
            L++
        }
    }
    return -1
};
```

@tab 二分查找

```js
// 定义一个方法，接受一个数组和一个目标值作为参数
  function twoSum(numbers, target) {
    // 遍历数组中的每个元素
    for (let i = 0; i < numbers.length; ++i) {
      // 定义两个指针，分别指向当前元素的下一个位置和数组的最后一个位置
      let low = i + 1, high = numbers.length - 1;
      // 当两个指针没有相遇时，继续查找
      while (low <= high) {
        // 计算中间位置的索引
        let mid = Math.floor((high - low) / 2 + low);
        // 如果中间位置的元素和当前元素的和等于目标值，返回它们的索引
        if (numbers[mid] == target - numbers[i]) {
          return [i + 1, mid + 1];
        // 如果中间位置的元素和当前元素的和大于目标值，将右指针移动到中间位置的左边
        } else if (numbers[mid] > target - numbers[i]) {
          high = mid - 1;
        // 如果中间位置的元素和当前元素的和小于目标值，将左指针移动到中间位置的右边
        } else {
          low = mid + 1;
        }
      }
    }
    // 如果没有找到符合条件的两个数，返回[-1, -1]
    return [-1, -1];
  }
```

:::
