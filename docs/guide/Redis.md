# 简介

Redis是一个开源( BSD许可)的,内存中的数据结构存储系统,它可以用作**数据库、缓存和消息中间件MQ**。它支持多种类型的数据结构,如字符串( strings)，散列( hashes) ,列表(lists)，集合(sets)，有序集合( sorted sets)与范围查询,bitmaps，hyperloglogs和地理空间( geospatial )索引半径查询。Redis 内置了复制(replication) , LUA脚本( Luascripting)，LRU驱动事件( LRU eviction) , 事务( transactions )和不同级别的磁盘持久化( persistence )， 并通过Redis哨兵( Sentinel )和自动分区( Cluster )提供高可用性( high availability)。





# 基础命令的使用

```bash
127.0.0.1:6379> keys *
1) "a6d67fc760183455c4873edbe90feccd"
2) "54387c3e9203809d6bb0288274769c43"
3) "oauth:client:details::web"
4) "5db802e935ab9bb62593d914b8bc1e26"
127.0.0.1:6379> flushdb		# 清除db内的所有数据
OK
127.0.0.1:6379> set name pzy	# 设置一个值
OK
127.0.0.1:6379> keys *		# 查看所有的key
1) "name"
127.0.0.1:6379> get name	# 获取key所对应的值
"pzy"
127.0.0.1:6379> EXISTS name		# 查看是否存在此key
(integer) 1
127.0.0.1:6379> MOVE name 1		# 移除key
(integer) 1
127.0.0.1:6379> EXPIRE name 10	# 设置key的过期时间
(integer) 1
127.0.0.1:6379> ttl name		# 查询key还有多长时间过期
(integer) 4
127.0.0.1:6379> ttl name		# 值为-2时说明key已经过期
(integer) -2
127.0.0.1:6379> get name		# 过期后key的值为nil
(nil)
127.0.0.1:6379> type name		# 获取key的类型
string
```





# String（字符串）

```bash
127.0.0.1:6379> append name 123		# 在值的后面追加字符串，如果当前key不存在就相当于setkey
(integer) 6
127.0.0.1:6379> get name
"pzy123"
127.0.0.1:6379> strlen name			# 获取字符串的长度
(integer) 6
127.0.0.1:6379> set view 0
OK
127.0.0.1:6379> get view
"0"
127.0.0.1:6379> incr view			# 自增1
(integer) 1
127.0.0.1:6379> incr view
(integer) 2
127.0.0.1:6379> get view
"2"
127.0.0.1:6379> decr view			# 自减1
(integer) 1
127.0.0.1:6379> decr view
(integer) 0
127.0.0.1:6379> get view
"0"
127.0.0.1:6379> INCRBY view 10		# 可以设置步长设置增量
(integer) 10
127.0.0.1:6379> INCRBY view 10
(integer) 20
127.0.0.1:6379> DECRBY view 10		# 可以设置步长设置减量
(integer) 10
127.0.0.1:6379> GETRANGE name 0 3	# 截取字符串的长度，下标从0开始
"pzy1"
127.0.0.1:6379> SETRANGE name 3 666	# 替换指定位置开始的值
(integer) 6
127.0.0.1:6379> get name
"pzy666"
127.0.0.1:6379> setex age 30 "100"	# 设置一个值并且设置过期时间（set with expire）
OK
127.0.0.1:6379> get age
"100"
127.0.0.1:6379> ttl age				
(integer) 16
127.0.0.1:6379> setnx age 1000		# 不存在这个key才会去设置值（set if not exist）,分布式锁中会常常使用 
(integer) 0
127.0.0.1:6379> get age
"100"
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3		# 量设置值
OK
127.0.0.1:6379> keys *
1) "k2"
2) "k1"
3) "k3"
127.0.0.1:6379> mget k1 k2 k3				#批量获取值
1) "v1"
2) "v2"
3) "v3"
127.0.0.1:6379> msetnx k1 v1 k5 v5			# 是一个原子性操作,要么一起成功，要么一起失败
(integer) 0
127.0.0.1:6379> keys *
1) "k2"
2) "k1"
3) "k3"
127.0.0.1:6379> mset user:1:name pzy user:1:age 20		# 设置一个key，中间冒号隔开，在项目中可以分组区分是哪个模块下的缓存
OK
127.0.0.1:6379> mget user:1:name user:1:age				# 获取也可以使用这种key的方式获取值
1) "pzy"
2) "20"
127.0.0.1:6379> getset db redis							# 先get旧值再set新值，如果不存在值为nil
(nil)
127.0.0.1:6379> get db
"redis"
127.0.0.1:6379> getset db mongdb
"redis"
```





# List（列表）

在redis里面，可以把list玩成栈、队列、阻塞队列

所有list命令都是用L开头的

```bash
127.0.0.1:6379> LPUSH list one two three		# 往list中插入值，插入到列表头部
(integer) 3
127.0.0.1:6379> LRANGE list 0 -1				# 获取list中的全部值
1) "three"
2) "two"
3) "one"
127.0.0.1:6379> LRANGE list 0 1					# 获取下标[0,1]的值
1) "three"
2) "two"
127.0.0.1:6379> RPUSH list zero					# 往list中插入值，插入到列表尾部
(integer) 4
127.0.0.1:6379> LRANGE list 0 -1
1) "three"
2) "two"
3) "one"
4) "zero"
127.0.0.1:6379> LPOP list						# 移除头部一个值（第一个值）
"three"
127.0.0.1:6379> RPOP list						# 移除尾部一个值（最后一个值）
"zero"
127.0.0.1:6379> LRANGE list 0 -1			
1) "two"
2) "one"
127.0.0.1:6379> LINDEX list 1					# 通过下标获取list中的某一个值	
"one"
127.0.0.1:6379> LINDEX list 0
"two"
127.0.0.1:6379> LLEN list						# 获取list长度
(integer) 2
127.0.0.1:6379> LPUSH list zero three three
(integer) 4
127.0.0.1:6379> LRANGE list 0 -1
1) "three"
2) "three"
3) "zero"
4) "two"
5) "one"
127.0.0.1:6379> LREM list 1 one					# 移除一个值为one的元素
(integer) 1
127.0.0.1:6379> LREM list 1 three				# 移除一个值为three的元素（参数3为移除个数）
(integer) 1
127.0.0.1:6379> LRANGE list 0 -1
1) "three"
2) "zero"
3) "two"
127.0.0.1:6379> LTRIM list 1 2					# 通过下标截取指定长度，并重新赋值到list中
OK
127.0.0.1:6379> LRANGE list 0 -1
1) "zero"
2) "two"
127.0.0.1:6379> RPOPLPUSH list mylist			# 将list中的最后一个元素移除，并添加到新的集合中
"two"
127.0.0.1:6379> LRANGE list 0 -1
1) "zero"
127.0.0.1:6379> LRANGE mylist 0 -1
1) "two"
127.0.0.1:6379> LSET list 0 item				# 将指定下标的元素替换，下标不存在报错
OK
127.0.0.1:6379> LRANGE list 0 -1
1) "item"
127.0.0.1:6379> LINSERT list before item hello	# 将某个值插入到集合某元素前面
(integer) 2
127.0.0.1:6379> LINSERT list after item world	# 将某个值插入到集合某元素后面
(integer) 3
127.0.0.1:6379> LRANGE list 0 -1
1) "hello"
2) "item"
3) "world"
```





