package site.coduo.referencelink.mq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DLQConsumer {

    @RabbitListener(queues = "${rabbitmq.dlq.name}")
    public void processDeadLetter(final ReferenceLinkMQMessageDto message) {
        log.error("크롤링 중 에러 발생: {}", message);
    }
}
