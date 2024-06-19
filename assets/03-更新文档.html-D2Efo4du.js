import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,a as p}from"./app-oXp7PBbS.js";const t={},o=p(`<p>更新操作会修改集合中的现有文档。 MongoDB 提供了以下方法来更新集合的文档：</p><ul><li><code>db.collection.updateOne(&lt;filter&gt;, &lt;update&gt;, &lt;options&gt;)</code></li><li><code>db.collection.updateMany(&lt;filter&gt;, &lt;update&gt;, &lt;options&gt;)</code></li><li><code>db.collection.replaceOne(&lt;filter&gt;, &lt;update&gt;, &lt;options&gt;)</code></li></ul><p>您可以指定标识要更新的文档的条件或过滤器。这些过滤器使用与读取操作相同的语法。</p><figure><img src="https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231010145022955.png" alt="image-20231010145022955" tabindex="0" loading="lazy"><figcaption>image-20231010145022955</figcaption></figure><p>测试数据：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>inventory<span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span> <span class="token punctuation">[</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;canvas&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">35.5</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;cm&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;A&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;journal&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;cm&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;A&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;mat&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">85</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">27.9</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">35.5</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;cm&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;A&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;mousepad&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">22.85</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;cm&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;P&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;notebook&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">8.5</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;in&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;P&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;paper&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">8.5</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;in&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;D&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;planner&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">75</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">22.85</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;cm&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;D&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;postcard&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">45</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">15.25</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;cm&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;A&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;sketchbook&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">80</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;cm&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;A&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;sketch pad&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">95</span><span class="token punctuation">,</span> <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">h</span><span class="token operator">:</span> <span class="token number">22.85</span><span class="token punctuation">,</span> <span class="token literal-property property">w</span><span class="token operator">:</span> <span class="token number">30.5</span><span class="token punctuation">,</span> <span class="token literal-property property">uom</span><span class="token operator">:</span> <span class="token string">&quot;cm&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;A&quot;</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2><p>为了更新文档，MongoDB 提供了更新操作符（例如 <code>$set</code>）来修改字段值。</p><p>要使用更新运算符，请将以下形式的更新文档传递给更新方法：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token operator">&lt;</span>update operator<span class="token operator">&gt;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token operator">&lt;</span>field1<span class="token operator">&gt;</span><span class="token operator">:</span> <span class="token operator">&lt;</span>value1<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">&lt;</span>update operator<span class="token operator">&gt;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token operator">&lt;</span>field2<span class="token operator">&gt;</span><span class="token operator">:</span> <span class="token operator">&lt;</span>value2<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果该字段不存在，则某些更新运算符（例如$ set）将创建该字段。有关详细信息，请参见各个更新操作员参考。</p><h2 id="更新单个文档" tabindex="-1"><a class="header-anchor" href="#更新单个文档"><span>更新单个文档</span></a></h2><p>下面的示例在清单集合上使用 <code>db.collection.updateOne()</code> 方法更新项目等于 <code>paper</code> 的第一个文档：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>inventory<span class="token punctuation">.</span><span class="token function">updateOne</span><span class="token punctuation">(</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;paper&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
     <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">&quot;size.uom&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cm&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;P&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
     <span class="token literal-property property">$currentDate</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">lastModified</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新操作：</p><ul><li>使用 <code>$set</code> 运算符将 <code>size.uom</code> 字段的值更新为 <code>cm</code>，将状态字段的值更新为 <code>P</code></li><li>使用 <code>$currentDate</code> 运算符将 <code>lastModified</code> 字段的值更新为当前日期。如果 <code>lastModified</code> 字段不存在，则 <code>$currentDate</code> 将创建该字段。</li></ul><h2 id="更新多个文档" tabindex="-1"><a class="header-anchor" href="#更新多个文档"><span>更新多个文档</span></a></h2><p>以下示例在清单集合上使用 <code>db.collection.updateMany()</code> 方法来更新数量小于50的所有文档:</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>inventory<span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span>
   <span class="token punctuation">{</span> <span class="token string-property property">&quot;qty&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">$lt</span><span class="token operator">:</span> <span class="token number">50</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span>
     <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">&quot;size.uom&quot;</span><span class="token operator">:</span> <span class="token string">&quot;in&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">status</span><span class="token operator">:</span> <span class="token string">&quot;P&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
     <span class="token literal-property property">$currentDate</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">lastModified</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新操作：</p><ul><li>使用 $set 运算符将 size.uom 字段的值更新为 <code>&quot;in&quot;</code>，将状态字段的值更新为 <code>&quot;p&quot;</code></li><li>使用 <code>$currentDate</code> 运算符将 <code>lastModified</code> 字段的值更新为当前日期。如果 <code>lastModified</code> 字段不存在，则 <code>$currentDate</code> 将创建该字段。</li></ul><h2 id="替换文档" tabindex="-1"><a class="header-anchor" href="#替换文档"><span>替换文档</span></a></h2><p>要替换 _id 字段以外的文档的全部内容，请将一个全新的文档作为第二个参数传递给 <code>db.collection.replaceOne()</code>。</p><p>替换文档时，替换文档必须仅由字段/值对组成；即不包含更新运算符表达式。</p><p>替换文档可以具有与原始文档不同的字段。在替换文档中，由于 <code>_id</code> 字段是不可变的，因此可以省略 <code>_id</code> 字段；但是，如果您确实包含 <code>_id</code> 字段，则它必须与当前值具有相同的值。</p><p>以下示例替换了清单集合中项目 <code>&quot;paper&quot;</code> 的第一个文档：</p><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code>db<span class="token punctuation">.</span>inventory<span class="token punctuation">.</span><span class="token function">replaceOne</span><span class="token punctuation">(</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;paper&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token punctuation">{</span> <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token string">&quot;paper&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">instock</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> <span class="token literal-property property">warehouse</span><span class="token operator">:</span> <span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">60</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">warehouse</span><span class="token operator">:</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">qty</span><span class="token operator">:</span> <span class="token number">40</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),e=[o];function r(l,c){return n(),a("div",null,e)}const k=s(t,[["render",r],["__file","03-更新文档.html.vue"]]),d=JSON.parse('{"path":"/%E5%A4%A7%E5%89%8D%E7%AB%AF/Nodejs%E5%85%A8%E6%A0%88%E5%BC%80%E5%8F%91/MongoDB/%E5%9F%BA%E7%A1%80%E6%93%8D%E4%BD%9C/03-%E6%9B%B4%E6%96%B0%E6%96%87%E6%A1%A3.html","title":"更新文档","lang":"zh-CN","frontmatter":{"title":"更新文档","order":3,"category":["SQL"],"tag":["数据库","noSQL"],"description":"更新操作会修改集合中的现有文档。 MongoDB 提供了以下方法来更新集合的文档： db.collection.updateOne(<filter>, <update>, <options>) db.collection.updateMany(<filter>, <update>, <options>) db.collection.replaceOne...","head":[["meta",{"property":"og:url","content":"https://godx-18.github.io/%E5%A4%A7%E5%89%8D%E7%AB%AF/Nodejs%E5%85%A8%E6%A0%88%E5%BC%80%E5%8F%91/MongoDB/%E5%9F%BA%E7%A1%80%E6%93%8D%E4%BD%9C/03-%E6%9B%B4%E6%96%B0%E6%96%87%E6%A1%A3.html"}],["meta",{"property":"og:site_name","content":"烜"}],["meta",{"property":"og:title","content":"更新文档"}],["meta",{"property":"og:description","content":"更新操作会修改集合中的现有文档。 MongoDB 提供了以下方法来更新集合的文档： db.collection.updateOne(<filter>, <update>, <options>) db.collection.updateMany(<filter>, <update>, <options>) db.collection.replaceOne..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231010145022955.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-22T00:58:07.000Z"}],["meta",{"property":"article:author","content":"GodX"}],["meta",{"property":"article:tag","content":"数据库"}],["meta",{"property":"article:tag","content":"noSQL"}],["meta",{"property":"article:modified_time","content":"2023-11-22T00:58:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"更新文档\\",\\"image\\":[\\"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231010145022955.png\\"],\\"dateModified\\":\\"2023-11-22T00:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GodX\\",\\"url\\":\\"https://github.com/GodX-18\\"}]}"]]},"headers":[{"level":2,"title":"语法","slug":"语法","link":"#语法","children":[]},{"level":2,"title":"更新单个文档","slug":"更新单个文档","link":"#更新单个文档","children":[]},{"level":2,"title":"更新多个文档","slug":"更新多个文档","link":"#更新多个文档","children":[]},{"level":2,"title":"替换文档","slug":"替换文档","link":"#替换文档","children":[]}],"git":{"createdTime":1700614687000,"updatedTime":1700614687000,"contributors":[{"name":"GodX","email":"1046529973@qq.com","commits":1}]},"readingTime":{"minutes":2.49,"words":747},"filePathRelative":"大前端/Nodejs全栈开发/MongoDB/基础操作/03-更新文档.md","localizedDate":"2023年11月22日","excerpt":"<p>更新操作会修改集合中的现有文档。 MongoDB 提供了以下方法来更新集合的文档：</p>\\n<ul>\\n<li><code>db.collection.updateOne(&lt;filter&gt;, &lt;update&gt;, &lt;options&gt;)</code></li>\\n<li><code>db.collection.updateMany(&lt;filter&gt;, &lt;update&gt;, &lt;options&gt;)</code></li>\\n<li><code>db.collection.replaceOne(&lt;filter&gt;, &lt;update&gt;, &lt;options&gt;)</code></li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