# Set（集合）

```bash
127.0.0.1:6379> SADD set hello zhangsan lisi wangwu			# 往set集合中添加元素
(integer) 4
127.0.0.1:6379> SMEMBERS set								# 查看set中的所有值
1) "wangwu"
2) "hello"
3) "zhangsan"
4) "lisi"
127.0.0.1:6379> SISMEMBER set hello							# 判断某一个值存不存在，存在返回1，不存在返回0
(integer) 1
127.0.0.1:6379> SISMEMBER set world
(integer) 0
127.0.0.1:6379> SCARD set									# 获取set的长度
(integer) 4
127.0.0.1:6379> SREM set hello								# 移除set中的指定元素
(integer) 1
127.0.0.1:6379> SMEMBERS set
1) "wangwu"
2) "zhangsan"
3) "lisi"
127.0.0.1:6379> SRANDMEMBER set								# 随机获取指定个数个值，默认取一个
"lisi"
127.0.0.1:6379> SRANDMEMBER set
"lisi"
127.0.0.1:6379> SRANDMEMBER set
"zhangsan"
127.0.0.1:6379> SRANDMEMBER set 2
1) "wangwu"
2) "lisi"
127.0.0.1:6379> SPOP set									# 随机删除指定个数个值，默认取一个
"lisi"
127.0.0.1:6379> SMEMBERS set
1) "wangwu"
2) "zhangsan"
127.0.0.1:6379> SMOVE set myset wangwu						# 将指定元素从一个集合移动到另外一个集合
(integer) 1
127.0.0.1:6379> SMEMBERS set
1) "zhangsan"
127.0.0.1:6379> SMEMBERS myset
1) "wangwu"
127.0.0.1:6379> SADD set wangwu
(integer) 1
127.0.0.1:6379> SDIFF set myset								# 差集
1) "zhangsan"
127.0.0.1:6379> SINTER set myset							# 交集
1) "wangwu"
127.0.0.1:6379> SUNION set myset							# 并集
1) "wangwu"
2) "zhangsan"
```





# Hash（哈希）

相当于Map

```bash
127.0.0.1:6379> HSET myhash key1 val1					# 设置hash值
(integer) 1
127.0.0.1:6379> hget myhash key1						# 获取一个hash值
"val1"
127.0.0.1:6379> HMSET myhash key1 hello key2 world		# 批量设置hash值
OK
127.0.0.1:6379> HMGET myhash key1 key2					# 批量获取hash值
1) "hello"
2) "world"
127.0.0.1:6379> HGETALL myhash							# 获取全部的hash值
1) "key1"
2) "hello"
3) "key2"
4) "world"
127.0.0.1:6379> HDEL myhash key2						# 删除指定的hash值
(integer) 1
127.0.0.1:6379> HGETALL myhash
1) "key1"
2) "hello"
127.0.0.1:6379> HLEN myhash								# 获取hash的长度
(integer) 1
127.0.0.1:6379> HEXISTS myhash key1						#  判断某一个值存不存在，存在返回1，不存在返回0
(integer) 1
127.0.0.1:6379> HEXISTS myhash key2
(integer) 0
127.0.0.1:6379> HKEYS myhash							# 获取hash中的所以key
1) "key1"
127.0.0.1:6379> HVALS myhash							# 获取hash中的所以value
1) "hello"
127.0.0.1:6379> HSET myhash key2 5						# 设置一个数值类型的hash
(integer) 1
127.0.0.1:6379> HINCRBY myhash key2 1					# value加一
(integer) 6
127.0.0.1:6379> HINCRBY myhash key2 -1					# value减一
(integer) 5
127.0.0.1:6379> HSETNX myhash key3 hello				# 设置一个hash值，如果不存在则添加，如果存在则不改变值
(integer) 1
127.0.0.1:6379> HSETNX myhash key3 world
(integer) 0
127.0.0.1:6379> HGET key3
(error) ERR wrong number of arguments for 'hget' command
127.0.0.1:6379> HGET myhash key3
"hello"
```





# Zset（有序集合）

```bash
127.0.0.1:6379> ZADD zset 1 val1 2 val2 3 val3		# 设置zset值
(integer) 3	
127.0.0.1:6379> ZRANGE zset 0 -1					# 获取所有的zset值	
1) "val1"
2) "val2"
3) "val3"
127.0.0.1:6379> zadd salary 5000 zhangsan 8000 liai 4000 wangwu		
(integer) 3
127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf		# 排序从负无穷到正无穷(也就是从小到大排序)
1) "wangwu"
2) "zhangsan"
3) "liai"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf withscores		# 显示用户全部信息,从小到大
1) "wangwu"
2) "4000"
3) "zhangsan"
4) "5000"
5) "liai"
6) "8000"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf 5000 withscores		 
1) "wangwu"
2) "4000"
3) "zhangsan"
4) "5000"
127.0.0.1:6379> ZREVRANGE salary 0 -1				# 从大到小排序
1) "liai"
2) "zhangsan"
3) "wangwu"
127.0.0.1:6379> ZRANGE zset 0 -1
1) "val1"
2) "val2"
3) "val3"
127.0.0.1:6379> ZREM zset val3						# 移除某一元素
(integer) 1
127.0.0.1:6379> ZRANGE zset 0 -1
1) "val1"
2) "val2"
127.0.0.1:6379> ZCARD zset							# 获取zset的长度
(integer) 2
127.0.0.1:6379> ZCOUNT zset -inf +inf				# 获取指定区间的数量
(integer) 2
```



