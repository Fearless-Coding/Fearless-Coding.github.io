---
title: OOM真实案例分析及解决方案
category:
  - 案例分析
tag:
  - OOM
  - JProfiler
  - hprof
---

# mysql字符集导致left join出现Using join buffer (Block Nested Loop)



后台管理分页查询时，发现请求接口超时



## 问题追踪

查看日志，发现日志中打印的分页查询的数据，发现异常，查看响应时间41秒，一个分页查询请求41秒大概率是因为慢SQL，接着我们分析sql发现查询确实很慢



## 问题分析

确认了是SQL的原因，通过explain分析，发现left join关联的表竟然全是全表扫描，此时我们确认表中是否有关联字段索引，发现索引也有，那为什么有索引却不走索引呢，查看explain中 extra 列，发现一个从未见过的信息 **Using where； Using join buffer (Block Nested Loop) **，官方文档解释如下，使用连接缓冲区(块嵌套循环)，相当于我们代码中的两层for循环，随着数据量的增加查询效率也会成倍增加。

> `Using join buffer (Block Nested Loop)`, `Using join buffer (Batched Key Access)`, `Using join buffer (hash join)` (JSON property: `using_join_buffer`)
>
> Tables from earlier joins are read in portions into the join buffer, and then their rows are used from the buffer to perform the join with the current table. `(Block Nested Loop)` indicates use of the Block Nested-Loop algorithm, `(Batched Key Access)` indicates use of the Batched Key Access algorithm, and `(hash join)` indicates use of a hash join. That is, the keys from the table on the preceding line of the [`EXPLAIN`](https://dev.mysql.com/doc/refman/8.4/en/explain.html) output are buffered, and the matching rows are fetched in batches from the table represented by the line in which `Using join buffer` appears.
>
> In JSON-formatted output, the value of `using_join_buffer` is always one of `Block Nested Loop`, `Batched Key Access`, or `hash join`.
>
> 使用连接缓冲区(块嵌套循环)，使用连接缓冲区(批处理键访问)，使用连接缓冲区(哈希连接)(JSON属性:using_join_buffer)
>
> 将早期连接中的表分段读入连接缓冲区，然后从缓冲区中使用它们的行来执行与当前表的连接。(块嵌套循环)表示使用块嵌套循环算法，(批处理键访问)表示使用批处理键访问算法，(散列连接)表示使用散列连接。也就是说，将对EXPLAIN输出的前一行表中的键进行缓冲，并从出现Using join buffer的行所表示的表中批量获取匹配的行。
>
> 在json格式的输出中，using_join_buffer的值始终是块嵌套循环、批处理键访问或散列连接中的一个。



此时还没看出问题的原因，这时度娘找到一个问题相似的回答，发现竟是字符集不一致导致的问题

[mysql因为字符集导致left join出现Using join buffer (Block Nested Loop)](https://www.cnblogs.com/i-tao/p/15701072.html)



## 解决方案

将 left join 中的关联字段字符集设置一致，查看 explain key 走了主键索引和普通索引，type 也达到了eq_type 级别，此时问题已解决



## 总结

在我们开发过程中我们很少会关注字符集的设置，新项目中为了支持emoji表情都会设置为utfmb4，但是可以有些比较老的项目可能设置字符集为utf-8，就会导致这个的出现，在开发过程中建表时重点关注新表和历史表中的字段字符集



> [了解字符集](https://mp.weixin.qq.com/s?__biz=MzkwODI2ODc3OQ==&mid=2247484237&idx=1&sn=23a63170018b3569d696e52e8222708b&chksm=c0cdc6c9f7ba4fdf5638534da76c117d73d57d98a949b0fae81ce113a38985f3923f9c979540&scene=21#wechat_redirect)
>
> 
>
> [explain之extra](https://blog.csdn.net/qq_32078397/article/details/117766575)
