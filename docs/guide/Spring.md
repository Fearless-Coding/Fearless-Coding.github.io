# 问题总结：

## 问题1：required a single bean, but 2 were found:

### **问题场景**：

1. MQ中使用了两种类型的消息，事务消息和普通消息，要分别注入两个相同的Bean

### 问题原因：

项目中出现两个相同的Bean

### 解决方案：

1. 在注解增加BeanName配置：`@Bean("ipKeyResolver")`和`@Primary`,带@Primary注解的优先，表示是主Bean。

   ```java
   @Bean("transactionMQProducer")
   MQProducer transactionMQProducer() {
      ...  
   }
   
   
   @Primary
   @Bean("defaultMQProducer")
   MQProducer defaultMQProducer() {
      ...
   }
   ```

   

2. 消费者使用`@Qualifier("name")`消费Bean

   ```java
   @Autowired
   @Qualifier("transactionMQProducer")
   private MQProducer producer;
   @Autowired
   @Qualifier("defaultMQProducer")
   private MQProducer defaultMQProducer;
   ```

   

### 参考：

https://blog.csdn.net/cc007cc009/article/details/106664829

https://blog.csdn.net/qq_37342720/article/details/118443094





## 问题2：怎么给类起别名

### 问题场景：

获取别名的方式是动态的，我们在使用通过`@Service("abc1")` 类名的方式获取别名，此时又新建了一个类和abc1实现方式相同，但是我们动态类名为`@Service("abc2")` 此时我们不需要复制一个类去修改abc1为abc2

### 问题原因：

### 解决方案：

```java
@Slf4j
@Service("openBillServiceByDY0001")
@RequiredArgsConstructor
public class DyPetClaimOpenBillService extends AbstractApisClaimOpenBillService {
    ...
}
```



```java
package com.jd.ins.barley.claim.service.push;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

/**
 * 宠物险售卖版理赔推送Bean提供别名
 */
@Configuration
@RequiredArgsConstructor
public class ClaimOpenBillServiceAliasConfig {

    /**
     * 解析器
     */
    private final ConfigurableListableBeanFactory configurableListableBeanFactory;

    @PostConstruct
    private void init(){
        // 为OpenBillServiceByZX0001 注册新的别名 OpenBillServiceByZX0002
        configurableListableBeanFactory.registerAlias("openBillServiceByZX0001", "openBillServiceByZX0002");
    }
}

```