# 三种特殊类型

### 地理空间( geospatial )

底层基于zset，所以可以使用zset的命令移除

```bash
127.0.0.1:6379> GEOADD china:city 116.397128 39.916527 beijing		# 添加地理位置(经度 纬度 名称)
(integer) 1
127.0.0.1:6379> GEOADD china:city 121.48941 31.40527 shanghai
(integer) 1
127.0.0.1:6379> GEOADD china:city 106.54041 29.40268 chongqing
(integer) 1
127.0.0.1:6379> GEOADD china:city 113.88308 22.55329 shenzhen
(integer) 1
127.0.0.1:6379> GEOADD china:city 87.615653 43.831501 xinjiang
(integer) 1
127.0.0.1:6379> GEOPOS china:city shanghai							# 获取某个值,可以获取多个值 
1) 1) "121.4894101023674"
   2) "31.405269938483805"
127.0.0.1:6379> GEODIST china:city chongqing xinjiang km			# 获取两个经纬度之间的距离,单位为km,默认是m,(还可以使用mi英里ft英尺)
"2319.5814"
127.0.0.1:6379> GEORADIUS china:city 110 30 1000 km					# 获取以100,30这个经纬度为中心,1000km内的城市
1) "chongqing"
2) "shenzhen"
127.0.0.1:6379> GEORADIUS china:city 110 30 1000 km withcoord withdist count 1  # 获取以100,30这个经纬度为中心,1000km内的城市具体经纬度,限制显示的个数
1) 1) "chongqing"
   2) "340.7667"
   3) 1) "106.54040783643723"
      2) "29.402680535172998"
127.0.0.1:6379> GEORADIUSBYMEMBER china:city shanghai 2000 km		# 找出位于指定元素周围的其他元素
1) "chongqing"
2) "shenzhen"
3) "shanghai"
127.0.0.1:6379> GEOHASH china:city shanghai chongqing				# 返回一个或多个位置元素的hash值,11位的hash
1) "wtw6st1uuq0"
2) "wm5z22s7520"
127.0.0.1:6379> ZRANGE china:city 0 -1								# 查询当前所以位置			
1) "xinjiang"
2) "chongqing"
3) "shenzhen"
4) "shanghai"
127.0.0.1:6379> ZREM china:city shanghai							# 移除某个位置
(integer) 1
127.0.0.1:6379> ZRANGE china:city 0 -1
1) "xinjiang"
2) "chongqing"
3) "shenzhen"
```





### HyperLogLog

Redis 在 2.8.9 版本添加了 HyperLogLog 结构。
Redis 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。
在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。但是，**因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。**
**什么是基数?**
比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为5。 基数估计就是在误差可接受的范围内，快速计算基数。

```bash
127.0.0.1:6379> PFADD mykey a b c d e f g			# 设置HyperLogLog值
(integer) 1
127.0.0.1:6379> PFCOUNT mykey						# 查询HyperLogLog的基数
(integer) 7
127.0.0.1:6379> PFADD mykey2 a b c d
(integer) 1
127.0.0.1:6379> PFCOUNT mykey2
(integer) 4
127.0.0.1:6379> PFMERGE mykey3 mykey mykey2			# 合并mykey、mykey2到mykey3中
OK
127.0.0.1:6379> PFCOUNT mykey3
(integer) 7
127.0.0.1:6379>
```





### bitmap

```bash
127.0.0.1:6379> SETBIT sign 0 1			# 设置bitmap值
(integer) 0
127.0.0.1:6379> SETBIT sign 1 0
(integer) 0
127.0.0.1:6379> SETBIT sign 2 1
(integer) 0
127.0.0.1:6379> SETBIT sign 3 1
(integer) 0
127.0.0.1:6379> GETBIT sign 3			# 获取bitmap值
(integer) 1
127.0.0.1:6379> GETBIT sign 0
(integer) 1
127.0.0.1:6379> BITCOUNT sign			# 统计值为1的数量
(integer) 3
```





# 事务

Redis中没有隔离级别的概念

Redis中单条命令是保证原子性的，但是事务不保证原子性。（有运行时异常不会回滚）

正常执行事务：

```bash
127.0.0.1:6379> MULTI			# 开启事务
OK
127.0.0.1:6379> set k1 v1		
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> get k1
QUEUED
127.0.0.1:6379> exec			# 执行事务
1) OK
2) OK
3) "v1"
```

放弃事务：

```bash
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> discard			# 放弃事务
OK
```

编译型异常（命令有误！）事务中的所以命令都不会执行：

```bash
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> getset k2		# 命令有误
(error) ERR wrong number of arguments for 'getset' command
127.0.0.1:6379> exec			# 执行事务报错
(error) EXECABORT Transaction discarded because of previous errors.
```

运行时异常（1/0）如果事务队列中存在语法性错误，那么执行命令的时候，其他命令可以正常执行，错误命令抛出异常：

```bash
127.0.0.1:6379> get k1
"v1"
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> get k1
QUEUED
127.0.0.1:6379> incr k1			# 错误语法，在字符串上加1
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> exec
1) "v1"
2) (error) ERR value is not an integer or out of range
3) OK
```





# 乐观锁watch监控

Redis中watch可以当做乐观锁去操作

正常执行：事务正常执行

```bash
127.0.0.1:6379> set money 100
OK
127.0.0.1:6379> set out 20
OK
127.0.0.1:6379> watch money			# 监视 money对象
OK
127.0.0.1:6379> MULTI
OK
127.0.0.1:6379> decrby money 20
QUEUED
127.0.0.1:6379> incrby out 20
QUEUED
127.0.0.1:6379> exec
1) (integer) 80
2) (integer) 20
127.0.0.1:6379>

```

 多线程修改测试：事务提交失败

