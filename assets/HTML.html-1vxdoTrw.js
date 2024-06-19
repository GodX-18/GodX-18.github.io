import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as l,c as i,a as t}from"./app-oXp7PBbS.js";const a={},o=t('<h2 id="语义化标签" tabindex="-1"><a class="header-anchor" href="#语义化标签"><span>语义化标签</span></a></h2><h3 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么"><span>是什么</span></a></h3><p>是指在 HTML5 中具有语义的标签</p><h3 id="有哪些" tabindex="-1"><a class="header-anchor" href="#有哪些"><span>有哪些</span></a></h3><ul><li>header</li><li>footer</li><li>nav</li><li>section</li><li>aside</li><li>Article</li></ul><h3 id="意义" tabindex="-1"><a class="header-anchor" href="#意义"><span>意义</span></a></h3><ul><li>有利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重</li><li>让页面结构更加清晰，便于开发者的阅读和维护</li></ul><h2 id="href-和-src-的区别" tabindex="-1"><a class="header-anchor" href="#href-和-src-的区别"><span>href 和 src 的区别</span></a></h2><p><code>href</code> 和 <code>src</code> 都是 HTML 标记中的属性，但是它们的作用略有不同。</p><ul><li><code>href</code> 属性用于指定链接页面或资源的 URL 地址，并与 <code>&lt;a&gt;</code>、<code>&lt;link&gt;</code>、<code>&lt;area&gt;</code> 等标记一起使用。它是超链接的本质属性，能够让用户点击链接跳转到另外一个网页或文件。</li><li>而 <code>src</code> 属性用于指定页面中引用资源的 URL 地址，并与 <code>&lt;img&gt;</code>、<code>&lt;script&gt;</code>、<code>&lt;iframe&gt;</code> 等标记一起使用。它是引入外部资源的方法，能够让浏览器下载并渲染显示图片、脚本或其他嵌入的内容。</li></ul><p>综上所述，<code>href</code> 主要用于超链接跳转，<code>src</code> 主要用于资源引入。</p><p>它们之间的主要区别可以用这样一句话来概括：<code>src</code> 用于替代这个元素，而 <code>href</code> 用于建立这个标签与外部资源之间的关系。</p><h2 id="获取页面元素的几种方法" tabindex="-1"><a class="header-anchor" href="#获取页面元素的几种方法"><span>获取页面元素的几种方法</span></a></h2><p>在 JavaScript 中，有几种常用的方法可以获取页面中的元素：</p><ol><li><code>getElementById</code>：通过元素的 <code>id</code> 属性来获取元素。</li><li><code>getElementsByClassName</code>：通过元素的 <code>class</code> 属性来获取一组元素。</li><li><code>getElementsByTagName</code>：通过元素的标签名来获取一组元素。</li><li><code>querySelector</code>：使用 CSS 选择器来获取一个匹配的元素。</li><li><code>querySelectorAll</code>：使用 CSS 选择器来获取一组匹配的元素。</li></ol><h2 id="img-标签的-title-和-alt-有什么区别" tabindex="-1"><a class="header-anchor" href="#img-标签的-title-和-alt-有什么区别"><span>img 标签的 title 和 alt 有什么区别</span></a></h2><p>img 标签的 title 和 alt 都是用来描述图片的属性，但是它们的功能和作用有所不同：</p><ol><li><p>alt 属性是对于不支持显示图片的设备或浏览器的用户来说的，它提供了一种替代的文字描述，可以用于让用户了解图片的内容。因此，alt 属性的主要作用是为了让屏幕阅读器等辅助工具能够阅读图片的内容，以帮助视障用户更好地理解页面的内容。同时，alt 属性也可以提高网页的可访问性和 SEO 搜索引擎优化。</p></li><li><p>title 属性则是用来为图片提供一些附加的描述信息，当用户鼠标悬浮在图片上时，会显示出 title 属性的内容。title 属性可以用于向用户提供更详细的说明，比如图片的来源、作者、拍摄时间等信息。</p></li></ol><p>综上所述，alt 属性是必须要添加的，而 title 属性则是可选的，根据具体需要来决定是否添加。同时，在添加 alt 和 title 属性时，应该尽可能清晰、简洁地描述图片的内容，以提高用户体验和网页的可访问性。</p><h2 id="html5-新标签有哪些、应用场景" tabindex="-1"><a class="header-anchor" href="#html5-新标签有哪些、应用场景"><span>HTML5 新标签有哪些、应用场景</span></a></h2><p>HTML5 是一种基于文本的标记语言，为web开发提供了许多新特性和标签。下面是HTML5的一些新标签及其应用场景：</p><ol><li>header 标签</li></ol><p>用于定义文档或节的上部分，通常包含标题和导航栏等内容。</p><ol start="2"><li>nav 标签</li></ol><p>用于定义网页的导航链接，通常包含站内链接或外部链接。</p><ol start="3"><li>section 标签</li></ol><p>用于定义文档中的一块内容区域，通常包含一组关联的内容。</p><ol start="4"><li>article 标签</li></ol><p>用于定义一篇文章或独立的内容块，通常包含文章标题、作者、日期等信息。</p><ol start="5"><li>aside 标签</li></ol><p>用于定义文档或页面的侧边栏，通常包含补充性的信息。</p><ol start="6"><li>main 标签</li></ol><p>用于定义主要的内容块，通常是网页的中心内容。</p><ol start="7"><li>footer 标签</li></ol><p>用于定义文档或节的底部部分，通常包含版权信息、联系方式等内容。</p><ol start="8"><li>video 标签</li></ol><p>用于嵌入视频文件，支持多种视频格式。</p><ol start="9"><li>audio 标签</li></ol><p>用于嵌入音频文件，支持多种音频格式。</p><ol start="10"><li>figure 和 figcaption 标签</li></ol><p>用于定义一组图像及其相关描述，通常用于展示图片集或图表。figure 标签用于定义图像组，figcaption 标签用于定义图像的描述。</p><p>总之，使用这些新标签可以使网页结构更加清晰、语义更加明确，提高网站的可读性、可访问性和SEO效果。</p><h2 id="iframe-的优缺点" tabindex="-1"><a class="header-anchor" href="#iframe-的优缺点"><span>Iframe 的优缺点</span></a></h2><p><strong>优点：</strong></p><ol><li><p>可以嵌入其他网站的内容，方便实现页面功能和扩展。</p></li><li><p>可以实现异步加载，即页面读取完毕后再加载 IFrame 里的内容，避免页面因加载过多的内容而变慢。</p></li><li><p>IFrame 可以与服务器端交互，可以实现动态更新，实时显示内容。</p></li><li><p>IFrame 可以独立于主网页广告。</p></li></ol><p><strong>缺点：</strong></p><ol><li><p>IFrame 里的内容与主网页存在跨域问题，需要通过跨域请求解决。</p></li><li><p>IFrame 会影响页面加载速度，特别是当 IFrame 中内容较多时，会影响页面整体性能。</p></li><li><p>IFrame 对 SEO 不友好，因为搜索引擎无法抓取 IFrame 里的内容。</p></li><li><p>IFrame 存在页面安全问题。如果 IFrame 内容来自不可信的网站，则可能存在恶意代码。</p></li></ol><h2 id="doctype-作用" tabindex="-1"><a class="header-anchor" href="#doctype-作用"><span>Doctype 作用</span></a></h2><p>Doctype（文档类型声明）是一种用于告知浏览器使用哪种 HTML 文档类型的语句。它的主要作用包括：</p><ol><li>让浏览器正确渲染页面，确保页面在不同浏览器下的一致性。</li><li>帮助开发者编写符合规范的 HTML 代码。</li><li>确保网络爬虫的正常抓取和解析。</li><li>避免浏览器使用混杂模式（quirks mode），确保文档在标准模式（standards mode）下解析。</li></ol><div class="hint-container tip"><p class="hint-container-title">提示</p><p>当搜索引擎的爬虫抓取网页时，它们会根据 Doctype 声明来确定页面的 HTML 版本和标准，以及确定解析页面的方式。如果网页没有正确的 Doctype 声明，爬虫就可能无法正确抓取和解析网页的内容，从而对网站的 SEO 产生不利影响。因此在编写 HTML 页面时，建议添加正确的 Doctype 声明以确保网页的正常抓取和解析。</p></div><h2 id="页面导入样式时-使用-link-和-import-有什么区别" tabindex="-1"><a class="header-anchor" href="#页面导入样式时-使用-link-和-import-有什么区别"><span>页面导入样式时，使用 link 和 @import 有什么区别</span></a></h2><p>使用link和@import导入样式的区别如下：</p><ol><li>link是HTML标签，@import是CSS提供的语法规则。</li><li>link引入的样式页面加载时同时加载，@import引入的样式需等页面加载完成后再加载。</li><li>link没有兼容性问题，@import不兼容IE5以下。</li><li>link可以通过js操作DOM动态引入样式表改变样式，而@import不可以。</li><li>link 支持使用 media 属性控制样式文件在不同屏幕宽度下的适应性，@import 不支持。</li></ol>',54),r=[o];function c(n,p){return l(),i("div",null,r)}const h=e(a,[["render",c],["__file","HTML.html.vue"]]),m=JSON.parse('{"path":"/%E9%9D%A2%E8%AF%95/HTML.html","title":"HTML","lang":"zh-CN","frontmatter":{"title":"HTML","icon":"HTML","date":"2023-05-22T00:00:00.000Z","order":1,"category":["面试"],"tag":["HTML"],"description":"语义化标签 是什么 是指在 HTML5 中具有语义的标签 有哪些 header footer nav section aside Article 意义 有利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重 让页面结构更加清晰，便于开发者的阅读和维护 href 和 src 的区别 href 和 src 都是 HTML 标记中的属性，但是它们的作...","head":[["meta",{"property":"og:url","content":"https://godx-18.github.io/%E9%9D%A2%E8%AF%95/HTML.html"}],["meta",{"property":"og:site_name","content":"烜"}],["meta",{"property":"og:title","content":"HTML"}],["meta",{"property":"og:description","content":"语义化标签 是什么 是指在 HTML5 中具有语义的标签 有哪些 header footer nav section aside Article 意义 有利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重 让页面结构更加清晰，便于开发者的阅读和维护 href 和 src 的区别 href 和 src 都是 HTML 标记中的属性，但是它们的作..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-14T07:18:18.000Z"}],["meta",{"property":"article:author","content":"GodX"}],["meta",{"property":"article:tag","content":"HTML"}],["meta",{"property":"article:published_time","content":"2023-05-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-14T07:18:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HTML\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-14T07:18:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GodX\\",\\"url\\":\\"https://github.com/GodX-18\\"}]}"]]},"headers":[{"level":2,"title":"语义化标签","slug":"语义化标签","link":"#语义化标签","children":[{"level":3,"title":"是什么","slug":"是什么","link":"#是什么","children":[]},{"level":3,"title":"有哪些","slug":"有哪些","link":"#有哪些","children":[]},{"level":3,"title":"意义","slug":"意义","link":"#意义","children":[]}]},{"level":2,"title":"href 和 src 的区别","slug":"href-和-src-的区别","link":"#href-和-src-的区别","children":[]},{"level":2,"title":"获取页面元素的几种方法","slug":"获取页面元素的几种方法","link":"#获取页面元素的几种方法","children":[]},{"level":2,"title":"img 标签的 title 和 alt 有什么区别","slug":"img-标签的-title-和-alt-有什么区别","link":"#img-标签的-title-和-alt-有什么区别","children":[]},{"level":2,"title":"HTML5 新标签有哪些、应用场景","slug":"html5-新标签有哪些、应用场景","link":"#html5-新标签有哪些、应用场景","children":[]},{"level":2,"title":"Iframe 的优缺点","slug":"iframe-的优缺点","link":"#iframe-的优缺点","children":[]},{"level":2,"title":"Doctype 作用","slug":"doctype-作用","link":"#doctype-作用","children":[]},{"level":2,"title":"页面导入样式时，使用 link 和 @import 有什么区别","slug":"页面导入样式时-使用-link-和-import-有什么区别","link":"#页面导入样式时-使用-link-和-import-有什么区别","children":[]}],"git":{"createdTime":1684735463000,"updatedTime":1713079098000,"contributors":[{"name":"GodX","email":"1046529973@qq.com","commits":4}]},"readingTime":{"minutes":5.94,"words":1783},"filePathRelative":"面试/HTML.md","localizedDate":"2023年5月22日","excerpt":"<h2>语义化标签</h2>\\n<h3>是什么</h3>\\n<p>是指在 HTML5 中具有语义的标签</p>\\n<h3>有哪些</h3>\\n<ul>\\n<li>header</li>\\n<li>footer</li>\\n<li>nav</li>\\n<li>section</li>\\n<li>aside</li>\\n<li>Article</li>\\n</ul>\\n<h3>意义</h3>\\n<ul>\\n<li>有利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重</li>\\n<li>让页面结构更加清晰，便于开发者的阅读和维护</li>\\n</ul>\\n<h2>href 和 src 的区别</h2>\\n<p><code>href</code> 和 <code>src</code> 都是 HTML 标记中的属性，但是它们的作用略有不同。</p>","autoDesc":true}');export{h as comp,m as data};