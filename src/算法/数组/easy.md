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
var removeDuplicates = function(nums) {
  let left = 0;
  for(let right = left + 1;right < nums.length;right++) {
      if(nums[left] !== nums[right]) {
          left++;
          nums[left] = nums[right]
      }
  }
  return left + 1
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

