package site.coduo.common.config.storage;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

public class DataSourceRouter extends AbstractRoutingDataSource {

    public static final String MASTER_TAG = "writer";
    public static final String SLAVE_TAG = "reader";

    @Override
    protected Object determineCurrentLookupKey() {
        return TransactionSynchronizationManager.isCurrentTransactionReadOnly() ? SLAVE_TAG : MASTER_TAG;
    }
}