```bash
127.0.0.1:6379> watch money			# 监视 money对象
OK
127.0.0.1:6379> MULTI -
OK
127.0.0.1:6379> decrby money 20
QUEUED
127.0.0.1:6379> incrby out 20
QUEUED
127.0.0.1:6379> exec				# 执行之前，另外一个线程修改了money的值，这个时候就会导致事务提交失败
(nil)
```

失败解决方案：

```bash
127.0.0.1:6379> UNWATCH				# 先解锁
OK
127.0.0.1:6379> watch money			# 获取money的最新值在进行监视
OK
127.0.0.1:6379> MULTI -
OK
127.0.0.1:6379> decrby money 10
QUEUED
127.0.0.1:6379> incrby out 10
QUEUED
127.0.0.1:6379> exec
1) (integer) 190
2) (integer) 30
```





# Jedis

Redis官方推荐的Java连接工具

1、导入对应的依赖

```xml
	<dependencies>
        <!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>3.2.0</version>
        </dependency>
    </dependencies>
```

2、编码测试

- ​	连接Redis

- ​	操作命令

- ​	断开连接

```java
import redis.clients.jedis.Jedis;

public class Ping {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("127.0.0.1",6379);
        System.out.println("连接成功");
        //查看服务是否运行
        System.out.println("服务正在运行: "+jedis.ping());
    }
}
```

输出：

```
连接成功
服务正在运行: PONG
```







# SpringBoot整合

spring2.X中默认使用的lettuce客户端



https://blog.csdn.net/yeyinglingfeng/article/details/87790700   写的非常详细说明spring2.X中客户端使用





# springboot2.0 集成redis服务详解，以及 (Lettuce & Jedis)

https://blog.csdn.net/zzhongcy/article/details/102584028





# Redis持久化

redis是一个内存数据库，数据保存在内存中，但是我们都知道内存的数据变化是很快的，也容易发生丢失。幸好Redis还为我们提供了持久化的机制，分别是RDB(Redis DataBase)和AOF(Append Only File)。
> 在这里假设你已经了解了redis的基础语法，某字母网站都有很好的教程，可以去看。基本使用的文章就不写了，都是一些常用的命令。

下面针对这两种方式来介绍一下。由浅入深。

### **一、持久化流程**

既然redis的数据可以保存在磁盘上，那么这个流程是什么样的呢？

要有下面五个过程：

（1）客户端向服务端发送写操作(数据在客户端的内存中)。

（2）数据库服务端接收到写请求的数据(数据在服务端的内存中)。

（3）服务端调用write这个系统调用，将数据往磁盘上写(数据在系统内存的缓冲区中)。

（4）操作系统将缓冲区中的数据转移到磁盘控制器上(数据在磁盘缓存中)。

（5）磁盘控制器将数据写到磁盘的物理介质中(数据真正落到磁盘上)。

这5个过程是在理想条件下一个正常的保存流程，但是在大多数情况下，我们的机器等等都会有各种各样的故障，这里划分了两种情况：

（1）Redis数据库发生故障，只要在上面的第三步执行完毕，那么就可以持久化保存，剩下的两步由操作系统替我们完成。

（2）操作系统发生故障，必须上面5步都完成才可以。

在这里只考虑了保存的过程可能发生的故障，其实保存的数据也有可能发生损坏，需要一定的恢复机制，不过在这里就不再延伸了。现在主要考虑的是redis如何来实现上面5个保存磁盘的步骤。它提供了两种策略机制，也就是RDB和AOF。

### **二、RDB机制**

RDB其实就是把数据以快照的形式保存在磁盘上。什么是快照呢，你可以理解成把当前时刻的数据拍成一张照片保存下来。

RDB持久化是指在指定的时间间隔内将内存中的数据集快照写入磁盘。也是默认的持久化方式，这种方式是就是将内存中数据以快照的方式写入到二进制文件中,默认的文件名为dump.rdb。

> 在我们安装了redis之后，所有的配置都是在redis.conf文件中，里面保存了RDB和AOF两种持久化机制的各种配置。

既然RDB机制是通过把某个时刻的所有数据生成一个快照来保存，那么就应该有一种触发机制，是实现这个过程。对于RDB来说，提供了三种机制：save、bgsave、自动化。我们分别来看一下

**1、save触发方式**

该命令会阻塞当前Redis服务器，执行save命令期间，Redis不能处理其他命令，直到RDB过程完成为止。具体流程如下：

![img](images\e7cd7b899e510fb3aa8c05042b22c093d0430ca7.jpeg)

执行完成时候如果存在老的RDB文件，就把新的替代掉旧的。我们的客户端可能都是几万或者是几十万，这种方式显然不可取。

**2、bgsave触发方式**

执行该命令时，Redis会在后台异步进行快照操作，快照同时还可以响应客户端请求。具体流程如下：

![img](images\023b5bb5c9ea15cefb035bc8431132f53b87b21e.jpeg)

具体操作是Redis进程执行fork操作创建子进程，RDB持久化过程由子进程负责，完成后自动结束。阻塞只发生在fork阶段，一般时间很短。基本上 Redis 内部所有的RDB操作都是采用 bgsave 命令。

**3、自动触发**

```bash
127.0.0.1:6379> FLUSHALL	# 清除库中数据，也会生成一个dump.rdb文件
OK
```

自动触发是由我们的配置文件来完成的。在redis.conf配置文件中，里面有如下配置，我们可以去设置：

**①save：**这里是用来配置触发 Redis的 RDB 持久化条件，也就是什么时候将内存中的数据保存到硬盘。比如“save m n”。表示m秒内数据集存在n次修改时，自动触发bgsave。

默认如下配置：

\#表示900 秒内如果至少有 1 个 key 的值变化，则保存save 900 1#表示300 秒内如果至少有 10 个 key 的值变化，则保存save 300 10#表示60 秒内如果至少有 10000 个 key 的值变化，则保存save 60 10000

不需要持久化，那么你可以注释掉所有的 save 行来停用保存功能。

