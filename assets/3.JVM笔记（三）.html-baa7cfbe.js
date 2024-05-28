const e=JSON.parse('{"key":"v-0f027714","path":"/data/Java/JVM/3.JVM%E7%AC%94%E8%AE%B0%EF%BC%88%E4%B8%89%EF%BC%89.html","title":"类与类加载","lang":"zh-CN","frontmatter":{"description":"类与类加载 前面我们讲解了JVM的内存结构，包括JVM如何对内存进行划分，如何对内存区域进行垃圾回收。接下来，我们来研究一下类文件结构以及类的加载机制。 类文件结构 在我们学习C语言的时候，我们的编程过程会经历如下几个阶段：写代码、保存、编译、运行。实际上，最关键的一步是编译，因为只有经历了编译之后，我们所编写的代码才能够翻译为机器可以直接运行的二进制代码，并且在不同的操作系统下，我们的代码都需要进行一次编译之后才能运行。 如果全世界所有的计算机指令集只有x86一种，操作系统只有Windows一种，那也许就不会有Java语言的出现。","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/data/Java/JVM/3.JVM%E7%AC%94%E8%AE%B0%EF%BC%88%E4%B8%89%EF%BC%89.html"}],["meta",{"property":"og:title","content":"类与类加载"}],["meta",{"property":"og:description","content":"类与类加载 前面我们讲解了JVM的内存结构，包括JVM如何对内存进行划分，如何对内存区域进行垃圾回收。接下来，我们来研究一下类文件结构以及类的加载机制。 类文件结构 在我们学习C语言的时候，我们的编程过程会经历如下几个阶段：写代码、保存、编译、运行。实际上，最关键的一步是编译，因为只有经历了编译之后，我们所编写的代码才能够翻译为机器可以直接运行的二进制代码，并且在不同的操作系统下，我们的代码都需要进行一次编译之后才能运行。 如果全世界所有的计算机指令集只有x86一种，操作系统只有Windows一种，那也许就不会有Java语言的出现。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-11T15:09:55.000Z"}],["meta",{"property":"article:author","content":"Fearless"}],["meta",{"property":"article:modified_time","content":"2023-12-11T15:09:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"类与类加载\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-12-11T15:09:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Fearless\\"}]}"]]},"headers":[{"level":2,"title":"类文件结构","slug":"类文件结构","link":"#类文件结构","children":[{"level":3,"title":"类文件信息","slug":"类文件信息","link":"#类文件信息","children":[]},{"level":3,"title":"字节码指令","slug":"字节码指令","link":"#字节码指令","children":[]},{"level":3,"title":"ASM字节码编程","slug":"asm字节码编程","link":"#asm字节码编程","children":[]}]},{"level":2,"title":"类加载机制","slug":"类加载机制","link":"#类加载机制","children":[{"level":3,"title":"类加载过程","slug":"类加载过程","link":"#类加载过程","children":[]},{"level":3,"title":"类加载器","slug":"类加载器","link":"#类加载器","children":[]}]}],"git":{"createdTime":1702307395000,"updatedTime":1702307395000,"contributors":[{"name":"pzy","email":"66700800@qq.com","commits":1}]},"readingTime":{"minutes":29.54,"words":8863},"filePathRelative":"data/Java/JVM/3.JVM笔记（三）.md","localizedDate":"2023年12月11日","excerpt":"<h1> 类与类加载</h1>\\n<p>前面我们讲解了JVM的内存结构，包括JVM如何对内存进行划分，如何对内存区域进行垃圾回收。接下来，我们来研究一下类文件结构以及类的加载机制。</p>\\n<h2> 类文件结构</h2>\\n<p>在我们学习C语言的时候，我们的编程过程会经历如下几个阶段：写代码、保存、编译、运行。实际上，最关键的一步是编译，因为只有经历了编译之后，我们所编写的代码才能够翻译为机器可以直接运行的二进制代码，并且在不同的操作系统下，我们的代码都需要进行一次编译之后才能运行。</p>\\n<blockquote>\\n<p>如果全世界所有的计算机指令集只有x86一种，操作系统只有Windows一种，那也许就不会有Java语言的出现。</p>\\n</blockquote>","autoDesc":true}');export{e as data};
