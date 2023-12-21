---
title: Grid 布局
icon: define
order: 1
category:
  - 前端
tag:
  - CSS
---

## 基本介绍

网格布局（Grid）是最强大的 CSS 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。

Grid 布局与 [Flex 布局](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。

Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。Grid 布局远比 Flex 布局强大。

## 容器和项目

采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。

```html
<div>
  <div><p>1</p></div>
  <div><p>2</p></div>
  <div><p>3</p></div>
</div>
```
上面代码中，最外层的 div 元素就是容器，内层的三个 div 元素就是项目。

:::tip
注意：项目只能是容器的顶层子元素，不包含项目的子元素，比如上面代码的 p 元素就不是项目。Grid 布局只对项目生效。
:::

## 容器属性

### display

`display: grid`指定一个容器采用网格布局，且容器默认为块级元素。也可以使用 `display:inline-grid`将容器设置为行内元素。

:::tip

设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

:::

### grid-template-[columns|rows]

容器指定了网格布局以后，接着就要划分行和列。`grid-template-columns`属性定义每一列的列宽，`grid-template-rows`属性定义每一行的行高。

```css
// 指定了一个三行三列的网格，列宽和行高都是100px
.div {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}
```

::: normal-demo 代码演示

```html
<div class="wrapper">
  <div class="box1">1</div>
  <div class="box2">2</div>
  <div class="box3">3</div>
  <div class="box4">4</div>
  <div class="box5">5</div>
  <div class="box6">6</div>
  <div class="box7">7</div>
  <div class="box8">8</div>
  <div class="box9">9</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  width: 100%;
  margin: auto;
  border: 1px solid #000;
  > * {
    border: 1px solid red;
    background:pink;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
}
```

:::

1. **repeat()**
   有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用`repeat()`函数，简化重复的值。上面的代码用`repeat()`改写如下。

   ```css
   .container {
     display: grid;
     grid-template-columns: repeat(3, 33.33%);
     grid-template-rows: repeat(3, 33.33%);
   }
   ```

   `repeat()`重复某种模式也是可以的。

   :::normal-demo 代码演示

   ```html
   <div class="wrapper">
     <div class="box1">1</div>
     <div class="box2">2</div>
     <div class="box3">3</div>
     <div class="box4">4</div>
     <div class="box5">5</div>
     <div class="box6">6</div>
     <div class="box7">7</div>
     <div class="box8">8</div>
     <div class="box9">9</div>
   </div>
   ```

   ```css
   .wrapper {
     display: grid;
     grid-template-columns: repeat(2,50px 30px 100px);
     grid-template-rows: 100px 100px 100px;
     width: 100%;
     margin: auto;
     border: 1px solid #000;
     > * {
       border: 1px solid red;
       background:pink;
       margin: 5px;
       display: flex;
       align-items: center;
       justify-content: center;
     }
   }
   ```

   :::

2. **auto-fill 关键字**
   有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充。
   :::normal-demo 代码演示

   ```html
   <div class="wrapper">
     <div class="box1">1</div>
     <div class="box2">2</div>
     <div class="box3">3</div>
     <div class="box4">4</div>
     <div class="box5">5</div>
     <div class="box6">6</div>
     <div class="box7">7</div>
     <div class="box8">8</div>
     <div class="box9">9</div>
   </div>
   ```

   ```css
   .wrapper {
     display: grid;
     grid-template-columns: repeat(auto-fill,150px);
     grid-template-rows: 100px 100px 100px;
     width: 100%;
     margin: auto;
     border: 1px solid #000;
     > * {
       border: 1px solid red;
       background:pink;
       margin: 5px;
       display: flex;
       align-items: center;
       justify-content: center;
     }
   }
   ```

   :::

3. **auto-fit 关键字** 
   除了`auto-fill`，还有一个关键字`auto-fit`，两者的行为基本是相同的。只有当容器足够宽，可以在一行容纳所有单元格，并且单元格宽度不固定的时候，才会有[行为差异](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)：`auto-fill`会用空格子填满剩余宽度，`auto-fit`则会尽量扩大单元格的宽度。

   :::normal-demo 代码演示

   ```html
   auto-fill
   <div class="grid-container grid-container--fill">
     <div class="grid-element">
       1
     </div>
     <div class="grid-element">
       2
     </div>
     <div class="grid-element">
       3
     </div>
     <div class="grid-element">
       4
     </div>
     <div class="grid-element">
       5
     </div>
     <div class="grid-element">
       6
     </div>
     <div class="grid-element">
       7
     </div>
   </div>
   
   <hr>
   
   auto-fit
   <div class="grid-container grid-container--fit">
     <div class="grid-element">
       1
     </div>
     <div class="grid-element">
       2
     </div>
     <div class="grid-element">
       3
     </div>
     <div class="grid-element">
       4
     </div>
     <div class="grid-element">
       5
     </div>
     <div class="grid-element">
       6
     </div>
     <div class="grid-element">
       7
     </div>
   </div>
   ```

   ```css
   .grid-container {
       display: grid;
   }
   
   .grid-container--fill {
       grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
   }
   
   .grid-container--fit {
       grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
   }
   
   
   
   
   
   .grid-element {
     background-color: deepPink;
     padding: 20px;
     color: #fff;
     border: 1px solid #ccc;
   }
   
   
   body {
     padding: 2em;
   }
   
   hr {
     margin: 80px;
   }
   ```

   :::

4. **fr 关键字**
   为了方便表示比例关系，网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍。

   :::normal-demo 代码演示

   ```html
   <div class="wrapper">
     <div class="box1">1</div>
     <div class="box2">2</div>
     <div class="box3">3</div>
     <div class="box4">4</div>
     <div class="box5">5</div>
     <div class="box6">6</div>
     <div class="box7">7</div>
     <div class="box8">8</div>
     <div class="box9">9</div>
   </div>
   ```

   ```css
   .wrapper {
     display: grid;
     grid-template-columns: 1fr 2fr 3fr;
     grid-template-rows: 100px 100px 100px;
     width: 100%;
     margin: auto;
     border: 1px solid #000;
     > * {
       border: 1px solid red;
       background:pink;
       margin: 5px;
       display: flex;
       align-items: center;
       justify-content: center;
     } 
   }
   ```

   :::

   `fr`可以与绝对长度的单位结合使用，这时会非常方便。

   :::tip

   `fr`会自动分配绝对长度剩余的空间，如下示例：

   :::normal-demo 代码演示

   ```html
   <div class="wrapper">
     <div class="box1">1</div>
     <div class="box2">2</div>
     <div class="box3">3</div>
     <div class="box4">4</div>
     <div class="box5">5</div>
     <div class="box6">6</div>
     <div class="box7">7</div>
     <div class="box8">8</div>
     <div class="box9">9</div>
   </div>
   ```

   ```css
   .wrapper {
     display: grid;
     grid-template-columns:100px 1fr 2fr;
     width: 100%;
     margin: auto;
     border: 1px solid #000;
     > * {
       border: 1px solid red;
       background:pink;
       margin: 5px;
       display: flex;
       align-items: center;
       justify-content: center;
     } 
   }
   ```

   :::

   :::

5. **minmax()**
   `minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

   ```css
   grid-template-columns: 1fr 1fr minmax(100px, 1fr);
   ```

   上面代码中，`minmax(100px, 1fr)`表示列宽不小于`100px`，不大于`1fr`。

6. **auto 关键字**
   `auto`关键字表示由浏览器自己决定长度。

   ```css
   grid-template-columns: 100px auto 100px;
   ```

   上面代码中，第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了`min-width`，且这个值大于最大宽度。

7. **网格线的名称**

8. `grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

    ```css
    .container {
      display: grid;
      grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
      grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
    }
    ```

   上面代码指定网格布局为3行 x 3列，因此有4根垂直网格线和4根水平网格线。方括号里面依次是这八根线的名字。

   网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。

### grid-row-gap 属性， grid-column-gap 属性， grid-gap 属性

`grid-row-gap`属性设置行与行的间隔（行间距），`grid-column-gap`属性设置列与列的间隔（列间距）。

 ```css
 .container {
   grid-row-gap: 20px;
   grid-column-gap: 20px;
 }
 ```

上面代码中，`grid-row-gap`用于设置行间距，`grid-column-gap`用于设置列间距。

`grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式，语法如下。

 ```css
 grid-gap: <grid-row-gap> <grid-column-gap>;
 ```

因此，上面一段 CSS 代码等同于下面的代码。

 ```css
 .container {
   grid-gap: 20px 20px;
 }
 ```

如果`grid-gap`省略了第二个值，浏览器认为第二个值等于第一个值。

:::danger

根据最新标准，上面三个属性名的`grid-`前缀已经删除，`grid-column-gap`和`grid-row-gap`写成`column-gap`和`row-gap`，`grid-gap`写成`gap`。

:::

:::normal-demo 代码演示

```html
<div class="wrapper">
  <div class="box1">1</div>
  <div class="box2">2</div>
  <div class="box3">3</div>
  <div class="box4">4</div>
  <div class="box5">5</div>
  <div class="box6">6</div>
  <div class="box7">7</div>
  <div class="box8">8</div>
  <div class="box9">9</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
/*   grid-column-gap:10px;
  grid-row-gap:10px; */
  grid-gap:10px 20px;
  width: 100%;
  margin: auto;
  border: 1px solid #000;
  > * {
    border: 1px solid red;
    background:pink;
    display: flex;
    align-items: center;
    justify-content: center;
  } 
}
```

:::

### grid-template-areas

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。

 ```css
 .container {
   display: grid;
   grid-template-columns: 100px 100px 100px;
   grid-template-rows: 100px 100px 100px;
   grid-template-areas: 'a b c'
                        'd e f'
                        'g h i';
 }
 ```

上面代码先划分出9个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。

多个单元格合并成一个区域的写法如下。

 ```css
 grid-template-areas: 'a a a'
                      'b b b'
                      'c c c';
 ```

上面代码将9个单元格分成`a`、`b`、`c`三个区域。

:::normal-demo 布局实例

```html
<section id="page">
  <header>Header</header>
  <nav>Navigation</nav>
  <main>Main area</main>
  <footer>Footer</footer>
