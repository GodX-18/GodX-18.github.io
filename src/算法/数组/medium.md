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

### 排序 + 双指针

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

## [跳跃游戏](https://leetcode.cn/problems/jump-game/description/?envType=study-plan-v2&envId=top-interview-150)

给你一个非负整数数组 `nums` ，你最初位于数组的 **第一个下标** 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 `true` ；否则，返回 `false` 。

**示例 1：**

```
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
```

**示例 2：**

```
输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
```

### 贪心算法

:::tip 解题思路(找不能)

1. 定义一个变量用来记录可以跳跃的最大距离。
2. 遍历数组，一旦可以跳跃的最大距离小于当前的下标，那么就代表不能够到达最后一个下标，否则更新可以跳跃的最大距离。
3. 如果遍历到最后一个元素，代表能够到达最后一个下标。

:::

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    let cover = 0;
    for (let i = 0; i < nums.length; i++) {
        // 一旦可以跳跃的最大距离小于当前的下标，那么就代表不能够到达最后一个下标
        if (cover < i) return false
        // 更新可以跳跃的最大距离
        cover = Math.max(cover, i + nums[i])
    }
    return true
};
```

::: tip 解题思路（找能）

1. 定义一个变量用来记录可以跳跃的最大距离,初始值为第一个元素的值。
2. 遍历当前能跳跃的最大距离，如果可以跳跃的最大距离大于等于数组的长度，那么就代表能够到达最后一个下标。
3. 如果遍历完，那么就代表没有找到能够到达最后一个下标的元素。

:::

```js
var canJump = function (nums) {
  	// 长度为1 直接就是终点
    if (nums.length === 1) return true;
    let cover = nums[0];
    for (let i = 0; i <= cover; i++) {
        cover = Math.max(cover, i + nums[i]);
        if (cover >= nums.length - 1) return true
    }
    return false
};
```

:::tip 解题思路（从后往前）

1. 定义一个变量end，表示必须到达的位置，初始为最后一个下标。
2. 从后往前遍历数组，对于每个位置i，如果end-i小于等于nums[i]，说明从i可以跳到end，那么就更新end为i，表示只要能到达i，就能到达最后。
3. 最后判断end是否为0，如果是，说明可以从第一个位置跳到最后一个位置，否则不行。

:::

```js
var canJump = function (nums) {
    // 必须到达end下标的数字
    let end = nums.length - 1;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (end - i <= nums[i]) {
            end = i;
        }
    }
    return end == 0;
};
```

## [跳跃游戏II](https://leetcode.cn/problems/jump-game-ii/description/?envType=study-plan-v2&envId=top-interview-150)

给定一个长度为 `n` 的 **0 索引**整数数组 `nums`。初始位置为 `nums[0]`。

每个元素 `nums[i]` 表示从索引 `i` 向前跳转的最大长度。换句话说，如果你在 `nums[i]` 处，你可以跳转到任意 `nums[i + j]` 处:

- `0 <= j <= nums[i]` 
- `i + j < n`

返回到达 `nums[n - 1]` 的最小跳跃次数。生成的测试用例可以到达 `nums[n - 1]`。

**示例 1:**

```
输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
```

**示例 2:**

```
输入: nums = [2,3,0,1,4]
输出: 2
```

### 贪心算法

:::tip 解题思路

1. 初始化当前位置（`curIndex`）和下一个位置（`nextIndex`）为0，步数（`steps`）为0。
2. 遍历数组，对于每个位置，计算能够到达的下一个位置（`nextIndex`）。
3. 如果当前位置等于之前设定的当前位置（`curIndex`），说明已经达到了当前步数的最远位置，更新当前位置为新的最远位置（`nextIndex`），步数加1。
4. 重复步骤2和步骤3，直到遍历完整个数组。
5. 返回步数作为结果。

:::

```js
var jump = function(nums) {
    let curIndex = 0
    let nextIndex = 0
    let steps = 0
    for(let i = 0; i < nums.length - 1; i++) {
        nextIndex = Math.max(nums[i] + i, nextIndex)
        if(i === curIndex) {
            curIndex = nextIndex
            steps++
        }
    }
    return steps
};
```

## H 指数

给你一个整数数组 `citations` ，其中 `citations[i]` 表示研究者的第 `i` 篇论文被引用的次数。计算并返回该研究者的 **`h` 指数**。

根据维基百科上 [h 指数的定义](https://baike.baidu.com/item/h-index/3991452?fr=aladdin)：`h` 代表“高引用次数” ，一名科研人员的 `h` **指数** 是指他（她）至少发表了 `h` 篇论文，并且每篇论文 **至少** 被引用 `h` 次。如果 `h` 有多种可能的值，**`h` 指数** 是其中最大的那个。

**示例 1：**

```
输入：citations = [3,0,6,1,5]
输出：3 
解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 3, 0, 6, 1, 5 次。
     由于研究者有 3 篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3。
