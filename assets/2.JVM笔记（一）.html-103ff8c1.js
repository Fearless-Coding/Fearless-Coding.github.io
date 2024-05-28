import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as l,a as n,d as s,b as e,f as i}from"./app-8e0f9155.js";const o={},u=i(`<h1 id="走进jvm" tabindex="-1"><a class="header-anchor" href="#走进jvm" aria-hidden="true">#</a> 走进JVM</h1><p>JVM相对于Java应用层的学习难度更大，**开篇推荐掌握的预备知识：**C/C++(关键)、微机原理与接口技术、计算机组成原理、操作系统、数据结构与算法、编译原理（不推荐刚学完JavaSE的同学学习），如果没有掌握推荐的一半以上的预备知识，可能学习起来会比较吃力。</p><p>**本套课程中需要用到的开发工具：**CLion、IDEA、Jetbrains Gateway</p><p>此阶段，我们需要深入探讨Java的底层执行原理，了解Java程序运行的本质。开始之前，推荐各位都入手一本《深入理解Java虚拟机 第三版》这本书对于JVM的讲述非常地详细：</p><figure><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages-cn.ssl-images-amazon.cn%2Fimages%2FI%2F81zGZfnLdwL.__BG0%2C0%2C0%2C0_FMpng_AC_UL320_SR250%2C320_.jpg&amp;refer=http%3A%2F%2Fimages-cn.ssl-images-amazon.cn&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=jpeg?sec=1645933645&amp;t=1f5da62f1510b166c33f05b94a830b48" alt="点击查看图片来源" tabindex="0" loading="lazy"><figcaption>点击查看图片来源</figcaption></figure><p>我们在JavaSE阶段的开篇就进行介绍了，我们的Java程序之所以能够实现跨平台，本质就是因为它是运行在虚拟机之上的，而不同平台只需要安装对应平台的Java虚拟机即可运行（在JRE中包含），所有的Java程序都采用统一的标准，在任何平台编译出来的字节码文件(.class)也是同样的，最后实际上是将编译后的字节码交给JVM处理执行。</p><figure><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2018.cnblogs.com%2Fblog%2F314515%2F201912%2F314515-20191231163244928-184981058.png&amp;refer=http%3A%2F%2Fimg2018.cnblogs.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=jpeg?sec=1645942605&amp;t=53b5ab5873cf233ff45f9fefb8aa87e8" alt="点击查看图片来源" tabindex="0" loading="lazy"><figcaption>点击查看图片来源</figcaption></figure><p>也正是得益于这种统一规范，除了Java以外，还有多种JVM语言，比如Kotlin、Groovy等，它们的语法虽然和Java不一样，但是最终编译得到的字节码文件，和Java是同样的规范，同样可以交给JVM处理。</p><figure><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2020.cnblogs.com%2Fblog%2F2004486%2F202008%2F2004486-20200825201006756-1741469951.png&amp;refer=http%3A%2F%2Fimg2020.cnblogs.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=jpeg?sec=1645942643&amp;t=4624e818442fd4bc90b26df9a9f7e5d1" alt="点击查看图片来源" tabindex="0" loading="lazy"><figcaption>点击查看图片来源</figcaption></figure><p>所以，JVM是我们需要去关注的一个部分，通过了解Java的底层运作机制，我们的技术会得到质的提升。</p><h2 id="技术概述" tabindex="-1"><a class="header-anchor" href="#技术概述" aria-hidden="true">#</a> 技术概述</h2><p>首先我们要了解虚拟机的具体定义，我们所接触过的虚拟机有安装操作系统的虚拟机，也有我们的Java虚拟机，而它们所面向的对象不同，Java虚拟机只是面向单一应用程序的虚拟机，但是它和我们接触的系统级虚拟机一样，我们也可以为其分配实际的硬件资源，比如最大内存大小等。</p><p>并且Java虚拟机并没有采用传统的PC架构，比如现在的HotSpot虚拟机，实际上采用的是<code>基于栈的指令集架构</code>，而我们的传统程序设计一般都是<code>基于寄存器的指令集架构</code>，这里我们需要回顾一下<code>计算机组成原理</code>中的CPU结构：</p><figure><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F9251733-5b4556af04fa3e5e.png&amp;refer=http%3A%2F%2Fupload-images.jianshu.io&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=jpeg?sec=1645971181&amp;t=c9aaa14cb580afd4bc5dca3319c5344b" alt="点击查看图片来源" tabindex="0" loading="lazy"><figcaption>点击查看图片来源</figcaption></figure><p>其中，<strong>AX，BX，CX，DX 称作为数据寄存器：</strong></p><ul><li>AX (Accumulator)：累加寄存器，也称之为累加器；</li><li>BX (Base)：基地址寄存器；</li><li>CX (Count)：计数器寄存器；</li><li>DX (Data)：数据寄存器；</li></ul><p>这些寄存器可以用来传送数据和暂存数据，并且它们还可以细分为一个8位的高位寄存器和一个8位的低位寄存器，除了这些通用功能，它们各自也有自己的一些专属职责，比如AX就是一个专用于累加的寄存器，用的也比较多。</p><p><strong>SP 和 BP 又称作为指针寄存器：</strong></p><ul><li>SP (Stack Pointer)：堆栈指针寄存器，与SS配合使用，用于访问栈顶；</li><li>BP (Base Pointer)：基指针寄存器，可用作SS的一个相对基址位置，用它可直接存取堆栈中的数据；</li></ul><p><strong>SI 和 DI 又称作为变址寄存器：</strong></p><ul><li>SI (Source Index)：源变址寄存器；</li><li>DI (Destination Index)：目的变址寄存器；</li></ul><p>主要用于存放存储单元在段内的偏移量，用它们可实现多种存储器操作数的寻址方式，为以不同的地址形式访问存储单元提供方便。</p><p><strong>控制寄存器：</strong></p><ul><li>IP (Instruction Pointer)：指令指针寄存器；</li><li>FLAG：标志寄存器；</li></ul><p><strong>段寄存器：</strong></p><ul><li>CS (Code Segment)：代码段寄存器；</li><li>DS (Data Segment)：数据段寄存器；</li><li>SS (Stack Segment)：堆栈段寄存器；</li><li>ES (Extra Segment)：附加段寄存器；</li></ul><p>这里我们分别比较一下在x86架构下C语言和arm架构下编译之后的汇编指令不同之处：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>     <span class="token comment">//实现一个最简的a+b功能，并存入变量c</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token keyword">return</span> c<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gcc <span class="token parameter variable">-S</span> main.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code>	.file	&quot;main.c&quot;
	.text
	.globl	main
	.type	main, @function
main:
.LFB0:
	.cfi_startproc  ;rbp寄存器是64位CPU下的基址寄存器，和8086CPU的16位bp一样
	pushq	%rbp     ;该函数中需要用到rbp寄存器，所以需要先把他原来的值压栈保护起来
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp    ;rsp是64位下的栈指针寄存器，这里是将rsp的值丢给rbp，因为局部变量是存放在栈中的，之后会使用rbp来访问局部变量
	.cfi_def_cfa_register 6
	movl	$10, -12(%rbp)    ;将10存入rbp所指向位置-12的位置 -&gt;  int a = 10;
	movl	$20, -8(%rbp)     ;将20存入rbp所指向位置-8的位置  -&gt; int b = 20;
	movl	-12(%rbp), %edx   ;将变量a的值交给DX寄存器（32位下叫edx，因为是int，这里只使用了32位）
	movl	-8(%rbp), %eax    ;同上，变量b的值丢给AX寄存器
	addl	%edx, %eax        ;将DX和AX寄存器中的值相加，并将结果存在AX中  -&gt;  tmp = a + b
	movl	%eax, -4(%rbp)    ;将20存入rbp所指向位置-4的位置  -&gt; int c = tmp;与上面合在一起就是int c = a + b;
	movl	-4(%rbp), %eax    ;根据约定，将函数返回值放在AX   -&gt; return c;
	popq	%rbp     ;函数执行完毕，出栈
	.cfi_def_cfa 7, 8
	ret      ;函数返回
	.cfi_endproc
.LFE0:
	.size	main, .-main
	.ident	&quot;GCC: (Ubuntu 7.5.0-6ubuntu2) 7.5.0&quot;
	.section	.note.GNU-stack,&quot;&quot;,@progbits
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在arm架构下（Apple M1 Pro芯片）编译的结果为：</p><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code>    .section   __TEXT,__text,regular,pure_instructions
   .build_version macos, 12, 0    sdk_version 12, 1
   .globl _main                           ; -- Begin function main
   .p2align   2
_main:                                  ; @main
   .cfi_startproc
; %bb.0:
   sub    sp, sp, #16                     ; =16
   .cfi_def_cfa_offset 16
   str    wzr, [sp, #12]
   mov    w8, #10
   str    w8, [sp, #8]
   mov    w8, #20
   str    w8, [sp, #4]
   ldr    w8, [sp, #8]
   ldr    w9, [sp, #4]
   add    w8, w8, w9
   str    w8, [sp]
   ldr    w0, [sp]
   add    sp, sp, #16                     ; =16
   ret
   .cfi_endproc
                                        ; -- End function
.subsections_via_symbols
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发现，在不同的CPU架构下，实际上得到的汇编代码也不一样，并且在arm架构下并没有和x86架构一样的寄存器结构，因此只能使用不同的汇编指令操作来实现。所以这也是为什么C语言不支持跨平台的原因，我们只能将同样的代码在不同的平台上编译之后才能在对应的平台上运行我们的程序。而Java利用了JVM，它提供了很好的平台无关性（当然，JVM本身是不跨平台的），我们的Java程序编译之后，并不是可以由平台直接运行的程序，而是由JVM运行，同时，我们前面说了，JVM（如HotSpot虚拟机），实际上采用的是<code>基于栈的指令集架构</code>，它并没有依赖于寄存器，而是更多的利用操作栈来完成，这样不仅设计和实现起来更简单，并且也能够更加方便地实现跨平台，不太依赖于硬件的支持。</p><p>这里我们对一个类进行反编译查看：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>    <span class="token comment">//和上面的例子一样</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
        <span class="token keyword">return</span> c<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>javap <span class="token parameter variable">-v</span> target/classes/com/test/Main.class <span class="token comment">#使用javap命令对class文件进行反编译</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>得到如下结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...
public int test();
    descriptor: ()I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=4, args_size=1
         0: bipush        10
         2: istore_1
         3: bipush        20
         5: istore_2
         6: iload_1
         7: iload_2
         8: iadd
         9: istore_3
        10: iload_3
        11: ireturn
      LineNumberTable:
        line 5: 0
        line 6: 3
        line 7: 6
        line 8: 10
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      12     0  this   Lcom/test/Main;
            3       9     1     a   I
            6       6     2     b   I
           10       2     3     c   I
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到，java文件编译之后，也会生成类似于C语言那样的汇编指令，但是这些命令都是交给JVM去执行的命令（实际上虚拟机提供了一个类似于物理机的运行环境，也有程序计数器之类的东西），最下方存放的是本地变量（局部变量）表，表示此方法中出现的本地变量，实际上this也在其中，所以我们才能在非静态方法中使用<code>this</code>关键字，在最上方标记了方法的返回值类型、访问权限等。首先介绍一下例子中出现的命令代表什么意思：</p><ul><li>bipush 将单字节的常量值推到栈顶</li><li>istore_1 将栈顶的int类型数值存入到第二个本地变量</li><li>istore_2 将栈顶的int类型数值存入到第三个本地变量</li><li>istore_3 将栈顶的int类型数值存入到第四个本地变量</li><li>iload_1 将第二个本地变量推向栈顶</li><li>iload_2 将第三个本地变量推向栈顶</li><li>iload_3 将第四个本地变量推向栈顶</li><li>iadd 将栈顶的两个int类型变量相加，并将结果压入栈顶</li><li>ireturn 方法的返回操作</li></ul><p>有关详细的指令介绍列表可以参考《深入理解Java虚拟机 第三版》附录C。</p><p>JVM运行字节码时，所有的操作基本都是围绕两种数据结构，一种是堆栈（本质是栈结构），还有一种是队列，如果JVM执行某条指令时，该指令需要对数据进行操作，那么被操作的数据在指令执行前，必须要压到堆栈上，JVM会自动将栈顶数据作为操作数。如果堆栈上的数据需要暂时保存起来时，那么它就会被存储到局部变量队列上。</p><p>我们从第一条指令来依次向下解读，显示方法相关属性：</p><pre><code>descriptor: ()I     //参数以及返回值类型，()I就表示没有形式参数，返回值为基本类型int
flags: ACC_PUBLIC   //public访问权限
Code:
  stack=2, locals=4, args_size=1    //stack表示要用到的最大栈深度，本地变量数，堆栈上最大对象数量（这里指的是this）
</code></pre><p>有关descriptor的详细属性介绍，我们会放在之后的类结构中进行讲解。</p><p>接着我们来看指令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0: bipush        10     //0是程序偏移地址，然后是指令，最后是操作数
2: istore_1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这一步操作实际上就是使用<code>bipush</code>将10推向栈顶，接着使用<code>istore_1</code>将当前栈顶数据存放到第二个局部变量中，也就是a，所以这一步执行的是<code>int a = 10</code>操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>3: bipush        20
5: istore_2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同上，这里执行的是<code>int b = 20</code>操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>6: iload_1
7: iload_2
8: iadd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是将第二和第三个局部变量放到栈中，也就是取a和b的值到栈中，最后<code>iadd</code>操作将栈中的两个值相加，结果依然放在栈顶。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>9: istore_3
10: iload_3
11: ireturn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将栈顶数据存放到第四个局部变量中，也就是c，执行的是<code>int c = 30</code>，最后取出c的值放入栈顶，使用<code>ireturn</code>返回栈顶值，也就是方法的返回值。</p><p>至此，方法执行完毕。</p><p>实际上我们发现，JVM执行的命令基本都是入栈出栈等，而且大部分指令都是没有操作数的，传统的汇编指令有一操作数、二操作数甚至三操作数的指令，Java相比C编译出来的汇编指令，执行起来会更加复杂，实现某个功能的指令条数也会更多，所以Java的执行效率实际上是不如C/C++的，虽然能够很方便地实现跨平台，但是性能上大打折扣，所以在性能要求比较苛刻的Android上，采用的是定制版的JVM，并且是基于寄存器的指令集架构。此外，在某些情况下，我们还可以使用JNI机制来通过Java调用C/C++编写的程序以提升性能（也就是本地方法，使用到native关键字）</p><hr><h2 id="现在与未来" tabindex="-1"><a class="header-anchor" href="#现在与未来" aria-hidden="true">#</a> 现在与未来</h2><p>随着时代的变迁，JVM的实现多种多样，而我们还要从最初的虚拟机说起。</p><h3 id="虚拟机的发展历程" tabindex="-1"><a class="header-anchor" href="#虚拟机的发展历程" aria-hidden="true">#</a> 虚拟机的发展历程</h3><p>在1996，Java1.0面世时，第一款商用虚拟机Sun Classic VM开始了它的使命，这款虚拟机提供了一个Java解释器，也就是将我们的class文件进行读取，最后像上面一样得到一条一条的命令，JVM再将指令依次执行。虽然这样的运行方式非常的简单易懂，但是它的效率实际上是很低的，就像你耳机里一边在放六级听力，你必须同时记在脑海里面然后等着问问题，再去选择问题的答案一样，更重要的是同样的代码每次都需要重新翻译再执行。</p><p>这个时候我们就需要更加高效的方式来运行Java程序，随着后面的发展，现在大多数的主流的JVM都包含即时<strong>编译器</strong>。JVM会根据当前代码的进行判断，当虚拟机发现某个方法或代码块的运行特别频繁时，就会把这些代码认定为“热点代码”。为了提高热点代码的执行效率，在运行时，虚拟机将会把这些代码编译成与本地平台相关的机器码，并进行各种层次的优化，完成这个任务的编译器称为即时编译器（Just In Time Compiler）</p><figure><img src="https://img2018.cnblogs.com/blog/955092/201911/955092-20191118100603404-2016014845.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在JDK1.4时，Sun Classic VM完全退出了历史舞台，取而代之的是至今都在使用的HotSpot VM，它是目前使用最广泛的虚拟机，拥有上面所说的热点代码探测技术、准确式内存管理（虚拟机可以知道内存中某个位置的数据具体是什么类型）等技术，而我们之后的章节都是基于HotSpot虚拟机进行讲解。</p><h3 id="虚拟机发展的未来" tabindex="-1"><a class="header-anchor" href="#虚拟机发展的未来" aria-hidden="true">#</a> 虚拟机发展的未来</h3><p>2018年4月，Oracle Labs公开了最新的GraalVM，它是一种全新的虚拟机，它能够实现所有的语言统一运行在虚拟机中。</p><figure><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fatoracle.cn%2FUploads%2Fgraalvm%2Fgraalvm.png&amp;refer=http%3A%2F%2Fatoracle.cn&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=jpeg?sec=1646031057&amp;t=1cfa58c28f680c3f23eb85bde2d31e1f" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>Graal VM被官方称为“Universal VM”和“Polyglot VM”，这是一个在HotSpot虚拟机基础上增强而成的跨语言全栈虚拟机，可以作为“任何语言”的运行平台使用，这里“任何语言”包括了Java、Scala、Groovy、Kotlin等基于Java虚拟机之上的语言，还包括了C、C++、Rust等基于LLVM的语言，同时支持其他像JavaScript、Ruby、Python和R语言等等。Graal VM可以无额外开销地混合使用这些编程语言，支持不同语言中混用对方的接口和对象，也能够支持这些语言使用已经编写好的本地库文件。</p><p>Graal VM的基本工作原理是将这些语言的源代码（例如JavaScript）或源代码编译后的中间格式（例如LLVM字节码）通过解释器转换为能被Graal VM接受的中间表示（Intermediate Representation，IR），譬如设计一个解释器专门对LLVM输出的字节码进行转换来支持C和C++语言，这个过程称为“程序特化”（Specialized，也常称为Partial Evaluation）。Graal VM提供了Truffle工具集来快速构建面向一种新语言的解释器，并用它构建了一个称为Sulong的高性能LLVM字节码解释器。</p>`,69),r={href:"https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.graalvm.org/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.graalvm.org/reference-manual/native-image/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://kubernetes.io/",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"使用本机映像提供了关键优势，如即时启动、即时峰值性能和减少内存消耗。",-1),b=n("p",null,"GraalVM原生项目预计随着时间的推移会改进一些缺点和权衡。构建本机映像是一个比常规应用程序慢的繁重过程。热身后的本机映像运行时优化较少。最后，它不如JVM成熟，行为各不相同。",-1),g=n("p",null,"常规JVM和此原生映像平台的主要区别是：",-1),h=n("li",null,"从主入口点对应用程序进行静态分析，在构建时进行。",-1),f=n("li",null,"未使用的部件将在构建时删除。",-1),y=n("li",null,"反射、资源和动态代理需要配置。",-1),_=n("li",null,"Classpath在构建时是固定的。",-1),w=n("li",null,"没有类惰性加载：可执行文件中运送的所有内容将在启动时加载到内存中。",-1),x=n("li",null,"一些代码将在构建时运行。",-1),J={href:"https://www.graalvm.org/reference-manual/native-image/Limitations/",target:"_blank",rel:"noopener noreferrer"},j=n("p",null,"该项目的目标是孵化对Spring Native的支持，Spring Native是Spring JVM的替代品，并提供旨在打包在轻量级容器中的原生部署选项。在实践中，目标是在这个新平台上支持您的Spring应用程序，几乎未经修改。",-1),M=i('<p>优点：</p><ol><li>立即启动，一般启动时间小于100ms</li><li>更低的内存消耗</li><li>独立部署，不再需要JVM</li><li>同样的峰值性能要比JVM消耗的内存小</li></ol><p>缺点：</p><ol><li>构建时间长</li><li>只支持新的Springboot版本（2.4.4+）</li></ol><hr><h2 id="手动编译jdk8" tabindex="-1"><a class="header-anchor" href="#手动编译jdk8" aria-hidden="true">#</a> 手动编译JDK8</h2><p>学习JVM最关键的是研究底层C/C++源码，我们首先需要搭建一个测试环境，方便我们之后对底层源码进行调试。但是编译这一步的坑特别多，请务必保证跟教程中的环境一致，尤其是编译环境，版本不能太高，因为JDK8属于比较早期的版本了，否则会遇到各种各样奇奇怪怪的问题。</p><h3 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置" aria-hidden="true">#</a> 环境配置</h3>',8),I=n("li",null,"操作系统：Ubuntu 20.04 Server",-1),S=n("li",null,"硬件配置：i7-4790 4C8T/ 16G内存 / 128G硬盘 （不能用树莓派或是arm芯片Mac的虚拟机，配置越高越好，不然卡爆）",-1),C=n("li",null,"调试工具：Jetbrains Gateway（服务器运行CLion Backend程序，界面在Mac上显示）",-1),L={href:"https://codeload.github.com/openjdk/jdk/zip/refs/tags/jdk8-b120",target:"_blank",rel:"noopener noreferrer"},V=n("li",null,[s("编译环境： "),n("ul",null,[n("li",null,"gcc-4.8"),n("li",null,"g++-4.8"),n("li",null,"make-3.81"),n("li",null,"openjdk-8")])],-1),N=i(`<h3 id="开始折腾" tabindex="-1"><a class="header-anchor" href="#开始折腾" aria-hidden="true">#</a> 开始折腾</h3><p>首选需要在我们的测试服务器上安装Ubuntu 20.04 Server系统，并通过ssh登录到服务器：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Welcome to Ubuntu <span class="token number">20.04</span>.3 LTS <span class="token punctuation">(</span>GNU/Linux <span class="token number">5.4</span>.0-96-generic x86_64<span class="token punctuation">)</span>

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sat <span class="token number">29</span> Jan <span class="token number">2022</span> <span class="token number">10</span>:33:03 AM UTC

  System load:  <span class="token number">0.08</span>               Processes:               <span class="token number">156</span>
  Usage of /:   <span class="token number">5.5</span>% of <span class="token number">108</span>.05GB   Users logged in:         <span class="token number">0</span>
  Memory usage: <span class="token number">5</span>%                 IPv4 address <span class="token keyword">for</span> enp2s0: <span class="token number">192.168</span>.10.66
  Swap usage:   <span class="token number">0</span>%                 IPv4 address <span class="token keyword">for</span> enp2s0: <span class="token number">192.168</span>.10.75
  Temperature:  <span class="token number">32.0</span> C


<span class="token number">37</span> updates can be applied immediately.
To see these additional updates run: <span class="token function">apt</span> list <span class="token parameter variable">--upgradable</span>


Last login: Sat Jan <span class="token number">29</span> <span class="token number">10</span>:27:06 <span class="token number">2022</span>
nagocoler@ubuntu-server:~$ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先安装一些基本的依赖：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> build-essential libxrender-dev xorg-dev libasound2-dev libcups2-dev <span class="token function">gawk</span> <span class="token function">zip</span> libxtst-dev libxi-dev libxt-dev gobjc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着我们先将JDK的编译环境配置好，首先是安装gcc和g++的4.8版本，但是最新的源没有这个版本了，我们先导入旧版软件源：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/apt/sources.list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在最下方添加旧版源地址并保存：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>deb http://archive.ubuntu.com/ubuntu xenial main
deb http://archive.ubuntu.com/ubuntu xenial universe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接着更新一下apt源信息，并安装gcc和g++：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gcc-4.8 g++-4.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接着配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--install</span> /usr/bin/gcc gcc /usr/bin/gcc-4.8 <span class="token number">100</span>
<span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--install</span> /usr/bin/g++ g++ /usr/bin/g++-4.8 <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后查看版本是否为4.8版本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nagocoler@ubuntu-server:~$ gcc <span class="token parameter variable">--version</span>
gcc <span class="token punctuation">(</span>Ubuntu <span class="token number">4.8</span>.5-4ubuntu2<span class="token punctuation">)</span> <span class="token number">4.8</span>.5
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2015</span> Free Software Foundation, Inc.
This is <span class="token function">free</span> software<span class="token punctuation">;</span> see the <span class="token builtin class-name">source</span> <span class="token keyword">for</span> copying conditions.  There is NO
warranty<span class="token punctuation">;</span> not even <span class="token keyword">for</span> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

nagocoler@ubuntu-server:~$ g++ <span class="token parameter variable">--version</span>
g++ <span class="token punctuation">(</span>Ubuntu <span class="token number">4.8</span>.5-4ubuntu2<span class="token punctuation">)</span> <span class="token number">4.8</span>.5
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2015</span> Free Software Foundation, Inc.
This is <span class="token function">free</span> software<span class="token punctuation">;</span> see the <span class="token builtin class-name">source</span> <span class="token keyword">for</span> copying conditions.  There is NO
warranty<span class="token punctuation">;</span> not even <span class="token keyword">for</span> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着安装make 3.81版本，需要从官方下载：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://ftp.gnu.org/gnu/make/make-3.81.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下载好之后进行解压，并进入目录：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> make-3.81.tar.gz 
<span class="token builtin class-name">cd</span> make-3.81/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们修改一下代码，打开<code>glob/glob.c</code>文件：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span>  <span class="token expression">HAVE_CONFIG_H</span></span>
<span class="token macro property"><span class="token directive-hash">#</span> <span class="token directive keyword">include</span> <span class="token string">&lt;config.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">__alloca</span> <span class="token expression">alloca   <span class="token operator">&lt;</span><span class="token operator">-</span> 添加这一句</span></span>
<span class="token comment">/* Enable GNU extensions 
...
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着进行配置并完成编译和安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> configure
<span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，将make已经变成3.81版本了：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nagocoler@ubuntu-server:~/make-3.81$ <span class="token function">make</span> <span class="token parameter variable">-verison</span>
GNU Make <span class="token number">3.81</span>
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2006</span>  Free Software Foundation, Inc.
This is <span class="token function">free</span> software<span class="token punctuation">;</span> see the <span class="token builtin class-name">source</span> <span class="token keyword">for</span> copying conditions.
There is NO warranty<span class="token punctuation">;</span> not even <span class="token keyword">for</span> MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于JDK中某些代码是Java编写的，所以我们还需要安装一个启动JDK，启动JDK可以是当前版本或低一版本，比如我们要编译JDK8的源码，那么就可以使用JDK7、JDK8作为启动JDK，对源码中的一些java文件进行编译。这里我们选择安装OpenJDK8作为启动JDK：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> openjdk-8-jdk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样，我们的系统环境就准备完成了，接着我们需要下载OpenJDK8的源码（已经放在网盘了）解压：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">unzip</span> jdk-jdk8-b120.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着我们需要安装JetBrains Gateway在我们的服务器上导入项目，这里我们使用CLion后端，等待下载远程后端，这样我们的Linux服务器上虽然没有图形化界面，但是依然可以使用IDEA、CLion等工具，只是服务器上只有后端程序，而界面由我们电脑上的前端程序提供（目前此功能还在Beta阶段，暂不支持arm架构的Linux服务器）整个过程根据服务器配置决定可能需要5-20分钟。</p><p>完成之后，我们操作起来就很方便了，界面和IDEA其实差不多，我们打开终端，开始进行配置：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">bash</span> configure --with-debug-level<span class="token operator">=</span>slowdebug --enable-debug-symbols <span class="token assign-left variable">ZIP_DEBUGINFO_FIELS</span><span class="token operator">=</span><span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置完成后，再次确认是否和教程中的配置信息一致：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Configuration summary:
* Debug level:    slowdebug
* JDK variant:    normal
* JVM variants:   server
* OpenJDK target: OS: linux, CPU architecture: x86, address length: 64

Tools summary:
* Boot JDK:       openjdk version &quot;1.8.0_312&quot; OpenJDK Runtime Environment (build 1.8.0_312-8u312-b07-0ubuntu1~20.04-b07) OpenJDK 64-Bit Server VM (build 25.312-b07, mixed mode)  (at /usr/lib/jvm/java-8-openjdk-amd64)
* C Compiler:     gcc-4.8 (Ubuntu 4.8.5-4ubuntu2) version 4.8.5 (at /usr/bin/gcc-4.8)
* C++ Compiler:   g++-4.8 (Ubuntu 4.8.5-4ubuntu2) version 4.8.5 (at /usr/bin/g++-4.8)

Build performance summary:
* Cores to use:   3
* Memory limit:   3824 MB
* ccache status:  not installed (consider installing)

WARNING: The result of this configuration has overridden an older
configuration. You *should* run &#39;make clean&#39; to make sure you get a
proper build. Failure to do so might result in strange build problems.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们需要修改几个文件，不然一会会编译失败，首先是<code>hotspot/make/linux/Makefile</code>文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>原有的 SUPPORTED_OS_VERSION = 2.4% 2.5% 2.6% 3%
修改为 SUPPORTED_OS_VERSION = 2.4% 2.5% 2.6% 3% 4% 5%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接着是<code>hotspot/make/linux/makefiles/gcc.make</code>文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>原有的 WARNINGS_ARE_ERRORS = -Werror
修改为 #WARNINGS_ARE_ERRORS = -Werror
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接着是<code>nashorn/make/BuildNashorn.gmk</code>文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  $(CP) -R -p $(NASHORN_OUTPUTDIR)/nashorn_classes/* $(@D)/
  $(FIXPATH) $(JAVA) \\
原有的 -cp &quot;$(NASHORN_OUTPUTDIR)/nasgen_classes$(PATH_SEP)$(NASHORN_OUTPUTDIR)/nashorn_classes&quot; \\
修改为  -Xbootclasspath/p:&quot;$(NASHORN_OUTPUTDIR)/nasgen_classes$(PATH_SEP)$(NASHORN_OUTPUTDIR)/nashorn_classes&quot; \\
   jdk.nashorn.internal.tools.nasgen.Main $(@D) jdk.nashorn.internal.objects $(@D)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OK，修改完成，接着我们就可以开始编译了：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>make all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>整个编译过程大概需要持续10-20分钟，请耐心等待。构建完成后提示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>----- Build times -------
Start 2022-01-29 11:36:35
End   2022-01-29 11:48:20
00:00:30 corba
00:00:25 demos
00:02:39 docs
00:03:05 hotspot
00:00:27 images
00:00:17 jaxp
00:00:31 jaxws
00:03:02 jdk
00:00:38 langtools
00:00:11 nashorn
00:11:45 TOTAL
-------------------------
Finished building OpenJDK for target &#39;all&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只要按照我们的教程一步步走，别漏了，应该是直接可以完成的，当然难免可能有的同学出现了奇奇怪怪的问题，加油，慢慢折腾，总会成功的~</p><p>接着我们就可以创建一个测试配置了，首先打开设置页面，找到<code>自定义构建目标</code>：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux37s99nj31b80u076s.jpg" alt="image-20220129195318339" tabindex="0" loading="lazy"><figcaption>image-20220129195318339</figcaption></figure><p>点击<code>应用</code>即可，接着打开运行配置，添加一个新的自定义配置：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux3axcknj31ai0u0wgy.jpg" alt="image-20220129195459914" tabindex="0" loading="lazy"><figcaption>image-20220129195459914</figcaption></figure><p>选择我们编译完成的java程序，然后测试-version查看版本信息，去掉下方的构建。</p><p>接着直接运行即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/home/nagocoler/jdk-jdk8-b120/build/linux-x86_64-normal-server-slowdebug/jdk/bin/java -version
openjdk version &quot;1.8.0-internal-debug&quot;
OpenJDK Runtime Environment (build 1.8.0-internal-debug-nagocoler_2022_01_29_11_36-b00)
OpenJDK 64-Bit Server VM (build 25.0-b62-debug, mixed mode)

Process finished with exit code 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以将工作目录修改到其他地方，接着我们创建一个Java文件并完成编译，然后测试能否使用我们编译的JDK运行：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux3dp9bsj31ai0u0wh5.jpg" alt="image-20220129195801789" tabindex="0" loading="lazy"><figcaption>image-20220129195801789</figcaption></figure><p>在此目录下编写一个Java程序，然后编译：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span><span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>       
<span class="token punctuation">}</span>       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nagocoler@ubuntu-server:~$ <span class="token builtin class-name">cd</span> JavaHelloWorld/
nagocoler@ubuntu-server:~/JavaHelloWorld$ <span class="token function">vim</span> Main.java
nagocoler@ubuntu-server:~/JavaHelloWorld$ javac Main.java 
nagocoler@ubuntu-server:~/JavaHelloWorld$ <span class="token function">ls</span>
Main.class  Main.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点击运行，成功得到结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/home/nagocoler/jdk-jdk8-b120/build/linux-x86_64-normal-server-slowdebug/jdk/bin/java Main
Hello World!

Process finished with exit code 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以在CLion前端页面中进行断点调试，比如我们测试一个入口点JavaMain，在<code>jdk/src/share/bin/java.c</code>中的JavaMain方法：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux47wgp9j31z00sc0xc.jpg" alt="image-20220129200244279" tabindex="0" loading="lazy"><figcaption>image-20220129200244279</figcaption></figure><p>点击右上角调试按钮，可以成功进行调试：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux4lmirkj31mk0u0gq2.jpg" alt="image-20220129200314691" tabindex="0" loading="lazy"><figcaption>image-20220129200314691</figcaption></figure><p>至此，在Ubuntu系统上手动编译OpenJDK8完成。</p><hr><h2 id="jvm启动流程探究" tabindex="-1"><a class="header-anchor" href="#jvm启动流程探究" aria-hidden="true">#</a> JVM启动流程探究</h2><p>前面我们完成了JDK8的编译，也了解了如何进行断点调试，现在我们就可以来研究一下JVM的启动流程了，首先我们要明确，虚拟机的启动入口位于<code>jdk/src/share/bin/java.c</code>的<code>JLI_Launch</code>函数，整个流程分为如下几个步骤：</p><ol><li>配置JVM装载环境</li><li>解析虚拟机参数</li><li>设置线程栈大小</li><li>执行JavaMain方法</li></ol><p>首先我们来看看<code>JLI_Launch</code>函数是如何定义的：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span>
<span class="token function">JLI_Launch</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span> argv<span class="token punctuation">,</span>              <span class="token comment">/* main argc, argc */</span>
        <span class="token keyword">int</span> jargc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span><span class="token operator">*</span> jargv<span class="token punctuation">,</span>          <span class="token comment">/* java args */</span>
        <span class="token keyword">int</span> appclassc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span><span class="token operator">*</span> appclassv<span class="token punctuation">,</span>  <span class="token comment">/* app classpath */</span>
        <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> fullversion<span class="token punctuation">,</span>                <span class="token comment">/* full version defined */</span>
        <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> dotversion<span class="token punctuation">,</span>                 <span class="token comment">/* dot version defined */</span>
        <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> pname<span class="token punctuation">,</span>                      <span class="token comment">/* program name */</span>
        <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> lname<span class="token punctuation">,</span>                      <span class="token comment">/* launcher name */</span>
        jboolean javaargs<span class="token punctuation">,</span>                      <span class="token comment">/* JAVA_ARGS */</span>
        jboolean cpwildcard<span class="token punctuation">,</span>                    <span class="token comment">/* classpath wildcard */</span>
        jboolean javaw<span class="token punctuation">,</span>                         <span class="token comment">/* windows-only javaw */</span>
        jint     ergo_class                     <span class="token comment">/* ergnomics policy */</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到在入口点的参数有很多个，其中包括当前的完整版本名称、简短版本名称、运行参数、程序名称、启动器名称等。</p><p>首先会进行一些初始化操作以及Debug信息打印配置等：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">InitLauncher</span><span class="token punctuation">(</span>javaw<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">DumpState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">JLI_IsTraceLauncher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Command line args:\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> argc <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;argv[%d] = %s\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> argv<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">AddOption</span><span class="token punctuation">(</span><span class="token string">&quot;-Dsun.java.launcher.diag=true&quot;</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着就是选择一个合适的JRE版本：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
 * Make sure the specified version of the JRE is running.
 *
 * There are three things to note about the SelectVersion() routine:
 *  1) If the version running isn&#39;t correct, this routine doesn&#39;t
 *     return (either the correct version has been exec&#39;d or an error
 *     was issued).
 *  2) Argc and Argv in this scope are *not* altered by this routine.
 *     It is the responsibility of subsequent code to ignore the
 *     arguments handled by this routine.
 *  3) As a side-effect, the variable &quot;main_class&quot; is guaranteed to
 *     be set (if it should ever be set).  This isn&#39;t exactly the
 *     poster child for structured programming, but it is a small
 *     price to pay for not processing a jar file operand twice.
 *     (Note: This side effect has been disabled.  See comment on
 *     bugid 5030265 below.)
 */</span>
<span class="token function">SelectVersion</span><span class="token punctuation">(</span>argc<span class="token punctuation">,</span> argv<span class="token punctuation">,</span> <span class="token operator">&amp;</span>main_class<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着是创建JVM执行环境，例如需要确定数据模型，是32位还是64位，以及jvm本身的一些配置在jvm.cfg文件中读取和解析：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">CreateExecutionEnvironment</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>argc<span class="token punctuation">,</span> <span class="token operator">&amp;</span>argv<span class="token punctuation">,</span>
                               jrepath<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>jrepath<span class="token punctuation">)</span><span class="token punctuation">,</span>
                               jvmpath<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>jvmpath<span class="token punctuation">)</span><span class="token punctuation">,</span>
                               jvmcfg<span class="token punctuation">,</span>  <span class="token keyword">sizeof</span><span class="token punctuation">(</span>jvmcfg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数只在头文件中定义，具体的实现是根据不同平台而定的。接着会动态加载jvm.so这个共享库，并把jvm.so中的相关函数导出并且初始化，而启动JVM的函数也在其中：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">LoadJavaVM</span><span class="token punctuation">(</span>jvmpath<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ifn<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如mac平台下的实现：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>jboolean
<span class="token function">LoadJavaVM</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>jvmpath<span class="token punctuation">,</span> InvocationFunctions <span class="token operator">*</span>ifn<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Dl_info dlinfo<span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>libjvm<span class="token punctuation">;</span>

    <span class="token function">JLI_TraceLauncher</span><span class="token punctuation">(</span><span class="token string">&quot;JVM path is %s\\n&quot;</span><span class="token punctuation">,</span> jvmpath<span class="token punctuation">)</span><span class="token punctuation">;</span>

    libjvm <span class="token operator">=</span> <span class="token function">dlopen</span><span class="token punctuation">(</span>jvmpath<span class="token punctuation">,</span> RTLD_NOW <span class="token operator">+</span> RTLD_GLOBAL<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>libjvm <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">JLI_ReportErrorMessage</span><span class="token punctuation">(</span>DLL_ERROR1<span class="token punctuation">,</span> <span class="token constant">__LINE__</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">JLI_ReportErrorMessage</span><span class="token punctuation">(</span>DLL_ERROR2<span class="token punctuation">,</span> jvmpath<span class="token punctuation">,</span> <span class="token function">dlerror</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> JNI_FALSE<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    ifn<span class="token operator">-&gt;</span>CreateJavaVM <span class="token operator">=</span> <span class="token punctuation">(</span>CreateJavaVM_t<span class="token punctuation">)</span>
        <span class="token function">dlsym</span><span class="token punctuation">(</span>libjvm<span class="token punctuation">,</span> <span class="token string">&quot;JNI_CreateJavaVM&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ifn<span class="token operator">-&gt;</span>CreateJavaVM <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">JLI_ReportErrorMessage</span><span class="token punctuation">(</span>DLL_ERROR2<span class="token punctuation">,</span> jvmpath<span class="token punctuation">,</span> <span class="token function">dlerror</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> JNI_FALSE<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    ifn<span class="token operator">-&gt;</span>GetDefaultJavaVMInitArgs <span class="token operator">=</span> <span class="token punctuation">(</span>GetDefaultJavaVMInitArgs_t<span class="token punctuation">)</span>
        <span class="token function">dlsym</span><span class="token punctuation">(</span>libjvm<span class="token punctuation">,</span> <span class="token string">&quot;JNI_GetDefaultJavaVMInitArgs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ifn<span class="token operator">-&gt;</span>GetDefaultJavaVMInitArgs <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">JLI_ReportErrorMessage</span><span class="token punctuation">(</span>DLL_ERROR2<span class="token punctuation">,</span> jvmpath<span class="token punctuation">,</span> <span class="token function">dlerror</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> JNI_FALSE<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    ifn<span class="token operator">-&gt;</span>GetCreatedJavaVMs <span class="token operator">=</span> <span class="token punctuation">(</span>GetCreatedJavaVMs_t<span class="token punctuation">)</span>
    <span class="token function">dlsym</span><span class="token punctuation">(</span>libjvm<span class="token punctuation">,</span> <span class="token string">&quot;JNI_GetCreatedJavaVMs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ifn<span class="token operator">-&gt;</span>GetCreatedJavaVMs <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">JLI_ReportErrorMessage</span><span class="token punctuation">(</span>DLL_ERROR2<span class="token punctuation">,</span> jvmpath<span class="token punctuation">,</span> <span class="token function">dlerror</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> JNI_FALSE<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> JNI_TRUE<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后就是对JVM进行初始化了：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">return</span> <span class="token function">JVMInit</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ifn<span class="token punctuation">,</span> threadStackSize<span class="token punctuation">,</span> argc<span class="token punctuation">,</span> argv<span class="token punctuation">,</span> mode<span class="token punctuation">,</span> what<span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这也是由平台决定的，比如Mac下的实现为：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span>
<span class="token function">JVMInit</span><span class="token punctuation">(</span>InvocationFunctions<span class="token operator">*</span> ifn<span class="token punctuation">,</span> jlong threadStackSize<span class="token punctuation">,</span>
                 <span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">,</span>
                 <span class="token keyword">int</span> mode<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>what<span class="token punctuation">,</span> <span class="token keyword">int</span> ret<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sameThread<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//无需关心....</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      	<span class="token comment">//正常情况下走这个</span>
        <span class="token keyword">return</span> <span class="token function">ContinueInNewThread</span><span class="token punctuation">(</span>ifn<span class="token punctuation">,</span> threadStackSize<span class="token punctuation">,</span> argc<span class="token punctuation">,</span> argv<span class="token punctuation">,</span> mode<span class="token punctuation">,</span> what<span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到最后进入了一个<code>ContinueInNewThread</code>函数（在刚刚的<code>java.c</code>中实现），这个函数会创建一个新的线程来执行：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span>
<span class="token function">ContinueInNewThread</span><span class="token punctuation">(</span>InvocationFunctions<span class="token operator">*</span> ifn<span class="token punctuation">,</span> jlong threadStackSize<span class="token punctuation">,</span>
                    <span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">,</span>
                    <span class="token keyword">int</span> mode<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>what<span class="token punctuation">,</span> <span class="token keyword">int</span> ret<span class="token punctuation">)</span>
<span class="token punctuation">{</span>

    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

      rslt <span class="token operator">=</span> <span class="token function">ContinueInNewThread0</span><span class="token punctuation">(</span>JavaMain<span class="token punctuation">,</span> threadStackSize<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">/* If the caller has deemed there is an error we
       * simply return that, otherwise we return the value of
       * the callee
       */</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span>ret <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">?</span> ret <span class="token operator">:</span> rslt<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着进入了一个名为<code>ContinueInNewThread0</code>的函数，可以看到它将<code>JavaMain</code>函数传入作为参数，而此函数定义的第一个参数类型是一个函数指针：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span>
<span class="token function">ContinueInNewThread0</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token punctuation">(</span>JNICALL <span class="token operator">*</span>continuation<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">,</span> jlong stack_size<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> rslt<span class="token punctuation">;</span>
    <span class="token class-name">pthread_t</span> tid<span class="token punctuation">;</span>
    <span class="token class-name">pthread_attr_t</span> attr<span class="token punctuation">;</span>
    <span class="token function">pthread_attr_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_attr_setdetachstate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">,</span> PTHREAD_CREATE_JOINABLE<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>stack_size <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">pthread_attr_setstacksize</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">,</span> stack_size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid<span class="token punctuation">,</span> <span class="token operator">&amp;</span>attr<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span>continuation<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span>args<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">void</span> <span class="token operator">*</span> tmp<span class="token punctuation">;</span>
      <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid<span class="token punctuation">,</span> <span class="token operator">&amp;</span>tmp<span class="token punctuation">)</span><span class="token punctuation">;</span>
      rslt <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>tmp<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
     <span class="token comment">/*
      * Continue execution in current thread if for some reason (e.g. out of
      * memory/LWP)  a new thread can&#39;t be created. This will likely fail
      * later in continuation as JNI_CreateJavaVM needs to create quite a
      * few new threads, anyway, just give it a try..
      */</span>
      rslt <span class="token operator">=</span> <span class="token function">continuation</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">pthread_attr_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> rslt<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后实际上是在新的线程中执行<code>JavaMain</code>函数，最后我们再来看看此函数里面做了什么事情：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/* Initialize the virtual machine */</span>
start <span class="token operator">=</span> <span class="token function">CounterGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">InitializeJVM</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>vm<span class="token punctuation">,</span> <span class="token operator">&amp;</span>env<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ifn<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">JLI_ReportErrorMessage</span><span class="token punctuation">(</span>JVM_ERROR1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一步初始化虚拟机，如果报错直接退出。接着就是加载主类（至于具体如何加载一个类，我们会放在后面进行讲解），因为主类是我们Java程序的入口点：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
 * Get the application&#39;s main class.
 *
 * See bugid 5030265.  The Main-Class name has already been parsed
 * from the manifest, but not parsed properly for UTF-8 support.
 * Hence the code here ignores the value previously extracted and
 * uses the pre-existing code to reextract the value.  This is
 * possibly an end of release cycle expedient.  However, it has
 * also been discovered that passing some character sets through
 * the environment has &quot;strange&quot; behavior on some variants of
 * Windows.  Hence, maybe the manifest parsing code local to the
 * launcher should never be enhanced.
 *
 * Hence, future work should either:
 *     1)   Correct the local parsing code and verify that the
 *          Main-Class attribute gets properly passed through
 *          all environments,
 *     2)   Remove the vestages of maintaining main_class through
 *          the environment (and remove these comments).
 *
 * This method also correctly handles launching existing JavaFX
 * applications that may or may not have a Main-Class manifest entry.
 */</span>
mainClass <span class="token operator">=</span> <span class="token function">LoadMainClass</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> mode<span class="token punctuation">,</span> what<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>某些没有主方法的Java程序比如JavaFX应用，会获取ApplicationMainClass：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
 * In some cases when launching an application that needs a helper, e.g., a
 * JavaFX application with no main method, the mainClass will not be the
 * applications own main class but rather a helper class. To keep things
 * consistent in the UI we need to track and report the application main class.
 */</span>
appClass <span class="token operator">=</span> <span class="token function">GetApplicationClass</span><span class="token punctuation">(</span>env<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化完成：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
 * PostJVMInit uses the class name as the application name for GUI purposes,
 * for example, on OSX this sets the application name in the menu bar for
 * both SWT and JavaFX. So we&#39;ll pass the actual application class here
 * instead of mainClass as that may be a launcher or helper class instead
 * of the application class.
 */</span>
<span class="token function">PostJVMInit</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> appClass<span class="token punctuation">,</span> vm<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着就是获取主类中的主方法：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*
 * The LoadMainClass not only loads the main class, it will also ensure
 * that the main method&#39;s signature is correct, therefore further checking
 * is not required. The main method is invoked here so that extraneous java
 * stacks are not in the application stack trace.
 */</span>
mainID <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>env<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token class-name">GetStaticMethodID</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> mainClass<span class="token punctuation">,</span> <span class="token string">&quot;main&quot;</span><span class="token punctuation">,</span>
                                   <span class="token string">&quot;([Ljava/lang/String;)V&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没错，在字节码中<code>void main(String[] args)</code>表示为<code>([Ljava/lang/String;)V</code>我们之后会详细介绍。接着就是调用主方法了：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/* Invoke main method. */</span>
<span class="token punctuation">(</span><span class="token operator">*</span>env<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">CallStaticVoidMethod</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> mainClass<span class="token punctuation">,</span> mainID<span class="token punctuation">,</span> mainArgs<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>调用后，我们的Java程序就开飞速运行起来，直到走到主方法的最后一行返回：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
 * The launcher&#39;s exit code (in the absence of calls to
 * System.exit) will be non-zero if main threw an exception.
 */</span>
ret <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>env<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">ExceptionOccurred</span><span class="token punctuation">(</span>env<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">LEAVE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，一个Java程序的运行流程结束，在最后LEAVE函数中会销毁JVM。我们可以进行断点调试来查看是否和我们推出的结论一致：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux4uqcxpj31sr0u0td4.jpg" alt="image-20220129211342240" tabindex="0" loading="lazy"><figcaption>image-20220129211342240</figcaption></figure><p>还是以我们之前编写的测试类进行，首先来到调用之前，我们看到主方法执行之前，控制台没有输出任何内容，接着我们执行此函数，再来观察控制台的变化：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux4w5322j31zt0u0afp.jpg" alt="image-20220129211450939" tabindex="0" loading="lazy"><figcaption>image-20220129211450939</figcaption></figure><p>可以看到，主方法执行完成之后，控制台也成功输出了Hello World！</p><p>继续下一步，整个Java程序执行完成，得到退出状态码<code>0</code>：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux4ydghaj31bk0eimy7.jpg" alt="image-20220129211540210" tabindex="0" loading="lazy"><figcaption>image-20220129211540210</figcaption></figure><p>成功验证，最后总结一下整个执行过程：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux50ahdrj31d30u0tdu.jpg" alt="image-20220129213143973" tabindex="0" loading="lazy"><figcaption>image-20220129213143973</figcaption></figure><hr><h2 id="jni调用本地方法" tabindex="-1"><a class="header-anchor" href="#jni调用本地方法" aria-hidden="true">#</a> JNI调用本地方法</h2><p>Java还有一个JNI机制，它的全称：Java Native Interface，即Java本地接口。它允许在Java虚拟机内运行的Java代码与其他编程语言（如C/C++和汇编语言）编写的程序和库进行交互（在Android开发中用得比较多）比如我们现在想要让C语言程序帮助我们的Java程序实现a+b的运算，首先我们需要创建一个本地方法：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//本地方法使用native关键字标记，无需任何实现，交给C语言实现</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">native</span> <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建好后，接着点击构建按钮，会出现一个out文件夹，也就是生成的class文件在其中，接着我们直接生成对应的C头文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>javah <span class="token parameter variable">-classpath</span> out/production/SimpleHelloWorld <span class="token parameter variable">-d</span> ./jni com.test.Main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>生成的头文件位于jni文件夹下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/* DO NOT EDIT THIS FILE - it is machine generated */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;jni.h&gt;</span></span>
<span class="token comment">/* Header for class com_test_Main */</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">_Included_com_test_Main</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_Included_com_test_Main</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token keyword">extern</span> <span class="token string">&quot;C&quot;</span> <span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token comment">/*
 * Class:     com_test_Main
 * Method:    sum
 * Signature: (II)V
 */</span>
JNIEXPORT <span class="token keyword">void</span> JNICALL <span class="token function">Java_com_test_Main_sum</span>
  <span class="token punctuation">(</span>JNIEnv <span class="token operator">*</span><span class="token punctuation">,</span> jclass<span class="token punctuation">,</span> jint<span class="token punctuation">,</span> jint<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们在CLion中新建一个C++项目，并引入刚刚生成的头文件，并导入jni相关头文件（在JDK文件夹中）首先修改CMake文件：</p><div class="language-cmake line-numbers-mode" data-ext="cmake"><pre class="language-cmake"><code><span class="token keyword">cmake_minimum_required</span><span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">3.21</span><span class="token punctuation">)</span>
<span class="token keyword">project</span><span class="token punctuation">(</span>JNITest<span class="token punctuation">)</span>

<span class="token keyword">include_directories</span><span class="token punctuation">(</span>/Library/Java/JavaVirtualMachines/zulu-<span class="token number">8</span>.jdk/Contents/Home/include<span class="token punctuation">)</span>
<span class="token keyword">include_directories</span><span class="token punctuation">(</span>/Library/Java/JavaVirtualMachines/zulu-<span class="token number">8</span>.jdk/Contents/Home/include/darwin<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_STANDARD</span> <span class="token number">14</span><span class="token punctuation">)</span>

<span class="token keyword">add_executable</span><span class="token punctuation">(</span>JNITest com_test_Main.cpp com_test_Main.h<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着就可以编写实现了，首先认识一下引用类型对照表：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux540wn7j30xc0h1q47.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>所以我们这里直接返回a+b即可：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;com_test_Main.h&quot;</span></span>

JNIEXPORT jint JNICALL <span class="token function">Java_com_test_Main_sum</span>
        <span class="token punctuation">(</span>JNIEnv <span class="token operator">*</span> env<span class="token punctuation">,</span> jclass clazz<span class="token punctuation">,</span> jint a<span class="token punctuation">,</span> jint b<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们就可以将cpp编译为动态链接库，在MacOS下会生成<code>.dylib</code>文件，Windows下会生成<code>.dll</code>文件，我们这里就只以MacOS为例，命令有点长，因为还需要包含JDK目录下的头文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gcc com_test_Main.cpp <span class="token parameter variable">-I</span> /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/include <span class="token parameter variable">-I</span> /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/include/darwin <span class="token parameter variable">-fPIC</span> <span class="token parameter variable">-shared</span> <span class="token parameter variable">-o</span> test.dylib -lstdc++
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译完成后，得到<code>test.dylib</code>文件，这就是动态链接库了。</p><p>最后我们再将其放到桌面，然后在Java程序中加载：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string">&quot;/Users/nagocoler/Desktop/test.dylib&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">native</span> <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行，成功得到结果：</p><figure><img src="https://tva1.sinaimg.cn/large/008i3skNly1gyux58pg32j31ag0smjv5.jpg" alt="image-20220129222858105" tabindex="0" loading="lazy"><figcaption>image-20220129222858105</figcaption></figure><p>通过了解JVM的一些基础知识，我们心目中大致有了一个JVM的模型，在下一章，我们将继续深入学习JVM的内存管理机制和垃圾收集器机制，以及一些实用工具。</p>`,134);function A(R,T){const a=p("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[s("目前最新的SpringBoot已经提供了本地运行方案："),n("a",r,[s("https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/"),e(a)])]),n("blockquote",null,[n("p",null,[s("Spring Native支持使用"),n("a",d,[s("GraalVM"),e(a)]),n("a",v,[s("原生镜像"),e(a)]),s("编译器将Spring应用程序编译为本机可执行文件。")]),n("p",null,[s("与Java虚拟机相比，原生映像可以为许多类型的工作负载实现更简单、更加持续的托管。包括微服务、非常适合容器的功能工作负载和"),n("a",m,[s("Kubernetes"),e(a)])]),k,b,g,n("ul",null,[h,f,y,_,w,x,n("li",null,[s("Java应用程序的某些方面有一些不受完全支持"),n("a",J,[s("的限制"),e(a)]),s("。")])]),j]),M,n("ul",null,[I,S,C,n("li",null,[s("OpenJDK源码："),n("a",L,[s("https://codeload.github.com/openjdk/jdk/zip/refs/tags/jdk8-b120"),e(a)])]),V]),N])}const F=t(o,[["render",A],["__file","2.JVM笔记（一）.html.vue"]]);export{F as default};
