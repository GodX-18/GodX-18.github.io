import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,a as e}from"./app-oXp7PBbS.js";const t={},o=e(`<h2 id="什么是模块化" tabindex="-1"><a class="header-anchor" href="#什么是模块化"><span>什么是模块化</span></a></h2><ul><li>模块化是一种开发思想、管理方式、生产方式和一种解决问题的方案</li><li>是指解决一个复杂问题时自顶向下逐层把整体划分成若干组成部分的过程</li><li>放在开发场景中，模块化就是有组织地把一个大文件拆成独立并互相依赖的多个小文件。在这里模块化是一种代码管理方式</li><li>每个模块的内部数据和方法是私有的，只是向外部暴露一些属性和方法（接口）供其它模块使用</li></ul><h2 id="模块化的意义" tabindex="-1"><a class="header-anchor" href="#模块化的意义"><span>模块化的意义</span></a></h2><p><em>模块化的目的在于最大化的设计重用，以最少的模块、零部件，更快速的满足更多的个性化需求。</em></p><h2 id="模块化演变过程" tabindex="-1"><a class="header-anchor" href="#模块化演变过程"><span>模块化演变过程</span></a></h2><h3 id="全局-function-模式" tabindex="-1"><a class="header-anchor" href="#全局-function-模式"><span>全局 function 模式</span></a></h3><p><strong>原理</strong></p><p><em>通过<code>script</code>标签的形式引入 JS 文件，在全局<code>window</code>对象中添加数据和方法。</em></p><p><strong>作用</strong></p><p><em>可以将大文件拆分成一个个小的文件</em></p><p><strong>缺陷</strong></p><p><em>污染全局命名空间、容易引起命名冲突 、数据不安全</em></p><h3 id="namespace-模式" tabindex="-1"><a class="header-anchor" href="#namespace-模式"><span>namespace 模式</span></a></h3><p><strong>原理</strong></p><p><em>将数据和方法封装到对象中，再通过<code>script</code>标签的形式引入该对象所在 JS 文件，供其他模块使用</em></p><p><strong>作用</strong></p><ul><li>解决了命名冲突的问题</li><li>减少了全局变量</li></ul><p><strong>缺陷</strong></p><p><em>数据不安全，外部可以直接修改模块内部的数据</em></p><h3 id="iife-模式" tabindex="-1"><a class="header-anchor" href="#iife-模式"><span>IIFE 模式</span></a></h3><p><strong>原理</strong></p><p><em>将数据和方法封装到一个函数内部，通过给 <code>window</code>添加属性来向外暴露接口，然后再通过<code>script</code>标签的形运行立即执行函数</em></p><p><strong>作用</strong></p><p><em>不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。</em></p><p><strong>缺陷</strong></p><p><em>无法管理模块间的依赖关系</em></p><h2 id="模块化规范" tabindex="-1"><a class="header-anchor" href="#模块化规范"><span>模块化规范</span></a></h2><p><em>浏览器中使用 <code>ES Modules</code>，node 环境中使用 <code>CommonJs</code></em></p><div class="hint-container info"><p class="hint-container-title">相关信息</p><p><code>ES Modules</code>规范是在<code>ES6</code>当中定义的一个模块系统。刚推出的时候，所有主流的浏览器是都不支持这个特性的，但是随着 webpack 等一系列打包工具的流行，这一规范才逐渐被普及。</p></div><h3 id="es-modules-基本特性" tabindex="-1"><a class="header-anchor" href="#es-modules-基本特性"><span>ES Modules 基本特性</span></a></h3><ul><li>自动采用严格模式，忽略 ‘use strict’</li><li>每个 ESM 模块都是单独的私有作用域</li><li>ESM 是通过 CORS 去请求外部 JS 模块的</li><li>ESM 的 script 标签会延迟执行脚本，相当于 <code>defer</code>属性</li></ul><h3 id="es-modules-导出" tabindex="-1"><a class="header-anchor" href="#es-modules-导出"><span>ES Modules 导出</span></a></h3><p><strong>错误示范</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// 报错</span>
<span class="token keyword">export</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> m<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正确示范</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// 写法一</span>
<span class="token keyword">export</span> <span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// 写法二</span>
<span class="token keyword">var</span> m <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>m<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 写法三</span>
<span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span>n <span class="token keyword">as</span> m<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><ul><li><code>ES Modules</code> 输出的是值的引用，这意味着如果引用模块中的原始值发生变化，拿到的值也会动态变化</li><li><code>ES Modules</code> 输出的是值是只读的，不能够修改</li></ul></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p><code>export {}</code>是一种固定语法，并不是一个对象。使用 <code>import {}</code>接收时也不是用的对象的数据解构，这一点很容易让人混淆！如果要导出一个对象，使用<code>export default</code>即可。</p></div><h3 id="es-modules-导入" tabindex="-1"><a class="header-anchor" href="#es-modules-导入"><span>ES Modules 导入</span></a></h3><p><strong>引用路径</strong></p><ul><li>必须要有完整的文件名称，后缀名不能省略</li><li>可以使用绝对路径和完整的第三方模块的地址</li></ul><p><strong>加载模块不提取当中的成员</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;xxx&#39;</span>
<span class="token comment">// 简写语法</span>
<span class="token keyword">import</span> <span class="token string">&#39;xxxx&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>导出所有成员</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> all <span class="token keyword">from</span> <span class="token string">&#39;xxx&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>动态导入模块</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;xxxx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>module<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>同时导入命名成员和默认成员</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">import</span> defau<span class="token punctuation">,</span><span class="token punctuation">{</span>a<span class="token punctuation">,</span>b<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;xxxx&#39;</span>
<span class="token comment">// 或者</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>a<span class="token punctuation">,</span>b<span class="token punctuation">,</span><span class="token keyword">default</span> <span class="token keyword">as</span> xx<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;xxxx&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="export-与-import-的复合写法" tabindex="-1"><a class="header-anchor" href="#export-与-import-的复合写法"><span>export 与 import 的复合写法</span></a></h3><p><strong>使用场景</strong></p><p><em>如果在一个模块之中，先输入后输出同一个模块，<code>import</code>语句可以与<code>export</code>语句写在一起。</em></p><p><strong>案例</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;my_module&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 可以简单理解为</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;my_module&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>上面代码中，<code>export</code>和<code>import</code>语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，<code>foo</code>和<code>bar</code>实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用<code>foo</code>和<code>bar</code>。</p></div><p><strong>接口改名</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span> <span class="token keyword">as</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;my_module&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>整体输出</strong></p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&#39;xxx&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="es-modules-in-browser" tabindex="-1"><a class="header-anchor" href="#es-modules-in-browser"><span>ES Modules in Browser</span></a></h3><p><strong>Polyfill 兼容方案</strong></p><p><em>ES Modules 是 2014出现的，早期的浏览器并不支持，到目前为止一些浏览器也并不支持，比如 IE</em></p><figure><img src="https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221012134400316.png" alt="image-20221012134400316" tabindex="0" loading="lazy"><figcaption>image-20221012134400316</figcaption></figure><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token constant">DOCTYPE</span> html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">&quot;en&quot;</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">&quot;UTF-8&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>meta name<span class="token operator">=</span><span class="token string">&quot;viewport&quot;</span> content<span class="token operator">=</span><span class="token string">&quot;width=device-width, initial-scale=1.0&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>meta http<span class="token operator">-</span>equiv<span class="token operator">=</span><span class="token string">&quot;X-UA-Compatible&quot;</span> content<span class="token operator">=</span><span class="token string">&quot;ie=edge&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>title<span class="token operator">&gt;</span><span class="token constant">ES</span> Module 浏览器环境 Polyfill<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>script nomodule src<span class="token operator">=</span><span class="token string">&quot;https://unpkg.com/promise-polyfill@8.1.3/dist/polyfill.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>script nomodule src<span class="token operator">=</span><span class="token string">&quot;https://unpkg.com/browser-es-module-loader@0.4.1/dist/babel-browser-build.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>script nomodule src<span class="token operator">=</span><span class="token string">&quot;https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">&quot;module&quot;</span><span class="token operator">&gt;</span>
    <span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./module.js&#39;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p><code>nomodule</code>属性仅会在不支持 <code>es module</code>的浏览器中使用。使用这个属性的目的我因为在支持<code>es modules</code>的浏览器中，动态解析会让脚本执行两次</p></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>上面这种外链<code>polyfill</code>包的方式只适合于测试环境进行测试，正式环境千万不要用这种方式，因为它的原理都是在运行阶段动态的去解析脚本，效率十分低下。生产环境我们应该预先将代码编译出来，让编译后的代码直接在浏览器中工作</p></div><h3 id="es-modules-in-nodejs" tabindex="-1"><a class="header-anchor" href="#es-modules-in-nodejs"><span>ES Modules in Nodejs</span></a></h3><ul><li>ES Modules 作为 Js 语言层面的模块化标准，会逐步统一所有 JS 领域的模块化需求</li><li>Nodejs 8.5 版本之后，内部已经以实验的方式开始支持 <code>es modules</code>，目前属于过度状态</li></ul><p><strong>ES6 加载 Commonjs 模块</strong></p><p>ES6 模块的<code>import</code>命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// 正确</span>
<span class="token keyword">import</span> packageMain <span class="token keyword">from</span> <span class="token string">&#39;commonjs-package&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> method <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;commonjs-package&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为 ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是<code>module.exports</code>，是一个对象，无法被静态分析，所以只能整体加载。</p><div class="hint-container info"><p class="hint-container-title">相关信息</p><ul><li>ES Modules 中可以导入 CommonJs 模块</li><li>CommonJs 中不能导入 ES Modules 模块</li><li>CommonJS 始终只会导出一个默认成员</li><li>注意 import 不是解构导出对象</li></ul></div><p><strong>Node 环境中 ES Modules 和 CommonJs 的差异</strong></p><p><em><code>ES Modules</code> 作为 <code>Js</code> 语言层面的模块化标准，会逐步统一所有 <code>JS</code> 领域的模块化需求。所以 <code>ES6</code> 的模块化应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，<code>Nodejs</code> 规定 ES6 模块之中不能使用 <code>CommonJs</code> 模中特有的一些内部变量。</em></p><p><em>首先，就是<code>this</code>关键字。ES6 模块之中，顶层的 this 指向 undefined；而 CommonJS 模块的顶层 this 指向当前模块，这是两者的一个重大差异。</em></p><p>其次，以下这些顶层变量在 ES6 模块之中都是不存在的。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// 加载模块函数</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>require<span class="token punctuation">)</span>

<span class="token comment">// 模块对象</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>module<span class="token punctuation">)</span>

<span class="token comment">// 导出对象别名</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>exports<span class="token punctuation">)</span>

<span class="token comment">// 当前文件的绝对路径</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>__filename<span class="token punctuation">)</span>

<span class="token comment">// 当前文件所在目录</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>require, module, exports 自然是通过 import 和 export 代替</em>。</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">// 通过 url 模块的 fileURLToPath 方法转换为路径</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> fileURLToPath <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;url&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> dirname <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span>
<span class="token keyword">const</span> __filename <span class="token operator">=</span> <span class="token function">fileURLToPath</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span> <span class="token comment">// 将文件地址转换成文件的绝对路径</span>
<span class="token keyword">const</span> __dirname <span class="token operator">=</span> <span class="token function">dirname</span><span class="token punctuation">(</span>__filename<span class="token punctuation">)</span> <span class="token comment">// 提取文件夹部分</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>__filename<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Babel 兼容方案</strong></p><p><em>对于早期的 Node.js 版本，可以使用 Babel 实现 ES Module 的兼容</em></p><ol><li><p>安装相关依赖</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> @babel/node @babel/core @babel/preet-env <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>使用命令行传入参数或者新建<code>.babelrc</code>传入参数</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 命令行</span>
<span class="token function">yarn</span> babel-node index.js <span class="token parameter variable">--presets</span><span class="token operator">=</span>@babel/preset-env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// 插件</span>
   <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
     <span class="token string">&quot;@babel/plugin-transform-modules-commonjs&quot;</span>
   <span class="token punctuation">]</span>
  <span class="token comment">// 指定预设集合</span>
  <span class="token property">&quot;presets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p><code>preset</code>是一组插件，也可以使用的特定的插件去优化编译</p></div></li></ol>`,83),p=[o];function l(i,c){return n(),a("div",null,p)}const u=s(t,[["render",l],["__file","模块化开发.html.vue"]]),m=JSON.parse('{"path":"/%E5%A4%A7%E5%89%8D%E7%AB%AF/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%E5%AE%9E%E6%88%98/%E6%A8%A1%E5%9D%97%E5%8C%96%E5%BC%80%E5%8F%91.html","title":"模块化开发","lang":"zh-CN","frontmatter":{"title":"模块化开发","icon":"categoryselected","order":2,"category":["前端"],"tag":["模块化"],"description":"什么是模块化 模块化是一种开发思想、管理方式、生产方式和一种解决问题的方案 是指解决一个复杂问题时自顶向下逐层把整体划分成若干组成部分的过程 放在开发场景中，模块化就是有组织地把一个大文件拆成独立并互相依赖的多个小文件。在这里模块化是一种代码管理方式 每个模块的内部数据和方法是私有的，只是向外部暴露一些属性和方法（接口）供其它模块使用 模块化的意义 模...","head":[["meta",{"property":"og:url","content":"https://godx-18.github.io/%E5%A4%A7%E5%89%8D%E7%AB%AF/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%E5%AE%9E%E6%88%98/%E6%A8%A1%E5%9D%97%E5%8C%96%E5%BC%80%E5%8F%91.html"}],["meta",{"property":"og:site_name","content":"烜"}],["meta",{"property":"og:title","content":"模块化开发"}],["meta",{"property":"og:description","content":"什么是模块化 模块化是一种开发思想、管理方式、生产方式和一种解决问题的方案 是指解决一个复杂问题时自顶向下逐层把整体划分成若干组成部分的过程 放在开发场景中，模块化就是有组织地把一个大文件拆成独立并互相依赖的多个小文件。在这里模块化是一种代码管理方式 每个模块的内部数据和方法是私有的，只是向外部暴露一些属性和方法（接口）供其它模块使用 模块化的意义 模..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221012134400316.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-09T07:48:13.000Z"}],["meta",{"property":"article:author","content":"GodX"}],["meta",{"property":"article:tag","content":"模块化"}],["meta",{"property":"article:modified_time","content":"2023-03-09T07:48:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"模块化开发\\",\\"image\\":[\\"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20221012134400316.png\\"],\\"dateModified\\":\\"2023-03-09T07:48:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GodX\\",\\"url\\":\\"https://github.com/GodX-18\\"}]}"]]},"headers":[{"level":2,"title":"什么是模块化","slug":"什么是模块化","link":"#什么是模块化","children":[]},{"level":2,"title":"模块化的意义","slug":"模块化的意义","link":"#模块化的意义","children":[]},{"level":2,"title":"模块化演变过程","slug":"模块化演变过程","link":"#模块化演变过程","children":[{"level":3,"title":"全局 function 模式","slug":"全局-function-模式","link":"#全局-function-模式","children":[]},{"level":3,"title":"namespace 模式","slug":"namespace-模式","link":"#namespace-模式","children":[]},{"level":3,"title":"IIFE 模式","slug":"iife-模式","link":"#iife-模式","children":[]}]},{"level":2,"title":"模块化规范","slug":"模块化规范","link":"#模块化规范","children":[{"level":3,"title":"ES Modules 基本特性","slug":"es-modules-基本特性","link":"#es-modules-基本特性","children":[]},{"level":3,"title":"ES Modules 导出","slug":"es-modules-导出","link":"#es-modules-导出","children":[]},{"level":3,"title":"ES Modules 导入","slug":"es-modules-导入","link":"#es-modules-导入","children":[]},{"level":3,"title":"export 与 import 的复合写法","slug":"export-与-import-的复合写法","link":"#export-与-import-的复合写法","children":[]},{"level":3,"title":"ES Modules in Browser","slug":"es-modules-in-browser","link":"#es-modules-in-browser","children":[]},{"level":3,"title":"ES Modules in Nodejs","slug":"es-modules-in-nodejs","link":"#es-modules-in-nodejs","children":[]}]}],"git":{"createdTime":1678348093000,"updatedTime":1678348093000,"contributors":[{"name":"GodX","email":"1046529973@qq.com","commits":1}]},"readingTime":{"minutes":6.7,"words":2010},"filePathRelative":"大前端/前端工程化实战/模块化开发.md","localizedDate":"2023年3月9日","excerpt":"<h2>什么是模块化</h2>\\n<ul>\\n<li>模块化是一种开发思想、管理方式、生产方式和一种解决问题的方案</li>\\n<li>是指解决一个复杂问题时自顶向下逐层把整体划分成若干组成部分的过程</li>\\n<li>放在开发场景中，模块化就是有组织地把一个大文件拆成独立并互相依赖的多个小文件。在这里模块化是一种代码管理方式</li>\\n<li>每个模块的内部数据和方法是私有的，只是向外部暴露一些属性和方法（接口）供其它模块使用</li>\\n</ul>\\n<h2>模块化的意义</h2>\\n<p><em>模块化的目的在于最大化的设计重用，以最少的模块、零部件，更快速的满足更多的个性化需求。</em></p>","autoDesc":true}');export{u as comp,m as data};