```

**示例 2：**

```
输入：citations = [1,3,1]
输出：1
```

### 排序

:::tip 解题思路

h指数的定义要求有h篇论文分别被引用了至少h次，所以如果当前的元素值大于h，说明这篇论文满足条件，可以将h指数增加一。例如，如果排序后的数组是[6, 5, 3, 1, 0]，那么当遍历到第一个元素6时，h=0，因为6>0，所以将h加一，变为1。当遍历到第二个元素5时，h=1，因为5>1，所以将h加一，变为2。当遍历到第三个元素3时，h=2，因为3>2，所以将h加一，变为3。当遍历到第四个元素1时，h=3，因为1<=3，所以无法增加h指数，终止遍历。最终的h指数是3。

:::

**反序**

```js
var hIndex = function (citations) {
    citations.sort((a, b) => b - a);
    let h = 0;
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] > h) {
            h++;
        }
    }
    return h;
};
```

**正序**


```js
var hIndex = function(citations) {
    citations.sort((a, b) => a - b);
    let h = 0, i = citations.length - 1; 
    while (i >= 0 && citations[i] > h) {
        h++; 
        i--;
    }
    return h;
};
```

## [除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)

给你一个整数数组 `nums`，返回 *数组 `answer` ，其中 `answer[i]` 等于 `nums` 中除 `nums[i]` 之外其余各元素的乘积* 。

题目数据 **保证** 数组 `nums`之中任意元素的全部前缀元素和后缀的乘积都在 **32 位** 整数范围内。

请 **不要使用除法，**且在 `O(*n*)` 时间复杂度内完成此题。 

**示例 1:**

```
输入: nums = [1,2,3,4]
输出: [24,12,8,6]
```

**示例 2:**

```
输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0]
```

**提示：**

- `2 <= nums.length <= 105`
- `-30 <= nums[i] <= 30`
- **保证** 数组 `nums`之中任意元素的全部前缀元素和后缀的乘积都在 **32 位** 整数范围内

**进阶：

你可以在 `O(1)` 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 **不被视为** 额外空间。）

### 方法一：左右乘积列表

:::tip 解题思路

我们不必将所有数字的乘积除以给定索引处的数字得到相应的答案，而是利用索引左侧所有数字的乘积和右侧所有数字的乘积（即前缀与后缀）相乘得到答案。

1. 初始化两个空数组 L 和 R。对于给定索引 i，L[i] 代表的是 i 左侧所有数字的乘积，R[i] 代表的是 i 右侧所有数字的乘积。
2. 我们需要用两个循环来填充 L 和 R 数组的值。对于数组 L，L[0] 应该是 1，因为第一个元素的左边没有元素。对于其他元素：L[i] = L[i-1] * nums[i-1]。
3. 同理，对于数组 R，R[length-1] 应为 1。length 指的是输入数组的大小。其他元素：R[i] = R[i+1] * nums[i+1]。
4. 当 R 和 L 数组填充完成，我们只需要在输入数组上迭代，且索引 i 处的值为：L[i] * R[i]。

:::

```js
var productExceptSelf = function (nums) {
    const len = nums.length;
    const L = [];
    const R = [];
    const answer = [];

    L[0] = 1;
    for (let i = 1; i < len; i++) {
        L[i] = nums[i - 1] * L[i - 1]
    }

    R[len - 1] = 1;
    for (let i = len - 2; i >= 0; i--) {
        R[i] = nums[i + 1] * R[i + 1]
    }

    for (let i = 0; i < len; i++) {
        answer[i] = L[i] * R[i];
    }

    return answer
};
```

### 方法二：空间复杂度 O(1) 的方法

:::tip 解题思路

尽管上面的方法已经能够很好的解决这个问题，但是空间复杂度并不为常数。

由于输出数组不算在空间复杂度内，那么我们可以将 L 或 R 数组用输出数组来计算。先把输出数组当作 L 数组来计算，然后再动态构造 R 数组得到结果。让我们来看看基于这个思想的算法。

1. 初始化 answer 数组，对于给定索引 i，answer[i] 代表的是 i 左侧所有数字的乘积。
2. 构造方式与之前相同，只是我们试图节省空间，先把 answer 作为方法一的 L 数组。
3. 这种方法的唯一变化就是我们没有构造 R 数组。而是用一个遍历来跟踪右边元素的乘积。并更新数组 answer[i]=answer[i]∗R。然后 R 更新为 R=R∗nums[i]，其中变量 R 表示的就是索引右侧数字的乘积。

:::

```js
var productExceptSelf = function(nums) {
    const length = nums.length;
    const answer = [];

    // answer[i] 表示索引 i 左侧所有元素的乘积
    // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1
    answer[0] = 1;
    for (let i = 1; i < length; i++) {
        answer[i] = nums[i - 1] * answer[i - 1];
    }

    // R 为右侧所有元素的乘积
    // 刚开始右边没有元素，所以 R = 1
    let R = 1;
    for (let i = length - 1; i >= 0; i--) {
        // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R
        answer[i] = answer[i] * R;
        // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上
        R *= nums[i];
    }
    return answer;
};
```

## [加油站](https://leetcode.cn/problems/gas-station/)

在一条环路上有 `n` 个加油站，其中第 `i` 个加油站有汽油 `gas[i]` 升。

你有一辆油箱容量无限的的汽车，从第 `i` 个加油站开往第 `i+1` 个加油站需要消耗汽油 `cost[i]` 升。你从其中的一个加油站出发，开始时油箱为空。

给定两个整数数组 `gas` 和 `cost` ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 `-1` 。如果存在解，则 **保证** 它是 **唯一** 的。

**示例 1:**

```
输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
输出: 3
解释:
从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
因此，3 可为起始索引。
```

**示例 2:**

```
输入: gas = [2,3,4], cost = [3,4,3]
输出: -1
解释:
你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
因此，无论怎样，你都不可能绕环路行驶一周。
```

### 一次遍历

:::tip 解题思路

双层循环：

* 外循环遍历每一个加油站
  * 初始化当前起始加油站的汽油总量和消耗总量
  * 记录成功走过的加油站数量
    * 如果成功走过所有加油站，返回起始加油站索引
    * 否则，更新起始加油站索引，继续尝试
* 内循环在当前起始加油站开始尝试走完一圈
  * 计算当前加油站的索引
  * 累加汽油量和消耗量
  * 如果消耗超过汽油量，无法到达下一站，退出内层循环
  * 成功走过一个加油站，增加计数

无法完成一圈，结束程序，返回-1

:::

```js
var canCompleteCircuit = function(gas, cost) {
    // 获取加油站数量
    const n = gas.length;
    // 初始化起始加油站索引
    let i = 0;
    // 遍历加油站数组
    while (i < n) {
        // 初始化当前起始加油站的汽油总量和消耗总量
        let sumOfGas = 0, sumOfCost = 0;
        // 记录成功走过的加油站数量
        let cnt = 0;
        // 在当前起始加油站开始尝试走完一圈
        while (cnt < n) {
            // 计算当前加油站的索引
            const j = (i + cnt) % n;
            // 累加汽油量和消耗量
            sumOfGas += gas[j];
            sumOfCost += cost[j];
            // 如果消耗超过汽油量，无法到达下一站，退出内层循环
            if (sumOfCost > sumOfGas) {
                break;
            }
            // 成功走过一个加油站，增加计数
            cnt++;
        }
        // 如果成功走过所有加油站，返回起始加油站索引
        if (cnt === n) {
            return i;
        } else {
            // 否则，更新起始加油站索引，继续尝试
            i = i + cnt + 1;
        }
    }
    // 无法完成一圈，返回-1
    return -1;
};

