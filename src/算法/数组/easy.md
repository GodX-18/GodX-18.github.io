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
## 1. [删除排序数组中的重复项](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2gy9m/)

给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。

由于在某些语言中不能改变数组的长度，所以必须将结果放在数组nums的第一部分。更规范地说，如果在删除重复项之后有 k 个元素，那么 nums 的前 k 个元素应该保存最终结果。

将最终结果插入 nums 的前 k 个位置后返回 k 。

不要使用额外的空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

**示例 1：**

```js
输入：nums = [1,1,2]
输出：2, nums = [1,2,_]
解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
```

**示例 2：**

```js
输入：nums = [0,0,1,1,1,2,2,3,3,4]
输出：5, nums = [0,1,2,3,4]
解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
```

:::info 解题思路

双指针思想：

1. 定义两个指针分别代表数组第一个和第二个索引；
2. 如果左指针指向的元素和右指针一样，那么就让右指针往右移动一位；
3. 如果左右指针指向的元素不一样，那么就让左指针向右移动一位，并且将左指针指向元素值改成右指针指向的元素值；
4. 重复2、3两步，直到右指针指向最后一个元素；
5. 最后删除左指针后面的元素即可；

:::

```js
// 定义一个函数 removeDuplicates，接收一个数组 nums 作为参数
var removeDuplicates = function(nums) {
    // 初始化两个指针 R 和 L，分别表示右指针和左指针，初始位置都为数组的第一个元素
    let R = 0, L = 0;
    // 当右指针 R 小于数组长度时，执行循环
    while (R < nums.length) {
        // 检查右指针所指元素是否与左指针所指元素相等
        if (nums[R] != nums[L]) {
            // 如果不相等，将左指针向右移动一位
            L++;
            // 更新左指针位置上的元素为右指针所指元素，实现去重
            nums[L] = nums[R];
        }
        // 右指针向右移动一位
        R++;
    }
    // 返回去重后的数组长度，即左指针位置加 1
    return L + 1;
};
```

## 2. [买卖股票的最佳时机 ||](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2zsx1/)

给定一个数组 prices ，其中 prices[i] 表示股票第 i 天的价格。

在每一天，你可能会决定购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以购买它，然后在 同一天 出售。
返回 你能获得的 最大 利润 。

 **示例 1:**

```js
输入: prices = [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

**示例 2:**

```js
输入: prices = [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```

**示例 3:**

```js
输入: prices = [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

:::info 解题思路

这道题用贪心算法解决最为简单。那什么是贪心算法呢？
指的就是在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解。
那么我们只要每次在股票上涨前买入就可以得到最大收益，所以只要算出每次上涨的差额，再进行累加就可以了。

:::

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let i = 0;
    let j = 1;
    let result = 0;
    while(j <= prices.length) {
        if(prices[i] < prices[j]) {
            result += (prices[j] - prices[i])
        }
        i++;
        j++;
    }
    return result;
};
```



## 3. [旋转数组](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2skh7/)


给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。 

**示例 1:**

```js
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
```

**示例 2:**

```js
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
```

:::info 解题思路

通过观察发现，其实轮转的结果无非就只有两种情况：

当 k 的值小于数组的长度时，轮转后的数组就是将数组的后 k 位移动至数组的最前面；
当 k 的值大于数组的长度时，如果 k 正好时数组长度的倍数，那么轮转后还是原始数组；如果不是，那么就轮转 k 除以数组长度的余数次，这时余数的值必然是小于数组的长度的，直接使用第一种情况的逻辑即可。

结合 es6 的语法，可以将代码精简至两行：

:::

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    const v = k % nums.length;
    return nums.unshift(...nums.splice(-v,v))
}
```



## 4. 存在重复元素


给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。

**示例 1：**

```js
输入：nums = [1,2,3,1]
输出：true
```

**示例 2：**

```js
输入：nums = [1,2,3,4]
输出：false
```

**示例 3：**

```js
输入：nums = [1,1,1,3,3,4,3,2,4,2]
输出：true
```

:::info 解题思路

利用 es6 的 set 数据结构进行数组去重，然后和原始数组比较长度即可。

:::

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const set = new Set(nums);
    if(set.size < nums.length) {
        return true;
    } else {
        return false;
    }
};
```



## 5. 只出现一次的数字

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

:::warning 说明

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

:::

**示例 1:**

```js
输入: [2,2,1]
输出: 1
```

**示例 2:**

```js
输入: [4,1,2,1,2]
输出: 4
```

:::info 解题思路

按位异或赋值 (^=)
按位异或赋值操作符 (^=) 使用二进制表示操作数，进行一次按位异或操作并赋值。

* 如果两个数一样，进行异或操作就是0。
* 0和任何数进行异或操作都会变成和它异或的对象。

:::

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    return nums.reduce((a,b) => a ^ b)
};
```



