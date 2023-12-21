---
title: 困难难度
icon: creative
date: 2023-03-09
order: 3
category:
  - 算法
tag:
  - 数组
---

## [分发糖果](https://leetcode.cn/problems/candy/)

`n` 个孩子站成一排。给你一个整数数组 `ratings` 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

- 每个孩子至少分配到 `1` 个糖果。
- 相邻两个孩子评分更高的孩子会获得更多的糖果。

请你给每个孩子分发糖果，计算并返回需要准备的 **最少糖果数目** 。

**示例 1：**

```
输入：ratings = [1,0,2]
输出：5
解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
```

**示例 2：**

```
输入：ratings = [1,2,2]
输出：4
解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
```

### 两次遍历

:::tip 解题思路

1. 第一次遍历：保证后面的孩子如果评分高于前面的孩子，就多得到一个糖果。这样可以满足从左往右看的条件。
2. 第二次遍历：第一次遍历可能会导致一些孩子得到的糖果超过了最小的需要。所以，第二次遍历的时候，要用Math.max函数来比较当前孩子得到的糖果和他应该得到的糖果，取较大的那个。

:::

```js
var candy = function (ratings) {
    // 条件判断
    if (ratings.length < 1) {
        return 0
    }

    // 至少每个人都有1个糖果
    let result = new Array(ratings.length).fill(1);

    // 正序，如果递增，后面在原来的基础上+1
    for (let i = 0; i < ratings.length - 1; i++) {
        if (ratings[i + 1] > ratings[i]) {
            result[i + 1] = result[i] + 1
        }
    }

    // 倒序，如果递增，与原来的值比较取最大值
    for (let i = ratings.length - 1; i > 0; i--) {
        if (ratings[i - 1] > ratings[i]) {
            result[i - 1] = Math.max(result[i - 1], result[i] + 1);
        }
    }

    // 返回总糖果数
    return result.reduce((prev, cur) => prev += cur);
};

```

## [接雨水](https://leetcode.cn/problems/trapping-rain-water/)

给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)

```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
```

**示例 2：**

```
输入：height = [4,2,0,3,2,5]
输出：9 
```

**提示：**

- `n == height.length`
- `1 <= n <= 2 * 104`
- `0 <= height[i] <= 105`

### 方法一：按列求

:::tip 解题思路

求每一列的水，我们只需要关注当前列，以及左边最高的墙，右边最高的墙就够了。

装水的多少，当然根据木桶效应，我们只需要看左边最高的墙和右边最高的墙中较矮的一个就够了。

**具体算法：**

遍历数组，找出当前列左边最高和右边最高，然后比较两者较小的一列与当前列的高度做比较：只有比当前列的高度高才能接水，接水量为：min - height[i]

:::

```js
var trap = function (height) {
    let sum = 0;
    for (let i = 0; i < height.length - 1; i++) {
        // 找出左边最高
        let max_left = 0;
        for (let j = i - 1; j >= 0; j--) {
            if (height[j] > max_left) {
                max_left = height[j]
            }
        }
        // 找出右边最高
        let max_right = 0;
        for (let j = i + 1; j < height.length; j++) {
            if (height[j] > max_right) {
                max_right = height[j]
            }
        }

        // 找出两端较小的
        let min = Math.min(max_left, max_right)
        //只有较小的一段大于当前列的高度才会有水，其他情况不会有水
        if (min > height[i]) {
            sum += (min - height[i])
        }
    }
    return sum
};
```

### 方法二：动态规划

:::tip 解题思路

我们注意到，解法二中。对于每一列，我们求它左边最高的墙和右边最高的墙，都是重新遍历一遍所有高度，这里我们可以优化一下。

首先用两个数组，max_left [i] 代表第 i 列左边最高的墙的高度，max_right[i] 代表第 i 列右边最高的墙的高度。（一定要注意下，第 i 列左（右）边最高的墙，是不包括自身的，和 leetcode 上边的讲的有些不同）

对于 max_left我们其实可以这样求。

max_left [i] = Max(max_left [i-1],height[i-1])。它前边的墙的左边的最高高度和它前边的墙的高度选一个较大的，就是当前列左边最高的墙了。

对于 max_right我们可以这样求。

max_right[i] = Max(max_right[i+1],height[i+1]) 。它后边的墙的右边的最高高度和它后边的墙的高度选一个较大的，就是当前列右边最高的墙了。

