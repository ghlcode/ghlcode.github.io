import{_ as s,c as a,e as p,o as t}from"./app-DVyU65El.js";const e={};function i(l,n){return t(),a("div",null,n[0]||(n[0]=[p(`<h1 id="解决构建项目卡在gradle-build-runing" tabindex="-1"><a class="header-anchor" href="#解决构建项目卡在gradle-build-runing"><span>解决构建项目卡在Gradle Build Runing</span></a></h1><p>在 C:\\Users\\用户名.gradle 这个目录下创建文件 init.gradle 并填入以下内容</p><div class="language-groovy line-numbers-mode" data-highlighter="prismjs" data-ext="groovy" data-title="groovy"><pre><code><span class="line">allprojects<span class="token punctuation">{</span></span>
<span class="line">    repositories <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">def</span> ALIYUN_REPOSITORY_URL <span class="token operator">=</span> <span class="token string">&#39;http://maven.aliyun.com/nexus/content/groups/public&#39;</span></span>
<span class="line">        <span class="token keyword">def</span> ALIYUN_JCENTER_URL <span class="token operator">=</span> <span class="token string">&#39;http://maven.aliyun.com/nexus/content/repositories/jcenter&#39;</span></span>
<span class="line">        all <span class="token punctuation">{</span> ArtifactRepository repo <span class="token operator">-&gt;</span></span>
<span class="line">            <span class="token keyword">if</span><span class="token punctuation">(</span>repo <span class="token keyword">instanceof</span> <span class="token class-name">MavenArtifactRepository</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">def</span> url <span class="token operator">=</span> repo<span class="token punctuation">.</span>url<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;https://repo1.maven.org/maven2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    project<span class="token punctuation">.</span>logger<span class="token punctuation">.</span>lifecycle <span class="token interpolation-string"><span class="token string">&quot;Repository </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">repo<span class="token punctuation">.</span>url</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> replaced by </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">ALIYUN_REPOSITORY_URL</span></span><span class="token string">.&quot;</span></span></span>
<span class="line">                    remove repo</span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;https://jcenter.bintray.com/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    project<span class="token punctuation">.</span>logger<span class="token punctuation">.</span>lifecycle <span class="token interpolation-string"><span class="token string">&quot;Repository </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">repo<span class="token punctuation">.</span>url</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> replaced by </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">ALIYUN_JCENTER_URL</span></span><span class="token string">.&quot;</span></span></span>
<span class="line">                    remove repo</span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        maven <span class="token punctuation">{</span></span>
<span class="line">            url ALIYUN_REPOSITORY_URL</span>
<span class="line">            url ALIYUN_JCENTER_URL</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)]))}const c=s(e,[["render",i],["__file","1358dc.html.vue"]]),r=JSON.parse('{"path":"/android/1358dc.html","title":"解决构建项目卡在Gradle Build Runing","lang":"en-US","frontmatter":{"title":"解决构建项目卡在Gradle Build Runing","date":"2019/11/23","permalink":"/android/1358dc.html","categories":["android"],"tags":["android"]},"headers":[],"git":{"createdTime":1732191603000,"updatedTime":1732191603000,"contributors":[{"name":"Ghlerrix","email":"Ghlerrix@outlook.com","commits":1}]},"filePathRelative":"blogs/android/解决构建项目卡在Gradle Build Runing.md"}');export{c as comp,r as data};