## 6. 两个数组的交集 ||


给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。

**示例 1：**

```js
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]
```

**示例 2:**

```js
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]
```

:::info 方法一

Map 思想：

1. 使用一个 hash 表记录其中一个数组每个元素出现的次数
2. 然后遍历第二个数组，如果 map 对应 key 的值大于 0，则放入返回数组中，然后让 map 对应 key 的值减 1

:::

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
    const res = [];
    const map = {}
    for (let i of nums1) {
        if (map[i]) {
            map[i]++
        } else {
            map[i] = 1
        }
    }

    for (let j of nums2) {
        if (map[j] > 0) {
            res.push(j)
            map[j]--
        }
    }
    return res
};
```

:::info 方法二

双指针思想：

1. 首先对两个数组进行从小到大排序；
2. 接着分别让一个指针指向两个数组的第一位；
3. 如果两个指针指向的元素相同，说明是交集，将其值存入结果数组，随后两个指针都后移一位；
4. 如果两个指针指向的元素不同，让指向的值值相对小的往后移一位，因为数组是从小到大排序的，如果大的后移可能会丢失相交集的元素；相对大的先不动；
5. 一直重复3、4两步即可。

:::

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
     nums1.sort((a, b) => a - b);
     nums2.sort((a, b) => a - b); // 为了使相同元素相邻出现
    let i = 0;
    let j = 0;
    let result = []
    while(i < nums1.length && j < nums2.length) {
        if(nums1[i] === nums2[j]) {
            result.push(nums1[i])
            i++;
            j++;
        } else if(nums1[i] < nums2[j]) {
            i ++;
        } else {
            j ++;
        }
        
    }
    return result;
};
```



## 7. [加一](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2cv1c/)


给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

**示例 1：**

```js
输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123。
```

**示例 2：**

```js
输入：digits = [4,3,2,1]
输出：[4,3,2,2]
解释：输入数组表示数字 4321。
```

**示例 3：**

```js
输入：digits = [0]
输出：[1]
```

:::info 解题思路

* 主要考虑进位的问题
* 从数组尾部开始便利

:::

```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    for(let i = digits.length - 1; i >= 0;i--) {
        digits[i]++; // 尾部加一
        digits[i] %= 10; // 判断最后一位是否是9
        if(digits[i] !== 0) return digits; // 如果没有进位，直接返回数组
    }
    return [1,...digits] // 如果for循环里没有return，说明每一位都是 9，位数加一
};
```

## 8. [移动零](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2ba4i/)


给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

**示例 1:**

```js
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**示例 2:**

```js
输入: nums = [0]
输出: [0]
```

:::info 解题思路

* 一开始想到的是，遍历数组，然后将等于 0 的元素依次放到后面
* 然后看了解题，直接用 es6 的 sort 一行代码就能搞定

:::

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    if(nums.length < 2) return;
    let i = 0;
    let j = nums.length;
    while(i < j) {
        if(nums[i] === 0) {
            nums.splice(i,1);
            nums.push(0);
            j--;
        } else {
            i ++;
        }
    }
};

// sort 版本
var moveZeroes = function(nums) {
   return nums.sort((a,b) => b ? 0 : -1)
};
```



