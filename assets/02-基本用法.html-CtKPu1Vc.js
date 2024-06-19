import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as c,c as d,b as a,e,d as n,a as s}from"./app-oXp7PBbS.js";const l={},o=s(`<h2 id="类型声明" tabindex="-1"><a class="header-anchor" href="#类型声明"><span>类型声明</span></a></h2><p>TS 最明显的特征，就是为 JS 变量加上变量声明。</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> foo<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>类型声明的写法</strong></p><p>一律在标识符后面添加“冒号 + 类型”。函数的参数和返回值，也是这样来声明类型。</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">toString</span><span class="token punctuation">(</span>num<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">String</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><ul><li>变量的值应该与声明的类型一支，如果不一致，TS 就会报错。</li><li>TS 规定，变量只有赋值后才能使用，否则就会报错。</li></ul></div><h2 id="类型推断" tabindex="-1"><a class="header-anchor" href="#类型推断"><span>类型推断</span></a></h2><p>类型声明并不是必要的，如果没有，TS 会自己推断类型。</p><div class="hint-container warning"><p class="hint-container-title">注意</p><ul><li>TS 的类型推断是根据变量的初始化或赋值的方式来推断类型的，而不是根据第一次获取到值的类型。</li><li>如果你没有为变量定义任何类型，那么 TS 将会把变量推断为 any 类型。</li></ul><p>例如，如果您这样写：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// x 的类型被推断为 number</span>
x <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 报错，不能将类型 &quot;string&quot; 分配给类型 &quot;number&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>那么 TypeScript 会推断 x 的类型为 number，因为它是用一个数字字面量初始化的。但是如果您这样写：</p><div class="language-typescript line-numbers-mode" data-ext="ts" data-title="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> y<span class="token punctuation">;</span> <span class="token comment">// y 的类型被推断为 any</span>
y <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// 没有报错，可以将类型 &quot;number&quot; 分配给类型 &quot;any&quot;</span>
y <span class="token operator">=</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 没有报错，可以将类型 &quot;string&quot; 分配给类型 &quot;any&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么 TypeScript 会推断 y 的类型为 any，因为它没有被初始化，而是被声明了。any 类型是一种特殊的类型，它可以接受任何类型的值，所以您可以给 y 赋任何类型的值，而不会报错。这样的类型推断可能会导致一些潜在的错误，所以建议您尽量避免使用 any 类型，或者使用 <code>--noImplicitAny</code> 选项来禁止 TypeScript 推断 any 类型。</p></div><div class="hint-container tip"><p class="hint-container-title">TypeScript 的 设计思想</p><p>类型声明是可选的，你可以加，也可以不加。即时不加类型声明，依然是有效的 TS 代码，只是这时不能保证 TS 会正确推断出类型。由于这个原因，所有的 JS 代码都是合法的 TS 代码。</p><p>这样设计还有一个好处，将以前的 JS 项目 改为 TS 项目时，你可以逐步地为老代码添加类型，即时有些代码没有添加，也不会无法运行。</p></div><h2 id="typescript-的编译" tabindex="-1"><a class="header-anchor" href="#typescript-的编译"><span>TypeScript 的编译</span></a></h2><p>JS 的运行环境 NodeJs 不认识 TS 代码。所以，TS 项目想要运行，必须先将代码编译成 JS 代码，这个转换的过程就叫做 “编译”。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>TS 官方没有做运行环境，只提供编译器。编译时，会将类型声明和类型相关的代码全部删除，只留下能运行的 JS 代码，并且不会改变 JS 的运行结果。</p><p>因此，TS 的类型检查只是编译时的类型检查，而不是运行时的类型检查。一旦代码编译为 JS，运行时就不在检查类型了。</p></div><h2 id="值与类型" tabindex="-1"><a class="header-anchor" href="#值与类型"><span>值与类型</span></a></h2><p>学习 TypeScript 需要分清楚“值”（value）和“类型”（type）。</p><p>“类型”是针对“值”的，可以视为是后者的一个元属性。每一个值在 TypeScript 里面都是有类型的。比如，<code>3</code>是一个值，它的类型是<code>number</code>。</p><p>TypeScript 代码只涉及类型，不涉及值。所有跟“值”相关的处理，都由 JavaScript 完成。</p><p>这一点务必牢记。TypeScript 项目里面，其实存在两种代码，一种是底层的“值代码”，另一种是上层的“类型代码”。前者使用 JavaScript 语法，后者使用 TypeScript 的类型语法。</p><p>它们是可以分离的，TypeScript 的编译过程，实际上就是把“类型代码”全部拿掉，只保留“值代码”。</p><p>编写 TypeScript 项目时，不要混淆哪些是值代码，哪些是类型代码。</p><h2 id="typescript-playground" tabindex="-1"><a class="header-anchor" href="#typescript-playground"><span>TypeScript Playground</span></a></h2>`,22),r={href:"http://www.typescriptlang.org/play/",target:"_blank",rel:"noopener noreferrer"},u=s(`<p>只要打开这个网页，把 TypeScript 代码贴进文本框，它就会在当前页面自动编译出 JavaScript 代码，还可以在浏览器执行编译产物。如果编译报错，它也会给出详细的报错信息。</p><p>这个页面还具有支持完整的 IDE 支持，可以自动语法提示。此外，它支持把代码片段和编译器设置保存成 URL，分享给他人。</p><h2 id="tsc-编译器" tabindex="-1"><a class="header-anchor" href="#tsc-编译器"><span>tsc 编译器</span></a></h2><p>TypeScript 官方提供的编译器叫做 tsc，可以将 TypeScript 脚本编译成 JavaScript 脚本。本机想要编译 TypeScript 代码，必须安装 tsc。</p><p>根据约定，TypeScript 脚本文件使用<code>.ts</code>后缀名，JavaScript 脚本文件使用<code>.js</code>后缀名。tsc 的作用就是把<code>.ts</code>脚本转变成<code>.js</code>脚本。</p><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h3><p>tsc 是一个 npm 模块，使用下面的命令安装（必须先安装 npm）。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> typescript <span class="token parameter variable">-g</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令是全局安装 tsc，也可以在项目中将 tsc 安装为一个依赖模块。</p><p>安装完成后，检查一下是否安装成功。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 或者使用 tsc --version</span>
tsc <span class="token parameter variable">-v</span>   
<span class="token comment"># Version 5.1.6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="帮助信息" tabindex="-1"><a class="header-anchor" href="#帮助信息"><span>帮助信息</span></a></h3><p><code>-h</code>或<code>--help</code>参数输出帮助信息。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>tsc <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认情况下，“--help”参数仅显示基本的可用选项。我们可以使用“--all”参数，查看完整的帮助信息。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>tsc <span class="token parameter variable">--all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="编译脚本" tabindex="-1"><a class="header-anchor" href="#编译脚本"><span>编译脚本</span></a></h3><p>安装 tsc 之后，就可以编译 TypeScript 脚本了。</p><p><code>tsc</code>命令后面，加上 TypeScript 脚本文件，就可以将其编译成 JavaScript 脚本。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>tsc app.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令会在当前目录下，生成一个<code>app.js</code>脚本文件，这个脚本就完全是编译后生成的 JavaScript 代码。</p><p><code>tsc</code>命令也可以一次编译多个 TypeScript 脚本。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>tsc file1.ts file2.ts file3.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令会在当前目录生成三个 JavaScript 脚本文件<code>file1.js</code>、<code>file2.js</code>、<code>file3.js</code>。</p><p>tsc 有很多参数，可以调整编译行为。</p><p><strong>（1）--outFile</strong></p><p>如果想将多个 TypeScript 脚本编译成一个 JavaScript 文件，使用<code>--outFile</code>参数。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>tsc file1.ts file2.ts <span class="token parameter variable">--outFile</span> app.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令将<code>file1.ts</code>和<code>file2.ts</code>两个脚本编译成一个 JavaScript 文件<code>app.js</code>。</p><p><strong>（2）--outDir</strong></p><p>编译结果默认都保存在当前目录，<code>--outDir</code>参数可以指定保存到其他目录。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ tsc app.ts --outDir dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令会在<code>dist</code>子目录下生成<code>app.js</code>。</p><p><strong>（3）--target</strong></p><p>为了保证编译结果能在各种 JavaScript 引擎运行，tsc 默认会将 TypeScript 代码编译成很低版本的 JavaScript，即3.0版本（以<code>es3</code>表示）。这通常不是我们想要的结果。</p><p>这时可以使用<code>--target</code>参数，指定编译后的 JavaScript 版本。建议使用<code>es2015</code>，或者更新版本。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>tsc <span class="token parameter variable">--target</span> es2015 app.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="编译错误的处理" tabindex="-1"><a class="header-anchor" href="#编译错误的处理"><span>编译错误的处理</span></a></h3><p>编译过程中，如果没有报错，<code>tsc</code>命令不会有任何显示。所以，如果你没有看到任何提示，就表示编译成功了。</p><p>如果编译报错，<code>tsc</code>命令就会显示报错信息，但是这种情况下，依然会编译生成 JavaScript 脚本。</p><div class="hint-container tip"><p class="hint-container-title">为什么编译报错依然会编译生成 JavaScript 脚本？</p><p>这是因为 TypeScript 团队认为，编译器的作用只是给出编译错误，至于怎么处理这些错误，那就是开发者自己的判断了。开发者更了解自己的代码，所以不管怎样，编译产物都会生成，让开发者决定下一步怎么处理。</p></div><p>如果希望一旦报错就停止编译，不生成编译产物，可以使用<code>--noEmitOnError</code>参数。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ tsc --noEmitOnError app.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令在报错后，就不会生成<code>app.js</code>。</p><p>tsc 还有一个<code>--noEmit</code>参数，只检查类型是否正确，不生成 JavaScript 文件。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ tsc --noEmit app.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令只检查是否有编译错误，不会生成<code>app.js</code>.</p><h3 id="tsconfig-json" tabindex="-1"><a class="header-anchor" href="#tsconfig-json"><span>tsconfig.json</span></a></h3><p>TypeScript 允许将<code>tsc</code>的编译参数，写在配置文件<code>tsconfig.json</code>。只要当前目录有这个文件，<code>tsc</code>就会自动读取，所以运行时可以不写参数。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>tsc file1.ts file2.ts <span class="token parameter variable">--outFile</span> dist/app.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面这个命令写成<code>tsconfig.json</code>，就是下面这样。</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;files&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;file1.ts&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;file2.ts&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;outFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/app.js&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了这个配置文件，编译时直接调用<code>tsc</code>命令就可以了。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>tsc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="ts-node-模块" tabindex="-1"><a class="header-anchor" href="#ts-node-模块"><span>ts-node 模块</span></a></h2>`,55),v={href:"https://github.com/TypeStrong/ts-node",target:"_blank",rel:"noopener noreferrer"},m=s(`<p>使用时，可以先全局安装它。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ npm install -g ts-node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装后，就可以直接运行 TypeScript 脚本。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ts-node script.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令运行了 TypeScript 脚本<code>script.ts</code>，给出运行结果。</p><p>如果不安装 ts-node，也可以通过 npx 调用它来运行 TypeScript 脚本。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ npx ts-node script.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面命令中，<code>npx</code>会在线调用 ts-node，从而在不安装的情况下，运行<code>script.ts</code>。</p><p>如果执行 ts-node 命令不带有任何参数，它会提供一个 TypeScript 的命令行 REPL 运行环境，你可以在这个环境中输入 TypeScript 代码，逐行执行。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ts-node
&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，单独运行<code>ts-node</code>命令，会给出一个大于号，这就是 TypeScript 的 REPL 运行环境，可以逐行输入代码运行。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ts-node
&gt; const twice = (x:string) =&gt; x + x;
&gt; twice(&#39;abc&#39;)
&#39;abcabc&#39;
&gt; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面示例中，在 TypeScript 命令行 REPL 环境中，先输入一个函数<code>twice</code>，然后调用该函数，就会得到结果。</p><p>要退出这个 REPL 环境，可以按下 Ctrl + d，或者输入<code>.exit</code>。</p><p>如果只是想简单运行 TypeScript 代码看看结果，ts-node 不失为一个便捷的方法</p>`,15);function h(g,b){const t=p("ExternalLinkIcon");return c(),d("div",null,[o,a("p",null,[e("最简单的 TypeScript 使用方法，就是使用官网的在线编译页面，叫做 "),a("a",r,[e("TypeScript Playground"),n(t)]),e("。")]),u,a("p",null,[a("a",v,[e("ts-node"),n(t)]),e(" 是一个非官方的 npm 模块，可以直接运行 TypeScript 代码。")]),m])}const k=i(l,[["render",h],["__file","02-基本用法.html.vue"]]),x=JSON.parse('{"path":"/%E8%AF%AD%E8%A8%80/TypeScript/02-%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95.html","title":"基本用法","lang":"zh-CN","frontmatter":{"title":"基本用法","date":"2023-11-22T00:00:00.000Z","order":2,"category":["语言"],"tag":["TypeScript"],"description":"类型声明 TS 最明显的特征，就是为 JS 变量加上变量声明。 类型声明的写法 一律在标识符后面添加“冒号 + 类型”。函数的参数和返回值，也是这样来声明类型。 注意 变量的值应该与声明的类型一支，如果不一致，TS 就会报错。 TS 规定，变量只有赋值后才能使用，否则就会报错。 类型推断 类型声明并不是必要的，如果没有，TS 会自己推断类型。 注意 T...","head":[["meta",{"property":"og:url","content":"https://godx-18.github.io/%E8%AF%AD%E8%A8%80/TypeScript/02-%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95.html"}],["meta",{"property":"og:site_name","content":"烜"}],["meta",{"property":"og:title","content":"基本用法"}],["meta",{"property":"og:description","content":"类型声明 TS 最明显的特征，就是为 JS 变量加上变量声明。 类型声明的写法 一律在标识符后面添加“冒号 + 类型”。函数的参数和返回值，也是这样来声明类型。 注意 变量的值应该与声明的类型一支，如果不一致，TS 就会报错。 TS 规定，变量只有赋值后才能使用，否则就会报错。 类型推断 类型声明并不是必要的，如果没有，TS 会自己推断类型。 注意 T..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-30T03:31:24.000Z"}],["meta",{"property":"article:author","content":"GodX"}],["meta",{"property":"article:tag","content":"TypeScript"}],["meta",{"property":"article:published_time","content":"2023-11-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-30T03:31:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基本用法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-22T00:00:00.000Z\\",\\"dateModified\\":\\"2023-11-30T03:31:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GodX\\",\\"url\\":\\"https://github.com/GodX-18\\"}]}"]]},"headers":[{"level":2,"title":"类型声明","slug":"类型声明","link":"#类型声明","children":[]},{"level":2,"title":"类型推断","slug":"类型推断","link":"#类型推断","children":[]},{"level":2,"title":"TypeScript 的编译","slug":"typescript-的编译","link":"#typescript-的编译","children":[]},{"level":2,"title":"值与类型","slug":"值与类型","link":"#值与类型","children":[]},{"level":2,"title":"TypeScript Playground","slug":"typescript-playground","link":"#typescript-playground","children":[]},{"level":2,"title":"tsc 编译器","slug":"tsc-编译器","link":"#tsc-编译器","children":[{"level":3,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":3,"title":"帮助信息","slug":"帮助信息","link":"#帮助信息","children":[]},{"level":3,"title":"编译脚本","slug":"编译脚本","link":"#编译脚本","children":[]},{"level":3,"title":"编译错误的处理","slug":"编译错误的处理","link":"#编译错误的处理","children":[]},{"level":3,"title":"tsconfig.json","slug":"tsconfig-json","link":"#tsconfig-json","children":[]}]},{"level":2,"title":"ts-node 模块","slug":"ts-node-模块","link":"#ts-node-模块","children":[]}],"git":{"createdTime":1700614687000,"updatedTime":1701315084000,"contributors":[{"name":"GodX","email":"1046529973@qq.com","commits":2}]},"readingTime":{"minutes":7.83,"words":2350},"filePathRelative":"语言/TypeScript/02-基本用法.md","localizedDate":"2023年11月22日","excerpt":"<h2>类型声明</h2>\\n<p>TS 最明显的特征，就是为 JS 变量加上变量声明。</p>\\n<div class=\\"language-typescript\\" data-ext=\\"ts\\" data-title=\\"ts\\"><pre class=\\"language-typescript\\"><code><span class=\\"token keyword\\">let</span> foo<span class=\\"token operator\\">:</span><span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,x as data};
