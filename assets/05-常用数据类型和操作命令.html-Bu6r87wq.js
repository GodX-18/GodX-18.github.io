import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as s,a}from"./app-oXp7PBbS.js";const i={},l=a(`<p>Redis 不是简单的键值存储，它实际上是一个数据结构服务器，支持不同类型的值。这意味着在传统键值存储中，您将字符串键与字符串值相关联，而在 Redis 中，该值不仅限于简单的字符串，还可以容纳更复杂的数据结构。以下是 Redis 中支持的所有数据结构的列表：</p><table><thead><tr><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>String</td><td>字符串</td></tr><tr><td>Hash</td><td>散列，是由与值相关联的字段组成的内容。字段和值都是字符串。这与 Ruby 或 Python 哈希非常相似。类似于 JavaScript 中的对象结构。</td></tr><tr><td>List</td><td>列表，根据插入顺序排序的字符串元素的集合。它们基本上是链表。</td></tr><tr><td>Set</td><td>未排序的字符串元素集合，集合中的数据是不重复的。</td></tr><tr><td>ZSet</td><td>与 Sets 类似，但每个字符串元素都与一个称为分数的浮点值相关联。元素总是按它们的分数排序，因此与 Sets 不同，可以检索一系列元素（例如，您可能会问：给我前10名或后10名）。</td></tr><tr><td>Bit arrays（或 bitmaps）</td><td>可以使用特殊命令像位数组一样处理字符串值：您可以设置和清除单个位，计数所有设置为1的位，找到第一个设置或未设置的位，依此类推。</td></tr><tr><td>HyperLogLogs</td><td>这是一个概率数据结构，用于估计集合的基数。</td></tr><tr><td>Streams</td><td>提供抽象日志数据类型的类似地图项的仅追加集合。</td></tr></tbody></table><h2 id="redis-中的键" tabindex="-1"><a class="header-anchor" href="#redis-中的键"><span>Redis 中的键</span></a></h2><p>Redis 密钥是二进制安全的，这意味着您可以使用任何二进制序列作为 key，从 <code>&quot;foo&quot;</code> 之类的字符串到 JPEG 文件的内容。空字符串也是有效的键。</p><p>有关键的其他一些规则：</p><ul><li><p>太长不好，占用内存空间</p></li><li><p>太短也不好，没有可读性</p></li><li><p>尝试坚持使用固定规则，例如：</p></li><li><p><code>object-type:id</code></p></li><li><p><code>user:1000</code></p></li><li><p>点或破折号通常用于多字字段，例如：<code>comment:1234:reply.to</code> 或 <code>comment:1234:reply-to</code> 中。</p></li><li><p>允许的最大大小为 512 MB</p></li></ul><p>总结一下：</p><ul><li>不要太长，浪费空间</li><li>不要过短，不利于阅读</li><li>统一的命令规范</li></ul><h2 id="字符串-string" tabindex="-1"><a class="header-anchor" href="#字符串-string"><span>字符串（String）</span></a></h2><p>字符串类型是 Redis 中最基本的数据类型，也是其它数据类型的基础。</p><ul><li>它能存储任何形式的字符串，包括二进制数据。</li><li>你可以用它存储用户的邮箱、JSON 化的对象，甚至是一张图片</li><li>value 最多可以容纳数据大小为 512 MB</li></ul><figure><img src="https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016144136174.png" alt="image-20231016144136174" tabindex="0" loading="lazy"><figcaption>image-20231016144136174</figcaption></figure><p>字符串类型是其他常见 4 种数据类型的基础，其他数据类型和字符串类型的差别从某种角度来说只是组织字符的形式不同。</p><p>例如，列表类型是以列表的形式组织字符串，而集合类型是以集合的形式组织字符串。学习完后面的数据类型之后相信你会有更深的理解。</p><h3 id="添加" tabindex="-1"><a class="header-anchor" href="#添加"><span>添加</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 设置指定 key 的值</span>
SET key value

<span class="token comment"># 将给定 key 的值设为 value ，并返回 key 的旧值(old value)</span>
GETSET key value

<span class="token comment"># 只有在 key 不存在时设置 key 的值</span>
SETNX key value

<span class="token comment"># 同时设置一个或多个 key-value 对</span>
MSET key value <span class="token punctuation">[</span>key value <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在</span>
MSETNX key value <span class="token punctuation">[</span>key value <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。</span>
APPEND key value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：在 Redis 中命令不区分大小写。也就是说 <code>SET foo bar</code> 和 <code>set foo bar</code> 是一样的，但是我们约定使用大写表示它是一个 Redis 命令。</p><h3 id="查询" tabindex="-1"><a class="header-anchor" href="#查询"><span>查询</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 获取指定 key 的值</span>
GET key

<span class="token comment"># 返回 key 中字符串值的子字符</span>
GETRANGE key start end

<span class="token comment"># 获取所有(一个或多个)给定 key 的值</span>
MGET key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 返回 key 所储存的字符串值的长度。</span>
STRLEN key

<span class="token comment"># 通用命令：查询集合中是否有指定的 key</span>
EXISTS key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 通用命令，查询 key 的类型</span>
TYPE key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改" tabindex="-1"><a class="header-anchor" href="#修改"><span>修改</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 设置指定 key 的值</span>
SET key value

<span class="token comment"># 将给定 key 的值设为 value ，并返回 key 的旧值(old value)</span>
GETSET key value

<span class="token comment"># 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。</span>
APPEND key value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除" tabindex="-1"><a class="header-anchor" href="#删除"><span>删除</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 通用命令：删除1个或多个指定的 key</span>
DEL key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数字值" tabindex="-1"><a class="header-anchor" href="#数字值"><span>数字值</span></a></h3><p>数字值在 Redis 中以字符串保存。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 将 key 中储存的数字值增一</span>
INCR key

<span class="token comment"># 将 key 所储存的值加上给定的增量值（increment） </span>
INCRBY key increment

<span class="token comment"># 将 key 中储存的数字值减一</span>
DECR key

<span class="token comment"># key 所储存的值减去给定的减量值（decrement）</span>
DECRBY key decrement
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="哈希-hash" tabindex="-1"><a class="header-anchor" href="#哈希-hash"><span>哈希（Hash）</span></a></h2><p>哈希（也叫散列）类型也是一种字典结构，其存储了字段和字段值的映射，但字符值只能是字符串，不能其它数据类型，换句话说，散列类型不能嵌套其它数据类型。一个哈希类型可以包含至少 232 - 1 个字段。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>提示：除了散列类型，Redis 的其它数据类型同样不支持数据类型嵌套。</p></div><figure><img src="https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016151511611.png" alt="image-20231016151511611" tabindex="0" loading="lazy"><figcaption>image-20231016151511611</figcaption></figure><h3 id="添加-1" tabindex="-1"><a class="header-anchor" href="#添加-1"><span>添加</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 将哈希表 key 中的字段 field 的值设为 value</span>
HSET key field value <span class="token punctuation">[</span>field value <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 同时将多个 field-value (域-值)对设置到哈希表 key 中</span>
HMSET key field value <span class="token punctuation">[</span>field value <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 只有在字段 field 不存在时，设置哈希表字段的值</span>
HSETNX key field value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询-1" tabindex="-1"><a class="header-anchor" href="#查询-1"><span>查询</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 获取所有哈希表中的字段</span>
HKEYS key

<span class="token comment"># 获取哈希表中字段的数量</span>
HLEN key

<span class="token comment"># 获取所有给定字段的值</span>
HMGET key field1 <span class="token punctuation">[</span>field2<span class="token punctuation">]</span>

<span class="token comment"># 获取存储在哈希表中指定字段的值</span>
HGET key field

<span class="token comment"># 获取在哈希表中指定 key 的所有字段和值</span>
HGETALL key

<span class="token comment"># 查看哈希表 key 中，指定的字段是否存在</span>
HEXISTS key field

<span class="token comment"># 获取哈希表中所有值</span>
HVALS key

<span class="token comment"># 迭代哈希表中的键值对</span>
HSCAN key cursor <span class="token punctuation">[</span>MATCH pattern<span class="token punctuation">]</span> <span class="token punctuation">[</span>COUNT count<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改-1" tabindex="-1"><a class="header-anchor" href="#修改-1"><span>修改</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 将哈希表 key 中的字段 field 的值设为 value</span>
HSET key field value <span class="token punctuation">[</span>field value <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 为哈希表 key 中的指定字段的整数值加上增量 increment</span>
HINCRBY key field increment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除-1" tabindex="-1"><a class="header-anchor" href="#删除-1"><span>删除</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 删除一个或多个哈希表字段</span>
HDEL key field1 <span class="token punctuation">[</span>field2<span class="token punctuation">]</span>

<span class="token comment"># 删除整个数据字段</span>
DEL key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="列表-list" tabindex="-1"><a class="header-anchor" href="#列表-list"><span>列表（List）</span></a></h2><p>列表类型类似于编程语言中的数组，可以存储一个有序的字符串列表，常用的操作就是向列表两端添加元素，或者获得列表的某一个片段。</p><figure><img src="https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016154530198.png" alt="image-20231016154530198" tabindex="0" loading="lazy"><figcaption>image-20231016154530198</figcaption></figure><p>列表类型内部使用双向链表实现的，所有向列表两端添加元素的时间复杂度为O(1)，获取越接近两端的元素速度就越快。这意味着即时是一个有几千万个元素的列表，获取头部或尾部的10条记录也是极快的（和从只有20个元素的列表中获取头部或尾部的10条记录的速度是一样的）。</p><p>不过使用链表的代价是通过索引访问元素比较慢。设想在 iPhone 发售当前有 1000 个人在商店排队购买，这时商家为了感谢大家的支持，决定奖励第486位的顾客异步免费的 iPhone。为了找到这第 486 位顾客，工作人员不得不从队首一个一个地数到 486 个人。但同时，无论队伍有多长，新来的人想加入队伍的话直接排到队尾就好了，和队伍里有多少人没有任何关系。这种情景与列表类型的特性很相似。</p><p>这种特性使列表类型能非常快速地完成关系数据库难以应付的场景：例如社交网站的新鲜事，我们关心的只是最新内容，使用列表类型存储，即使新鲜事的总数达到几千万个，获取其中最新的100条数据也是极快的。同样因为在两端插入记录的时间复杂度是O(1)，列表类型也适合用来记录日志，可以保证加入新日志的速度不会受到已有日志数量额影响。</p><p>一个列表最多可以包含 232 - 1 个元素 (4294967295, 每个列表超过40亿个元素)。</p><h3 id="添加-2" tabindex="-1"><a class="header-anchor" href="#添加-2"><span>添加</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 将一个或多个值插入到列表头部</span>
LPUSH key element <span class="token punctuation">[</span>element <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 在列表的元素前或者后插入元素</span>
LINSERT key BEFORE<span class="token operator">|</span>AFTER pivot value

<span class="token comment"># 将一个值插入到已存在的列表头部</span>
LPUSHX key value

<span class="token comment"># 通过索引设置列表元素的值</span>
LSET key index value

<span class="token comment"># 在列表中添加一个或多个值</span>
RPUSH key value1 <span class="token punctuation">[</span>value2<span class="token punctuation">]</span>

<span class="token comment"># 为已存在的列表添加值</span>
RPUSHX key value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询-2" tabindex="-1"><a class="header-anchor" href="#查询-2"><span>查询</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 通过索引获取列表中的元素</span>
LINDEX key index

<span class="token comment"># 获取列表长度</span>
LLEN key

<span class="token comment"># 获取列表指定范围内的元素</span>
LRANGE key start stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除-2" tabindex="-1"><a class="header-anchor" href="#删除-2"><span>删除</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 移出并获取列表的第一个元素</span>
LPOP key

<span class="token comment"># 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止</span>
BLPOP key1 <span class="token punctuation">[</span>key2 <span class="token punctuation">]</span> <span class="token function">timeout</span>

<span class="token comment"># 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止</span>
BRPOP key1 <span class="token punctuation">[</span>key2 <span class="token punctuation">]</span> <span class="token function">timeout</span>

<span class="token comment"># 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止</span>
BRPOPLPUSH <span class="token builtin class-name">source</span> destination <span class="token function">timeout</span>

<span class="token comment"># 移除列表元素</span>
<span class="token comment"># 如果 count &gt; 0，则从头向尾遍历删除元素</span>
<span class="token comment"># 如果 count &lt; 0，则从后面向前面删除元素</span>
<span class="token comment"># 如果 count = 0，则删除所有匹配的元素</span>
LREM key count value

<span class="token comment"># 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除</span>
LTRIM key start stop

<span class="token comment"># 移除列表的最后一个元素，返回值为移除的元素</span>
RPOP key

<span class="token comment"># 移除列表的最后一个元素，并将该元素添加到另一个列表并返回</span>
RPOPLPUSH <span class="token builtin class-name">source</span> destination
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集合-set" tabindex="-1"><a class="header-anchor" href="#集合-set"><span>集合（Set）</span></a></h2><p>集合类型和数学中的集合概念相似，集合中的元素是唯一的、无序的，简单理解集合就是没有顺序且不重复的列表。</p><p>一个集合类型可以存储至多 2<sup>32</sup> - 1 个字符串。</p><p>集合类型和列表类型有相似之处，它们的主要区别是：</p><ul><li>列表是有序的，集合是无序的</li><li>列表数据可以重复，集合中没有重复数据</li></ul><p>集合类型的常用操作是向集合中加入或删除元素、判断某个元素是否存在等。由于集合类型在 Redis 内部是使用值为空的散列表实现的，所以这些操作的时间复杂度都是O(1)。</p><p>最方便的是多个集合之间还可以进行并集、交集和差集运算。</p><h3 id="添加-3" tabindex="-1"><a class="header-anchor" href="#添加-3"><span>添加</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 向集合添加一个或多个成员</span>
SADD key member1 <span class="token punctuation">[</span>member2<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询-3" tabindex="-1"><a class="header-anchor" href="#查询-3"><span>查询</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 返回集合中的所有成员</span>
SMEMBERS key

<span class="token comment"># 获取集合的成员数</span>
SCARD key

<span class="token comment"># 判断 member 元素是否是集合 key 的成员</span>
SISMEMBER key member

<span class="token comment"># 返回集合中一个或多个随机数</span>
SRANDMEMBER key <span class="token punctuation">[</span>count<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除-3" tabindex="-1"><a class="header-anchor" href="#删除-3"><span>删除</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 移除集合中一个或多个成员</span>
SREM key member1 <span class="token punctuation">[</span>member2<span class="token punctuation">]</span>

<span class="token comment"># 移除并返回集合中的一个随机元素</span>
SPOP key

<span class="token comment"># 将 member 元素从 source 集合移动到 destination 集合</span>
SMOVE <span class="token builtin class-name">source</span> destination member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集合间聚合运算" tabindex="-1"><a class="header-anchor" href="#集合间聚合运算"><span>集合间聚合运算</span></a></h3><p>多个集合之间还可以进行<strong>并集</strong>、<strong>交集</strong>和<strong>差集</strong>运算。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 返回第一个集合与其他集合之间的差异。</span>
SDIFF key1 <span class="token punctuation">[</span>key2<span class="token punctuation">]</span>

<span class="token comment"># 返回给定所有集合的交集</span>
SINTER key1 <span class="token punctuation">[</span>key2<span class="token punctuation">]</span>

<span class="token comment"># 返回所有给定集合的并集</span>
SUNION key1 <span class="token punctuation">[</span>key2<span class="token punctuation">]</span>

<span class="token comment"># 返回给定所有集合的差集并存储在 destination 中</span>
SDIFFSTORE destination key1 <span class="token punctuation">[</span>key2<span class="token punctuation">]</span>

<span class="token comment"># 返回给定所有集合的交集并存储在 destination 中</span>
SINTERSTORE destination key1 <span class="token punctuation">[</span>key2<span class="token punctuation">]</span>

<span class="token comment"># 所有给定集合的并集存储在 destination 集合中</span>
SUNIONSTORE destination key1 <span class="token punctuation">[</span>key2<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h3><ul><li><p>跟踪一些唯一性数据</p></li><li><p>比如访问网站的唯一 IP 地址信息，每次访问网站的时候记录用户 IP 地址，SET 自动保证数据的唯一不重复</p></li><li><p>充分利用 SET 聚合操作方便高效的特性，用于维护数据对象之间的关联关系</p></li><li><p>比如所有购买A商品的客户 ID 存储到指定的 SET 中，所有购买B商品的客户 ID 存储到指定的 SET 中，如果我们想要获取有哪个客户同时购买了这两个商品，我们只需要使用交集操作就可以轻松的查出来</p></li></ul><h2 id="有序集合-sorted-set" tabindex="-1"><a class="header-anchor" href="#有序集合-sorted-set"><span>有序集合（Sorted Set）</span></a></h2><p>有序集合是一种类似于集合和哈希之间的混合数据类型。</p><ul><li>与集合一样，排序集合由唯一的非重复字符串元素组成</li><li>有序集合中的元素不排序，但有序集合中的每个元素都关联了一个分数（这就是为什么类型也类似于哈希，因为每个元素都映射到一个值）</li><li>虽然集合中每个元素都是不同的，但是它们的分数确可以相同</li></ul><figure><img src="https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016163633932.png" alt="image-20231016163633932" tabindex="0" loading="lazy"><figcaption>image-20231016163633932</figcaption></figure><p>每个元素都会关联一个 double 类型的分数。Redis 正是通过分数来为集合中的成员进行从小到大的排序。</p><p>有序集合类型在某些方面和列表类型有些相似。</p><p>相同点：</p><ul><li>两者都是有序的</li><li>两者都可以获得某一范围的元素</li></ul><p>不同点：</p><ul><li>列表类型通过链表实现的，获取靠近两端的数据速度极快，而当元素增多后，访问中间数据的速度会较慢，所以它更适合实现如“新鲜事”或“日志”这样很少访问中间元素的应用</li><li>有序集合类似是使用哈希表实现的，所以即使读取位于中间部分的数据速度也很快</li><li>列表中不能简单的调整某个元素的位置，但是有序集合可以（通过更改元素的分数）</li><li>有序集合要比列表类型更耗费内存</li></ul><p>有序集合的典型应用场景：</p><p>（1）排行榜</p><p>例如一个大型在线游戏的积分排行榜，每当玩家的分数发生变化时，可以执行 <code>ZADD</code> 命令更新玩家的分数，此后再通过 <code>ZRANGE</code> 命令获取积分 TOPTEN 的用户信息。当然我们也可以利用 <code>ZRANK</code> 命令通过 username 来获取玩家的排行信息。最后我们将组合使用 <code>ZRANGE</code> 和 <code>ZRANK</code> 命令快速的获取和某个玩家积分相近的其他用户的信息。</p><p>（2）微博热搜</p><p>假设我们现在要获取热门的帖子或搜索，比如我们常用的微博热搜。</p><p>首先，我们需要一个衡量的标准，定量的量度热搜的热门程度。假设我们有一个字段叫回复量，回复量越高就越热门。</p><p>如果我们用关系型数据库来获取的话，用 SQL 语句实现很简单：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> message <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> backsum <span class="token keyword">LIMIT</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是当数据量很大的时候，效率很低，同时如果建立索引又要消耗大量的资源，同时增加负载。</p><p>使用 Redis 的时候，我们不需要存储多余的信息，只需要存储帖子 id 和回复量两个信息就可以了。</p><h3 id="添加-4" tabindex="-1"><a class="header-anchor" href="#添加-4"><span>添加</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 向有序集合添加一个或多个成员，或者更新已存在成员的分数</span>
ZADD key score member <span class="token punctuation">[</span>score member <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询-4" tabindex="-1"><a class="header-anchor" href="#查询-4"><span>查询</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 通过索引区间返回有序集合指定区间内的成员，分数从低到高排序</span>
ZRANGE key start stop <span class="token punctuation">[</span>WITHSCORES<span class="token punctuation">]</span>

<span class="token comment"># 通过索引区间返回有序集合指定区间内的成员，分数从高到低排序</span>
ZREVRANGE key start stop <span class="token punctuation">[</span>WITHSCORES<span class="token punctuation">]</span>

<span class="token comment"># 返回有序集中指定分数区间内的成员，分数从低到高排序</span>
ZRANGEBYSCORE key min max <span class="token punctuation">[</span>WITHSCORES<span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMIT offset count<span class="token punctuation">]</span>

<span class="token comment"># 返回有序集中指定分数区间内的成员，分数从高到低排序</span>
ZREVRANGEBYSCORE key max min <span class="token punctuation">[</span>WITHSCORES<span class="token punctuation">]</span> <span class="token punctuation">[</span>LIMIT offset count<span class="token punctuation">]</span>

<span class="token comment"># 返回有序集合中指定成员的排名，有序集成员按分数值（从小到大）排序</span>
ZRANK key member

<span class="token comment"># 返回有序集合中指定成员的排名，有序集成员按分数值（从大到小）排序</span>
ZREVRANK key member

<span class="token comment"># 获取有序集合的成员数</span>
ZCARD key

<span class="token comment"># 返回有序集中，成员的分数值</span>
ZSCORE key member

<span class="token comment"># 计算在有序集合中指定区间分数的成员数</span>
ZCOUNT key min max
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改-2" tabindex="-1"><a class="header-anchor" href="#修改-2"><span>修改</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 向有序集合添加一个或多个成员，或者更新已存在成员的分数</span>
ZADD key score member <span class="token punctuation">[</span>score member <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 有序集合中对指定成员的分数加上增量 increment</span>
ZINCRBY key increment member
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除-4" tabindex="-1"><a class="header-anchor" href="#删除-4"><span>删除</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 移除有序集合中的一个或多个成员</span>
ZREM key member <span class="token punctuation">[</span>member <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 移除有序集合中给定的排名区间的所有成员</span>
ZREMRANGEBYRANK key start stop

<span class="token comment"># 移除有序集合中给定的分数区间的所有成员</span>
ZREMRANGEBYSCORE key min max
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="有序集合间聚合运算" tabindex="-1"><a class="header-anchor" href="#有序集合间聚合运算"><span>有序集合间聚合运算</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 destination 中</span>
ZINTERSTORE destination numkeys key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 计算给定的一个或多个有序集的并集，并存储在新的 key 中</span>
ZUNIONSTORE destination numkeys key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通用命令" tabindex="-1"><a class="header-anchor" href="#通用命令"><span>通用命令</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 返回所有 key</span>
KEYS *

<span class="token comment"># 返回所有以 my 开头的 key</span>
KEYS my*

<span class="token comment"># 获取 key 的类型</span>
TYPE key

<span class="token comment"># 查询某个 key 是否存在</span>
EXISTS key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 将 key 改名为 newkey</span>
RENAME key newkey

<span class="token comment"># 删除指定 key</span>
DEL key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 从当前数据库中随机返回(不删除)一个 key</span>
RANDOMKEY

<span class="token comment"># 对 key 进行重命名</span>
RENAME key newkey

<span class="token comment"># 清空当前数据库所有内容</span>
FLUSHDB

<span class="token comment"># 清空所有数据库内容</span>
FLUSHALL

<span class="token comment"># 将当前数据库的 key 移动到给定的数据库 db 当中</span>
MOVE key db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,101),t=[l];function d(c,p){return e(),s("div",null,t)}const u=n(i,[["render",d],["__file","05-常用数据类型和操作命令.html.vue"]]),v=JSON.parse('{"path":"/%E5%A4%A7%E5%89%8D%E7%AB%AF/Nodejs%E5%85%A8%E6%A0%88%E5%BC%80%E5%8F%91/Redis/05-%E5%B8%B8%E7%94%A8%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4.html","title":"常用数据类型和操作命令","lang":"zh-CN","frontmatter":{"title":"常用数据类型和操作命令","order":5,"category":["前端"],"tag":["nodejs","Redis"],"description":"Redis 不是简单的键值存储，它实际上是一个数据结构服务器，支持不同类型的值。这意味着在传统键值存储中，您将字符串键与字符串值相关联，而在 Redis 中，该值不仅限于简单的字符串，还可以容纳更复杂的数据结构。以下是 Redis 中支持的所有数据结构的列表： Redis 中的键 Redis 密钥是二进制安全的，这意味着您可以使用任何二进制序列作为 k...","head":[["meta",{"property":"og:url","content":"https://godx-18.github.io/%E5%A4%A7%E5%89%8D%E7%AB%AF/Nodejs%E5%85%A8%E6%A0%88%E5%BC%80%E5%8F%91/Redis/05-%E5%B8%B8%E7%94%A8%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%92%8C%E6%93%8D%E4%BD%9C%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"烜"}],["meta",{"property":"og:title","content":"常用数据类型和操作命令"}],["meta",{"property":"og:description","content":"Redis 不是简单的键值存储，它实际上是一个数据结构服务器，支持不同类型的值。这意味着在传统键值存储中，您将字符串键与字符串值相关联，而在 Redis 中，该值不仅限于简单的字符串，还可以容纳更复杂的数据结构。以下是 Redis 中支持的所有数据结构的列表： Redis 中的键 Redis 密钥是二进制安全的，这意味着您可以使用任何二进制序列作为 k..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016144136174.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-22T00:58:07.000Z"}],["meta",{"property":"article:author","content":"GodX"}],["meta",{"property":"article:tag","content":"nodejs"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:modified_time","content":"2023-11-22T00:58:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用数据类型和操作命令\\",\\"image\\":[\\"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016144136174.png\\",\\"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016151511611.png\\",\\"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016154530198.png\\",\\"https://raw.githubusercontent.com/GodX-18/picBed/main/image-20231016163633932.png\\"],\\"dateModified\\":\\"2023-11-22T00:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"GodX\\",\\"url\\":\\"https://github.com/GodX-18\\"}]}"]]},"headers":[{"level":2,"title":"Redis 中的键","slug":"redis-中的键","link":"#redis-中的键","children":[]},{"level":2,"title":"字符串（String）","slug":"字符串-string","link":"#字符串-string","children":[{"level":3,"title":"添加","slug":"添加","link":"#添加","children":[]},{"level":3,"title":"查询","slug":"查询","link":"#查询","children":[]},{"level":3,"title":"修改","slug":"修改","link":"#修改","children":[]},{"level":3,"title":"删除","slug":"删除","link":"#删除","children":[]},{"level":3,"title":"数字值","slug":"数字值","link":"#数字值","children":[]}]},{"level":2,"title":"哈希（Hash）","slug":"哈希-hash","link":"#哈希-hash","children":[{"level":3,"title":"添加","slug":"添加-1","link":"#添加-1","children":[]},{"level":3,"title":"查询","slug":"查询-1","link":"#查询-1","children":[]},{"level":3,"title":"修改","slug":"修改-1","link":"#修改-1","children":[]},{"level":3,"title":"删除","slug":"删除-1","link":"#删除-1","children":[]}]},{"level":2,"title":"列表（List）","slug":"列表-list","link":"#列表-list","children":[{"level":3,"title":"添加","slug":"添加-2","link":"#添加-2","children":[]},{"level":3,"title":"查询","slug":"查询-2","link":"#查询-2","children":[]},{"level":3,"title":"删除","slug":"删除-2","link":"#删除-2","children":[]}]},{"level":2,"title":"集合（Set）","slug":"集合-set","link":"#集合-set","children":[{"level":3,"title":"添加","slug":"添加-3","link":"#添加-3","children":[]},{"level":3,"title":"查询","slug":"查询-3","link":"#查询-3","children":[]},{"level":3,"title":"删除","slug":"删除-3","link":"#删除-3","children":[]},{"level":3,"title":"集合间聚合运算","slug":"集合间聚合运算","link":"#集合间聚合运算","children":[]},{"level":3,"title":"使用场景","slug":"使用场景","link":"#使用场景","children":[]}]},{"level":2,"title":"有序集合（Sorted Set）","slug":"有序集合-sorted-set","link":"#有序集合-sorted-set","children":[{"level":3,"title":"添加","slug":"添加-4","link":"#添加-4","children":[]},{"level":3,"title":"查询","slug":"查询-4","link":"#查询-4","children":[]},{"level":3,"title":"修改","slug":"修改-2","link":"#修改-2","children":[]},{"level":3,"title":"删除","slug":"删除-4","link":"#删除-4","children":[]},{"level":3,"title":"有序集合间聚合运算","slug":"有序集合间聚合运算","link":"#有序集合间聚合运算","children":[]}]},{"level":2,"title":"通用命令","slug":"通用命令","link":"#通用命令","children":[]}],"git":{"createdTime":1700614687000,"updatedTime":1700614687000,"contributors":[{"name":"GodX","email":"1046529973@qq.com","commits":1}]},"readingTime":{"minutes":15.34,"words":4601},"filePathRelative":"大前端/Nodejs全栈开发/Redis/05-常用数据类型和操作命令.md","localizedDate":"2023年11月22日","excerpt":"<p>Redis 不是简单的键值存储，它实际上是一个数据结构服务器，支持不同类型的值。这意味着在传统键值存储中，您将字符串键与字符串值相关联，而在 Redis 中，该值不仅限于简单的字符串，还可以容纳更复杂的数据结构。以下是 Redis 中支持的所有数据结构的列表：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>类型</th>\\n<th>说明</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>String</td>\\n<td>字符串</td>\\n</tr>\\n<tr>\\n<td>Hash</td>\\n<td>散列，是由与值相关联的字段组成的内容。字段和值都是字符串。这与 Ruby 或 Python 哈希非常相似。类似于 JavaScript 中的对象结构。</td>\\n</tr>\\n<tr>\\n<td>List</td>\\n<td>列表，根据插入顺序排序的字符串元素的集合。它们基本上是链表。</td>\\n</tr>\\n<tr>\\n<td>Set</td>\\n<td>未排序的字符串元素集合，集合中的数据是不重复的。</td>\\n</tr>\\n<tr>\\n<td>ZSet</td>\\n<td>与 Sets 类似，但每个字符串元素都与一个称为分数的浮点值相关联。元素总是按它们的分数排序，因此与 Sets 不同，可以检索一系列元素（例如，您可能会问：给我前10名或后10名）。</td>\\n</tr>\\n<tr>\\n<td>Bit arrays（或 bitmaps）</td>\\n<td>可以使用特殊命令像位数组一样处理字符串值：您可以设置和清除单个位，计数所有设置为1的位，找到第一个设置或未设置的位，依此类推。</td>\\n</tr>\\n<tr>\\n<td>HyperLogLogs</td>\\n<td>这是一个概率数据结构，用于估计集合的基数。</td>\\n</tr>\\n<tr>\\n<td>Streams</td>\\n<td>提供抽象日志数据类型的类似地图项的仅追加集合。</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{u as comp,v as data};