## 9. [两数之和](https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2jrse/)


给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例 1：**

```js
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

**示例 2：**

```js
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

**示例 3：**

```js
输入：nums = [3,3], target = 6
输出：[0,1]
```

:::info 解题思路

* 双层for循环暴力破解
* map 哈希表优化

:::

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// 暴力破解
var twoSum = function(nums, target) {
    for(let i = 0;i < nums.length - 1;i++) {
         for(let j = i + 1; j < nums.length; j++) {
             if(nums[i] + nums[j] === target) {
                 return [i,j]
            }
         }
     }
};

// hash表
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0; i < nums.length;i++) {
        let other = target - nums[i]
        if(map.has(other)) {
            return [i,map.get(other)]
        } else {
            map.set(nums[i],i)
        }
    }
};
```



## 10. [多数元素](https://leetcode.cn/problems/majority-element/?favorite=2cktkvj)

给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。 

**示例 1：**

```js
输入：nums = [3,2,3]
输出：3
```

**示例 2：**

```js
输入：nums = [2,2,1,1,1,2,2]
输出：2
```

:::tip 提示

* n == nums.length
* 1 <= n <= 5 * 104
* -109 <= nums[i] <= 109

:::


进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。

:::info 解题思路

利用 hash 表记录每个元素出现的次数，当有元素的次数大于 n / 2 时，直接返回

:::

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let map = new Map();
  const len = nums.length;
  for (const i of nums) {
    if (map.has(i)) {
      let temp = map.get(i);
      map.set(i, ++temp);
      if (temp > len / 2) return i;
    } else {
      // 只有一个元素直接返回
      if (len === 1) return i;
      map.set(i, 1);
    }
  }
};
```

## 11.[找到所有数组中消失的数字](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)

给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。 

**示例 1：**

```js
输入：nums = [4,3,2,7,8,2,3,1]
输出：[5,6]
```

**示例 2：**

```js
输入：nums = [1,1]
输出：[2]
```


:::tip 提示

* n == nums.length
* 1 <= n <= 105
* 1 <= nums[i] <= n

:::

进阶：你能在不使用额外空间且时间复杂度为 O(n) 的情况下解决这个问题吗? 你可以假定返回的数组不算在额外空间内。

:::info 解题思路

* 暴力破解

:::

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const arr = [];
  const len = nums.length;
  for (let i = 1; i <= len; i++) {
    if (!nums.includes(i)) {
      arr.push(i);
    }
  }
  return arr
};
```

## [12.数组中不等三元组的数目](https://leetcode.cn/problems/number-of-unequal-triplets-in-array/)

给你一个下标从 0 开始的正整数数组 nums 。请你找出并统计满足下述条件的三元组 (i, j, k) 的数目：

0 <= i < j < k < nums.length
nums[i]、nums[j] 和 nums[k] 两两不同 。
换句话说：nums[i] != nums[j]、nums[i] != nums[k] 且 nums[j] != nums[k] 。
返回满足上述条件三元组的数目。

**示例 1：**

```js
输入：nums = [4,4,2,4,3]
输出：3
解释：下面列出的三元组均满足题目条件：

- (0, 2, 4) 因为 4 != 2 != 3
- (1, 2, 4) 因为 4 != 2 != 3
- (2, 3, 4) 因为 2 != 4 != 3
  共计 3 个三元组，返回 3 。
  注意 (2, 0, 4) 不是有效的三元组，因为 2 > 0 。