这样，我们再利用解法二的算法，就不用在 for 循环里每次重新遍历一次求 max_left 和 max_right 了。

:::

```js
var trap = function (height) {
    const n = height.length;
    
    if (n <= 2) {
        return 0; // 无法形成凹槽，直接返回0
    }

    let leftMax = new Array(n).fill(0);
    let rightMax = new Array(n).fill(0);

    // 预先计算每个位置左边的最高值
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    // 预先计算每个位置右边的最高值
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let totalWater = 0;

    // 计算每个位置上的水量
    for (let i = 1; i < n - 1; i++) {
        const minHeight = Math.min(leftMax[i - 1], rightMax[i + 1]);
        if (minHeight > height[i]) {
            totalWater += minHeight - height[i];
        }
    }

    return totalWater;
};

```

### 方法三：双指针

:::tip 解题思路

动态规划中，我们常常可以对空间复杂度进行进一步的优化。

在本题中，从两端向中间遍历数组，维护两个变量max_left和max_right，分别表示左右两端的最大高度。对于每个位置i，如果max_left > height[i]，那么就可以在i处存储max_left - height[i]的雨水，同理，如果max_right > height[i]，那么就可以在i处存储max_right - height[i]的雨水。

**具体步骤：**

1. 首先，定义一个变量n，表示数组的长度。如果n小于等于2，那么直接返回0，因为无法形成凹槽。

2. 然后，定义一个变量sum，表示总的雨水量，初始为0。

3. 定义两个变量max_left和max_right，表示左右两端的最大高度，初始为0。

4. 定义两个指针left和right，表示当前遍历的位置，初始为1和n-2，分别从左右两端开始。

5. 使用一个for循环，从1到n-2遍历数组，计算每个位置上的雨水量。

   - 如果height[left - 1] < height[right + 1]，说明左边的柱子比右边的柱子低，那么就从左到右遍历。
     - 更新max_left为max_left和height[left - 1]中的较大值，表示左边的最大高度。
     - 如果max_left > height[left]，说明当前位置可以存储雨水，那么就把max_left - height[left]加到sum上，表示当前位置的雨水量。
     - 把left加1，表示向右移动一位。

   - 否则，说明右边的柱子比左边的柱子低，那么就从右到左遍历。
     - 更新max_right为max_right和height[right + 1]中的较大值，表示右边的最大高度。
     - 如果max_right > height[right]，说明当前位置可以存储雨水，那么就把max_right - height[right]加到sum上，表示当前位置的雨水量。
     - 把right减1，表示向左移动一位。

6. 最后，返回sum，表示数组中能够存储的雨水的总量

:::

:::tip 为什么height[left - 1] 小于 height[right + 1]，就能说明左边的柱子比右边的柱子低?

- 假设height是一个长度为n的数组，表示n个柱子的高度，其中n > 2。
- 假设left和right是两个指针，表示当前遍历的位置，其中1 <= left < right <= n - 2。
- 假设max_left和max_right是两个变量，表示左右两端的最大高度，其中max_left = max(height[0], …, height[left - 1])，max_right = max(height[right + 1], …, height[n - 1])。
- 那么，如果height[left - 1] < height[right + 1]，就能说明左边的柱子比右边的柱子低，即max_left < max_right，这是因为：
  - 根据max_left的定义，我们有max_left <= height[left - 1]。
  - 根据max_right的定义，我们有max_right >= height[right + 1]。
  - 根据height[left - 1] < height[right + 1]，我们有height[left - 1] < max_right。
  - 综合上述三个不等式，我们有max_left < max_right，即左边的柱子比右边的柱子低

:::

```js
var trap = function (height) {
    const n = height.length;
    if (n <= 2) {
        return 0; // 无法形成凹槽，直接返回0
    }
    let sum = 0;
    let max_left = 0
    let max_right = 0;
    let left = 1;
    let right = n - 2

    // 计算每个位置上的水量
    for (let i = 1; i < n - 1; i++) {
        // 从左到右
        if(height[left - 1] < height[right + 1]) {
            max_left = Math.max(max_left,height[left - 1]);
            if(max_left > height[left]) {
                sum += (max_left - height[left])
            }
            left++
        // 从左到右
        } else { 
            max_right =Math.max(max_right,height[right + 1]);
            if(max_right > height[right]) {
                sum += (max_right - height[right])
            }
            right--;
        }
    }

    return sum;
};
```





