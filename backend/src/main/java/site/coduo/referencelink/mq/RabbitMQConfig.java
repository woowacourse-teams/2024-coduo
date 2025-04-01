package site.coduo.referencelink.mq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${spring.rabbitmq.host}")
    private String rabbitmqHost;

    @Value("${spring.rabbitmq.port}")
    private int rabbitmqPort;

    @Value("${spring.rabbitmq.username}")
    private String rabbitmqUsername;

    @Value("${spring.rabbitmq.password}")
    private String rabbitmqPassword;

    @Value("${rabbitmq.queue.name}")
    private String queueName;

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    @Value("${rabbitmq.dlq.name}")
    private String dlqName;

    @Value("${rabbitmq.dlx.name}")
    private String dlxName;

    @Value("${rabbitmq.dlq.routing.key}")
    private String dlqRoutingKey;

    @Bean
    public Queue deadLetterQueue() {
        return QueueBuilder.durable(dlqName).build();
    }

    @Bean
    public DirectExchange deadLetterExchange() {
        return new DirectExchange(dlxName);
    }

    @Bean
    public Binding deadLetterBinding() {
        return BindingBuilder.bind(deadLetterQueue())
                .to(deadLetterExchange())
                .with(dlqRoutingKey);
    }

    @Bean
    public Queue mainQueue() {
        return QueueBuilder.durable(queueName)
                .deadLetterExchange(dlxName)
                .deadLetterRoutingKey(dlqRoutingKey)
                .build();
    }

    @Bean
    public DirectExchange mainExchange() {
        return new DirectExchange(exchangeName);
    }

    @Bean
    public Binding mainBinding() {
        return BindingBuilder.bind(mainQueue())
                .to(mainExchange())
                .with(routingKey);
    }

    @Bean
    public ConnectionFactory connectionFactory() {
        final CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(rabbitmqHost);
        connectionFactory.setPort(rabbitmqPort);
        connectionFactory.setUsername(rabbitmqUsername);
        connectionFactory.setPassword(rabbitmqPassword);
        return connectionFactory;
    }

    @Bean
    public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }

    @Bean
    public MessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
