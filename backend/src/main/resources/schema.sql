create table pair_room (
    id bigint not null auto_increment,
    pair1_name varchar(255) not null,
    pair2_name varchar(255) not null,
    access_code varchar(50) not null,
    created_at timestamp not null,
    updated_at timestamp,
    primary key (id),
    unique (access_code)
);
