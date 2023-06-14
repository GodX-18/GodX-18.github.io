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

## 子集

给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

**示例 1：**

```js
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**示例 2：**

```js
输入：nums = [0]
输出：[[],[0]]
```

:::tip 提示

* 1 <= nums.length <= 10
* -10 <= nums[i] <= 10
* nums 中的所有元素 互不相同

:::

:::info 解题思路

* 迭代法：

![image-20230516164918670](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20230516164918670.png)

* 回溯法

:::

**迭代法**

::: code-tabs#shell

@tab JS

```js
var subsets = function(nums) {
    const ans = [];
    const n = nums.length;
    for (let mask = 0; mask < (1 << n); ++mask) {
        const t = [];
        // 在mask对应的二进制数中检查第i位是否为1。 如果是1，则将nums[i]加入t。
        for (let i = 0; i < n; ++i) {
            if (mask & (1 << i)) {
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    return ans;
};
```

@tab Python

```python
```

@tab Java

```java
```

@tab C++

```c++

```

:::

**回溯法**

::: code-tabs#shell

@tab JS

```js
var subsets = function(nums) {
    const t = [];
    const ans = [];
    const dfs = (cur) => {
        if (cur === nums.length) {
            ans.push(t.slice());
            return;
        }
        t.push(nums[cur]);
        dfs(cur + 1);
        t.pop(t.length - 1);
        dfs(cur + 1);
    }
    dfs(0);
    return ans;
};
```

@tab Python

```python

```

@tab Java

```java

```

@tab C++

```c++

```

:::

## [盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。

**示例 1：**

```js
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**示例 2：**

```js
输入：height = [1,1]
输出：1
```


:::tip

* n == height.length
* 2 <= n <= 105
* 0 <= height[i] <= 104

:::

:::info 解题思路

在每个状态下，无论长板或短板向中间收窄一格，都会导致水槽底边宽度变短：

* 若向内 移动短板，水槽的短板可能变大，因此下个水槽的面积可能增大。

* 若向内移动长板，水槽的短板不变或变小，因比下个水槽的面积一定变小。

因此，初始化双指针分列水槽左右两端，循环每轮将短板向内移动一格，并更新面积最大值，直到两指针相遇时跳出；即可获得最大面积。

:::

:::code-tabs#shell

@tab JS

```js
var maxArea = function (height) {
  let i = 0;
  let j = height.length - 1;
  let res = 0;

  while (j > i) {
    res = Math.max(res, Math.min(height[i], height[j]) * (j - i));
    height[i] > height[j] ? j-- : i++;
  }

  return res;
};
```

@tab Python

```python
def maxArea(height):
    i = 0
    j = len(height) - 1
    res = 0
    
    while j > i:
        res = max(res, min(height[i], height[j]) * (j - i))
        j -= height[i] > height[j]
        i += height[i] <= height[j]
        
    return res
```

@tab java 

```java
public static int maxArea(int[] height) {
    int i = 0;
    int j = height.length - 1;
    int res = 0;
    
    while (j > i) {
        res = Math.max(res, Math.min(height[i], height[j]) * (j - i));
        j -= height[i] > height[j] ? 1 : 0;
        i += height[i] <= height[j] ? 1 : 0;
    }
    
    return res;
}
```

@tab c++

```c++
#include <algorithm>
#include <vector>

using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int i = 0;
        int j = height.size() - 1;
        int res = 0;
        
        while (j > i) {
            res = max(res, min(height[i], height[j]) * (j - i));
            j -= height[i] > height[j] ? 1 : 0;
            i += height[i] <= height[j] ? 1 : 0;
        }
        
        return res;
    }
};

```

:::

## [蜗牛排序](https://leetcode.cn/problems/snail-traversal/)

请你编写一段代码为所有数组实现  snail(rowsCount，colsCount) 方法，该方法将 1D 数组转换为以蜗牛排序的模式的 2D 数组。无效的输入值应该输出一个空数组。当 rowsCount * colsCount !==nums.length 时。这个输入被认为是无效的。

蜗牛排序从左上角的单元格开始，从当前数组的第一个值开始。然后，它从上到下遍历第一列，接着移动到右边的下一列，并从下到上遍历它。将这种模式持续下去，每列交替变换遍历方向，直到覆盖整个数组。例如，当给定输入数组  [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15] ，当 rowsCount = 5 且 colsCount = 4 时，需要输出矩阵如下图所示。注意，矩阵沿箭头方向对应于原数组中数字的顺序

![image-20230525163137356](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20230525163137356.png)

**示例 1：**

```js
输入：
nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]
rowsCount = 5
colsCount = 4
输出：
[
 [19,17,16,15],
 [10,1,14,4],
 [3,2,12,20],
 [7,5,18,11],
 [9,8,6,13]
]
```

**示例 2：**

```js
输入：
nums = [1,2,3,4]
rowsCount = 1
colsCount = 4
输出：[[1, 2, 3, 4]]
示例 3：

输入：
nums = [1,3]
rowsCount = 2
colsCount = 2
输出：[]
Explanation: 2 * 2 = 4, 且原数组 [1,3] 的长度为 2; 所以，输入是无效的。
```


:::tip 提示

* 0 <= nums.length <= 250
* 1 <= nums[i] <= 1000
* 1 <= rowsCount <= 250
* 1 <= colsCount <= 250

:::

:::info 解题思路

有两种：

**利用数组的转置**

1. 将数组按照行数分割
2. 然后将偶数行的数组进行翻转
3. 将翻转后的函数进行转置即为最终的结果

**一层for循环**

使用一个布尔变量 seq 来记录当前遍历的方向，true 代表正向，false 代表逆向。使用变量 start 来记录当前要填充的行数或列数。在遍历一维数组时，先将元素插入到当前的行或列中，然后根据 seq 值来判断方向。如果当前为正向，则向下移动一行或向右移动一列；若为逆向，则向上移动一行或向左移动一列。

:::

:::code-tabs#shell

@tab 转置法

```js
/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
function transposeArray(array) {
    return array[0].map((_, colIndex) => array.map((row) => row[colIndex]))
}

function reverseEven(array) {
    return array.map((row, rowIndex) => {
        if (rowIndex % 2 === 0) {
            return row
        }
        return row.reverse()
    })
}


Array.prototype.snail = function (rowsCount, colsCount) {
    if (rowsCount * colsCount !== this.length) return []
    const res = []
    let copy = JSON.parse(JSON.stringify(this))
    while (copy.length >= rowsCount) {
        res.push(copy.splice(0, rowsCount))
    }
    return transposeArray(reverseEven(res))
}

/**
 * const arr = [1,2,3,4];
 * arr.snail(1,4); // [[1,2,3,4]]
 */
```

@tab 循环法

```js
/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function(rowsCount, colsCount) {
    if (this.length !== rowsCount * colsCount) {
        return [];
    }
    const res = [];
    for (let i = 0; i < rowsCount; i++) {
        res.push([]);
    }
    let seq = true; // 正向还是逆向
    let start = 0;
    for (let i = 0; i < this.length; i++) {
        res[start].push(this[i]);
        if (seq) {
            if (start === rowsCount - 1) {
                seq = false;
            } else {
                start++;
            }
        } else {
            if (start === 0) {
                seq = true;
            } else {
                start--;
            }
        }
    }
    return res;
}
```

:::

## [合并区间](https://leetcode.cn/problems/merge-intervals)

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

**示例 1：**

```js
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

**示例 2：**

```js
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
```


:::tip 提示

* 1 <= intervals.length <= 104
* intervals[i].length == 2
* 0 <= starti <= endi <= 104

:::

:::info 解题思路

1. 通过根据区间的起始时间进行排序
2. 然后依次比较每个区间与前一个区间。
3. 如果当前区间的开始时间在前一个区间的结束时间之后，代表它们不重叠，可以将前一个区间添加到结果数组中。
4. 如果它们重叠，前一个区间的结束时间将延长到其自身结束时间和当前区间结束时间的最大值。
5. 最后将最后一个区间添加到结果数组中。

:::

:::code-tabs#shell

@tab JS

```js
var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let prev = intervals[0]
    let result = []
    for (let i = 1; i < intervals.length; i++) {
        let cur = intervals[i]
        if (cur[0] > prev[1]) {
            result.push(prev)
            prev = cur
        } else {
            prev[1] = Math.max(cur[1], prev[1])
        }
    }
    result.push(prev)
    return result
};
```

:::

## [三数之和](https://leetcode.cn/problems/3sum)

给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

**示例 1：**

```js
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
```

**示例 2：**

```js
输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
```

**示例 3：**

```js
输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
```

:::tip

* 3 <= nums.length <= 3000
* -105 <= nums[i] <= 105

:::

:::info 解题思路

排序 + 双指针

:::

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // 升序
    nums.sort((a, b) => a - b);
    // 双指针法
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        // 一组中第一个元素大于0 直接返回
        if (nums[i] > 0) return res;
        let left = i + 1;
        let right = nums.length - 1;
        // 去重，当起始的值等于前一个元素，那么得到的结果将会和前一次相同
        if (nums[i] == nums[i - 1]) continue;
        while (right > left) {
            let sum = nums[i] + nums[left] + nums[right]
            if (sum > 0) {
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                // 数组中添加数组
                res.push([nums[i], nums[left], nums[right]]);
                // 在将左指针和右指针移动的时候，先对左右指针的值，进行判断
                // 如果重复，直接跳过。
                // 去重，因为 i 不变，当此时 l取的数的值与前一个数相同，所以不用在计算，直接跳
                while (right > left && nums[left] == nums[left + 1]) {
                    left++;
                }
                // 去重，因为 i 不变，当此时 r取的数的值与前一个数相同，所以不用在计算，直接跳
                while (right > left && nums[right] == nums[right - 1]) {
                    right--;
                }
                // 将左指针右移，将右指针左移。
                left++;
                right--;
            }
        }
    }
    return res;

};
```

## [二进制字符串前缀一致的次数](https://leetcode.cn/problems/number-of-times-binary-string-is-prefix-aligned/description/)

给你一个长度为 `n` 、下标从 **1** 开始的二进制字符串，所有位最开始都是 `0` 。我们会按步翻转该二进制字符串的所有位（即，将 `0` 变为 `1`）。

给你一个下标从 **1** 开始的整数数组 `flips` ，其中 `flips[i]` 表示对应下标 `i` 的位将会在第 `i` 步翻转。

二进制字符串 **前缀一致** 需满足：在第 `i` 步之后，在 **闭** 区间 `[1, i]` 内的所有位都是 1 ，而其他位都是 0 。

返回二进制字符串在翻转过程中 **前缀一致** 的次数。

**示例 1：**

```
输入：flips = [3,2,4,1,5]
输出：2
解释：二进制字符串最开始是 "00000" 。
执行第 1 步：字符串变为 "00100" ，不属于前缀一致的情况。
执行第 2 步：字符串变为 "01100" ，不属于前缀一致的情况。
执行第 3 步：字符串变为 "01110" ，不属于前缀一致的情况。
执行第 4 步：字符串变为 "11110" ，属于前缀一致的情况。
执行第 5 步：字符串变为 "11111" ，属于前缀一致的情况。
在翻转过程中，前缀一致的次数为 2 ，所以返回 2 。
```

**示例 2：**

```
输入：flips = [4,1,2,3]
输出：1
解释：二进制字符串最开始是 "0000" 。
执行第 1 步：字符串变为 "0001" ，不属于前缀一致的情况。
执行第 2 步：字符串变为 "1001" ，不属于前缀一致的情况。
执行第 3 步：字符串变为 "1101" ，不属于前缀一致的情况。
执行第 4 步：字符串变为 "1111" ，属于前缀一致的情况。
在翻转过程中，前缀一致的次数为 1 ，所以返回 1 。
```

**提示：**

- `n == flips.length`
- `1 <= n <= 5 * 104`
- `flips` 是范围 `[1, n]` 中所有整数构成的一个排列

:::info 解题思路

在第 i 次翻转之后，我们希望 [1,i] 内的所有位都是 1，这等价于「前 i 次翻转中下标的最大值等于 i」。

因此，我们对数组 flip 进行遍历，同时记录翻转下标的最大值。当遍历到位置 i 时，如果最大值恰好等于 i，那么答案加 1。

需要注意数组的下标是从 0 开始的，因此在实际的代码编写中，判断的值为 i - 1。

:::

```js
/**
 * @param {number[]} flips
 * @return {number}
 */
var numTimesAllBlue = function(flips) {
    let res = 0;
    let max = 0;
    for(let i = 0;i < flips.length;i++) {
        // 记录下标的最大值
        max = Math.max(max,flips[i])
        if(i === max - 1) {
            res++
        }
    }
    return res
};
```