```

**示例 2：**

```js
输入：nums = [1,1,1,1,1]
输出：0
解释：不存在满足条件的三元组，所以返回 0 。
```


:::tip 提示

* 3 <= nums.length <= 100
* 1 <= nums[i] <= 1000

:::

:::info 解题思路

1. 因为数组的长度最大是100，可以直接暴力枚举

2. 这段代码是一个JavaScript函数，它的名字叫做"unequalTriplets"。参数是一个名为"nums"的数组。下面是函数的解释：

   1. 调用数组的.sort()方法，将数组中的内容从小到大排序，以方便后续操作。

   2. 定义了两个变量res和n，其中res表示结果，n表示数组的长度。

   3. 进入一个for循环，循环的条件是i小于n，每次循环结束后，i=j。这个循环用于处理数组中相同的元素。

   4. 在每次循环的开始，有一个while循环，其条件是j小于n并且数组中的第j个元素等于第i个元素。这个while循环用于找到所有与第i个元素相等的元素。

   5. 循环结束时，将res加上i * (j - i) * (n - j)，其中i表示与第i个元素相等的元素的个数，j-i表示与第i个元素相等的元素跨度，n-j表示不等于第i个元素的元素的个数。

   6. 最终返回res作为结果。

   在第五步，代码计算了一个res的值，这个值代表着数组中三元组的个数，其中每个三元组都不相同。具体的解释如下：

   - i代表数组中与当前元素nums[i]相等的元素个数。
   - (j-i)表示当前元素与第一个不相等的元素之间跨越的元素个数。
   - (n-j)表示当前元素之后、与当前元素不相等的元素个数。
   - i * (j-i) * (n-j)表示以当前元素作为最小值形成的三元组的个数。因为三元组中最小的数必须是nums[i]，而与nums[i]相等的数有i个，最小的数后面跨越的元素个数为j-i，其后的元素个数为n-j，它们构成的三元组个数是i*(j-i)*(n-j)。

   因此，通过这个公式，代码计算出每个元素作为最小值时形成的三元组个数，把它们加起来，最后就得到了结果。注意，这个算法前提是数组中没有重复元素，否则可能会出现重复计算的问题。

:::

:::code-tabs#shell

@tab 暴力枚举

```js
var unequalTriplets = function(nums) {
    let res = 0, n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                if (nums[i] != nums[j] && nums[i] != nums[k] && nums[j] != nums[k]) {
                    res++;
                }
            }
        }
    }
    return res;
};
```

@tab 排序

```js
var unequalTriplets = function(nums) {
    nums.sort();
    let res = 0, n = nums.length;
    for (let i = 0, j = 0; i < n; i = j) {
        while (j < n && nums[j] == nums[i]) {
            j++;
        }
        res += i * (j - i) * (n - j);
    }
    return res;
};
```

:::

## [13. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)

### 题目描述

给你两个按 **非递减顺序** 排列的整数数组 `nums1` 和 `nums2`，另有两个整数 `m` 和 `n` ，分别表示 `nums1` 和 `nums2` 中的元素数目。

请你 **合并** `nums2` 到 `nums1` 中，使合并后的数组同样按 **非递减顺序** 排列。

**注意：**最终，合并后数组不应由函数返回，而是存储在数组 `nums1` 中。为了应对这种情况，`nums1` 的初始长度为 `m + n`，其中前 `m` 个元素表示应合并的元素，后 `n` 个元素为 `0` ，应忽略。`nums2` 的长度为 `n` 。

**示例 1：**

```
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
```

**示例 2：**

```
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。
```

**示例 3：**

```
输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
```

**提示：**

- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
- `-109 <= nums1[i], nums2[j] <= 109`

### **self**

:::tip 解题思路

因为数组是有序的，所以只要遍历 nums2 数组中的元素，然后插入到 nums1 中，关键就是找到插入的位置，分为两种情况：

1. 寻找到 nums1 中第一个大于当前 nums2 元素的索引，那么直接插入即可
2. 如果找不到大于当前元素的值，则将当前元素插入到末尾

需要注意的是：需要初始化一个指针，指向 nums1 数组的末尾有效元素

:::

```js
// 定义合并函数，将两个有序数组合并到第一个数组中
var merge = function(nums1, m, nums2, n) {
    // 初始化指针 t，指向 nums1 数组的末尾有效元素
    let t = m - 1;
    // 遍历 nums2 数组中的每个元素
    nums2.forEach(item => {
        // 移除 nums1 数组末尾的元素
        nums1.pop();
        // 将指针 t 后移一位
        t++;
        // 寻找 nums1 中第一个大于当前 nums2 元素的索引
        const rIndex = nums1.findIndex(i => item < i);
        // 如果找不到大于当前元素的值，则将当前元素插入到末尾
        const index = rIndex === -1 ? t : rIndex;
        // 在 nums1 数组的指定索引处插入当前元素
        nums1.splice(index, 0, item);
    });
};
```

**有什么不足**

使用 `pop` 和 `splice` 来删除和插入元素，这样的操作会导致数组重新排序，影响性能。

### **方法一：直接合并后排序**

:::tip 解题思路

最直观的方法是先将数组 nums2 放进数组 nums1 的尾部，然后直接对整个数组进行排序。

:::

```js
var merge = function (nums1, m, nums2, n) {
    nums1.splice(m, n, ...nums2);
    nums1.sort((a, b) => a - b)
};
```

### **方法二：双指针法**

:::tip 解题思路

1. 初始化两个指针，分别指向nums1和nums2 的头部
2. 创建一个新数组用于存放合并后的结果
3. 因为数组是有序的，所以每次对比nums1和nums2头部元素的大小，然后依次插入到结果数组中即可
4. 最后将结果数组中的元素依次复制给 nums1 即可

:::

![gif1](https://raw.githubusercontent.com/GodX-18/picBed/main/1.gif)

```js
// 合并两个有序数组
var merge = function(nums1, m, nums2, n) {
    // 初始化两个指针，分别指向nums1和nums2
    let p1 = 0, p2 = 0;
    // 创建一个新数组用于存放合并后的结果
    const sorted = new Array(m + n).fill(0);
    // 当前元素的变量
    var cur;
    while (p1 < m || p2 < n) {
        // 如果nums1的元素已经全部遍历完，将nums2的当前元素加入结果数组
        if (p1 === m) {
            cur = nums2[p2++];
        } 
        // 如果nums2的元素已经全部遍历完，将nums1的当前元素加入结果数组
        else if (p2 === n) {
            cur = nums1[p1++];
        } 
        // 如果nums1的当前元素小于nums2的当前元素，将nums1的当前元素加入结果数组
        else if (nums1[p1] < nums2[p2]) {
            cur = nums1[p1++];
        } 
        // 否则，将nums2的当前元素加入结果数组
        else {
            cur = nums2[p2++];
        }
        // 将当前元素加入结果数组
        sorted[p1 + p2 - 1] = cur;
    }

    // 将排序好的数组复制回原数组nums1
    for (let i = 0; i != m + n; ++i) {
        nums1[i] = sorted[i];
    }
};
```

### 方法三：逆向双指针

:::tip 解题思路

方法二中，之所以要使用临时变量，是因为如果直接合并到数组 nums1 中，nums1 中的元素可能会在取出之前被覆盖。那么如何直接避免覆盖 numsr 中的元素呢？观察可知，nums1 的后半部分是空的，可以直接覆盖而不会影响结果。因此可以指针设置为从后向前遍历，每次取两者之中的较大者
放进 nums1 的最后面。

:::

```js
// 合并两个有序数组的函数
var merge = function(nums1, m, nums2, n) {
    // 初始化指针，p1指向nums1的末尾（有效元素的最后一个位置），p2指向nums2的末尾
    let p1 = m - 1, p2 = n - 1;
    // 初始化合并后数组的末尾位置
    let tail = m + n - 1;
    var cur; // 用于存储当前比较的元素的变量
    // 循环，直到p1和p2都小于0
    while (p1 >= 0 || p2 >= 0) {
        // 如果p1已经小于0，说明nums1的元素都已经遍历完
        if (p1 === -1) {
            cur = nums2[p2--]; // 将nums2的当前元素放入合并后数组，同时移动p2指针
        }
        // 如果p2已经小于0，说明nums2的元素都已经遍历完
        else if (p2 === -1) {
            cur = nums1[p1--]; // 将nums1的当前元素放入合并后数组，同时移动p1指针
        }
        // 如果nums1[p1]大于nums2[p2]，将nums1[p1]放入合并后数组
        else if (nums1[p1] > nums2[p2]) {
            cur = nums1[p1--]; // 同时移动p1指针
        }
        // 如果nums2[p2]大于等于nums1[p1]，将nums2[p2]放入合并后数组
        else {
            cur = nums2[p2--]; // 同时移动p2指针
        }
        nums1[tail--] = cur; // 将当前比较得到的元素放入合并后数组的末尾
    }
};
```

## [14. 移除元素](https://leetcode.cn/problems/remove-element/description/?envType=study-plan-v2&envId=top-interview-150)

### 题目描述

给你一个数组 `nums` 和一个值 `val`，你需要 **[原地](https://baike.baidu.com/item/原地算法)** 移除所有数值等于 `val` 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 `O(1)` 额外空间并 **[原地 ](https://baike.baidu.com/item/原地算法)修改输入数组**。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**「引用」**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

**示例 1：**

```
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2]
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
```

**示例 2：**

```
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,3,0,4]
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
```

**提示：**

- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= val <= 100`

