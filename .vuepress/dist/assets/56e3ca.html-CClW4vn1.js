import{_ as s,c as a,e as p,o as t}from"./app-DVyU65El.js";const e={};function o(l,n){return t(),a("div",null,n[0]||(n[0]=[p(`<p>自动从训练结果中获取最高的mAP所对应的epoch。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre><code><span class="line"><span class="token keyword">import</span> json</span>
<span class="line"><span class="token keyword">import</span> os</span>
<span class="line"></span>
<span class="line"><span class="token triple-quoted-string string">&#39;&#39;&#39;</span>
<span class="line">:param work_dir 训练结果目录</span>
<span class="line">:return 最好的map对应的epoch路径</span>
<span class="line">&#39;&#39;&#39;</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">getBestEpoch</span><span class="token punctuation">(</span>work_dir<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">global</span> maxEpoch</span>
<span class="line">    fileList <span class="token operator">=</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>work_dir<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token builtin">file</span> <span class="token keyword">in</span> fileList<span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">if</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>splitext<span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&#39;.json&#39;</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">)</span></span>
<span class="line">            json_file <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>work_dir<span class="token punctuation">,</span> <span class="token builtin">file</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            max_mAP <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">            <span class="token keyword">for</span> line <span class="token keyword">in</span> json_file<span class="token punctuation">.</span>readlines<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">                json_data <span class="token operator">=</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>line<span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">try</span><span class="token punctuation">:</span></span>
<span class="line">                    <span class="token keyword">if</span> json_data<span class="token punctuation">[</span><span class="token string">&#39;mode&#39;</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">&#39;val&#39;</span><span class="token punctuation">:</span></span>
<span class="line">                        <span class="token keyword">if</span> <span class="token builtin">float</span><span class="token punctuation">(</span>json_data<span class="token punctuation">[</span><span class="token string">&#39;bbox_mAP_50&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> max_mAP<span class="token punctuation">:</span></span>
<span class="line">                            max_mAP <span class="token operator">=</span> <span class="token builtin">float</span><span class="token punctuation">(</span>json_data<span class="token punctuation">[</span><span class="token string">&#39;bbox_mAP_50&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">                            maxEpoch <span class="token operator">=</span> json_data<span class="token punctuation">[</span><span class="token string">&#39;epoch&#39;</span><span class="token punctuation">]</span></span>
<span class="line">                <span class="token keyword">except</span><span class="token punctuation">:</span></span>
<span class="line">                    <span class="token keyword">pass</span></span>
<span class="line">    <span class="token keyword">return</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>work_dir<span class="token punctuation">,</span> <span class="token string">&#39;epoch_%d.pth&#39;</span> <span class="token operator">%</span> maxEpoch<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)]))}const c=s(e,[["render",o],["__file","56e3ca.html.vue"]]),u=JSON.parse('{"path":"/pages/56e3ca.html","title":"mmdetection获取最高map的epoch","lang":"en-US","frontmatter":{"title":"mmdetection获取最高map的epoch","date":"2022/05/12","permalink":"/pages/56e3ca.html","categories":["mmdetection"],"tags":["mmdetection"]},"headers":[],"git":{"createdTime":1732191603000,"updatedTime":1732191603000,"contributors":[{"name":"Ghlerrix","email":"Ghlerrix@outlook.com","commits":1}]},"filePathRelative":"blogs/mmdetection/mmdetection获取最高map的epoch.md"}');export{c as comp,u as data};