```

:::tip 解题思路

首先我们有两个结论：

1. 如果 left 累加 gas[i]−cost[i] 后，小于 0。则出发点到站 i 都不是起点。
2. 如果总加油量 sum(gas)>=sum(cost)总耗油量，问题一定有解。

具体步骤：

1. 遍历每个加油站
   1. 统计总汽油量和总汽油花费
   2. 更新当前剩余汽油，若剩余汽油为负值，表示无法到达下一站，更新起始加油站索引
2. 若总汽油量小于总汽油花费，说明无法完成一圈旅行，结束程序，返回 -1
3. 返回起始加油站索引

:::

```js
var canCompleteCircuit = function (gas, cost) {
    // 初始化变量
    let left = 0, // 当前剩余汽油
        start = 0, // 起始加油站索引
        totalGas = 0, // 总汽油量
        totalCost = 0; // 总汽油花费

    // 遍历每个加油站
    for (let i = 0; i < gas.length; i++) {
        // 统计总汽油量和总汽油花费
        totalGas += gas[i];
        totalCost += cost[i];

        // 更新当前剩余汽油
        left += gas[i] - cost[i];

        // 若剩余汽油为负值，表示无法到达下一站，更新起始加油站索引
        if (left < 0) {
            start = i + 1;
            left = 0;
        }
    }

    // 若总汽油量小于总汽油花费，说明无法完成一圈旅行
    if (totalGas < totalCost) {
        return -1;
    }

    // 返回起始加油站索引
    return start;
};