### self

```js
// 定义名为 removeElement 的函数，用于移除数组中指定的元素
var removeElement = function(nums, val) {
    // 使用 for 循环遍历数组中的每个元素
    for (let i = 0; i < nums.length;) {
        // 检查当前元素是否等于指定的值 val
        if (nums[i] === val) {
            // 如果相等，使用 splice 方法移除当前位置的元素
            nums.splice(i, 1);
            // 使用 continue 关键字跳过当前循环的剩余代码，直接进入下一次循环
            continue;
        }
        // 如果当前元素不等于指定值，增加循环变量 i，继续下一次循环
        i++;
    }
};
```

**有什么问题**

在循环中修改数组的长度可能会导致索引混乱。

### **双指针法**

:::tip 解题思路

1. 初始化左右指针，分别指向数组的起始位置和末尾位置
2. 如果左指针指向的元素等于要移除的值val，将左指针指向的元素替换为右指针指向的元素，并将右指针向左移动
3. 如果左指针指向的元素不等于要移除的值val，则将左指针向右移动
4. 循环结束后，返回左指针的值，即移除元素后的新数组长度

:::

```js
// 定义名为removeElement的函数，接收两个参数：nums（数组）和val（要移除的元素）
var removeElement = function (nums, val) {
   // 初始化左指针为数组的起始位置
   let left = 0;
   // 初始化右指针为数组的末尾位置
   let right = nums.length - 1;
   // 当左指针小于等于右指针时，执行循环
   while(left <= right) {
       // 如果左指针指向的元素等于要移除的值val
       if(nums[left] === val) {
           // 将左指针指向的元素替换为右指针指向的元素，并将右指针向左移动
           nums[left] = nums[right--];
       } else {
           // 如果左指针指向的元素不等于要移除的值val，则将左指针向右移动
           left++;
       }
   }
   // 循环结束后，返回左指针的值，即移除元素后的新数组长度
   return left;
};

```