**②stop-writes-on-bgsave-error ：**默认值为yes。当启用了RDB且最后一次后台保存数据失败，Redis是否停止接收数据。这会让用户意识到数据没有正确持久化到磁盘上，否则没有人会注意到灾难（disaster）发生了。如果Redis重启了，那么又可以重新开始接收数据了

**③rdbcompression ；**默认值是yes。对于存储到磁盘中的快照，可以设置是否进行压缩存储。

**④rdbchecksum ：**默认值是yes。在存储快照后，我们还可以让redis使用CRC64算法来进行数据校验，但是这样做会增加大约10%的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能。

**⑤dbfilename ：**设置快照的文件名，默认是 dump.rdb

**⑥dir：**设置快照文件的存放路径，这个配置项一定是个目录，而不能是文件名。

我们可以修改这些配置来实现我们想要的效果。因为第三种方式是配置的，所以我们对前两种进行一个对比：

![img](images\1c950a7b02087bf43b4490d50ac25f2a11dfcf7e.jpeg)

**4、RDB 的优势和劣势**

①、优势

（1）RDB文件紧凑，全量备份，非常适合用于进行备份和灾难恢复。

（2）生成RDB文件的时候，redis主进程会fork()一个子进程来处理所有保存工作，主进程不需要进行任何磁盘IO操作。

（3）RDB 在恢复大数据集时的速度比 AOF 的恢复速度要快。

②、劣势

RDB快照是一次全量备份，存储的是内存数据的二进制序列化形式，存储上非常紧凑。当进行快照持久化时，会开启一个子进程专门负责快照持久化，子进程会拥有父进程的内存数据，父进程修改内存子进程不会反应出来，所以在快照持久化期间修改的数据不会被保存，可能丢失数据。



### 三、AOF机制（append only file）

全量备份总是耗时的，有时候我们提供一种更加高效的方式AOF，工作机制很简单，redis会将每一个收到的写命令都通过write函数追加到文件中。通俗的理解就是日志记录。每次都采取的是追加模式。

**1、持久化原理**

他的原理看下面这张图：

![img](images\32fa828ba61ea8d3c2502e396b1b3848251f58b0.jpeg)

每当有一个写命令过来时，就直接保存在我们的AOF文件中。

**2、文件重写原理**

AOF的方式也同时带来了另一个问题。持久化文件会变的越来越大。为了压缩aof的持久化文件。redis提供了bgrewriteaof命令。将内存中的数据以命令的方式保存到临时文件中，同时会fork出一条新进程来将文件重写。可以根据配置文件进行配置文件到达多大时重写aof文件。

![img](images\09fa513d269759ee28454d2c4cea4b106c22dfd3.jpeg)

重写aof文件的操作，并没有读取旧的aof文件，而是将整个内存中的数据库内容用命令的方式重写了一个新的aof文件，这点和快照有点类似。

**3、AOF也有三种触发机制**

（1）每修改同步always：同步持久化 每次发生数据变更会被立即记录到磁盘 性能较差但数据完整性比较好

（2）每秒同步everysec：异步操作，每秒记录 如果一秒内宕机，有数据丢失

（3）不同no：从不同步

![img](images\b17eca8065380cd7df69859ba056a5325982816c.jpeg)

**4、优点**

（1）AOF可以更好的保护数据不丢失，一般AOF会每隔1秒，通过一个后台线程执行一次fsync操作，最多丢失1秒钟的数据。

（2）AOF日志文件没有任何磁盘寻址的开销，写入性能非常高，文件不容易破损。

（3）AOF日志文件即使过大的时候，出现后台重写操作，也不会影响客户端的读写。

（4）AOF日志文件的命令通过非常可读的方式进行记录，这个特性非常适合做灾难性的误删除的紧急恢复。比如某人不小心用flushall命令清空了所有数据，只要这个时候后台rewrite还没有发生，那么就可以立即拷贝AOF文件，将最后一条flushall命令给删了，然后再将该AOF文件放回去，就可以通过恢复机制，自动恢复所有数据

**5、缺点**

（1）对于同一份数据来说，AOF日志文件通常比RDB数据快照文件更大

（2）AOF开启后，支持的写QPS会比RDB支持的写QPS低，因为AOF一般会配置成每秒fsync一次日志文件，当然，每秒一次fsync，性能也还是很高的

（3）以前AOF发生过bug，就是通过AOF记录的日志，进行数据恢复的时候，没有恢复一模一样的数据出来。

**四、RDB和AOF到底该如何选择**

选择的话，两者加一起才更好。因为两个持久化机制你明白了，剩下的就是看自己的需求了，需求不同选择的也不一定，但是通常都是结合使用。有一张图可供总结：

![img](images\8326cffc1e178a82c532308ef2117b8ba977e8ae.jpeg)





# Redis 发布订阅

订阅端：

```bash
127.0.0.1:6379> PSUBSCRIBE pzy	# 订阅频道-pzy
Reading messages... (press Ctrl-C to quit)
1) "psubscribe"
2) "pzy"
3) (integer) 1
# 等待读取推送消息
1) "pmessage"	# 消息
2) "pzy"		# 订阅频道的名称
3) "pzy"
4) "helloworld"	# 消息的具体内容
1) "pmessage"
2) "pzy"
3) "pzy"
4) "zhangsanshuo"
```

客户端：

```bash
127.0.0.1:6379> PUBLISH pzy helloworld		# 发送消息
(integer) 1
127.0.0.1:6379> PUBLISH pzy zhangsanshuo
(integer) 1
127.0.0.1:6379>
```





# 主从复制

```bash
127.0.0.1:6379> info replication	# 查看当前库的信息
# Replication
role:master							# 角色为master
connected_slaves:0					# 当前从机个数
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```



复制3个配置文件，修改对应的信息（默认情况下，每台Redis服务器都是主节点，只需要配置从机）

1. 端口
2. pid名称
3. log文件名称
4. dump.rdb名称

```
可以通过slaveof ip port 进行配置，通过这种方式进行配置的话是暂时的，要永久配置的话需要在配置文件中进行配置
slaveof no one  可以将从节点变为主节点
```



主机可以写，从机只能读不能写，从机写入时会报错



**复制原理需要补充**





**层层链路**也只能是从节点，只有一个主节点





# 哨兵模式

