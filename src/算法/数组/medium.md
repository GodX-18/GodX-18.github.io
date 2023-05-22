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
