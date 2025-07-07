package com.hamtalk.chat.config;

import com.hamtalk.chat.pubsub.RedisSubscriber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class BeanCounter implements ApplicationRunner {
    //TODO: 테스트 클래스라 추후 삭제 필요
    private final ApplicationContext applicationContext;

    public BeanCounter(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        int listenerContainerCount = applicationContext.getBeanNamesForType(RedisMessageListenerContainer.class).length;
        int subscriberCount = applicationContext.getBeanNamesForType(RedisSubscriber.class).length;
        int adapterCount = applicationContext.getBeanNamesForType(MessageListenerAdapter.class).length;

        log.warn("=============================================");
        log.warn("!!! Spring Bean 개수 최종 점검 !!!");
        log.warn("RedisMessageListenerContainer 개수: {}", listenerContainerCount);
        log.warn("RedisSubscriber 개수: {}", subscriberCount);
        log.warn("MessageListenerAdapter 개수: {}", adapterCount);
        log.warn("=============================================");
    }
}