参考：https://www.cnblogs.com/ysocean/tag/Redis%E8%AF%A6%E8%A7%A3/

### 1、架构图

![img](images\1120165-20200210163639369-1861604133.png)

### 2、服务器列表

![img](images\1120165-20200210163723019-1037639332.png)



### 3、搭建哨兵模式

**①、主要配置项** 

配置文件名称为：sentinel.conf

```bash
#配置端口
port 26379
#以守护进程模式启动
daemonize yes
#日志文件名
logfile "sentinel_26379.log"
#存放备份文件以及日志等文件的目录
dir "/opt/redis/data"
#监控的IP 端口号 名称 sentinel通过投票后认为mater宕机的数量，此处为至少``2``个
sentinel monitor mymaster 192.168.14.101 6379 2
#``30``秒ping不通主节点的信息，主观认为master宕机
sentinel down-after-milliseconds mymaster 30000
#故障转移后重新主从复制，``1``表示串行，>``1``并行
sentinel parallel-syncs mymaster 1
#故障转移开始，三分钟内没有完成，则认为转移失败
sentinel failover-timeout mymaster 180000
```

注意三台服务器的端口配置.如果redis服务器配置了密码连接,则要增加如下配置:

```bash
sentinel auth-pass mymaster 123
```

后面的123表示密码mymaster表示主机.注意这行配置要配置到 sentinel monitor mymaster ip port 后面,因为名称 mymaster要先定义.

②**、启动哨兵**

```bash
redis-sentinel sentinel.conf
```

③**、验证主从自动切换**

　　首先kill掉Redis 主节点.然后查看sentinel 日志:

![img](images\1120165-20200210201842784-528299150.png)

　　上面截图红框框住的几个重要信息,这里先介绍最后一行,switch-master mymaster 192.168.14.101 6379 192.168.14.103 6381 表示master服务器将由6379的redis服务切换为6381端口的redis服务器.

　　PS:**+switch-master** 表示切换主节点.

　　然后我们通过 info replication 命令查看 6381的redis服务器:

　　									![img](images\1120165-20200210202309053-1947340550.png)

　　我们发现,6381的Redis服务已经切换成master节点了. 

　　另外,也可以查看sentinel.conf 配置文件,里面的 sentinel monitor mymaster 192.168.14.101 6379 2 也自动更改为 sentinel monitor mymaster 192.168.14.103 6381 2 配置了.

### 4、Java客户端连接原理

　　**①**、**结构图**

　　![img](images\1120165-20200211122445582-11189433.png)

　　**②、连接步骤** 

　　一.客户端遍历所有的 Sentinel 节点集合,获取一个可用的 Sentinel 节点.

　　二.客户端向可用的 Sentinel 节点发送 get-master-addr-by-name 命令,获取Redis Master 节点.

　　三.客户端向Redis Master节点发送role或role replication 命令,来确定其是否是Master节点,并且能够获取其 slave节点信息.

　　四.客户端获取到确定的节点信息后,便可以向Redis发送命令来进行后续操作了

　　需要注意的是:客户端是和Sentinel来进行交互的,通过Sentinel来获取真正的Redis节点信息,然后来操作.实际工作时,Sentinel 内部维护了一个主题队列,用来保存Redis的节点信息,并实时更新,客户端订阅了这个主题,然后实时的去获取这个队列的Redis节点信息.



### 5、哨兵模式工作原理

　　**①、三个定时任务**

　　一.每10秒每个 sentinel 对master 和 slave 执行info 命令:该命令第一个是用来发现slave节点,第二个是确定主从关系.

　　二.每2秒每个 sentinel 通过 master 节点的 channel(名称为_sentinel_:hello) 交换信息(pub/sub):用来交互对节点的看法(后面会介绍的节点主观下线和客观下线)以及自身信息.

　　三.每1秒每个 sentinel 对其他 sentinel 和 redis 执行 ping 命令,用于心跳检测,作为节点存活的判断依据.

　　**②、主观下线和客观下线**

　　一.主观下线

　　SDOWN:subjectively down,直接翻译的为”主观”失效,即当前sentinel实例认为某个redis服务为”不可用”状态.

　　二.客观下线

　　ODOWN:objectively down,直接翻译为”客观”失效,即多个sentinel实例都认为master处于”SDOWN”状态,那么此时master将处于ODOWN,ODOWN可以简单理解为master已经被集群确定为”不可用”,将会开启故障转移机制.

　　结合我们第4点搭建主从模式,验证主从切换时,kill掉Redis主节点,然后查看 sentinel 日志,如下:

　　![img](images\1120165-20200210201842784-528299150.png)

　　发现有类似 sdown 和 odown 的日志.在结合我们配置 sentinel 时的配置文件来看:

```bash
#监控的IP 端口号 名称 sentinel通过投票后认为mater宕机的数量，此处为至少``2``个``
sentinel monitor mymaster 192.168.14.101 6379 2
```

　　最后的 2 表示投票数,也就是说当一台 sentinel 发现一个 Redis 服务无法 ping 通时,就标记为 主观下线 sdown;同时另外的 sentinel 服务也发现该 Redis 服务宕机,也标记为 主观下线,当多台 sentinel (大于等于2,上面配置的最后一个)时,都标记该Redis服务宕机,这时候就变为客观下线了,然后进行故障转移.

　　**③、故障转移**

　　故障转移是由 sentinel 领导者节点来完成的(只需要一个sentinel节点),关于 sentinel 领导者节点的选取也是每个 sentinel 向其他 sentinel 节点发送我要成为领导者的命令,超过半数sentinel 节点同意,并且也大于quorum ,那么他将成为领导者,如果有多个sentinel都成为了领导者,则会过段时间在进行选举.

　　sentinel 领导者节点选举出来后,会通过如下几步进行故障转移:

　　一.从 slave 节点中选出一个合适的 节点作为新的master节点.这里的合适包括如下几点:

　　　　1.选择 slave-priority(slave节点优先级)最高的slave节点,如果存在则返回,不存在则继续下一步判断.

　　　　2.选择复制偏移量最大的 slave 节点(复制的最完整),如果存在则返回,不存在则继续.

　　　　3.选择runId最小的slave节点(启动最早的节点)

