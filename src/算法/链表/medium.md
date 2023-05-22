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

## [1.两数相加](https://leetcode.cn/problems/add-two-numbers/description/)

给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储一位数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例 1：**

![image-20230509145005125](https://raw.githubusercontent.com/GodX-18/picBed/main/image-20230509145005125.png)

``` text
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

**示例 2：**
``` text
输入：l1 = [0], l2 = [0]
输出：[0]
```
**示例 3：**
``` text
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```
::: tip

* 每个链表中的节点数在范围 [1, 100] 内
* 0 <= Node.val <= 9
* 题目数据保证列表表示的数字不含前导零

:::

:::info 解题思路

* 将两个链表看成是相同长度的进行遍历，如果一个链表较短则在前面补 
  0，比如 987 + 23 = 987 + 023 = 1010
* 每一位计算的同时需要考虑上一位的进位问题，而当前位计算结束后同样需要更新进位值
* 如果两个链表全部遍历完毕后，进位值为 1,则在新链表最前方添加节点 

:::

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let head = null, // 头部
    tail = null; // 尾部
  let carry = 0; // 进位
  // 当 l1 或者 l2 没有遍历到尾部时
  while (l1 || l2) {
    // 没有值默认为 0
    const n1 = l1 ? l1.val : 0;
    const n2 = l2 ? l2.val : 0;
    // 当前位纵向相加（包括进位）
    const sum = n1 + n2 + carry;
    if (!head) {
      // 结果链表为空，代表为头部
      head = tail = new ListNode(sum % 10);
    } else {
      tail.next = new ListNode(sum % 10);
      tail = tail.next;
    }
    carry = Math.floor(sum / 10); // 更新进位值
    // 当前节点有值，将指针移动至下一个节点，为下次循环做准备
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  // 如果进位大于0,尾部新增一个节点
  if (carry > 0) {
    tail.next = new ListNode(carry);
  }
  // 返回链表
  return head;
};
```
