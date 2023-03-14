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

## [爬楼梯](https://leetcode.cn/leetbook/read/top-interview-questions-easy/xn854d/)


**题目**

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

 

示例 1：

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。

1. 1 阶 + 1 阶
2. 2 阶
   示例 2：

输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。

1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶

**解题**

```js
// 动态规划
var climbStairs = function(n) {
  	// 结果集
    let dp = [];
  	// 边界条件
    dp[0] = 1;
    dp[1] = 1;
    for(let i = 2;i <= n;i++) {
      	// 状态转移方程
        dp[i] = dp[i - 1] + dp[i -2]
    }
    return dp[n]
};
```

```js
// 递归
var climbStairs = function (n) {
    if (n <= 1)
        return 1;
    if (n < 3)
        return n;
    return climbStairs(n - 1) + climbStairs(n - 2);
};
```

```js
// 尾递归
var climbStairs = function (n) {
    return Fibonacci(n, 1, 1);
};


function Fibonacci(n, a, b) {
    if (n <= 1)
        return b;
    return Fibonacci(n - 1, b, a + b);
}

```

> 尾递归和一般的递归不同在对内存的占用，普通递归创建stack累积而后计算收缩，**尾递归只会占用恒量的内存**（和迭代一样）。

```js
// 数学：斐波那契数列
var climbStairs = function(n) {
    const sqrt_5 = Math.sqrt(5);
    const fib_n = Math.pow((1 + sqrt_5) / 2, n + 1) - Math.pow((1 - sqrt_5) / 2,n + 1);
    return Math.round(fib_n / sqrt_5);
};
```

![image-20220712085026236](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20220712085026236.png)

## [买股票的最佳时机](https://leetcode.cn/leetbook/read/top-interview-questions-easy/xn8fsh/)

---

**题目**

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

 

示例 1：

输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
示例 2：

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。

**解题**

```js
// 动态规划
//时间复杂度O(n) 空间复杂度O(n)，dp数组第二维是常数
const maxProfit = function (prices) {
  let n = prices.length;
  let dp = Array.from(new Array(n), () => new Array(2));

  dp[0][0] = 0; //第0天不持有
  dp[0][1] = -prices[0]; //第0天持有

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }
  
  return dp[n - 1][0];
};
```

```js
// 一次遍历
var maxProfit = function (prices) {
    let j = 1;
    let res = 0;
    let min = prices[0];
    while (j < prices.length) {
        if (prices[j] < min) {
            min = prices[j];
        }
        if(min < prices[j] && res < (prices[j] - min)) {
            res = prices[j] - min
        }
        j++;
    }
    return res
};

// 代码简洁版
	var maxProfit = function (prices) {
	    if (prices.length === 0) return 0;
	    // 最低买点
	    let min = prices[0];
	    // 最大收入
	    let max = 0;
	    for (let p of prices) {
	        // 最佳买点，买入点最低
	        min = Math.min(min, p);
	        max = Math.max(max, p - min);
	    }
	
	    return max;
	};

```