　　二.对上面选出来的 slave 节点执行 slaveof no one 命令让其成为新的 master 节点.

　　三.向剩余的 slave 节点发送命令,让他们成为新master 节点的 slave 节点,复制规则和前面设置的 parallel-syncs 参数有关.

　　四.更新原来master 节点配置为 slave 节点,并保持对其进行关注,一旦这个节点重新恢复正常后,会命令它去复制新的master节点信息.(注意:原来的master节点恢复后是作为slave的角色)

　　可以从 sentinel 日志中出现的几个消息来进行查看故障转移:

　　1.**+switch-master**:表示切换主节点(从节点晋升为主节点)

　　2.**+sdown**:主观下线

　　3.**+odown**:客观下线

　　4.**+convert-to-slave**:切换从节点(原主节点降为从节点)







# 缓存穿透、击穿和雪崩



### 1、缓存穿透



#### 一、概念

　　缓存穿透：缓存和数据库中都没有的数据，可用户还是源源不断的发起请求，导致每次请求都会到数据库，从而压垮数据库。

　　如下图红色的流程：

　　![img](images\1120165-20200808214325134-1676845673.png)

 　比如客户查询一个根本不存在的东西，首先从Redis中查不到，然后会去数据库中查询，数据库中也查询不到，那么就不会将数据放入到缓存中，后面如果还有类似源源不断的请求，最后都会压到数据库来处理，从而给数据库造成巨大的压力。



#### 二、解决办法

　　**①、业务层校验**

　　用户发过来的请求，根据请求参数进行校验，对于明显错误的参数，直接拦截返回。

　　比如，请求参数为主键自增id，那么对于请求小于0的id参数，明显不符合，可以直接返回错误请求。

　　**②、不存在数据设置短过期时间**

　　对于某个查询为空的数据，可以将这个空结果进行Redis缓存，但是设置很短的过期时间，比如30s，可以根据实际业务设定。注意一定不要影响正常业务。

　　**③、布隆过滤器**

　　关于布隆过滤器，后面会详细介绍。布隆过滤器是一种数据结构，利用极小的内存，可以判断大量的数据“一定不存在或者可能存在”。

　　对于缓存穿透，我们可以将查询的数据条件都哈希到一个足够大的布隆过滤器中，用户发送的请求会先被布隆过滤器拦截，一定不存在的数据就直接拦截返回了，从而避免下一步对数据库的压力。

### 2、缓存击穿



#### 一、概念

　　缓存击穿：Redis中一个热点key在失效的同时，大量的请求过来，从而会全部到达数据库，压垮数据库。

　　![img](images\1120165-20200808214359739-1247536410.png)

 　这里要注意的是这是某一个热点key过期失效，和后面介绍缓存雪崩是有区别的。比如淘宝双十一，对于某个特价热门的商品信息，缓存在Redis中，刚好0点，这个商品信息在Redis中过期查不到了，这时候大量的用户又同时正好访问这个商品，就会造成大量的请求同时到达数据库。



#### 二、解决办法

　　**①、设置热点数据永不过期**

　　对于某个需要频繁获取的信息，缓存在Redis中，并设置其永不过期。当然这种方式比较粗暴，对于某些业务场景是不适合的。

　　**②、定时更新**

　　比如这个热点数据的过期时间是1h，那么每到59minutes时，通过定时任务去更新这个热点key，并重新设置其过期时间。

　　③**、互斥锁**

　　这是解决缓存击穿比较常用的方法。

　　互斥锁简单来说就是在Redis中根据key获得的value值为空时，先锁上，然后从数据库加载，加载完毕，释放锁。若其他线程也在请求该key时，发现获取锁失败，则睡眠一段时间（比如100ms）后重试。也可以使用双重检测同步锁：https://blog.csdn.net/weixin_42857269/article/details/120181414

### **3、缓存雪崩**



#### 一、概念

　　缓存雪崩：Redis中缓存的数据大面积同时失效，或者Redis宕机，从而会导致大量请求直接到数据库，压垮数据库。

　　![img](images\1120165-20200329215008122-335003416.png)

 　对于一个业务系统，如果Redis宕机或大面积的key同时过期，会导致大量请求同时打到数据库，这是灾难性的问题。



#### 二、解决办法

　　**①、设置有效期均匀分布**

　　避免缓存设置相近的有效期，我们可以在设置有效期时增加随机值；

　　或者统一规划有效期，使得过期时间均匀分布。

　　**②、数据预热**

　　对于即将来临的大量请求，我们可以提前走一遍系统，将数据提前缓存在Redis中，并设置不同的过期时间。

　　**③、保证Redis服务高可用**

　　前面我们介绍过Redis的哨兵模式和集群模式，为防止Redis集群单节点故障，可以通过这两种模式实现高可用。



# 布隆过滤器



### 1、布隆过滤器使用场景

　　比如有如下几个需求：

　　①、原本有10亿个号码，现在又来了10万个号码，要快速准确判断这10万个号码是否在10亿个号码库中？

　　解决办法一：将10亿个号码存入数据库中，进行数据库查询，准确性有了，但是速度会比较慢。

　　解决办法二：将10亿号码放入内存中，比如Redis缓存中，这里我们算一下占用内存大小：10亿*8字节=8GB，通过内存查询，准确性和速度都有了，但是大约8gb的内存空间，挺浪费内存空间的。

　　②、接触过爬虫的，应该有这么一个需求，需要爬虫的网站千千万万，对于一个新的网站url，我们如何判断这个url我们是否已经爬过了？

　　解决办法还是上面的两种，很显然，都不太好。

　　③、同理还有垃圾邮箱的过滤。

　　那么对于类似这种，大数据量集合，如何准确快速的判断某个数据是否在大数据量集合中，并且不占用内存，**布隆过滤器**应运而生了。

### 2、布隆过滤器简介

　　带着上面的几个疑问，我们来看看到底什么是布隆过滤器。

　　布隆过滤器：一种数据结构，是由一串很长的二进制向量组成，可以将其看成一个二进制数组。既然是二进制，那么里面存放的不是0，就是1，但是初始默认值都是0。

　　如下所示：

　　![img](images\1120165-20200330220824117-1290183653.png)