</section>
```

```css
#page {
  display: grid; /* 1.设置 display 为 grid */
  width: 100%;
  height: 250px;
  grid-template-areas:
    "head head"
    "nav  main"
    "nav  foot"; /* 2.区域划分 当前为 三行 两列 */
  grid-template-rows: 50px 1fr 30px; /* 3.各区域 宽高设置 */
  grid-template-columns: 150px 1fr;
}

#page > header {
  grid-area: head; /* 4. 指定当前元素所在的区域位置，从 grid-template-areas 选取值 */
  background-color: #8ca0ff;
}

#page > nav {
  grid-area: nav;
  background-color: #ffa08c;
}

#page > main {
  grid-area: main;
  background-color: #ffff64;
}

#page > footer {
  grid-area: foot;
  background-color: #8cffa0;
}

```

:::

### grid-auto-flow 属性

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序。

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032506.png)

这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。

> ```css
> grid-auto-flow: column;
> ```

[上面代码](https://jsbin.com/xutokec/edit?css,output)设置了`column`以后，放置顺序就变成了下图。

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032512.png)

`grid-auto-flow`属性除了设置成`row`和`column`，还可以设成`row dense`和`column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

[下面的例子](https://jsbin.com/wapejok/edit?css,output)让1号项目和2号项目各占据两个单元格，然后在默认的`grid-auto-flow: row`情况下，会产生下面这样的布局。

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032513.png)

