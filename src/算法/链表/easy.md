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

## [反转链表](https://leetcode.cn/leetbook/read/top-interview-questions-easy/xnnhm6/)


**题目**

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。


示例 1：


输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
示例 2：


输入：head = [1,2]
输出：[2,1]
示例 3：

输入：head = []
输出：[]


提示：

链表中节点的数目范围是 [0, 5000]
-5000 <= Node.val <= 5000

进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？

**解题**

* 迭代

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // 生成新的头节点
    let prev = null;
    // 将指针指向头节点
    let curr = head;
    while (curr) {
        // 用一个临时变量将当前节点的下一个节点保存起来
        const next = curr.next;
        // 将指针指向前一个节点
        curr.next = prev;
        // 为下一次遍历做准备，将前一个节点向前移动
        prev = curr;
        // 为下一次遍历做准备，当前节点向前移动
        curr = next;
    }
    return prev;
};
```

* 递归

> 1. 大问题拆解成两个子问题
> 2. 子问题求解方式和大问题一样
> 3. 存在最小子问题（递归边界）

```js
var reverseList = function(head) {
 		// 递归终止条件：空链表或者只存在一个节点
    if (head == null || head.next == null) return head
  	// 递归调用子问题
    const p = reverseList(head.next)
    // 反转
    head.next.next = head
    head.next = null
    return p
};
```

**参考链接**

https://leetcode.cn/problems/reverse-linked-list/solution/shi-pin-jiang-jie-die-dai-he-di-gui-hen-hswxy/
