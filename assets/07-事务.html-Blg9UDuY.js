import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o as d,c as t,b as e,e as s,d as i,a as c}from"./app-oXp7PBbS.js";const r={},o=c(`<h2 id="事务的基础概念" tabindex="-1"><a class="header-anchor" href="#事务的基础概念"><span>事务的基础概念</span></a></h2><p>关于事务最常见的例子就是银行转账，A 账户给 B 账户转账一个亿 (T1)，买一块地盖房子。在这种交易的过程中，有几个问题值得思考：</p><ul><li>如何<strong>同时保证</strong>上述交易中，A账户总金额减少一个亿，B账户总金额增加一个亿？ A</li><li>A账户如果同时在和C账户交易(T2)，如何让这两笔交易互不影响？ I</li><li>如果交易完成时数据库突然崩溃，如何保证交易数据成功保存在数据库中？ D</li><li>如何在支持大量交易的同时，保证数据的合法性(没有钱凭空产生或消失) ？ C</li></ul><p>要保证交易正常可靠地进行，数据库就得解决上面的四个问题，这也就是<code>事务</code>诞生的背景，它能解决上面的四个问题，对应地，它拥有四大特性（<strong>ACID</strong>）。</p><figure><img src="https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016172138999.png" alt="image-20231016172138999" tabindex="0" loading="lazy"><figcaption>image-20231016172138999</figcaption></figure><p><strong>（1）原子性（<strong><strong>A</strong></strong>tomicity）: 事务要么全部完成，要么全部取消。 如果事务崩溃，状态回到事务之前（事务回滚）。</strong></p><p>确保不管交易过程中发生了什么意外状况（服务器崩溃、网络中断等），不能出现A账户少了一个亿，但B账户没到帐，或者A账户没变，但B账户却凭空收到一个亿（数据不一致）。A和B账户的金额变动要么同时成功，要么同时失败(保持原状)。</p><p><strong>（2）隔离性（Isolation）: 如果2个事务 T1 和 T2 同时运行，事务 T1 和 T2 最终的结果是相同的，不管 T1和T2谁先结束。</strong></p><p>如果A在转账1亿给B（T1），同时C又在转账3亿给A（T2），不管T1和T2谁先执行完毕，最终结果必须是A账户增加2亿，而不是3亿，B增加1亿，C减少3亿。</p><p><strong>（3）持久性（Durability）: 一旦事务提交，不管发生什么（崩溃或者出错），数据要保存在数据库中。</strong></p><p>确保如果 T1 刚刚提交，数据库就发生崩溃，T1执行的结果依然会保持在数据库中。</p><p><strong>（4）一致性（Consistency）: 只有合法的数据（依照关系约束和函数约束）才能写入数据库。</strong></p><p>确保钱不会在系统内凭空产生或消失， 依赖原子性和隔离性。</p><p>可以看出，原子性、隔离性、一致性的根本问题，是不同的事务同时对同一份数据(A账户)进行<code>写操作</code>(修改、删除、新增)，如果事务中都只是读数据的话，那么它们可以随意地同时进行，反正读到的数据都是一样的。</p><p>如果，几个互不知晓的事务在同时修改同一份数据，那么很容易出现后完成的事务覆盖了前面的事务的结果，导致不一致。 事务在最终提交之前都有可能会回滚，撤销所有修改：</p><ul><li>如果T1事务修改了A账户的数据，</li><li>这时T2事务读到了更新后的A账户数据，并进行下一步操作，</li><li>但此时T1事务却回滚了，撤销了对A账户的修改，</li><li>那么T2读取到的A账户数据就是非法的，这会导致数据不一致。</li></ul><p>这些问题都是事务需要避免的。</p><h2 id="redis-中的事务" tabindex="-1"><a class="header-anchor" href="#redis-中的事务"><span>Redis 中的事务</span></a></h2><p>Redis 中提供了以下三个命令来处理事务：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 标记一个事务块的开始</span>
<span class="token comment"># 事务块内的多条命令会按照先后顺序被放进一个队列当中，最后由 EXEC 命令原子性(atomic)地执行</span>
MULTI

<span class="token comment"># 执行所有事务块内的命令。</span>
EXEC

<span class="token comment"># 取消事务，放弃执行事务块内的所有命令。</span>
DISCARD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>SET Jack <span class="token number">10</span>

SET Rose <span class="token number">20</span>

<span class="token comment"># Jack 给 Rose 转账 5 块钱</span>

<span class="token comment"># 开启事务</span>
MULTI

DECRBY Jack <span class="token number">5</span>

INCRBY ROSE <span class="token number">5</span>

EXEC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码演示了事务的使用方式。</p><p><strong>（1）开始事务</strong>：首先使用 <code>MULTI</code> 命令告诉 Redis：“下面我发给你的命令属于同一事务，你先不要执行，而是把它们暂时存起来”。Redis 回答：“OK”</p><p><strong>（2）命令入队</strong>：而后我们发送了两个命令来实现相关操作，可以看到 Redis 遵守了承诺，没有执行这些命令，而是返回 <code>QUEUED</code> 表示这两条命令已经进入等待执行的事务队列中了</p><p><strong>（3）执行事务</strong>：当把所有要在同一事务中执行的命令都发给 Redis 后，我们使用 <code>EXEC</code> 命令告诉 Redis 将等待执行的事务队列中的所有命令按照发送的顺序依次执行。<code>EXEC</code> 命令的返回值就是这些命令的返回值组成的列表，返回值顺序和命令的顺序相同。</p><p>（4）如果想要<strong>取消事务</strong>，则执行 <code>DISCARD</code> 命令。</p><p>Redis 保证了一个事务中的所有命令要么都执行，要么都不执行。如果在发送 <code>EXEC</code> 命令前客户端掉线了，则 Redis 会清空事务队列，事务中的所有命令都不会执行。而一旦客户端发送了 <code>EXEC</code> 命令，所有的命令就都会被执行，即使此后客户端断线也没关系，因为 Redis 中已经记录了所有要执行的命令。</p><p>除此之外，Redis 的事务还能保证一个事务内的命令依次执行而不被其它命令插入。试想客户端 A 需要执行几条命令，同时客户端 B 发送了一条命令，如果不适用事务，则客户端 B 的命令可能会插入到客户端 A 的几条命令中执行。如果不希望发送这种情况，也可以使用事务。</p><h2 id="事务中的错误处理" tabindex="-1"><a class="header-anchor" href="#事务中的错误处理"><span>事务中的错误处理</span></a></h2><p>如果一个事务中的某个命令执行出错，Redis 会怎么处理呢？要回答这个问题，首先需要知道什么原因导致命令执行出错。</p><p>（1）语法错误。语法错误指命令不存在或命令参数的个数不对。比如：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>MULTI

<span class="token comment"># 正确的命令</span>
SET key value

<span class="token comment"># 错误的命令</span>
SET key

ERRORCOMMAND key

EXEC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跟在 MULTI 命令后执行了 3 个命令：</p><ul><li>一个正确的命令，成功的加入了事务队列</li><li>其余两个命令都有语法错误</li></ul><p>而只要有一个命令有语法错误，执行 <code>EXEC</code> 命令后 Redis 就会直接返回错误，连语法正确的命令也不会执行。</p><p>（2）运行错误。运行错误指在命令执行时出现的错误，比如使用散列类型的命令操作集合类型的键，这种错误在实际执行之前 Redis 是无法发现的，所以在事务里这样的命令是会被 Redis 接受并执行的。如果事务里的一条命令出现了运行错误，事务里其它的命令依然会继续执行，例如：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>MULTI

SET key <span class="token number">1</span>

SADD key <span class="token number">2</span>

SET key <span class="token number">3</span>

EXEC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可见虽然 <code>SADD key 2</code> 出现了错误，但是 <code>SET key 3</code> 依然执行了。</p><p>Redis 事务没有关系数据库事务提供的回滚（rollback）功能。为此开发者必须在事务执行出错后自己收拾剩下的摊子（将数据库复原回事务执行前的状态等）。</p><p>不过由于 Redis 不支持回滚功能，也使得 Redis 在事务上可以保持简洁和快速。此外回顾刚才提到的会导致事务执行失败的两种错误，其中语法错误完全可以在开发时找出并解决，另外如果能够很好的规划数据库的使用，是不会出现如命令与数据类型不匹配这样的运行时错误的。</p><h2 id="事务中的-watch-命令" tabindex="-1"><a class="header-anchor" href="#事务中的-watch-命令"><span>事务中的 WATCH 命令</span></a></h2><p>关于 WATCH 命令，我们来一个生活中的例子比较好理解。</p><p>假设我的银行卡有 100 元，此时我去商店买东西：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 开启事务</span>
MULTI

<span class="token comment"># 假设里面有 100 元</span>
SET balance <span class="token number">100</span>

<span class="token comment"># 拿了瓶水</span>
SET balance <span class="token number">3</span>

<span class="token comment"># 拿了包烟</span>
SET balance <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我的银行卡除了我自己消费使用，还绑定了我媳妇儿的支付宝，如果我在消费的时候，她也消费了会怎么样？</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 开启事务</span>
MULTI

<span class="token comment"># 买了 10 斤苹果</span>
SET balance <span class="token number">100</span>

EXEC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候我媳妇在超市直接刷了 100，此时余额不足的我还在挑口香糖...</p><p>针对于上面的场景，我们可以使用 Redis 事务中提供的 WATCH 功能来解决这个问题。</p><p>WATCH 定义：监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。</p><p>WATCH 相关命令如下：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。</span>
WATCH key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 取消 WATCH 命令对所有 key 的监视。</span>
<span class="token comment"># 如果在执行 WATCH 命令之后， EXEC 命令或 DISCARD 命令先被执行了的话，那么就不需要再执行 UNWATCH 了。</span>
UNWATCH
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用示例：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>SET balance <span class="token number">100</span>

WATCH balance

DECRBY balance <span class="token number">30</span>

MULTI

DECRBY balance <span class="token number">10</span>

EXEC

GET balance <span class="token comment"># 70</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在执行 WATCH 命令之后， EXEC 命令或 DISCARD 命令被执行了的话，那么会自动取消 WATCH。</p><p>如果需要手动停止 WATCH 则可以可以使用 UNWATCH 命令，UNWATCH 命令会取消 WATCH 命令对所有 key 的监视。</p><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2>`,57),p={href:"https://zhuanlan.zhihu.com/p/43493165",target:"_blank",rel:"noopener noreferrer"},m={href:"https://xie.infoq.cn/article/84baa7fa9c2c3d3698a601def",target:"_blank",rel:"noopener noreferrer"};function v(u,b){const n=l("ExternalLinkIcon");return d(),t("div",null,[o,e("ul",null,[e("li",null,[e("a",p,[s("https://zhuanlan.zhihu.com/p/43493165"),i(n)])]),e("li",null,[e("a",m,[s("https://xie.infoq.cn/article/84baa7fa9c2c3d3698a601def"),i(n)])])])])}const A=a(r,[["render",v],["__file","07-事务.html.vue"]]),T=JSON.parse('{"path":"/%E5%A4%A7%E5%89%8D%E7%AB%AF/Nodejs%E5%85%A8%E6%A0%88%E5%BC%80%E5%8F%91/Redis/07-%E4%BA%8B%E5%8A%A1.html","title":"Redis 事务","lang":"zh-CN","frontmatter":{"title":"Redis 事务","order":7,"category":["前端"],"tag":["nodejs","Redis"],"description":"事务的基础概念 关于事务最常见的例子就是银行转账，A 账户给 B 账户转账一个亿 (T1)，买一块地盖房子。在这种交易的过程中，有几个问题值得思考： 如何同时保证上述交易中，A账户总金额减少一个亿，B账户总金额增加一个亿？ A A账户如果同时在和C账户交易(T2)，如何让这两笔交易互不影响？ I 如果交易完成时数据库突然崩溃，如何保证交易数据成功保存在...","head":[["meta",{"property":"og:url","content":"https://godx-18.github.io/%E5%A4%A7%E5%89%8D%E7%AB%AF/Nodejs%E5%85%A8%E6%A0%88%E5%BC%80%E5%8F%91/Redis/07-%E4%BA%8B%E5%8A%A1.html"}],["meta",{"property":"og:site_name","content":"烜"}],["meta",{"property":"og:title","content":"Redis 事务"}],["meta",{"property":"og:description","content":"事务的基础概念 关于事务最常见的例子就是银行转账，A 账户给 B 账户转账一个亿 (T1)，买一块地盖房子。在这种交易的过程中，有几个问题值得思考： 如何同时保证上述交易中，A账户总金额减少一个亿，B账户总金额增加一个亿？ A A账户如果同时在和C账户交易(T2)，如何让这两笔交易互不影响？ I 如果交易完成时数据库突然崩溃，如何保证交易数据成功保存在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016172138999.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-22T00:58:07.000Z"}],["meta",{"property":"article:author","content":"GodX"}],["meta",{"property":"article:tag","content":"nodejs"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:modified_time","content":"2023-11-22T00:58:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis 事务\\",\\"image\\":[\\"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016172138999.png\\"],\\"dateModified\\":\\"2023-11-22T00:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GodX\\",\\"url\\":\\"https://github.com/GodX-18\\"}]}"]]},"headers":[{"level":2,"title":"事务的基础概念","slug":"事务的基础概念","link":"#事务的基础概念","children":[]},{"level":2,"title":"Redis 中的事务","slug":"redis-中的事务","link":"#redis-中的事务","children":[]},{"level":2,"title":"事务中的错误处理","slug":"事务中的错误处理","link":"#事务中的错误处理","children":[]},{"level":2,"title":"事务中的 WATCH 命令","slug":"事务中的-watch-命令","link":"#事务中的-watch-命令","children":[]},{"level":2,"title":"参考链接","slug":"参考链接","link":"#参考链接","children":[]}],"git":{"createdTime":1700614687000,"updatedTime":1700614687000,"contributors":[{"name":"GodX","email":"1046529973@qq.com","commits":1}]},"readingTime":{"minutes":8.06,"words":2418},"filePathRelative":"大前端/Nodejs全栈开发/Redis/07-事务.md","localizedDate":"2023年11月22日","excerpt":"<h2>事务的基础概念</h2>\\n<p>关于事务最常见的例子就是银行转账，A 账户给 B 账户转账一个亿 (T1)，买一块地盖房子。在这种交易的过程中，有几个问题值得思考：</p>\\n<ul>\\n<li>如何<strong>同时保证</strong>上述交易中，A账户总金额减少一个亿，B账户总金额增加一个亿？ A</li>\\n<li>A账户如果同时在和C账户交易(T2)，如何让这两笔交易互不影响？ I</li>\\n<li>如果交易完成时数据库突然崩溃，如何保证交易数据成功保存在数据库中？ D</li>\\n<li>如何在支持大量交易的同时，保证数据的合法性(没有钱凭空产生或消失) ？ C</li>\\n</ul>","autoDesc":true}');export{A as comp,T as data};
