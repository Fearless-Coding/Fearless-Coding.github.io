const n=JSON.parse('{"key":"v-6431de17","path":"/data/Java/JVM/3.JVM%E7%AC%94%E8%AE%B0%EF%BC%88%E4%BA%8C%EF%BC%89.html","title":"JVM内存管理","lang":"zh-CN","frontmatter":{"description":"JVM内存管理 在之前，我们了解了JVM的大致运作原理以及相关特性，这一章，我们首先会从内存管理说起。 在传统的C/C++开发中，我们经常通过使用申请内存的方式来创建对象或是存放某些数据，但是这样也带来了一些额外的问题，我们要在何时释放这些内存，怎么才能使得内存的使用最高效，因此，内存管理是一个非常严肃的问题。 比如我们就可以通过C语言动态申请内存，并用于存放数据： #include &lt;stdlib.h&gt; #include &lt;stdio.h&gt; int main(){ //动态申请4个int大小的内存空间 int* memory = malloc(sizeof(int) * 4); //修改第一个int空间的值 memory[0] = 10; //修改第二个int空间的值 memory[1] = 2; //遍历内存区域中所有的值 for (int i = 0;i &lt; 4;i++){ printf(\\"%d \\", memory[i]); } //释放指针所指向的内存区域 free(memory); //最后将指针赋值为NULL memory = NULL; }","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/data/Java/JVM/3.JVM%E7%AC%94%E8%AE%B0%EF%BC%88%E4%BA%8C%EF%BC%89.html"}],["meta",{"property":"og:title","content":"JVM内存管理"}],["meta",{"property":"og:description","content":"JVM内存管理 在之前，我们了解了JVM的大致运作原理以及相关特性，这一章，我们首先会从内存管理说起。 在传统的C/C++开发中，我们经常通过使用申请内存的方式来创建对象或是存放某些数据，但是这样也带来了一些额外的问题，我们要在何时释放这些内存，怎么才能使得内存的使用最高效，因此，内存管理是一个非常严肃的问题。 比如我们就可以通过C语言动态申请内存，并用于存放数据： #include &lt;stdlib.h&gt; #include &lt;stdio.h&gt; int main(){ //动态申请4个int大小的内存空间 int* memory = malloc(sizeof(int) * 4); //修改第一个int空间的值 memory[0] = 10; //修改第二个int空间的值 memory[1] = 2; //遍历内存区域中所有的值 for (int i = 0;i &lt; 4;i++){ printf(\\"%d \\", memory[i]); } //释放指针所指向的内存区域 free(memory); //最后将指针赋值为NULL memory = NULL; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-11T15:09:55.000Z"}],["meta",{"property":"article:author","content":"Fearless"}],["meta",{"property":"article:modified_time","content":"2023-12-11T15:09:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JVM内存管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-12-11T15:09:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Fearless\\"}]}"]]},"headers":[{"level":2,"title":"内存区域划分","slug":"内存区域划分","link":"#内存区域划分","children":[{"level":3,"title":"大致划分","slug":"大致划分","link":"#大致划分","children":[]},{"level":3,"title":"爆内存和爆栈","slug":"爆内存和爆栈","link":"#爆内存和爆栈","children":[]},{"level":3,"title":"申请堆外内存","slug":"申请堆外内存","link":"#申请堆外内存","children":[]}]},{"level":2,"title":"Java中堆和栈的区别","slug":"java中堆和栈的区别","link":"#java中堆和栈的区别","children":[{"level":3,"title":"各司其职","slug":"各司其职","link":"#各司其职","children":[]},{"level":3,"title":"独有还是共享","slug":"独有还是共享","link":"#独有还是共享","children":[]},{"level":3,"title":"异常错误","slug":"异常错误","link":"#异常错误","children":[]},{"level":3,"title":"空间大小","slug":"空间大小","link":"#空间大小","children":[]}]},{"level":2,"title":"Java中的逃逸分析","slug":"java中的逃逸分析","link":"#java中的逃逸分析","children":[]},{"level":2,"title":"垃圾回收机制","slug":"垃圾回收机制","link":"#垃圾回收机制","children":[{"level":3,"title":"对象存活判定算法","slug":"对象存活判定算法","link":"#对象存活判定算法","children":[]},{"level":3,"title":"垃圾回收算法","slug":"垃圾回收算法","link":"#垃圾回收算法","children":[]},{"level":3,"title":"垃圾收集器实现","slug":"垃圾收集器实现","link":"#垃圾收集器实现","children":[]},{"level":3,"title":"元空间","slug":"元空间","link":"#元空间","children":[]},{"level":3,"title":"其他引用类型","slug":"其他引用类型","link":"#其他引用类型","children":[]}]}],"git":{"createdTime":1702307395000,"updatedTime":1702307395000,"contributors":[{"name":"pzy","email":"66700800@qq.com","commits":1}]},"readingTime":{"minutes":48.79,"words":14637},"filePathRelative":"data/Java/JVM/3.JVM笔记（二）.md","localizedDate":"2023年12月11日","excerpt":"<h1> JVM内存管理</h1>\\n<p>在之前，我们了解了JVM的大致运作原理以及相关特性，这一章，我们首先会从内存管理说起。</p>\\n<p>在传统的C/C++开发中，我们经常通过使用申请内存的方式来创建对象或是存放某些数据，但是这样也带来了一些额外的问题，我们要在何时释放这些内存，怎么才能使得内存的使用最高效，因此，内存管理是一个非常严肃的问题。</p>\\n<p>比如我们就可以通过C语言动态申请内存，并用于存放数据：</p>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;stdlib.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;stdio.h&gt;</span></span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">//动态申请4个int大小的内存空间</span>\\n    <span class=\\"token keyword\\">int</span><span class=\\"token operator\\">*</span> memory <span class=\\"token operator\\">=</span> <span class=\\"token function\\">malloc</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">sizeof</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">*</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">//修改第一个int空间的值</span>\\n    memory<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">//修改第二个int空间的值</span>\\n    memory<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">//遍历内存区域中所有的值</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">;</span>i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"%d \\"</span><span class=\\"token punctuation\\">,</span> memory<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token comment\\">//释放指针所指向的内存区域</span>\\n    <span class=\\"token function\\">free</span><span class=\\"token punctuation\\">(</span>memory<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">//最后将指针赋值为NULL</span>\\n    memory <span class=\\"token operator\\">=</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