## 15. [买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&envId=top-interview-150)

给定一个数组 `prices` ，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。

你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0` 。

**示例 1：**

```
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

**示例 2：**

```
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

**提示：**

- `1 <= prices.length <= 105`
- `0 <= prices[i] <= 104`

### 法一：暴力破解法

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let max = 0
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            const profit = prices[j] - prices[i];
            if(profit > max) {
                max = profit
            }
        }
    }
    return max
};
```

### 法二：一次遍历

:::tip

我们来假设自己来购买股票。随着时间的推移，每天我们都可以选择出售股票与否。那么，假设在第 i 天，如果我们要在今天卖股票，那么我们能赚多少钱呢？

显然，如果我们真的在买卖股票，我们肯定会想：如果我是在历史最低点买的股票就好了！太好了，在题目中，我们只要用一个变量记录一个历史最低价格 minprice，我们就可以假设自己的股票是在那天买的。那么我们在第 i 天卖出股票能得到的利润就是 prices[i] - minprice。

因此，我们只需要遍历价格数组一遍，记录历史最低点，然后在每一天考虑这么一个问题：如果我是在历史最低点买进的，那么我今天卖出能赚多少钱？当考虑完所有天数之时，我们就得到了最好的答案。

:::

![figures.gif](https://raw.githubusercontent.com/GodX-18/picBed/main/1658590330-wivils-figures.gif)

```js
// 定义一个名为maxProfit的函数，接受一个参数prices（代表股票价格数组）
var maxProfit = function (prices) {
    // 初始化最小价格为JavaScript中的最大数值
    let minPrice = Number.MAX_VALUE;
    // 初始化最大利润为0
    let maxProfit = 0;
    // 遍历股票价格数组
    for (let i = 0; i < prices.length; i++) {
        // 如果当前价格小于最小价格
        if (prices[i] < minPrice) {
            // 更新最小价格为当前价格
            minPrice = prices[i];
        }
        // 如果当前价格减去最小价格大于当前最大利润
        else if (prices[i] - minPrice > maxProfit) {
            // 更新最大利润为当前价格减去最小价格
            maxProfit = prices[i] - minPrice;
        }
    }
    // 返回最大利润
    return maxProfit;
};

```

## [16. 删除排序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/?envType=study-plan-v2&envId=top-interview-150)

给你一个有序数组 `nums` ，请你**[ 原地](http://baike.baidu.com/item/原地算法)** 删除重复出现的元素，使得出现次数超过两次的元素**只出现两次** ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 **[原地 ](https://baike.baidu.com/item/原地算法)修改输入数组** 并在使用 O(1) 额外空间的条件下完成。

 

**说明：**

为什么返回数值是整数，但输出的答案是数组呢？

请注意，输入数组是以**「引用」**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

**示例 1：**

```
输入：nums = [1,1,1,2,2,3]
输出：5, nums = [1,1,2,2,3]
解释：函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3。 不需要考虑数组中超出新长度后面的元素。
```

**示例 2：**

```
输入：nums = [0,0,1,1,1,1,2,3,3]
输出：7, nums = [0,0,1,1,2,3,3]
解释：函数应返回新长度 length = 7, 并且原数组的前五个元素被修改为 0, 0, 1, 1, 2, 3, 3。不需要考虑数组中超出新长度后面的元素。
```

**提示：**

- `1 <= nums.length <= 3 * 104`
- `-104 <= nums[i] <= 104`
- `nums` 已按升序排列

### 双指针法（快慢指针）

:::tip 解题思路

1. 初始化 `low` 和 `fast` 指针为 `2`。因为此问题允许每个元素最多重复两次，所以前两个元素我们不需要检查，直接保留即可。
2. 使用一个 `while` 循环处理 `fast` 指向的元素
   - 如果当前 `fast` 指针指向的元素与 `low` 指向的元素的前两个元素不相等 (`nums[low - 2] !== nums[fast]`), 那么这个元素是需要保留的，我们就把这个元素复制到 `low` 指针的位置，然后 `low` 指针向前移动一位，`fast` 指针也向前移动一位
   - 如果 `nums[low - 2]` 和 `nums[fast]` 相等，这意味着有重复超过两次的元素存在，因此我们只将 `fast` 指针向后移动一位
3. 循环结束后，数组中 `low` 索引之前的元素就是处理后的结果，返回 `low` 作为新长度。

需要注意的是，这个函数会直接更改原数组，而非创建一个新的数组。此函数的空间复杂度为 O(1)，即使用了常数量级的额外空间。

:::

```js
// 定义名为removeDuplicates的函数，用于移除排序数组中的重复元素，每个元素最多保留两个
var removeDuplicates = function (nums) {
    // 获取数组长度
    const len = nums.length;
    
    // 如果数组长度小于等于2，无需移除重复元素，直接返回数组长度
    if (len <= 2) {
        return len;
    }

    // 初始化两个指针，分别表示当前元素的位置（low）和遍历数组的位置（fast）
    let low = 2, fast = 2;

    // 遍历数组
    while (fast < len) {
        // 检查当前元素和前两个元素是否相同，如果不同，则将当前元素放置在low的位置，并移动low指针
        if (nums[low - 2] !== nums[fast]) {
            nums[low] = nums[fast];
            low++;
        }

        // 移动fast指针，继续遍历数组
        fast++;
    }

    // 返回新数组的长度，即保留重复元素最多两次后的数组长度
    return low;
};
```

## [罗马数字转整数](https://leetcode.cn/problems/roman-to-integer/)

罗马数字包含以下七种字符: `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。

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

例如， 罗马数字 `2` 写做 `II` ，即为两个并列的 1 。`12` 写做 `XII` ，即为 `X` + `II` 。 `27` 写做 `XXVII`, 即为 `XX` + `V` + `II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。 
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。

**示例 1:**

```
输入: s = "III"
输出: 3
```

**示例 2:**

```
输入: s = "IV"
输出: 4
```

**示例 3:**

```
输入: s = "IX"
输出: 9
```

**示例 4:**

```
输入: s = "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
```

**示例 5:**

```
输入: s = "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

**提示：**

- `1 <= s.length <= 15`
- `s` 仅含字符 `('I', 'V', 'X', 'L', 'C', 'D', 'M')`
- 题目数据保证 `s` 是一个有效的罗马数字，且表示整数在范围 `[1, 3999]` 内
- 题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。
- IL 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX 。
- 关于罗马数字的详尽书写规则，可以参考 [罗马数字 - Mathematics ](https://b2b.partcommunity.com/community/knowledge/zh_CN/detail/10753/罗马数字#knowledge_article)。

:::tip 解题思路

“当前位置的元素比下个位置的元素小，就减去当前值，否则加上当前值”。

例如 XIV 可视作X-I+V=10-1+5=14

:::

```js
var romanToInt = function(s) {
    const symbolValues = new Map();
    symbolValues.set('I', 1);
    symbolValues.set('V', 5);
    symbolValues.set('X', 10);
    symbolValues.set('L', 50);
    symbolValues.set('C', 100);
    symbolValues.set('D', 500);
    symbolValues.set('M', 1000);  
    let ans = 0;
    const n = s.length;
    for (let i = 0; i < n; ++i) {
        const value = symbolValues.get(s[i]);
        if (i < n - 1 && value < symbolValues.get(s[i + 1])) {
            ans -= value;
        } else {
            ans += value;
        }
    }
    return ans;
};
```

## [最长公共前缀](https://leetcode.cn/problems/longest-common-prefix/)

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

**示例 1：**

```
输入：strs = ["flower","flow","flight"]
输出："fl"
```

**示例 2：**

```
输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
```

**提示：**

- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` 仅由小写英文字母组成

:::tip

* 假设第一个字符串为初始的最长公共前缀
* 循环直到所有字符串都以当前的前缀开头
* 如果不是所有字符串都以当前前缀开头，则缩短前缀长度

:::

```js
var longestCommonPrefix = function (strs) {
    let str = strs[0]
    while (!strs.every(item => item.startsWith(str))) {
        str = str.slice(0, str.length - 1)
    }
    return str ?? ""
};
```

