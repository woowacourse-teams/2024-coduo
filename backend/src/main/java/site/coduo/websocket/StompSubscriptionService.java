package site.coduo.websocket;

import java.util.Optional;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.broker.SimpleBrokerMessageHandler;
import org.springframework.messaging.simp.broker.SubscriptionRegistry;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

@Service
public class StompSubscriptionService {

    private final ApplicationContext applicationContext;
    private SubscriptionRegistry subscriptionRegistry;

    public StompSubscriptionService(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        final SimpleBrokerMessageHandler simpleBrokerMessageHandler = applicationContext.getBean(
                SimpleBrokerMessageHandler.class);
        this.subscriptionRegistry = simpleBrokerMessageHandler.getSubscriptionRegistry();
    }

    public boolean hasSubscription(final String destination) {
        if (subscriptionRegistry == null) {
            return false;
        }
        final SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create();
        headerAccessor.setDestination(destination);
        final Message<?> message = MessageBuilder.createMessage(Optional.empty(), headerAccessor.getMessageHeaders());
        final MultiValueMap<String, String> subscriptions = subscriptionRegistry.findSubscriptions(message);
        return subscriptions.isEmpty();
    }
}