　　**①、添加数据**

　　介绍概念的时候，我们说可以将布隆过滤器看成一个容器，那么如何向布隆过滤器中添加一个数据呢？

　　如下图所示：当要向布隆过滤器中添加一个元素key时，我们通过多个hash函数，算出一个值，然后将这个值所在的方格置为1。

　　比如，下图hash1(key)=1，那么在第2个格子将0变为1（数组是从0开始计数的），hash2(key)=7，那么将第8个格子置位1，依次类推。

　　![img](images\1120165-20200330221613591-2062171492.png)

 

　　**②、判断数据是否存在？**

　　知道了如何向布隆过滤器中添加一个数据，那么新来一个数据，我们如何判断其是否存在于这个布隆过滤器中呢？

　　很简单，我们只需要将这个新的数据通过上面自定义的几个哈希函数，分别算出各个值，然后看其对应的地方是否都是1，如果存在一个不是1的情况，那么我们可以说，该新数据一定不存在于这个布隆过滤器中。

　　反过来说，如果通过哈希函数算出来的值，对应的地方都是1，那么我们能够肯定的得出：这个数据一定存在于这个布隆过滤器中吗？

　　答案是否定的，因为多个不同的数据通过hash函数算出来的结果是会有重复的，所以会存在某个位置是别的数据通过hash函数置为的1。

　　我们可以得到一个结论：**布隆过滤器可以判断某个数据一定不存在，但是无法判断一定存在**。

　　**③、布隆过滤器优缺点**

　　优点：优点很明显，二进制组成的数组，占用内存极少，并且插入和查询速度都足够快。

　　缺点：随着数据的增加，误判率会增加；还有无法判断数据一定存在；另外还有一个重要缺点，无法删除数据。



### 3、Redis实现布隆过滤器



#### ①、bitmaps

　　我们知道计算机是以二进制位作为底层存储的基础单位，一个字节等于8位。

　　比如“big”字符串是由三个字符组成的，这三个字符对应的ASCII码分为是98、105、103，对应的二进制存储如下：

　　![img](images\1120165-20200404213453130-714545258.png)

 

 

　　在Redis中，Bitmaps 提供了一套命令用来操作类似上面字符串中的每一个位。

　　**一、设置值**

```
setbit key offset value
```

　　![img](images\1120165-20200404214003953-5622706.png)

 

 　我们知道"b"的二进制表示为0110 0010，我们将第7位（从0开始）设置为1，那0110 0011 表示的就是字符“c”，所以最后的字符 “big”变成了“cig”。

　　**二、获取值**

```
gitbit key offset
```

　　![img](images\1120165-20200404214216788-374691466.png)

 　**三、获取位图指定范围值为1的个数**

```
bitcount key [start end]
```

　　如果不指定，那就是获取全部值为1的个数。

　　注意：start和end指定的是**字节的个数**，而不是位数组下标。

　　![img](images\1120165-20200404214812688-1075855704.png)



#### ②、Redisson

　　Redis 实现布隆过滤器的底层就是通过 bitmap 这种数据结构，至于如何实现，这里就不重复造轮子了，介绍业界比较好用的一个客户端工具——Redisson。

　　Redisson 是用于在 Java 程序中操作 Redis 的库，利用Redisson 我们可以在程序中轻松地使用 Redis。

　　下面我们就通过 Redisson 来构造布隆过滤器。

```java
package com.ys.rediscluster.bloomfilter.redisson;

import org.redisson.Redisson;
import org.redisson.api.RBloomFilter;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;

public class RedissonBloomFilter {

    public static void main(String[] args) {
        Config config = new Config();
        config.useSingleServer().setAddress("redis://192.168.14.104:6379");
        config.useSingleServer().setPassword("123");
        //构造Redisson
        RedissonClient redisson = Redisson.create(config);

        RBloomFilter<String> bloomFilter = redisson.getBloomFilter("phoneList");
        //初始化布隆过滤器：预计元素为100000000L,误差率为3%
        bloomFilter.tryInit(100000000L,0.03);
        //将号码10086插入到布隆过滤器中
        bloomFilter.add("10086");

        //判断下面号码是否在布隆过滤器中
        System.out.println(bloomFilter.contains("123456"));//false
        System.out.println(bloomFilter.contains("10086"));//true
    }
}
```

　这是单节点的Redis实现方式，如果数据量比较大，期望的误差率又很低，那单节点所提供的内存是无法满足的，这时候可以使用分布式布隆过滤器，同样也可以用 Redisson 来实现，这里我就不做代码演示了，大家有兴趣可以试试。



### 4、guava 工具

　　最后提一下不用Redis如何来实现布隆过滤器。

　　guava 工具包相信大家都用过，这是谷歌公司提供的，里面也提供了布隆过滤器的实现。

```java
package com.ys.rediscluster.bloomfilter;

import com.google.common.base.Charsets;
import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnel;
import com.google.common.hash.Funnels;

public class GuavaBloomFilter {
    public static void main(String[] args) {
        BloomFilter<String> bloomFilter = BloomFilter.create(Funnels.stringFunnel(Charsets.UTF_8),100000,0.01);

        bloomFilter.put("10086");

        System.out.println(bloomFilter.mightContain("123456"));
        System.out.println(bloomFilter.mightContain("10086"));
    }
}
```



# 底层原理













# LUA脚本























# StringRedisTemplate的opsForValue().setIfAbsent()

setIfAbsent相当于setnx(key,value);只有key不存在时设置key的值，存在则不设置并返回false

```java
Boolean lock = redisTemplate.opsForValue().setIfAbsent(key, value, expireTime, TimeUnit.DAYS);
```

使用场景：保证并发时一个接口执行多次，在方法执行时设置锁，方法执行完成或异常释放锁

代码如下：

```java
private boolean applyLock(String key) {
    Boolean lock = redisTemplate.opsForValue().setIfAbsent(key, "business signing lock", 1L, TimeUnit.DAYS);
    return Boolean.TRUE.equals(lock);
}
```



# 删除

```
Boolean del = redisTemplate.delete(key);
```







# 为什么说Redis是单线程的以及Redis为什么这么快！

https://blog.csdn.net/chenyao1994/article/details/79491337
