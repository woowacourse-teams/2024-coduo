package site.coduo.common.config.storage;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;

@Configuration
@Profile("test | prod")
public class DataSourceConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.replica.master")
    public DataSource masterDataSource() {
        return DataSourceBuilder.create()
                .build();
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.replica.slave")
    public DataSource slaveDataSource() {
        return DataSourceBuilder.create()
                .build();
    }

    @Bean
    @DependsOn({"masterDataSource", "slaveDataSource"})
    public DataSource routingDataSource() {
        final DataSourceRouter dataSourceRouter = new DataSourceRouter();
        final DataSource writeDataSource = masterDataSource();
        final DataSource readDataSource = slaveDataSource();
        final Map<Object, Object> dataSourceMap = new HashMap<>();
        dataSourceMap.put(DataSourceRouter.MASTER_TAG, writeDataSource);
        dataSourceMap.put(DataSourceRouter.SLAVE_TAG, readDataSource);

        dataSourceRouter.setTargetDataSources(dataSourceMap);
        dataSourceRouter.setDefaultTargetDataSource(writeDataSource);

        return dataSourceRouter;
    }

    @Bean
    @Primary
    @DependsOn({"routingDataSource"})
    public DataSource dataSource() {
        final DataSource determinedDataSource = routingDataSource();
        return new LazyConnectionDataSourceProxy(determinedDataSource);
    }
}