上图中，1号项目后面的位置是空的，这是因为3号项目默认跟着2号项目，所以会排在2号项目后面。

现在修改设置，设为`row dense`，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。

> ```css
> grid-auto-flow: row dense;
> ```

[上面代码](https://jsbin.com/helewuy/edit?css,output)的效果如下。

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032514.png)

上图会先填满第一行，再填满第二行，所以3号项目就会紧跟在1号项目的后面。8号项目和9号项目就会排到第四行。

如果将设置改为`column dense`，表示"先列后行"，并且尽量填满空格。

> ```css
> grid-auto-flow: column dense;
> ```

上面代码的效果如下。

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032515.png)

上图会先填满第一列，再填满第2列，所以3号项目在第一列，4号项目在第二列。8号项目和9号项目被挤到了第四列。

### grid-auto-columns 属性， grid-auto-rows 属性

有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。

`grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

[下面的例子](https://jsbin.com/sayuric/edit?css,output)里面，划分好的网格是3行 x 3列，但是，8号项目指定在第4行，9号项目指定在第5行。

 ```css
 .container {
   display: grid;
   grid-template-columns: 100px 100px 100px;
   grid-template-rows: 100px 100px 100px;
   grid-auto-rows: 50px; 
 }
 ```

上面代码指定新增的行高统一为50px（原始的行高为100px）。

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032525.png)

## 项目属性

### grid-column-start 属性， grid-column-end 属性， grid-row-start 属性， grid-row-end 属性

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

 - `grid-column-start`属性：左边框所在的垂直网格线
 - `grid-column-end`属性：右边框所在的垂直网格线
 - `grid-row-start`属性：上边框所在的水平网格线
 - `grid-row-end`属性：下边框所在的水平网格线

:::tip

没有指定位置的项目，由浏览器自动布局，这时它们的位置由容器的`grid-auto-flow`属性决定，这个属性的默认值是`row`，因此会"先行后列"进行排列。

:::

### grid-column 属性， grid-row 属性

 `grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

 ```css
 .item {
   grid-column: <start-line> / <end-line>;
   grid-row: <start-line> / <end-line>;
 }
 ```

