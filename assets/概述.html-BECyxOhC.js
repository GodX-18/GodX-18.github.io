import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as i,c as t,a as l}from"./app-oXp7PBbS.js";const a={},n=l(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>滑动窗口算法是一种处理字符串或数组问题的技术，它可以用一个固定大小的窗口在输入数据上滑动，从而优化时间复杂度。</p><h2 id="算法流程" tabindex="-1"><a class="header-anchor" href="#算法流程"><span>算法流程</span></a></h2><p>滑动窗口算法的基本思想是维护一个窗口的起始和结束位置，根据题目要求不断地调整窗口的大小和位置，同时更新窗口内的信息，如最大值、最小值、平均值、异位词等。</p><p>从类型上说主要有：</p><ul><li>固定窗口大小</li><li>窗口大小不固定，求解最大的满足条件的窗口</li><li>窗口大小不固定，求解最小的满足条件的窗口</li></ul><h3 id="固定窗口大小" tabindex="-1"><a class="header-anchor" href="#固定窗口大小"><span>固定窗口大小</span></a></h3><p>对于固定窗口，我们只需要固定初始化左右指针 l 和 r，分别表示的窗口的左右顶点，并且保证：</p><ol><li>l 初始化为 0</li><li>初始化 r，使得 r - l + 1 等于窗口大小</li><li>同时移动 l 和 r</li><li>判断窗口内的连续元素是否满足题目限定的条件 <ol><li>如果满足，再判断是否需要更新最优解，如果需要则更新最优解</li><li>如果不满足，则继续。</li></ol></li></ol><h3 id="可变窗口大小" tabindex="-1"><a class="header-anchor" href="#可变窗口大小"><span>可变窗口大小</span></a></h3><p>对于可变窗口，我们同样固定初始化左右指针 l 和 r，分别表示的窗口的左右顶点。后面有所不同，我们需要保证：</p><ol><li>l 和 r 都初始化为 0</li><li>r 指针移动一步</li><li>判断窗口内的连续元素是否满足题目限定的条件 <ol><li>如果满足，再判断是否需要更新最优解，如果需要则更新最优解。并尝试通过移动 l 指针缩小窗口大小。循环执行</li><li>如果不满足，则继续。</li></ol></li></ol><p>形象地来看的话，就是 r 指针不停向右移动，l 指针仅仅在窗口满足条件之后才会移动，起到窗口收缩的效果。</p><figure><img src="https://p.ipic.vip/q5hcro.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h2><p>滑动窗口算法可以解决一些常见的子串或子数组问题，例如最长无重复子串、最小覆盖子串、最大和子数组等。</p><h2 id="模版代码" tabindex="-1"><a class="header-anchor" href="#模版代码"><span>模版代码</span></a></h2><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>初始化慢指针 <span class="token operator">=</span> <span class="token number">0</span>
初始化 ans
<span class="token keyword">for</span> 快指针 <span class="token keyword">in</span> 可迭代集合
   更新窗口内信息
   <span class="token keyword">while</span> 窗口内不符合题意
      扩展或者收缩窗口
      慢指针移动
   更新答案
返回 ans
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),r=[n];function s(o,p){return i(),t("div",null,r)}const h=e(a,[["render",s],["__file","概述.html.vue"]]),m=JSON.parse('{"path":"/%E7%AE%97%E6%B3%95/%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3/%E6%A6%82%E8%BF%B0.html","title":"概述","lang":"zh-CN","frontmatter":{"title":"概述","date":"2024-01-12T00:00:00.000Z","order":1,"category":["算法"],"tag":["滑动窗口"],"description":"简介 滑动窗口算法是一种处理字符串或数组问题的技术，它可以用一个固定大小的窗口在输入数据上滑动，从而优化时间复杂度。 算法流程 滑动窗口算法的基本思想是维护一个窗口的起始和结束位置，根据题目要求不断地调整窗口的大小和位置，同时更新窗口内的信息，如最大值、最小值、平均值、异位词等。 从类型上说主要有： 固定窗口大小 窗口大小不固定，求解最大的满足条件的窗...","head":[["meta",{"property":"og:url","content":"https://godx-18.github.io/%E7%AE%97%E6%B3%95/%E6%BB%91%E5%8A%A8%E7%AA%97%E5%8F%A3/%E6%A6%82%E8%BF%B0.html"}],["meta",{"property":"og:site_name","content":"烜"}],["meta",{"property":"og:title","content":"概述"}],["meta",{"property":"og:description","content":"简介 滑动窗口算法是一种处理字符串或数组问题的技术，它可以用一个固定大小的窗口在输入数据上滑动，从而优化时间复杂度。 算法流程 滑动窗口算法的基本思想是维护一个窗口的起始和结束位置，根据题目要求不断地调整窗口的大小和位置，同时更新窗口内的信息，如最大值、最小值、平均值、异位词等。 从类型上说主要有： 固定窗口大小 窗口大小不固定，求解最大的满足条件的窗..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://p.ipic.vip/q5hcro.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-20T08:17:41.000Z"}],["meta",{"property":"article:author","content":"GodX"}],["meta",{"property":"article:tag","content":"滑动窗口"}],["meta",{"property":"article:published_time","content":"2024-01-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-20T08:17:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"概述\\",\\"image\\":[\\"https://p.ipic.vip/q5hcro.jpg\\"],\\"datePublished\\":\\"2024-01-12T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-20T08:17:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GodX\\",\\"url\\":\\"https://github.com/GodX-18\\"}]}"]]},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"算法流程","slug":"算法流程","link":"#算法流程","children":[{"level":3,"title":"固定窗口大小","slug":"固定窗口大小","link":"#固定窗口大小","children":[]},{"level":3,"title":"可变窗口大小","slug":"可变窗口大小","link":"#可变窗口大小","children":[]}]},{"level":2,"title":"应用场景","slug":"应用场景","link":"#应用场景","children":[]},{"level":2,"title":"模版代码","slug":"模版代码","link":"#模版代码","children":[]}],"git":{"createdTime":1705738661000,"updatedTime":1705738661000,"contributors":[{"name":"GodX","email":"1046529973@qq.com","commits":1}]},"readingTime":{"minutes":2.12,"words":637},"filePathRelative":"算法/滑动窗口/概述.md","localizedDate":"2024年1月12日","excerpt":"<h2>简介</h2>\\n<p>滑动窗口算法是一种处理字符串或数组问题的技术，它可以用一个固定大小的窗口在输入数据上滑动，从而优化时间复杂度。</p>\\n<h2>算法流程</h2>\\n<p>滑动窗口算法的基本思想是维护一个窗口的起始和结束位置，根据题目要求不断地调整窗口的大小和位置，同时更新窗口内的信息，如最大值、最小值、平均值、异位词等。</p>\\n<p>从类型上说主要有：</p>\\n<ul>\\n<li>固定窗口大小</li>\\n<li>窗口大小不固定，求解最大的满足条件的窗口</li>\\n<li>窗口大小不固定，求解最小的满足条件的窗口</li>\\n</ul>\\n<h3>固定窗口大小</h3>\\n<p>对于固定窗口，我们只需要固定初始化左右指针 l 和 r，分别表示的窗口的左右顶点，并且保证：</p>","autoDesc":true}');export{h as comp,m as data};
