package site.coduo.referencelink.mq;

import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.referencelink.repository.OpenGraphEntity;
import site.coduo.referencelink.service.OpenGraphService;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;

@Slf4j
@Service
@RequiredArgsConstructor
public class MQService {

    private final RabbitTemplate rabbitTemplate;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final OpenGraphService openGraphService;

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;
    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    public void sendMessage(final ReferenceLinkMQMessageDto referenceLinkMQMessageDto) {
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                rabbitTemplate.convertAndSend(exchangeName, routingKey, referenceLinkMQMessageDto);
            }
        });
    }

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void receiveMessage(final ReferenceLinkMQMessageDto message) {
        openGraphService.crawlOpenGraph(message.url(), message.openGraphId());

        final String accessCode = message.pairRoomEntity().getAccessCode();
        final String destination = "/topic/" + accessCode + "/reference-link";

        final List<OpenGraphEntity> openGraphEntities = openGraphService.findAllByPairRoomEntity(
                message.pairRoomEntity());
        final List<ReferenceLinkResponse> response = ReferenceLinkResponse.from(openGraphEntities);
        simpMessagingTemplate.convertAndSend(destination, response);
    }
}