下面是一个例子。

 ```css
 .item-1 {
   grid-column: 1 / 3;
   grid-row: 1 / 2;
 }
 /* 等同于 */
 .item-1 {
   grid-column-start: 1;
   grid-column-end: 3;
   grid-row-start: 1;
   grid-row-end: 2;
 }
 ```

上面代码中，项目`item-1`占据第一行，从第一根列线到第三根列线。

这两个属性之中，也可以使用`span`关键字，表示跨越多少个网格。

 ```css
 .item-1 {
   background: #b03532;
   grid-column: 1 / 3;
   grid-row: 1 / 3;
 }
 /* 等同于 */
 .item-1 {
   background: #b03532;
   grid-column: 1 / span 2;
   grid-row: 1 / span 2;
 }
 ```

### grid-area 属性

`grid-area`属性指定项目放在哪一个区域。

 ```css
 .item-1 {
   grid-area: e;
 }
 ```

[上面代码](https://jsbin.com/qokexob/edit?css,output)中，1号项目位于`e`区域，效果如下图。

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032530.png)

`grid-area`属性还可用作`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end`的合并简写形式，直接指定项目的位置。

 ```css
 .item {
   grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
 }
 ```

下面是一个[例子](https://jsbin.com/duyafez/edit?css,output)。

 ```css
 .item-1 {
   grid-area: 1 / 1 / 3 / 3;
 }
 ```

### justify-self 属性， align-self 属性， place-self 属性

`justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。

`align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

 ```css
 .item {
   justify-self: start | end | center | stretch;
   align-self: start | end | center | stretch;
 }
 ```

这两个属性都可以取下面四个值。

 - start：对齐单元格的起始边缘。
 - end：对齐单元格的结束边缘。
 - center：单元格内部居中。
 - stretch：拉伸，占满单元格的整个宽度（默认值）。

下面是`justify-self: start`的例子。

 ```css
 .item-1  {
   justify-self: start;
 }
 ```

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032532.png)

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

 ```css
 place-self: <align-self> <justify-self>;
 ```

下面是一个例子。

 ```css
 place-self: center center;
 ```

如果省略第二个值，`place-self`属性会认为这两个值相等。