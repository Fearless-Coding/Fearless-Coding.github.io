# Redis实战






## Jedis

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


## SpringBoot整合

spring2.X中默认使用的lettuce客户端



https://blog.csdn.net/yeyinglingfeng/article/details/87790700   写的非常详细说明spring2.X中客户端使用





## springboot2.0 集成redis服务详解，以及 (Lettuce & Jedis)

https://blog.csdn.net/zzhongcy/article/details/102584028





## StringRedisTemplate的opsForValue().setIfAbsent()

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



## 删除

```
Boolean del = redisTemplate.delete(key);
```