```

## [整数转罗马数字](https://leetcode.cn/problems/integer-to-roman/)

罗马数字包含以下七种字符： `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。

```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

例如， 罗马数字 2 写做 `II` ，即为两个并列的 1。12 写做 `XII` ，即为 `X` + `II` 。 27 写做 `XXVII`, 即为 `XX` + `V` + `II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。 
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

给你一个整数，将其转为罗马数字。

**示例 1:**

```
输入: num = 3
输出: "III"
```

**示例 2:**

```
输入: num = 4
输出: "IV"
```

**示例 3:**

```
输入: num = 9
输出: "IX"
```

**示例 4:**

```
输入: num = 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.
```

**示例 5:**

```
输入: num = 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

**提示：**

- `1 <= num <= 3999`

:::tip 解题思路

根据罗马数字的唯一表示法，为了表示一个给定的整数 num，我们寻找不超过 num 的最大符号值，将 num 减去该符号值，然后继续寻找不超过 num 的最大符号值，将该符号拼接在上一个找到的符号之后，循环直至 num 为 0。最后得到的字符串即为 numm 的罗马数字表示。

编程时，可以建立一个数值-符号对的列表 *valueSymbols*，按数值从大到小排列。遍历*valueSymbols* 中的每个数值-符号对，若当前数值 value 不超过 num，则从 num 中不断减去 value 直至 num 小于 value，然后遍历下一个数值-符号对。若遍历中 numn 为 0 则跳出循环。

:::

```js
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    const valueSymbols = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];

    const res = [];

    for (let [val, key] of valueSymbols) {
        while (num >= val) {
            num -= val;
            res.push(key)
        }
        if (num === 0) break
    }

    return res.join("")

};
```

