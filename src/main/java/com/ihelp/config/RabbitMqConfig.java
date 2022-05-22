package com.ihelp.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {


    @Value("")
    private String qName;


    @Value("")
    private String exchange;


    @Value("")
    private String routingKey;

    @Bean
    Queue qu() {
        return new Queue(qName, Boolean.FALSE);
    }

    @Bean
    TopicExchange topicExchange() {
        return new TopicExchange(exchange);
    }

    @Bean
    Binding binding(final Queue q, final TopicExchange topicExchange) {
        return BindingBuilder.bind(q).to(topicExchange).with(routingKey);
    }
}