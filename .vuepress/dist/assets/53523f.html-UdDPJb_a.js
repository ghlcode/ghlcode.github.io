import{_ as p,c as t,a as s,b as a,d as i,e as l,o as c,r as o}from"./app-DVyU65El.js";const u={},d={href:"https://github.com/Shanyaliux/SerialPortSample",target:"_blank",rel:"noopener noreferrer"},r={href:"https://serialport.readthedocs.io/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://download.csdn.net/download/qq_41121080/11954958",target:"_blank",rel:"noopener noreferrer"},k={href:"https://shanya.lanzout.com/iQs7ye3rccd",target:"_blank",rel:"noopener noreferrer"},m={class:"custom-container tip"},b={href:"https://github.com/Shanyaliux/SerialPortSample",target:"_blank",rel:"noopener noreferrer"},h={href:"https://serialport.readthedocs.io/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://download.csdn.net/download/qq_41121080/11954958",target:"_blank",rel:"noopener noreferrer"},g={href:"https://shanya.lanzout.com/iQs7ye3rccd",target:"_blank",rel:"noopener noreferrer"};function f(y,n){const e=o("ExternalLinkIcon");return c(),t("div",null,[s("blockquote",null,[s("p",null,[n[2]||(n[2]=a("以下的代码我优化并打包成了一个依赖库，可以非常快捷的实现相关功能，感兴趣的可以支持一下。")),n[3]||(n[3]=s("br",null,null,-1)),s("a",d,[n[0]||(n[0]=a("github")),i(e)]),n[4]||(n[4]=s("br",null,null,-1)),s("a",r,[n[1]||(n[1]=a("使用文档")),i(e)])])]),n[17]||(n[17]=l(`<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span><strong>介绍</strong></span></a></h2><p>这次做项目用到了Android蓝牙串口，折腾了两天总算弄出来了，记录一下方便以后回顾。</p><h2 id="获取相关权限" tabindex="-1"><a class="header-anchor" href="#获取相关权限"><span><strong>获取相关权限</strong></span></a></h2><p>获取蓝牙权限</p><p>在 AndroidManifest.xml文件中加入如下代码，（其实这俩句可以先不加，在工程中写到相应语句的时候可以Alt+Enter添加）</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    &lt;uses-permission android:name=&quot;android.permission.BLUETOOTH&quot; /&gt;</span>
<span class="line">    &lt;uses-permission android:name=&quot;android.permission.BLUETOOTH_ADMIN&quot; /&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>再加上定位权限，这是Android 6.0 以上一定需要注意的地方，同时最好在代码里加上判断是否获取定位权限的代码（就是这个该死的玩意儿耽误我好长时间）</p><p>AndroidManifest.xml中</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    &lt;uses-feature android:name=&quot;android.hardware.location.gps&quot; /&gt;</span>
<span class="line">    &lt;uses-feature</span>
<span class="line">        android:name=&quot;android.hardware.bluetooth_le&quot;</span>
<span class="line">        android:required=&quot;true&quot; /&gt;</span>
<span class="line">    &lt;uses-permission android:name=&quot;android.permission.ACCESS_FINE_LOCATION&quot; /&gt;</span>
<span class="line">    &lt;uses-permission android:name=&quot;android.permission.ACCESS_COARSE_LOCATION&quot; /&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断是否获取定位权限（这里我是写在了扫描未配对蓝牙设备的地方，当然也可以直接放在程序刚开始）</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">ContextCompat</span><span class="token punctuation">.</span><span class="token function">checkSelfPermission</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token class-name">Manifest</span><span class="token punctuation">.</span>permission<span class="token punctuation">.</span><span class="token constant">ACCESS_FINE_LOCATION</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token class-name">PackageManager</span><span class="token punctuation">.</span><span class="token constant">PERMISSION_GRANTED</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//未开启定位权限</span></span>
<span class="line">            <span class="token comment">//开启定位权限,200是标识码</span></span>
<span class="line">            <span class="token class-name">ActivityCompat</span><span class="token punctuation">.</span><span class="token function">requestPermissions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token class-name">Manifest</span><span class="token punctuation">.</span>permission<span class="token punctuation">.</span><span class="token constant">ACCESS_FINE_LOCATION</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// 显示其它设备（未配对设备）列表</span></span>
<span class="line">            <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>textView<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setVisibility</span><span class="token punctuation">(</span><span class="token class-name">View</span><span class="token punctuation">.</span><span class="token constant">VISIBLE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">// 关闭再进行的服务查找</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">isDiscovering</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">cancelDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">startDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述判断发现未开启之后会自动回调函数区开启，这里手动实现代码如下</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onRequestPermissionsResult</span><span class="token punctuation">(</span><span class="token keyword">int</span> requestCode<span class="token punctuation">,</span> <span class="token annotation punctuation">@NonNull</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> permissions<span class="token punctuation">,</span> <span class="token annotation punctuation">@NonNull</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> grantResults<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onRequestPermissionsResult</span><span class="token punctuation">(</span>requestCode<span class="token punctuation">,</span> permissions<span class="token punctuation">,</span> grantResults<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">switch</span> <span class="token punctuation">(</span>requestCode<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">case</span> <span class="token number">200</span><span class="token operator">:</span></span>
<span class="line">                <span class="token keyword">if</span><span class="token punctuation">(</span>grantResults<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token class-name">PackageManager</span><span class="token punctuation">.</span><span class="token constant">PERMISSION_GRANTED</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                    <span class="token function">doDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span></span>
<span class="line">                    <span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">                <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token keyword">default</span><span class="token operator">:</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>权限方面的事情完了（我并不是在程序刚开始的地方考虑的，这一点很不好，后续版本会改掉 ，这里就懒得弄了，嘿嘿）</p><h2 id="判断蓝牙是否打开" tabindex="-1"><a class="header-anchor" href="#判断蓝牙是否打开"><span><strong>判断蓝牙是否打开</strong></span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token comment">//如果打不开蓝牙提示信息，结束程序</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>mBluetoothAdapter <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">&quot;无法打开手机蓝牙，请确认手机是否有蓝牙功能！&quot;</span><span class="token punctuation">,</span><span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENGTH_SHORT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="连接按钮的响应" tabindex="-1"><a class="header-anchor" href="#连接按钮的响应"><span><strong>连接按钮的响应</strong></span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">        <span class="token keyword">final</span> <span class="token class-name">Button</span> connectButton <span class="token operator">=</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>connectButton<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        connectButton<span class="token punctuation">.</span><span class="token function">setOnClickListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">View<span class="token punctuation">.</span>OnClickListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token annotation punctuation">@Override</span></span>
<span class="line">            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onClick</span><span class="token punctuation">(</span><span class="token class-name">View</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span>mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot; 请先打开蓝牙&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENGTH_LONG</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">                <span class="token comment">//如果未连接设备则打开DevicesListActivity搜索设备</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span>mBluetoothSocket <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token class-name">Intent</span> serveIntent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Intent</span><span class="token punctuation">(</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">DevicesListActivity</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//跳转活动</span></span>
<span class="line">                    <span class="token function">startActivityForResult</span><span class="token punctuation">(</span>serveIntent<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//设置返回宏定义</span></span>
<span class="line">                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token comment">//关闭连接socket</span></span>
<span class="line">                    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">                        bRun <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">                        is<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        mBluetoothSocket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        mBluetoothSocket <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">                        connectButton<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token string">&quot;连接&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="发送按钮响应" tabindex="-1"><a class="header-anchor" href="#发送按钮响应"><span><strong>发送按钮响应</strong></span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">        <span class="token class-name">Button</span> sendButton <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Button</span><span class="token punctuation">)</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>sendButton<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        sendButton<span class="token punctuation">.</span><span class="token function">setOnClickListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">View<span class="token punctuation">.</span>OnClickListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token annotation punctuation">@Override</span></span>
<span class="line">            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onClick</span><span class="token punctuation">(</span><span class="token class-name">View</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">                <span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span>mBluetoothSocket <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;请先连接设备&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENGTH_SHORT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span>sendEditText<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;请先输入数据&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENGTH_SHORT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">                <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">                    <span class="token class-name">OutputStream</span> os <span class="token operator">=</span> mBluetoothSocket<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//蓝牙连接输出流</span></span>
<span class="line">                    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bos <span class="token operator">=</span> sendEditText<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> bos<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token keyword">if</span> <span class="token punctuation">(</span>bos<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0x0a</span><span class="token punctuation">)</span> n<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bos_new <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>bos<span class="token punctuation">.</span>length <span class="token operator">+</span> n<span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">                    n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> bos<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//手机中换行为0a,将其改为0d 0a后再发送</span></span>
<span class="line">                        <span class="token keyword">if</span> <span class="token punctuation">(</span>bos<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0x0a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                            bos_new<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0x0d</span><span class="token punctuation">;</span></span>
<span class="line">                            n<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">                            bos_new<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0x0a</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                            bos_new<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">=</span> bos<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token punctuation">}</span></span>
<span class="line">                        n<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">                    os<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>bos_new<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设备可以被搜索设置" tabindex="-1"><a class="header-anchor" href="#设备可以被搜索设置"><span><strong>设备可以被搜索设置</strong></span></a></h2><blockquote><p>这里就看个人需求了，我是没用上这个</p></blockquote><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">if</span><span class="token punctuation">(</span>mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                    mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="接收活动结果" tabindex="-1"><a class="header-anchor" href="#接收活动结果"><span><strong>接收活动结果</strong></span></a></h1><blockquote><p>主要是扫描活动传来的连接信息</p></blockquote><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onActivityResult</span><span class="token punctuation">(</span><span class="token keyword">int</span> requestCode<span class="token punctuation">,</span> <span class="token keyword">int</span> resultCode<span class="token punctuation">,</span> <span class="token class-name">Intent</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onActivityResult</span><span class="token punctuation">(</span>requestCode<span class="token punctuation">,</span> resultCode<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">switch</span> <span class="token punctuation">(</span>requestCode<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>     <span class="token comment">//连接结果，由DeviceListActivity设置返回</span></span>
<span class="line">                <span class="token comment">// 响应返回结果</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span>resultCode <span class="token operator">==</span> <span class="token class-name">Activity</span><span class="token punctuation">.</span><span class="token constant">RESULT_OK</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>   <span class="token comment">//连接成功，由DeviceListActivity设置返回</span></span>
<span class="line">                    <span class="token comment">// MAC地址，由DeviceListActivity设置返回</span></span>
<span class="line">                    <span class="token class-name">String</span> address <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">getExtras</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token class-name">DevicesListActivity</span><span class="token punctuation">.</span><span class="token constant">EXTRA_DEVICE_ADDRESS</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token comment">// 得到蓝牙设备句柄</span></span>
<span class="line">                    mBluetoothDevice <span class="token operator">=</span> mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">getRemoteDevice</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">// 用服务号得到socket</span></span>
<span class="line">                    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">                        mBluetoothSocket <span class="token operator">=</span> mBluetoothDevice<span class="token punctuation">.</span><span class="token function">createRfcommSocketToServiceRecord</span><span class="token punctuation">(</span><span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">fromString</span><span class="token punctuation">(</span><span class="token constant">MY_UUID</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&quot;连接失败！&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENGTH_SHORT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token comment">//连接socket</span></span>
<span class="line">                    <span class="token class-name">Button</span> connectButton <span class="token operator">=</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>connectButton<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">                        mBluetoothSocket<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&quot;连接&quot;</span> <span class="token operator">+</span> mBluetoothDevice<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;成功！&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENGTH_SHORT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        connectButton<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token string">&quot;断开&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">                            <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&quot;连接失败！&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENGTH_SHORT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                            mBluetoothSocket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                            mBluetoothSocket <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> ee<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                            <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&quot;连接失败！&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENGTH_SHORT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">                        <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">                    <span class="token comment">//打开接收线程</span></span>
<span class="line">                    <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">                        is <span class="token operator">=</span> mBluetoothSocket<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//得到蓝牙数据输入流</span></span>
<span class="line">                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&quot;接收数据失败！&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENGTH_SHORT</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token keyword">if</span> <span class="token punctuation">(</span>bThread <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        readThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        bThread <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                        bRun <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">                <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">default</span><span class="token operator">:</span></span>
<span class="line">                <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接收线程" tabindex="-1"><a class="header-anchor" href="#接收线程"><span><strong>接收线程</strong></span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token comment">//接收数据线程</span></span>
<span class="line">    <span class="token class-name">Thread</span> readThread<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer_new <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">            bRun <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token comment">//接收线程</span></span>
<span class="line">            <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">try</span><span class="token punctuation">{</span></span>
<span class="line">                    <span class="token keyword">while</span><span class="token punctuation">(</span>is<span class="token punctuation">.</span><span class="token function">available</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                        <span class="token keyword">while</span><span class="token punctuation">(</span>bRun <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>bThread<span class="token punctuation">)</span><span class="token comment">//跳出循环</span></span>
<span class="line">                            <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">                        num <span class="token operator">=</span> is<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>         <span class="token comment">//读入数据</span></span>
<span class="line">                        n<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">                        <span class="token class-name">String</span> s0 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>num<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span>buffer<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0x0d</span><span class="token punctuation">)</span><span class="token operator">&amp;&amp;</span><span class="token punctuation">(</span>buffer<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">==</span><span class="token number">0x0a</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                                buffer_new<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0x0a</span><span class="token punctuation">;</span></span>
<span class="line">                                i<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">                            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span></span>
<span class="line">                                buffer_new<span class="token punctuation">[</span>n<span class="token punctuation">]</span> <span class="token operator">=</span> buffer<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">                            <span class="token punctuation">}</span></span>
<span class="line">                            n<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">                        <span class="token punctuation">}</span></span>
<span class="line">                        <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>buffer_new<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                        smsg<span class="token operator">+=</span>s<span class="token punctuation">;</span>   <span class="token comment">//写入接收缓存</span></span>
<span class="line">                        <span class="token keyword">if</span><span class="token punctuation">(</span>is<span class="token punctuation">.</span><span class="token function">available</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token keyword">break</span><span class="token punctuation">;</span>  <span class="token comment">//短时间没有数据才跳出进行显示</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token comment">//发送显示消息，进行显示刷新</span></span>
<span class="line">                    handler<span class="token punctuation">.</span><span class="token function">sendMessage</span><span class="token punctuation">(</span>handler<span class="token punctuation">.</span><span class="token function">obtainMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="消息显示的处理队列" tabindex="-1"><a class="header-anchor" href="#消息显示的处理队列"><span><strong>消息显示的处理队列</strong></span></a></h2><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"> 	<span class="token class-name">Handler</span> handler<span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handleMessage</span><span class="token punctuation">(</span><span class="token class-name">Message</span> msg<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">handleMessage</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            tv_in<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span>smsg<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">//显示数据</span></span>
<span class="line">            scrollView<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>tv_in<span class="token punctuation">.</span><span class="token function">getMeasuredHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//跳至数据最后一页</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span><strong>总结</strong></span></a></h2><p>至此，接收发送部分已经全部结束，然后就是扫描设备部分了 这部分我直接贴出整个活动的代码了 注释比较齐全就不哔哔了</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>btcontroller</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">androidx<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">NonNull</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">androidx<span class="token punctuation">.</span>appcompat<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">AppCompatActivity</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">androidx<span class="token punctuation">.</span>core<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">ActivityCompat</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">androidx<span class="token punctuation">.</span>core<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">ContextCompat</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span></span><span class="token class-name">Manifest</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">Activity</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>bluetooth<span class="token punctuation">.</span></span><span class="token class-name">BluetoothAdapter</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>bluetooth<span class="token punctuation">.</span></span><span class="token class-name">BluetoothDevice</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">BroadcastReceiver</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">Context</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">Intent</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span></span><span class="token class-name">IntentFilter</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>content<span class="token punctuation">.</span>pm<span class="token punctuation">.</span></span><span class="token class-name">PackageManager</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>os<span class="token punctuation">.</span></span><span class="token class-name">Bundle</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Log</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">Menu</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">MenuItem</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">View</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">AdapterView</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">ArrayAdapter</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">Button</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">ListView</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">TextView</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">Toast</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Set</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DevicesListActivity</span> <span class="token keyword">extends</span> <span class="token class-name">AppCompatActivity</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">TAG</span> <span class="token operator">=</span> <span class="token string">&quot;DevicesListActivity&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token constant">EXTRA_DEVICE_ADDRESS</span> <span class="token operator">=</span> <span class="token string">&quot;设备地址&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//成员域</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">BluetoothAdapter</span> mBluetoothAdapter<span class="token punctuation">;</span> <span class="token comment">//蓝牙适配器</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">ArrayAdapter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> mPairedDevicesArrayAdapter<span class="token punctuation">;</span> <span class="token comment">//已配对的设备适配器</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">ArrayAdapter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> mUnPairedDevicesArrayAdapter<span class="token punctuation">;</span> <span class="token comment">//未配对的设备适配器</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token class-name">Bundle</span> savedInstanceState<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token function">setContentView</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>activity_devices_list<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">//设定默认返回值为取消</span></span>
<span class="line">        <span class="token function">setResult</span><span class="token punctuation">(</span><span class="token class-name">Activity</span><span class="token punctuation">.</span><span class="token constant">RESULT_CANCELED</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 初使化设备适配器存储数组</span></span>
<span class="line">        mPairedDevicesArrayAdapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayAdapter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>device_name<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        mUnPairedDevicesArrayAdapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayAdapter</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>device_name<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 设置已配队设备列表</span></span>
<span class="line">        <span class="token class-name">ListView</span> pairedListView <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ListView</span><span class="token punctuation">)</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>pairedListView<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        pairedListView<span class="token punctuation">.</span><span class="token function">setAdapter</span><span class="token punctuation">(</span>mPairedDevicesArrayAdapter<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        pairedListView<span class="token punctuation">.</span><span class="token function">setOnItemClickListener</span><span class="token punctuation">(</span> mDeviceClickListener<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 设置新查找设备列表</span></span>
<span class="line">        <span class="token class-name">ListView</span> newDevicesListView <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ListView</span><span class="token punctuation">)</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>unPairedListView<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        newDevicesListView<span class="token punctuation">.</span><span class="token function">setAdapter</span><span class="token punctuation">(</span>mUnPairedDevicesArrayAdapter<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        newDevicesListView<span class="token punctuation">.</span><span class="token function">setOnItemClickListener</span><span class="token punctuation">(</span>mDeviceClickListener<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 注册接收查找到设备action接收器</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">registerReceiver</span><span class="token punctuation">(</span>mReceiver<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">IntentFilter</span><span class="token punctuation">(</span><span class="token class-name">BluetoothDevice</span><span class="token punctuation">.</span><span class="token constant">ACTION_FOUND</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 注册查找结束action接收器</span></span>
<span class="line">        <span class="token comment">//filter = new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">registerReceiver</span><span class="token punctuation">(</span>mReceiver<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">IntentFilter</span><span class="token punctuation">(</span><span class="token class-name">BluetoothAdapter</span><span class="token punctuation">.</span><span class="token constant">ACTION_DISCOVERY_FINISHED</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">registerReceiver</span><span class="token punctuation">(</span>mReceiver<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">IntentFilter</span><span class="token punctuation">(</span><span class="token class-name">BluetoothAdapter</span><span class="token punctuation">.</span><span class="token constant">ACTION_DISCOVERY_STARTED</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 得到本地蓝牙句柄</span></span>
<span class="line">        mBluetoothAdapter <span class="token operator">=</span> <span class="token class-name">BluetoothAdapter</span><span class="token punctuation">.</span><span class="token function">getDefaultAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 得到已配对蓝牙设备列表</span></span>
<span class="line">        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BluetoothDevice</span><span class="token punctuation">&gt;</span></span> pairedDevices <span class="token operator">=</span> mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">getBondedDevices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">//添加已配对设备到列表并显示</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>pairedDevices<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>pairedListView<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setVisibility</span><span class="token punctuation">(</span><span class="token class-name">View</span><span class="token punctuation">.</span><span class="token constant">VISIBLE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">BluetoothDevice</span> device <span class="token operator">:</span> pairedDevices<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                mPairedDevicesArrayAdapter<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>device<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> device<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">String</span> noDevices <span class="token operator">=</span> <span class="token string">&quot;没有找到已配对的设备。&quot;</span> <span class="token punctuation">;</span></span>
<span class="line">            mPairedDevicesArrayAdapter<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>noDevices<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">//取消按键的响应函数</span></span>
<span class="line">        <span class="token class-name">Button</span> cancelButton <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Button</span><span class="token punctuation">)</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>cancelButton<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        cancelButton<span class="token punctuation">.</span><span class="token function">setOnClickListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">View<span class="token punctuation">.</span>OnClickListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token annotation punctuation">@Override</span></span>
<span class="line">            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onClick</span><span class="token punctuation">(</span><span class="token class-name">View</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">onDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 关闭服务查找</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>mBluetoothAdapter <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">cancelDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 注销action接收器</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">unregisterReceiver</span><span class="token punctuation">(</span>mReceiver<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * 开始服务和设备查找</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">doDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token comment">//        if (D) Log.d(TAG, &quot;doDiscovery()&quot;);</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 在窗口显示查找中信息</span></span>
<span class="line">        <span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">&quot;查找设备中...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">ContextCompat</span><span class="token punctuation">.</span><span class="token function">checkSelfPermission</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token class-name">Manifest</span><span class="token punctuation">.</span>permission<span class="token punctuation">.</span><span class="token constant">ACCESS_FINE_LOCATION</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token class-name">PackageManager</span><span class="token punctuation">.</span><span class="token constant">PERMISSION_GRANTED</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">//未开启定位权限</span></span>
<span class="line">            <span class="token comment">//开启定位权限,200是标识码</span></span>
<span class="line">            <span class="token class-name">ActivityCompat</span><span class="token punctuation">.</span><span class="token function">requestPermissions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token class-name">Manifest</span><span class="token punctuation">.</span>permission<span class="token punctuation">.</span><span class="token constant">ACCESS_FINE_LOCATION</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// 显示其它设备（未配对设备）列表</span></span>
<span class="line">            <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>textView<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setVisibility</span><span class="token punctuation">(</span><span class="token class-name">View</span><span class="token punctuation">.</span><span class="token constant">VISIBLE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">// 关闭再进行的服务查找</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">isDiscovering</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">cancelDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">startDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//加载菜单</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">onCreateOptionsMenu</span><span class="token punctuation">(</span><span class="token class-name">Menu</span> menu<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">getMenuInflater</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">inflate</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>menu<span class="token punctuation">.</span>main<span class="token punctuation">,</span>menu<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//菜单项的响应</span></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">onOptionsItemSelected</span><span class="token punctuation">(</span><span class="token annotation punctuation">@NonNull</span> <span class="token class-name">MenuItem</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">switch</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span><span class="token function">getItemId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">case</span> <span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>scanItem<span class="token operator">:</span></span>
<span class="line"></span>
<span class="line">                <span class="token function">doDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">                <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token keyword">default</span><span class="token operator">:</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 选择设备响应函数</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">AdapterView<span class="token punctuation">.</span>OnItemClickListener</span> mDeviceClickListener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AdapterView<span class="token punctuation">.</span>OnItemClickListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onItemClick</span><span class="token punctuation">(</span><span class="token class-name">AdapterView</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> av<span class="token punctuation">,</span> <span class="token class-name">View</span> v<span class="token punctuation">,</span> <span class="token keyword">int</span> arg2<span class="token punctuation">,</span> <span class="token keyword">long</span> arg3<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// 准备连接设备，关闭服务查找</span></span>
<span class="line">            mBluetoothAdapter<span class="token punctuation">.</span><span class="token function">cancelDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">// 得到mac地址</span></span>
<span class="line">            <span class="token class-name">String</span> info <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">TextView</span><span class="token punctuation">)</span> v<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token class-name">String</span> address <span class="token operator">=</span> info<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">17</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">// 设置返回数据</span></span>
<span class="line">            <span class="token class-name">Intent</span> intent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Intent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            intent<span class="token punctuation">.</span><span class="token function">putExtra</span><span class="token punctuation">(</span><span class="token string">&quot;设备地址&quot;</span><span class="token punctuation">,</span> address<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">// 设置返回值并结束程序</span></span>
<span class="line">            <span class="token function">setResult</span><span class="token punctuation">(</span><span class="token class-name">Activity</span><span class="token punctuation">.</span><span class="token constant">RESULT_OK</span><span class="token punctuation">,</span> intent<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 查找到设备和搜索完成action监听器</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">BroadcastReceiver</span> mReceiver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BroadcastReceiver</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token annotation punctuation">@Override</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onReceive</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">,</span> <span class="token class-name">Intent</span> intent<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">String</span> action <span class="token operator">=</span> intent<span class="token punctuation">.</span><span class="token function">getAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// 查找到设备action</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">BluetoothDevice</span><span class="token punctuation">.</span><span class="token constant">ACTION_FOUND</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// 得到蓝牙设备</span></span>
<span class="line">            <span class="token class-name">BluetoothDevice</span> device <span class="token operator">=</span> intent<span class="token punctuation">.</span><span class="token function">getParcelableExtra</span><span class="token punctuation">(</span><span class="token class-name">BluetoothDevice</span><span class="token punctuation">.</span><span class="token constant">EXTRA_DEVICE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token comment">// 如果是已配对的则略过，已得到显示，其余的在添加到列表中进行显示</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>device<span class="token punctuation">.</span><span class="token function">getBondState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token class-name">BluetoothDevice</span><span class="token punctuation">.</span><span class="token constant">BOND_BONDED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                mUnPairedDevicesArrayAdapter<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>device<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> device<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>  <span class="token comment">//添加到已配对设备列表</span></span>
<span class="line">                mPairedDevicesArrayAdapter<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>device<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> device<span class="token punctuation">.</span><span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token comment">// 搜索完成action</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">BluetoothAdapter</span><span class="token punctuation">.</span><span class="token constant">ACTION_DISCOVERY_FINISHED</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">&quot;选择要连接的设备&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>mUnPairedDevicesArrayAdapter<span class="token punctuation">.</span><span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">String</span> noDevices <span class="token operator">=</span> <span class="token string">&quot;没有找到新设备&quot;</span><span class="token punctuation">;</span></span>
<span class="line">                mUnPairedDevicesArrayAdapter<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>noDevices<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Override</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onRequestPermissionsResult</span><span class="token punctuation">(</span><span class="token keyword">int</span> requestCode<span class="token punctuation">,</span> <span class="token annotation punctuation">@NonNull</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> permissions<span class="token punctuation">,</span> <span class="token annotation punctuation">@NonNull</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> grantResults<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onRequestPermissionsResult</span><span class="token punctuation">(</span>requestCode<span class="token punctuation">,</span> permissions<span class="token punctuation">,</span> grantResults<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">switch</span> <span class="token punctuation">(</span>requestCode<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">case</span> <span class="token number">200</span><span class="token operator">:</span></span>
<span class="line">                <span class="token keyword">if</span><span class="token punctuation">(</span>grantResults<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token class-name">PackageManager</span><span class="token punctuation">.</span><span class="token constant">PERMISSION_GRANTED</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">                    <span class="token function">doDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span></span>
<span class="line">                    <span class="token function">finish</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">                <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token keyword">default</span><span class="token operator">:</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主活动的代码</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">package com.example.btcontroller;</span>
<span class="line"></span>
<span class="line">import androidx.appcompat.app.AppCompatActivity;</span>
<span class="line"></span>
<span class="line">import android.app.Activity;</span>
<span class="line">import android.bluetooth.BluetoothAdapter;</span>
<span class="line">import android.bluetooth.BluetoothDevice;</span>
<span class="line">import android.bluetooth.BluetoothSocket;</span>
<span class="line">import android.content.Intent;</span>
<span class="line">import android.os.Bundle;</span>
<span class="line">import android.os.Handler;</span>
<span class="line">import android.os.Message;</span>
<span class="line">import android.view.View;</span>
<span class="line">import android.widget.Button;</span>
<span class="line">import android.widget.EditText;</span>
<span class="line">import android.widget.ScrollView;</span>
<span class="line">import android.widget.TextView;</span>
<span class="line">import android.widget.Toast;</span>
<span class="line"></span>
<span class="line">import java.io.IOException;</span>
<span class="line">import java.io.InputStream;</span>
<span class="line">import java.io.OutputStream;</span>
<span class="line">import java.util.UUID;</span>
<span class="line"></span>
<span class="line">public class MainActivity extends AppCompatActivity {</span>
<span class="line"></span>
<span class="line">    private final static String MY_UUID = &quot;00001101-0000-1000-8000-00805F9B34FB&quot;;   //SPP服务UUID号</span>
<span class="line">    private BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter(); //获取蓝牙实例</span>
<span class="line"></span>
<span class="line">    private EditText sendEditText; //创建发送 句柄</span>
<span class="line">    private TextView tv_in; //接收显示句柄</span>
<span class="line">    private ScrollView scrollView; //翻页句柄</span>
<span class="line">    private String smsg = &quot;&quot;; //显示用数据缓存</span>
<span class="line"></span>
<span class="line">    BluetoothDevice mBluetoothDevice = null; //蓝牙设备</span>
<span class="line">    BluetoothSocket mBluetoothSocket = null; //蓝牙通信Socket</span>
<span class="line"></span>
<span class="line">    boolean bRun = true; //运行状态</span>
<span class="line">    boolean bThread = false; //读取线程状态</span>
<span class="line">    private InputStream is;    //输入流，用来接收蓝牙数据</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    protected void onCreate(Bundle savedInstanceState) {</span>
<span class="line">        super.onCreate(savedInstanceState);</span>
<span class="line">        setContentView(R.layout.activity_main);</span>
<span class="line"></span>
<span class="line">        //获取控件ID</span>
<span class="line">        sendEditText = findViewById(R.id.sendEditText);</span>
<span class="line">        scrollView = findViewById(R.id.receiveScrolView);</span>
<span class="line">        tv_in = findViewById(R.id.in);</span>
<span class="line"></span>
<span class="line">        //如果打不开蓝牙提示信息，结束程序</span>
<span class="line">        if (mBluetoothAdapter == null){</span>
<span class="line">            Toast.makeText(getApplicationContext(),&quot;无法打开手机蓝牙，请确认手机是否有蓝牙功能！&quot;,Toast.LENGTH_SHORT).show();</span>
<span class="line">            finish();</span>
<span class="line">            return;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        //连接按钮响应</span>
<span class="line">        final Button connectButton = findViewById(R.id.connectButton);</span>
<span class="line">        connectButton.setOnClickListener(new View.OnClickListener() {</span>
<span class="line">            @Override</span>
<span class="line">            public void onClick(View v) {</span>
<span class="line"></span>
<span class="line">                if (mBluetoothAdapter.isEnabled() == false) {</span>
<span class="line">                    Toast.makeText(getApplicationContext(), &quot; 请先打开蓝牙&quot;, Toast.LENGTH_LONG).show();</span>
<span class="line">                    return;</span>
<span class="line">                }</span>
<span class="line"></span>
<span class="line">                //如果未连接设备则打开DevicesListActivity搜索设备</span>
<span class="line">                if (mBluetoothSocket == null) {</span>
<span class="line">                    Intent serveIntent = new Intent(getApplicationContext(), DevicesListActivity.class); //跳转活动</span>
<span class="line">                    startActivityForResult(serveIntent, 1); //设置返回宏定义</span>
<span class="line">                } else {</span>
<span class="line">                    //关闭连接socket</span>
<span class="line">                    try {</span>
<span class="line">                        bRun = false;</span>
<span class="line">                        Thread.sleep(2000);</span>
<span class="line"></span>
<span class="line">                        is.close();</span>
<span class="line">                        mBluetoothSocket.close();</span>
<span class="line">                        mBluetoothSocket = null;</span>
<span class="line"></span>
<span class="line">                        connectButton.setText(&quot;连接&quot;);</span>
<span class="line">                    } catch (InterruptedException e) {</span>
<span class="line">                        e.printStackTrace();</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        e.printStackTrace();</span>
<span class="line">                    }</span>
<span class="line"></span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        });</span>
<span class="line"></span>
<span class="line">        //发送按钮响应</span>
<span class="line">        Button sendButton = (Button) findViewById(R.id.sendButton);</span>
<span class="line">        sendButton.setOnClickListener(new View.OnClickListener() {</span>
<span class="line">            @Override</span>
<span class="line">            public void onClick(View v) {</span>
<span class="line"></span>
<span class="line">                int n = 0;</span>
<span class="line">                if (mBluetoothSocket == null) {</span>
<span class="line">                    Toast.makeText(getApplicationContext(), &quot;请先连接设备&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                    return;</span>
<span class="line">                }</span>
<span class="line">                if (sendEditText.getText().length() == 0) {</span>
<span class="line">                    Toast.makeText(getApplicationContext(), &quot;请先输入数据&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                    return;</span>
<span class="line">                }</span>
<span class="line">                try {</span>
<span class="line"></span>
<span class="line">                    OutputStream os = mBluetoothSocket.getOutputStream();   //蓝牙连接输出流</span>
<span class="line">                    byte[] bos = sendEditText.getText().toString().getBytes();</span>
<span class="line">                    for (int i = 0; i &lt; bos.length; i++) {</span>
<span class="line">                        if (bos[i] == 0x0a) n++;</span>
<span class="line">                    }</span>
<span class="line">                    byte[] bos_new = new byte[bos.length + n];</span>
<span class="line">                    n = 0;</span>
<span class="line">                    for (int i = 0; i &lt; bos.length; i++) { //手机中换行为0a,将其改为0d 0a后再发送</span>
<span class="line">                        if (bos[i] == 0x0a) {</span>
<span class="line">                            bos_new[n] = 0x0d;</span>
<span class="line">                            n++;</span>
<span class="line">                            bos_new[n] = 0x0a;</span>
<span class="line">                        } else {</span>
<span class="line">                            bos_new[n] = bos[i];</span>
<span class="line">                        }</span>
<span class="line">                        n++;</span>
<span class="line">                    }</span>
<span class="line"></span>
<span class="line">                    os.write(bos_new);</span>
<span class="line">                } catch (IOException e) {</span>
<span class="line">                    e.printStackTrace();</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        });</span>
<span class="line"></span>
<span class="line">        // 设置设备可以被搜索</span>
<span class="line">        new Thread(){</span>
<span class="line">            public void run(){</span>
<span class="line">                if(mBluetoothAdapter.isEnabled()==false){</span>
<span class="line">                    mBluetoothAdapter.enable();</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        }.start();</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    //接收活动结果，响应startActivityForResult()</span>
<span class="line">    public void onActivityResult(int requestCode, int resultCode, Intent data) {</span>
<span class="line">        super.onActivityResult(requestCode, resultCode, data);</span>
<span class="line">        switch (requestCode) {</span>
<span class="line">            case 1:     //连接结果，由DeviceListActivity设置返回</span>
<span class="line">                // 响应返回结果</span>
<span class="line">                if (resultCode == Activity.RESULT_OK) {   //连接成功，由DeviceListActivity设置返回</span>
<span class="line">                    // MAC地址，由DeviceListActivity设置返回</span>
<span class="line">                    String address = data.getExtras().getString(DevicesListActivity.EXTRA_DEVICE_ADDRESS);</span>
<span class="line">                    // 得到蓝牙设备句柄</span>
<span class="line">                    mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(address);</span>
<span class="line"></span>
<span class="line">                    // 用服务号得到socket</span>
<span class="line">                    try {</span>
<span class="line">                        mBluetoothSocket = mBluetoothDevice.createRfcommSocketToServiceRecord(UUID.fromString(MY_UUID));</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        Toast.makeText(this, &quot;连接失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                    }</span>
<span class="line">                    //连接socket</span>
<span class="line">                    Button connectButton = findViewById(R.id.connectButton);</span>
<span class="line">                    try {</span>
<span class="line">                        mBluetoothSocket.connect();</span>
<span class="line">                        Toast.makeText(this, &quot;连接&quot; + mBluetoothDevice.getName() + &quot;成功！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                        connectButton.setText(&quot;断开&quot;);</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        try {</span>
<span class="line">                            Toast.makeText(this, &quot;连接失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                            mBluetoothSocket.close();</span>
<span class="line">                            mBluetoothSocket = null;</span>
<span class="line">                        } catch (IOException ee) {</span>
<span class="line">                            Toast.makeText(this, &quot;连接失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                        }</span>
<span class="line"></span>
<span class="line">                        return;</span>
<span class="line">                    }</span>
<span class="line"></span>
<span class="line">                    //打开接收线程</span>
<span class="line">                    try {</span>
<span class="line">                        is = mBluetoothSocket.getInputStream();   //得到蓝牙数据输入流</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        Toast.makeText(this, &quot;接收数据失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                        return;</span>
<span class="line">                    }</span>
<span class="line">                    if (bThread == false) {</span>
<span class="line">                        readThread.start();</span>
<span class="line">                        bThread = true;</span>
<span class="line">                    } else {</span>
<span class="line">                        bRun = true;</span>
<span class="line">                    }</span>
<span class="line">                }</span>
<span class="line">                break;</span>
<span class="line">            default:</span>
<span class="line">                break;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    //接收数据线程</span>
<span class="line">    Thread readThread=new Thread(){</span>
<span class="line"></span>
<span class="line">        public void run(){</span>
<span class="line">            int num = 0;</span>
<span class="line">            byte[] buffer = new byte[1024];</span>
<span class="line">            byte[] buffer_new = new byte[1024];</span>
<span class="line">            int i = 0;</span>
<span class="line">            int n = 0;</span>
<span class="line">            bRun = true;</span>
<span class="line">            //接收线程</span>
<span class="line">            while(true){</span>
<span class="line">                try{</span>
<span class="line">                    while(is.available()==0){</span>
<span class="line">                        while(bRun == false){}</span>
<span class="line">                    }</span>
<span class="line">                    while(true){</span>
<span class="line">                        if(!bThread)//跳出循环</span>
<span class="line">                            return;</span>
<span class="line"></span>
<span class="line">                        num = is.read(buffer);         //读入数据</span>
<span class="line">                        n=0;</span>
<span class="line"></span>
<span class="line">                        String s0 = new String(buffer,0,num);</span>
<span class="line">                        for(i=0;i&lt;num;i++){</span>
<span class="line">                            if((buffer[i] == 0x0d)&amp;&amp;(buffer[i+1]==0x0a)){</span>
<span class="line">                                buffer_new[n] = 0x0a;</span>
<span class="line">                                i++;</span>
<span class="line">                            }else{</span>
<span class="line">                                buffer_new[n] = buffer[i];</span>
<span class="line">                            }</span>
<span class="line">                            n++;</span>
<span class="line">                        }</span>
<span class="line">                        String s = new String(buffer_new,0,n);</span>
<span class="line">                        smsg+=s;   //写入接收缓存</span>
<span class="line">                        if(is.available()==0)break;  //短时间没有数据才跳出进行显示</span>
<span class="line">                    }</span>
<span class="line">                    //发送显示消息，进行显示刷新</span>
<span class="line">                    handler.sendMessage(handler.obtainMessage());</span>
<span class="line">                }catch(IOException e){</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line"></span>
<span class="line">    //消息处理队列</span>
<span class="line">    Handler handler= new Handler(){</span>
<span class="line">        public void handleMessage(Message msg){</span>
<span class="line">            super.handleMessage(msg);</span>
<span class="line">            tv_in.setText(smsg);   //显示数据</span>
<span class="line">            scrollView.scrollTo(0,tv_in.getMeasuredHeight()); //跳至数据最后一页</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line"></span>
<span class="line">    //关闭程序掉用处理部分</span>
<span class="line">    public void onDestroy(){</span>
<span class="line">        super.onDestroy();</span>
<span class="line">        if(mBluetoothSocket!=null)  //关闭连接socket</span>
<span class="line">            try{</span>
<span class="line">                mBluetoothSocket.close();</span>
<span class="line">            }catch(IOException e){}</span>
<span class="line">        //	_bluetooth.disable();  //关闭蓝牙服务</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="demo源码下载" tabindex="-1"><a class="header-anchor" href="#demo源码下载"><span><strong>Demo源码下载</strong></span></a></h2>`,36)),s("p",null,[s("a",v,[n[5]||(n[5]=a("CSDN")),i(e)]),n[7]||(n[7]=s("br",null,null,-1)),s("a",k,[n[6]||(n[6]=a("蓝奏云")),i(e)])]),s("div",m,[n[13]||(n[13]=l('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">提示</p>',2)),s("p",null,[n[10]||(n[10]=a("以下的代码我优化并打包成了一个依赖库，可以非常快捷的实现相关功能，感兴趣的可以支持一下。")),n[11]||(n[11]=s("br",null,null,-1)),s("a",b,[n[8]||(n[8]=a("github")),i(e)]),n[12]||(n[12]=s("br",null,null,-1)),s("a",h,[n[9]||(n[9]=a("使用文档")),i(e)])])]),n[18]||(n[18]=l(`<h2 id="介绍-1" tabindex="-1"><a class="header-anchor" href="#介绍-1"><span><strong>介绍</strong></span></a></h2><p>这次做项目用到了Android蓝牙串口，折腾了两天总算弄出来了，记录一下方便以后回顾。</p><h2 id="获取相关权限-1" tabindex="-1"><a class="header-anchor" href="#获取相关权限-1"><span><strong>获取相关权限</strong></span></a></h2><p>获取蓝牙权限</p><p>在 AndroidManifest.xml文件中加入如下代码，（其实这俩句可以先不加，在工程中写到相应语句的时候可以Alt+Enter添加）</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    &lt;uses-permission android:name=&quot;android.permission.BLUETOOTH&quot; /&gt;</span>
<span class="line">    &lt;uses-permission android:name=&quot;android.permission.BLUETOOTH_ADMIN&quot; /&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>再加上定位权限，这是Android 6.0 以上一定需要注意的地方，同时最好在代码里加上判断是否获取定位权限的代码（就是这个该死的玩意儿耽误我好长时间）</p><p>AndroidManifest.xml中</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    &lt;uses-feature android:name=&quot;android.hardware.location.gps&quot; /&gt;</span>
<span class="line">    &lt;uses-feature</span>
<span class="line">        android:name=&quot;android.hardware.bluetooth_le&quot;</span>
<span class="line">        android:required=&quot;true&quot; /&gt;</span>
<span class="line">    &lt;uses-permission android:name=&quot;android.permission.ACCESS_FINE_LOCATION&quot; /&gt;</span>
<span class="line">    &lt;uses-permission android:name=&quot;android.permission.ACCESS_COARSE_LOCATION&quot; /&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断是否获取定位权限（这里我是写在了扫描未配对蓝牙设备的地方，当然也可以直接放在程序刚开始）</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED){//未开启定位权限</span>
<span class="line">            //开启定位权限,200是标识码</span>
<span class="line">            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION},200);</span>
<span class="line">        }else{</span>
<span class="line">            // 显示其它设备（未配对设备）列表</span>
<span class="line">            findViewById(R.id.textView).setVisibility(View.VISIBLE);</span>
<span class="line"></span>
<span class="line">            // 关闭再进行的服务查找</span>
<span class="line">            if (mBluetoothAdapter.isDiscovering()) {</span>
<span class="line">                mBluetoothAdapter.cancelDiscovery();</span>
<span class="line">            }</span>
<span class="line"></span>
<span class="line">            mBluetoothAdapter.startDiscovery();</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述判断发现未开启之后会自动回调函数区开启，这里手动实现代码如下</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@Override</span>
<span class="line">    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {</span>
<span class="line">        super.onRequestPermissionsResult(requestCode, permissions, grantResults);</span>
<span class="line">        switch (requestCode){</span>
<span class="line">            case 200:</span>
<span class="line">                if(grantResults[0] == PackageManager.PERMISSION_GRANTED){</span>
<span class="line">                    doDiscovery();</span>
<span class="line">                }else{</span>
<span class="line">                    finish();</span>
<span class="line">                }</span>
<span class="line">                break;</span>
<span class="line">                default:</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>权限方面的事情完了（我并不是在程序刚开始的地方考虑的，这一点很不好，后续版本会改掉 ，这里就懒得弄了，嘿嘿）</p><h2 id="判断蓝牙是否打开-1" tabindex="-1"><a class="header-anchor" href="#判断蓝牙是否打开-1"><span><strong>判断蓝牙是否打开</strong></span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">//如果打不开蓝牙提示信息，结束程序</span>
<span class="line">        if (mBluetoothAdapter == null){</span>
<span class="line">            Toast.makeText(getApplicationContext(),&quot;无法打开手机蓝牙，请确认手机是否有蓝牙功能！&quot;,Toast.LENGTH_SHORT).show();</span>
<span class="line">            finish();</span>
<span class="line">            return;</span>
<span class="line">        }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="连接按钮的响应-1" tabindex="-1"><a class="header-anchor" href="#连接按钮的响应-1"><span><strong>连接按钮的响应</strong></span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">        final Button connectButton = findViewById(R.id.connectButton);</span>
<span class="line">        connectButton.setOnClickListener(new View.OnClickListener() {</span>
<span class="line">            @Override</span>
<span class="line">            public void onClick(View v) {</span>
<span class="line"></span>
<span class="line">                if (mBluetoothAdapter.isEnabled() == false) {</span>
<span class="line">                    Toast.makeText(getApplicationContext(), &quot; 请先打开蓝牙&quot;, Toast.LENGTH_LONG).show();</span>
<span class="line">                    return;</span>
<span class="line">                }</span>
<span class="line"></span>
<span class="line">                //如果未连接设备则打开DevicesListActivity搜索设备</span>
<span class="line">                if (mBluetoothSocket == null) {</span>
<span class="line">                    Intent serveIntent = new Intent(getApplicationContext(), DevicesListActivity.class); //跳转活动</span>
<span class="line">                    startActivityForResult(serveIntent, 1); //设置返回宏定义</span>
<span class="line">                } else {</span>
<span class="line">                    //关闭连接socket</span>
<span class="line">                    try {</span>
<span class="line">                        bRun = false;</span>
<span class="line">                        Thread.sleep(2000);</span>
<span class="line"></span>
<span class="line">                        is.close();</span>
<span class="line">                        mBluetoothSocket.close();</span>
<span class="line">                        mBluetoothSocket = null;</span>
<span class="line"></span>
<span class="line">                        connectButton.setText(&quot;连接&quot;);</span>
<span class="line">                    } catch (InterruptedException e) {</span>
<span class="line">                        e.printStackTrace();</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        e.printStackTrace();</span>
<span class="line">                    }</span>
<span class="line"></span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        });</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="发送按钮响应-1" tabindex="-1"><a class="header-anchor" href="#发送按钮响应-1"><span><strong>发送按钮响应</strong></span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">        Button sendButton = (Button) findViewById(R.id.sendButton);</span>
<span class="line">        sendButton.setOnClickListener(new View.OnClickListener() {</span>
<span class="line">            @Override</span>
<span class="line">            public void onClick(View v) {</span>
<span class="line"></span>
<span class="line">                int n = 0;</span>
<span class="line">                if (mBluetoothSocket == null) {</span>
<span class="line">                    Toast.makeText(getApplicationContext(), &quot;请先连接设备&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                    return;</span>
<span class="line">                }</span>
<span class="line">                if (sendEditText.getText().length() == 0) {</span>
<span class="line">                    Toast.makeText(getApplicationContext(), &quot;请先输入数据&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                    return;</span>
<span class="line">                }</span>
<span class="line">                try {</span>
<span class="line"></span>
<span class="line">                    OutputStream os = mBluetoothSocket.getOutputStream();   //蓝牙连接输出流</span>
<span class="line">                    byte[] bos = sendEditText.getText().toString().getBytes();</span>
<span class="line">                    for (int i = 0; i &lt; bos.length; i++) {</span>
<span class="line">                        if (bos[i] == 0x0a) n++;</span>
<span class="line">                    }</span>
<span class="line">                    byte[] bos_new = new byte[bos.length + n];</span>
<span class="line">                    n = 0;</span>
<span class="line">                    for (int i = 0; i &lt; bos.length; i++) { //手机中换行为0a,将其改为0d 0a后再发送</span>
<span class="line">                        if (bos[i] == 0x0a) {</span>
<span class="line">                            bos_new[n] = 0x0d;</span>
<span class="line">                            n++;</span>
<span class="line">                            bos_new[n] = 0x0a;</span>
<span class="line">                        } else {</span>
<span class="line">                            bos_new[n] = bos[i];</span>
<span class="line">                        }</span>
<span class="line">                        n++;</span>
<span class="line">                    }</span>
<span class="line"></span>
<span class="line">                    os.write(bos_new);</span>
<span class="line">                } catch (IOException e) {</span>
<span class="line">                    e.printStackTrace();</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        });</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设备可以被搜索设置-1" tabindex="-1"><a class="header-anchor" href="#设备可以被搜索设置-1"><span><strong>设备可以被搜索设置</strong></span></a></h2><blockquote><p>这里就看个人需求了，我是没用上这个</p></blockquote><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">        new Thread(){</span>
<span class="line">            public void run(){</span>
<span class="line">                if(mBluetoothAdapter.isEnabled()==false){</span>
<span class="line">                    mBluetoothAdapter.enable();</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        }.start();</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="接收活动结果-1" tabindex="-1"><a class="header-anchor" href="#接收活动结果-1"><span><strong>接收活动结果</strong></span></a></h1><blockquote><p>主要是扫描活动传来的连接信息</p></blockquote><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    public void onActivityResult(int requestCode, int resultCode, Intent data) {</span>
<span class="line">        super.onActivityResult(requestCode, resultCode, data);</span>
<span class="line">        switch (requestCode) {</span>
<span class="line">            case 1:     //连接结果，由DeviceListActivity设置返回</span>
<span class="line">                // 响应返回结果</span>
<span class="line">                if (resultCode == Activity.RESULT_OK) {   //连接成功，由DeviceListActivity设置返回</span>
<span class="line">                    // MAC地址，由DeviceListActivity设置返回</span>
<span class="line">                    String address = data.getExtras().getString(DevicesListActivity.EXTRA_DEVICE_ADDRESS);</span>
<span class="line">                    // 得到蓝牙设备句柄</span>
<span class="line">                    mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(address);</span>
<span class="line"></span>
<span class="line">                    // 用服务号得到socket</span>
<span class="line">                    try {</span>
<span class="line">                        mBluetoothSocket = mBluetoothDevice.createRfcommSocketToServiceRecord(UUID.fromString(MY_UUID));</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        Toast.makeText(this, &quot;连接失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                    }</span>
<span class="line">                    //连接socket</span>
<span class="line">                    Button connectButton = findViewById(R.id.connectButton);</span>
<span class="line">                    try {</span>
<span class="line">                        mBluetoothSocket.connect();</span>
<span class="line">                        Toast.makeText(this, &quot;连接&quot; + mBluetoothDevice.getName() + &quot;成功！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                        connectButton.setText(&quot;断开&quot;);</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        try {</span>
<span class="line">                            Toast.makeText(this, &quot;连接失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                            mBluetoothSocket.close();</span>
<span class="line">                            mBluetoothSocket = null;</span>
<span class="line">                        } catch (IOException ee) {</span>
<span class="line">                            Toast.makeText(this, &quot;连接失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                        }</span>
<span class="line"></span>
<span class="line">                        return;</span>
<span class="line">                    }</span>
<span class="line"></span>
<span class="line">                    //打开接收线程</span>
<span class="line">                    try {</span>
<span class="line">                        is = mBluetoothSocket.getInputStream();   //得到蓝牙数据输入流</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        Toast.makeText(this, &quot;接收数据失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                        return;</span>
<span class="line">                    }</span>
<span class="line">                    if (bThread == false) {</span>
<span class="line">                        readThread.start();</span>
<span class="line">                        bThread = true;</span>
<span class="line">                    } else {</span>
<span class="line">                        bRun = true;</span>
<span class="line">                    }</span>
<span class="line">                }</span>
<span class="line">                break;</span>
<span class="line">            default:</span>
<span class="line">                break;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接收线程-1" tabindex="-1"><a class="header-anchor" href="#接收线程-1"><span><strong>接收线程</strong></span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">//接收数据线程</span>
<span class="line">    Thread readThread=new Thread(){</span>
<span class="line"></span>
<span class="line">        public void run(){</span>
<span class="line">            int num = 0;</span>
<span class="line">            byte[] buffer = new byte[1024];</span>
<span class="line">            byte[] buffer_new = new byte[1024];</span>
<span class="line">            int i = 0;</span>
<span class="line">            int n = 0;</span>
<span class="line">            bRun = true;</span>
<span class="line">            //接收线程</span>
<span class="line">            while(true){</span>
<span class="line">                try{</span>
<span class="line">                    while(is.available()==0){</span>
<span class="line">                        while(bRun == false){}</span>
<span class="line">                    }</span>
<span class="line">                    while(true){</span>
<span class="line">                        if(!bThread)//跳出循环</span>
<span class="line">                            return;</span>
<span class="line"></span>
<span class="line">                        num = is.read(buffer);         //读入数据</span>
<span class="line">                        n=0;</span>
<span class="line"></span>
<span class="line">                        String s0 = new String(buffer,0,num);</span>
<span class="line">                        for(i=0;i&lt;num;i++){</span>
<span class="line">                            if((buffer[i] == 0x0d)&amp;&amp;(buffer[i+1]==0x0a)){</span>
<span class="line">                                buffer_new[n] = 0x0a;</span>
<span class="line">                                i++;</span>
<span class="line">                            }else{</span>
<span class="line">                                buffer_new[n] = buffer[i];</span>
<span class="line">                            }</span>
<span class="line">                            n++;</span>
<span class="line">                        }</span>
<span class="line">                        String s = new String(buffer_new,0,n);</span>
<span class="line">                        smsg+=s;   //写入接收缓存</span>
<span class="line">                        if(is.available()==0)break;  //短时间没有数据才跳出进行显示</span>
<span class="line">                    }</span>
<span class="line">                    //发送显示消息，进行显示刷新</span>
<span class="line">                    handler.sendMessage(handler.obtainMessage());</span>
<span class="line">                }catch(IOException e){</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="消息显示的处理队列-1" tabindex="-1"><a class="header-anchor" href="#消息显示的处理队列-1"><span><strong>消息显示的处理队列</strong></span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"> 	Handler handler= new Handler(){</span>
<span class="line">        public void handleMessage(Message msg){</span>
<span class="line">            super.handleMessage(msg);</span>
<span class="line">            tv_in.setText(smsg);   //显示数据</span>
<span class="line">            scrollView.scrollTo(0,tv_in.getMeasuredHeight()); //跳至数据最后一页</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1"><span><strong>总结</strong></span></a></h2><p>至此，接收发送部分已经全部结束，然后就是扫描设备部分了 这部分我直接贴出整个活动的代码了 注释比较齐全就不哔哔了</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">package com.example.btcontroller;</span>
<span class="line"></span>
<span class="line">import androidx.annotation.NonNull;</span>
<span class="line">import androidx.appcompat.app.AppCompatActivity;</span>
<span class="line">import androidx.core.app.ActivityCompat;</span>
<span class="line">import androidx.core.content.ContextCompat;</span>
<span class="line"></span>
<span class="line">import android.Manifest;</span>
<span class="line">import android.app.Activity;</span>
<span class="line">import android.bluetooth.BluetoothAdapter;</span>
<span class="line">import android.bluetooth.BluetoothDevice;</span>
<span class="line">import android.content.BroadcastReceiver;</span>
<span class="line">import android.content.Context;</span>
<span class="line">import android.content.Intent;</span>
<span class="line">import android.content.IntentFilter;</span>
<span class="line">import android.content.pm.PackageManager;</span>
<span class="line">import android.os.Bundle;</span>
<span class="line">import android.util.Log;</span>
<span class="line">import android.view.Menu;</span>
<span class="line">import android.view.MenuItem;</span>
<span class="line">import android.view.View;</span>
<span class="line">import android.widget.AdapterView;</span>
<span class="line">import android.widget.ArrayAdapter;</span>
<span class="line">import android.widget.Button;</span>
<span class="line">import android.widget.ListView;</span>
<span class="line">import android.widget.TextView;</span>
<span class="line">import android.widget.Toast;</span>
<span class="line"></span>
<span class="line">import java.util.Set;</span>
<span class="line"></span>
<span class="line">public class DevicesListActivity extends AppCompatActivity {</span>
<span class="line"></span>
<span class="line">    private static final String TAG = &quot;DevicesListActivity&quot;;</span>
<span class="line">    public static String EXTRA_DEVICE_ADDRESS = &quot;设备地址&quot;;</span>
<span class="line"></span>
<span class="line">    //成员域</span>
<span class="line">    private BluetoothAdapter mBluetoothAdapter; //蓝牙适配器</span>
<span class="line">    private ArrayAdapter&lt;String&gt; mPairedDevicesArrayAdapter; //已配对的设备适配器</span>
<span class="line">    private ArrayAdapter&lt;String&gt; mUnPairedDevicesArrayAdapter; //未配对的设备适配器</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    protected void onCreate(Bundle savedInstanceState) {</span>
<span class="line">        super.onCreate(savedInstanceState);</span>
<span class="line">        setContentView(R.layout.activity_devices_list);</span>
<span class="line"></span>
<span class="line">        //设定默认返回值为取消</span>
<span class="line">        setResult(Activity.RESULT_CANCELED);</span>
<span class="line"></span>
<span class="line">        // 初使化设备适配器存储数组</span>
<span class="line">        mPairedDevicesArrayAdapter = new ArrayAdapter&lt;String&gt;(this, R.layout.device_name);</span>
<span class="line">        mUnPairedDevicesArrayAdapter = new ArrayAdapter&lt;String&gt;(this, R.layout.device_name);</span>
<span class="line"></span>
<span class="line">        // 设置已配队设备列表</span>
<span class="line">        ListView pairedListView = (ListView) findViewById(R.id.pairedListView);</span>
<span class="line">        pairedListView.setAdapter(mPairedDevicesArrayAdapter);</span>
<span class="line">        pairedListView.setOnItemClickListener( mDeviceClickListener);</span>
<span class="line"></span>
<span class="line">        // 设置新查找设备列表</span>
<span class="line">        ListView newDevicesListView = (ListView) findViewById(R.id.unPairedListView);</span>
<span class="line">        newDevicesListView.setAdapter(mUnPairedDevicesArrayAdapter);</span>
<span class="line">        newDevicesListView.setOnItemClickListener(mDeviceClickListener);</span>
<span class="line"></span>
<span class="line">        // 注册接收查找到设备action接收器</span>
<span class="line">        this.registerReceiver(mReceiver, new IntentFilter(BluetoothDevice.ACTION_FOUND));</span>
<span class="line"></span>
<span class="line">        // 注册查找结束action接收器</span>
<span class="line">        //filter = new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);</span>
<span class="line">        this.registerReceiver(mReceiver, new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED));</span>
<span class="line"></span>
<span class="line">        this.registerReceiver(mReceiver, new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_STARTED));</span>
<span class="line"></span>
<span class="line">        // 得到本地蓝牙句柄</span>
<span class="line">        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();</span>
<span class="line"></span>
<span class="line">        // 得到已配对蓝牙设备列表</span>
<span class="line">        Set&lt;BluetoothDevice&gt; pairedDevices = mBluetoothAdapter.getBondedDevices();</span>
<span class="line"></span>
<span class="line">        //添加已配对设备到列表并显示</span>
<span class="line">        if (pairedDevices.size() &gt; 0) {</span>
<span class="line">            findViewById(R.id.pairedListView).setVisibility(View.VISIBLE);</span>
<span class="line">            for (BluetoothDevice device : pairedDevices) {</span>
<span class="line">                mPairedDevicesArrayAdapter.add(device.getName() + &quot;\\n&quot; + device.getAddress());</span>
<span class="line">            }</span>
<span class="line">        } else {</span>
<span class="line">            String noDevices = &quot;没有找到已配对的设备。&quot; ;</span>
<span class="line">            mPairedDevicesArrayAdapter.add(noDevices);</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        //取消按键的响应函数</span>
<span class="line">        Button cancelButton = (Button) findViewById(R.id.cancelButton);</span>
<span class="line">        cancelButton.setOnClickListener(new View.OnClickListener() {</span>
<span class="line">            @Override</span>
<span class="line">            public void onClick(View v) {</span>
<span class="line">                finish();</span>
<span class="line">            }</span>
<span class="line">        });</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    protected void onDestroy() {</span>
<span class="line">        super.onDestroy();</span>
<span class="line"></span>
<span class="line">        // 关闭服务查找</span>
<span class="line">        if (mBluetoothAdapter != null) {</span>
<span class="line">            mBluetoothAdapter.cancelDiscovery();</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        // 注销action接收器</span>
<span class="line">        this.unregisterReceiver(mReceiver);</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    /**</span>
<span class="line">     * 开始服务和设备查找</span>
<span class="line">     */</span>
<span class="line">    private void doDiscovery() {</span>
<span class="line">//        if (D) Log.d(TAG, &quot;doDiscovery()&quot;);</span>
<span class="line"></span>
<span class="line">        // 在窗口显示查找中信息</span>
<span class="line">        setTitle(&quot;查找设备中...&quot;);</span>
<span class="line"></span>
<span class="line">        if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED){//未开启定位权限</span>
<span class="line">            //开启定位权限,200是标识码</span>
<span class="line">            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION},200);</span>
<span class="line">        }else{</span>
<span class="line">            // 显示其它设备（未配对设备）列表</span>
<span class="line">            findViewById(R.id.textView).setVisibility(View.VISIBLE);</span>
<span class="line"></span>
<span class="line">            // 关闭再进行的服务查找</span>
<span class="line">            if (mBluetoothAdapter.isDiscovering()) {</span>
<span class="line">                mBluetoothAdapter.cancelDiscovery();</span>
<span class="line">            }</span>
<span class="line"></span>
<span class="line">            mBluetoothAdapter.startDiscovery();</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    //加载菜单</span>
<span class="line">    @Override</span>
<span class="line">    public boolean onCreateOptionsMenu(Menu menu) {</span>
<span class="line">        getMenuInflater().inflate(R.menu.main,menu);</span>
<span class="line">        return true;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    //菜单项的响应</span>
<span class="line">    @Override</span>
<span class="line">    public boolean onOptionsItemSelected(@NonNull MenuItem item) {</span>
<span class="line">        switch (item.getItemId()){</span>
<span class="line">            case R.id.scanItem:</span>
<span class="line"></span>
<span class="line">                doDiscovery();</span>
<span class="line"></span>
<span class="line">                break;</span>
<span class="line">                default:</span>
<span class="line">        }</span>
<span class="line">        return true;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    // 选择设备响应函数</span>
<span class="line">    private AdapterView.OnItemClickListener mDeviceClickListener = new AdapterView.OnItemClickListener() {</span>
<span class="line">        public void onItemClick(AdapterView&lt;?&gt; av, View v, int arg2, long arg3) {</span>
<span class="line">            // 准备连接设备，关闭服务查找</span>
<span class="line">            mBluetoothAdapter.cancelDiscovery();</span>
<span class="line"></span>
<span class="line">            // 得到mac地址</span>
<span class="line">            String info = ((TextView) v).getText().toString();</span>
<span class="line">            String address = info.substring(info.length() - 17);</span>
<span class="line"></span>
<span class="line">            // 设置返回数据</span>
<span class="line">            Intent intent = new Intent();</span>
<span class="line">            intent.putExtra(&quot;设备地址&quot;, address);</span>
<span class="line"></span>
<span class="line">            // 设置返回值并结束程序</span>
<span class="line">            setResult(Activity.RESULT_OK, intent);</span>
<span class="line">            finish();</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line"></span>
<span class="line">    // 查找到设备和搜索完成action监听器</span>
<span class="line">    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {</span>
<span class="line">        @Override</span>
<span class="line">        public void onReceive(Context context, Intent intent) {</span>
<span class="line">        String action = intent.getAction();</span>
<span class="line">        // 查找到设备action</span>
<span class="line">        if (BluetoothDevice.ACTION_FOUND.equals(action)) {</span>
<span class="line">            // 得到蓝牙设备</span>
<span class="line">            BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);</span>
<span class="line">            // 如果是已配对的则略过，已得到显示，其余的在添加到列表中进行显示</span>
<span class="line">            if (device.getBondState() != BluetoothDevice.BOND_BONDED) {</span>
<span class="line">                mUnPairedDevicesArrayAdapter.add(device.getName() + &quot;\\n&quot; + device.getAddress());</span>
<span class="line">            }else{  //添加到已配对设备列表</span>
<span class="line">                mPairedDevicesArrayAdapter.add(device.getName() + &quot;\\n&quot; + device.getAddress());</span>
<span class="line">            }</span>
<span class="line">            // 搜索完成action</span>
<span class="line">        } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {</span>
<span class="line">            setTitle(&quot;选择要连接的设备&quot;);</span>
<span class="line">            if (mUnPairedDevicesArrayAdapter.getCount() == 0) {</span>
<span class="line">                String noDevices = &quot;没有找到新设备&quot;;</span>
<span class="line">                mUnPairedDevicesArrayAdapter.add(noDevices);</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {</span>
<span class="line">        super.onRequestPermissionsResult(requestCode, permissions, grantResults);</span>
<span class="line">        switch (requestCode){</span>
<span class="line">            case 200:</span>
<span class="line">                if(grantResults[0] == PackageManager.PERMISSION_GRANTED){</span>
<span class="line">                    doDiscovery();</span>
<span class="line">                }else{</span>
<span class="line">                    finish();</span>
<span class="line">                }</span>
<span class="line">                break;</span>
<span class="line">                default:</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主活动的代码</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">package com.example.btcontroller;</span>
<span class="line"></span>
<span class="line">import androidx.appcompat.app.AppCompatActivity;</span>
<span class="line"></span>
<span class="line">import android.app.Activity;</span>
<span class="line">import android.bluetooth.BluetoothAdapter;</span>
<span class="line">import android.bluetooth.BluetoothDevice;</span>
<span class="line">import android.bluetooth.BluetoothSocket;</span>
<span class="line">import android.content.Intent;</span>
<span class="line">import android.os.Bundle;</span>
<span class="line">import android.os.Handler;</span>
<span class="line">import android.os.Message;</span>
<span class="line">import android.view.View;</span>
<span class="line">import android.widget.Button;</span>
<span class="line">import android.widget.EditText;</span>
<span class="line">import android.widget.ScrollView;</span>
<span class="line">import android.widget.TextView;</span>
<span class="line">import android.widget.Toast;</span>
<span class="line"></span>
<span class="line">import java.io.IOException;</span>
<span class="line">import java.io.InputStream;</span>
<span class="line">import java.io.OutputStream;</span>
<span class="line">import java.util.UUID;</span>
<span class="line"></span>
<span class="line">public class MainActivity extends AppCompatActivity {</span>
<span class="line"></span>
<span class="line">    private final static String MY_UUID = &quot;00001101-0000-1000-8000-00805F9B34FB&quot;;   //SPP服务UUID号</span>
<span class="line">    private BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter(); //获取蓝牙实例</span>
<span class="line"></span>
<span class="line">    private EditText sendEditText; //创建发送 句柄</span>
<span class="line">    private TextView tv_in; //接收显示句柄</span>
<span class="line">    private ScrollView scrollView; //翻页句柄</span>
<span class="line">    private String smsg = &quot;&quot;; //显示用数据缓存</span>
<span class="line"></span>
<span class="line">    BluetoothDevice mBluetoothDevice = null; //蓝牙设备</span>
<span class="line">    BluetoothSocket mBluetoothSocket = null; //蓝牙通信Socket</span>
<span class="line"></span>
<span class="line">    boolean bRun = true; //运行状态</span>
<span class="line">    boolean bThread = false; //读取线程状态</span>
<span class="line">    private InputStream is;    //输入流，用来接收蓝牙数据</span>
<span class="line"></span>
<span class="line">    @Override</span>
<span class="line">    protected void onCreate(Bundle savedInstanceState) {</span>
<span class="line">        super.onCreate(savedInstanceState);</span>
<span class="line">        setContentView(R.layout.activity_main);</span>
<span class="line"></span>
<span class="line">        //获取控件ID</span>
<span class="line">        sendEditText = findViewById(R.id.sendEditText);</span>
<span class="line">        scrollView = findViewById(R.id.receiveScrolView);</span>
<span class="line">        tv_in = findViewById(R.id.in);</span>
<span class="line"></span>
<span class="line">        //如果打不开蓝牙提示信息，结束程序</span>
<span class="line">        if (mBluetoothAdapter == null){</span>
<span class="line">            Toast.makeText(getApplicationContext(),&quot;无法打开手机蓝牙，请确认手机是否有蓝牙功能！&quot;,Toast.LENGTH_SHORT).show();</span>
<span class="line">            finish();</span>
<span class="line">            return;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        //连接按钮响应</span>
<span class="line">        final Button connectButton = findViewById(R.id.connectButton);</span>
<span class="line">        connectButton.setOnClickListener(new View.OnClickListener() {</span>
<span class="line">            @Override</span>
<span class="line">            public void onClick(View v) {</span>
<span class="line"></span>
<span class="line">                if (mBluetoothAdapter.isEnabled() == false) {</span>
<span class="line">                    Toast.makeText(getApplicationContext(), &quot; 请先打开蓝牙&quot;, Toast.LENGTH_LONG).show();</span>
<span class="line">                    return;</span>
<span class="line">                }</span>
<span class="line"></span>
<span class="line">                //如果未连接设备则打开DevicesListActivity搜索设备</span>
<span class="line">                if (mBluetoothSocket == null) {</span>
<span class="line">                    Intent serveIntent = new Intent(getApplicationContext(), DevicesListActivity.class); //跳转活动</span>
<span class="line">                    startActivityForResult(serveIntent, 1); //设置返回宏定义</span>
<span class="line">                } else {</span>
<span class="line">                    //关闭连接socket</span>
<span class="line">                    try {</span>
<span class="line">                        bRun = false;</span>
<span class="line">                        Thread.sleep(2000);</span>
<span class="line"></span>
<span class="line">                        is.close();</span>
<span class="line">                        mBluetoothSocket.close();</span>
<span class="line">                        mBluetoothSocket = null;</span>
<span class="line"></span>
<span class="line">                        connectButton.setText(&quot;连接&quot;);</span>
<span class="line">                    } catch (InterruptedException e) {</span>
<span class="line">                        e.printStackTrace();</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        e.printStackTrace();</span>
<span class="line">                    }</span>
<span class="line"></span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        });</span>
<span class="line"></span>
<span class="line">        //发送按钮响应</span>
<span class="line">        Button sendButton = (Button) findViewById(R.id.sendButton);</span>
<span class="line">        sendButton.setOnClickListener(new View.OnClickListener() {</span>
<span class="line">            @Override</span>
<span class="line">            public void onClick(View v) {</span>
<span class="line"></span>
<span class="line">                int n = 0;</span>
<span class="line">                if (mBluetoothSocket == null) {</span>
<span class="line">                    Toast.makeText(getApplicationContext(), &quot;请先连接设备&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                    return;</span>
<span class="line">                }</span>
<span class="line">                if (sendEditText.getText().length() == 0) {</span>
<span class="line">                    Toast.makeText(getApplicationContext(), &quot;请先输入数据&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                    return;</span>
<span class="line">                }</span>
<span class="line">                try {</span>
<span class="line"></span>
<span class="line">                    OutputStream os = mBluetoothSocket.getOutputStream();   //蓝牙连接输出流</span>
<span class="line">                    byte[] bos = sendEditText.getText().toString().getBytes();</span>
<span class="line">                    for (int i = 0; i &lt; bos.length; i++) {</span>
<span class="line">                        if (bos[i] == 0x0a) n++;</span>
<span class="line">                    }</span>
<span class="line">                    byte[] bos_new = new byte[bos.length + n];</span>
<span class="line">                    n = 0;</span>
<span class="line">                    for (int i = 0; i &lt; bos.length; i++) { //手机中换行为0a,将其改为0d 0a后再发送</span>
<span class="line">                        if (bos[i] == 0x0a) {</span>
<span class="line">                            bos_new[n] = 0x0d;</span>
<span class="line">                            n++;</span>
<span class="line">                            bos_new[n] = 0x0a;</span>
<span class="line">                        } else {</span>
<span class="line">                            bos_new[n] = bos[i];</span>
<span class="line">                        }</span>
<span class="line">                        n++;</span>
<span class="line">                    }</span>
<span class="line"></span>
<span class="line">                    os.write(bos_new);</span>
<span class="line">                } catch (IOException e) {</span>
<span class="line">                    e.printStackTrace();</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        });</span>
<span class="line"></span>
<span class="line">        // 设置设备可以被搜索</span>
<span class="line">        new Thread(){</span>
<span class="line">            public void run(){</span>
<span class="line">                if(mBluetoothAdapter.isEnabled()==false){</span>
<span class="line">                    mBluetoothAdapter.enable();</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        }.start();</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    //接收活动结果，响应startActivityForResult()</span>
<span class="line">    public void onActivityResult(int requestCode, int resultCode, Intent data) {</span>
<span class="line">        super.onActivityResult(requestCode, resultCode, data);</span>
<span class="line">        switch (requestCode) {</span>
<span class="line">            case 1:     //连接结果，由DeviceListActivity设置返回</span>
<span class="line">                // 响应返回结果</span>
<span class="line">                if (resultCode == Activity.RESULT_OK) {   //连接成功，由DeviceListActivity设置返回</span>
<span class="line">                    // MAC地址，由DeviceListActivity设置返回</span>
<span class="line">                    String address = data.getExtras().getString(DevicesListActivity.EXTRA_DEVICE_ADDRESS);</span>
<span class="line">                    // 得到蓝牙设备句柄</span>
<span class="line">                    mBluetoothDevice = mBluetoothAdapter.getRemoteDevice(address);</span>
<span class="line"></span>
<span class="line">                    // 用服务号得到socket</span>
<span class="line">                    try {</span>
<span class="line">                        mBluetoothSocket = mBluetoothDevice.createRfcommSocketToServiceRecord(UUID.fromString(MY_UUID));</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        Toast.makeText(this, &quot;连接失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                    }</span>
<span class="line">                    //连接socket</span>
<span class="line">                    Button connectButton = findViewById(R.id.connectButton);</span>
<span class="line">                    try {</span>
<span class="line">                        mBluetoothSocket.connect();</span>
<span class="line">                        Toast.makeText(this, &quot;连接&quot; + mBluetoothDevice.getName() + &quot;成功！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                        connectButton.setText(&quot;断开&quot;);</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        try {</span>
<span class="line">                            Toast.makeText(this, &quot;连接失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                            mBluetoothSocket.close();</span>
<span class="line">                            mBluetoothSocket = null;</span>
<span class="line">                        } catch (IOException ee) {</span>
<span class="line">                            Toast.makeText(this, &quot;连接失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                        }</span>
<span class="line"></span>
<span class="line">                        return;</span>
<span class="line">                    }</span>
<span class="line"></span>
<span class="line">                    //打开接收线程</span>
<span class="line">                    try {</span>
<span class="line">                        is = mBluetoothSocket.getInputStream();   //得到蓝牙数据输入流</span>
<span class="line">                    } catch (IOException e) {</span>
<span class="line">                        Toast.makeText(this, &quot;接收数据失败！&quot;, Toast.LENGTH_SHORT).show();</span>
<span class="line">                        return;</span>
<span class="line">                    }</span>
<span class="line">                    if (bThread == false) {</span>
<span class="line">                        readThread.start();</span>
<span class="line">                        bThread = true;</span>
<span class="line">                    } else {</span>
<span class="line">                        bRun = true;</span>
<span class="line">                    }</span>
<span class="line">                }</span>
<span class="line">                break;</span>
<span class="line">            default:</span>
<span class="line">                break;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    //接收数据线程</span>
<span class="line">    Thread readThread=new Thread(){</span>
<span class="line"></span>
<span class="line">        public void run(){</span>
<span class="line">            int num = 0;</span>
<span class="line">            byte[] buffer = new byte[1024];</span>
<span class="line">            byte[] buffer_new = new byte[1024];</span>
<span class="line">            int i = 0;</span>
<span class="line">            int n = 0;</span>
<span class="line">            bRun = true;</span>
<span class="line">            //接收线程</span>
<span class="line">            while(true){</span>
<span class="line">                try{</span>
<span class="line">                    while(is.available()==0){</span>
<span class="line">                        while(bRun == false){}</span>
<span class="line">                    }</span>
<span class="line">                    while(true){</span>
<span class="line">                        if(!bThread)//跳出循环</span>
<span class="line">                            return;</span>
<span class="line"></span>
<span class="line">                        num = is.read(buffer);         //读入数据</span>
<span class="line">                        n=0;</span>
<span class="line"></span>
<span class="line">                        String s0 = new String(buffer,0,num);</span>
<span class="line">                        for(i=0;i&lt;num;i++){</span>
<span class="line">                            if((buffer[i] == 0x0d)&amp;&amp;(buffer[i+1]==0x0a)){</span>
<span class="line">                                buffer_new[n] = 0x0a;</span>
<span class="line">                                i++;</span>
<span class="line">                            }else{</span>
<span class="line">                                buffer_new[n] = buffer[i];</span>
<span class="line">                            }</span>
<span class="line">                            n++;</span>
<span class="line">                        }</span>
<span class="line">                        String s = new String(buffer_new,0,n);</span>
<span class="line">                        smsg+=s;   //写入接收缓存</span>
<span class="line">                        if(is.available()==0)break;  //短时间没有数据才跳出进行显示</span>
<span class="line">                    }</span>
<span class="line">                    //发送显示消息，进行显示刷新</span>
<span class="line">                    handler.sendMessage(handler.obtainMessage());</span>
<span class="line">                }catch(IOException e){</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line"></span>
<span class="line">    //消息处理队列</span>
<span class="line">    Handler handler= new Handler(){</span>
<span class="line">        public void handleMessage(Message msg){</span>
<span class="line">            super.handleMessage(msg);</span>
<span class="line">            tv_in.setText(smsg);   //显示数据</span>
<span class="line">            scrollView.scrollTo(0,tv_in.getMeasuredHeight()); //跳至数据最后一页</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line"></span>
<span class="line">    //关闭程序掉用处理部分</span>
<span class="line">    public void onDestroy(){</span>
<span class="line">        super.onDestroy();</span>
<span class="line">        if(mBluetoothSocket!=null)  //关闭连接socket</span>
<span class="line">            try{</span>
<span class="line">                mBluetoothSocket.close();</span>
<span class="line">            }catch(IOException e){}</span>
<span class="line">        //	_bluetooth.disable();  //关闭蓝牙服务</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="demo源码下载-1" tabindex="-1"><a class="header-anchor" href="#demo源码下载-1"><span><strong>Demo源码下载</strong></span></a></h2>`,36)),s("p",null,[s("a",w,[n[14]||(n[14]=a("CSDN")),i(e)]),n[16]||(n[16]=s("br",null,null,-1)),s("a",g,[n[15]||(n[15]=a("蓝奏云")),i(e)])])])}const A=p(u,[["render",f],["__file","53523f.html.vue"]]),x=JSON.parse('{"path":"/android/53523f.html","title":"Android蓝牙串口通(附Demo源码下载)","lang":"en-US","frontmatter":{"title":"Android蓝牙串口通(附Demo源码下载)","date":"2019/11/06","permalink":"/android/53523f.html","categories":["android"],"tags":["android"]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"获取相关权限","slug":"获取相关权限","link":"#获取相关权限","children":[]},{"level":2,"title":"判断蓝牙是否打开","slug":"判断蓝牙是否打开","link":"#判断蓝牙是否打开","children":[]},{"level":2,"title":"连接按钮的响应","slug":"连接按钮的响应","link":"#连接按钮的响应","children":[]},{"level":2,"title":"发送按钮响应","slug":"发送按钮响应","link":"#发送按钮响应","children":[]},{"level":2,"title":"设备可以被搜索设置","slug":"设备可以被搜索设置","link":"#设备可以被搜索设置","children":[]},{"level":2,"title":"接收线程","slug":"接收线程","link":"#接收线程","children":[]},{"level":2,"title":"消息显示的处理队列","slug":"消息显示的处理队列","link":"#消息显示的处理队列","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"Demo源码下载","slug":"demo源码下载","link":"#demo源码下载","children":[]},{"level":2,"title":"介绍","slug":"介绍-1","link":"#介绍-1","children":[]},{"level":2,"title":"获取相关权限","slug":"获取相关权限-1","link":"#获取相关权限-1","children":[]},{"level":2,"title":"判断蓝牙是否打开","slug":"判断蓝牙是否打开-1","link":"#判断蓝牙是否打开-1","children":[]},{"level":2,"title":"连接按钮的响应","slug":"连接按钮的响应-1","link":"#连接按钮的响应-1","children":[]},{"level":2,"title":"发送按钮响应","slug":"发送按钮响应-1","link":"#发送按钮响应-1","children":[]},{"level":2,"title":"设备可以被搜索设置","slug":"设备可以被搜索设置-1","link":"#设备可以被搜索设置-1","children":[]},{"level":2,"title":"接收线程","slug":"接收线程-1","link":"#接收线程-1","children":[]},{"level":2,"title":"消息显示的处理队列","slug":"消息显示的处理队列-1","link":"#消息显示的处理队列-1","children":[]},{"level":2,"title":"总结","slug":"总结-1","link":"#总结-1","children":[]},{"level":2,"title":"Demo源码下载","slug":"demo源码下载-1","link":"#demo源码下载-1","children":[]}],"git":{"createdTime":1732191603000,"updatedTime":1732191603000,"contributors":[{"name":"Ghlerrix","email":"Ghlerrix@outlook.com","commits":1}]},"filePathRelative":"blogs/android/Android蓝牙串口通(附Demo源码下载).md"}');export{A as comp,x as data};
