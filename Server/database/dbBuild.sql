BEGIN;

    DROP TABLE IF EXISTS users,address , bill , provider
    cascade;

DROP TYPE IF EXISTS providerType
cascade;

DROP EXTENSION
IF EXISTS "uuid-ossp"
    cascade;

-- Add Jerusalem Time Zone
set TIMEZONE
='Asia/Jerusalem';

-- create extension to user uuid_generate_v4 ()
-- https://www.postgresqltutorial.com/postgresql-uuid/

CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

--------------------------------------------------
CREATE TYPE providerType AS ENUM
('electricity', 'water', 'internet', 'communication');

CREATE TABLE address
(
    id SERIAL PRIMARY KEY NOT NULL,
    gid uuid DEFAULT uuid_generate_v4 (),
    city VARCHAR(50) NOT NULL,
    town VARCHAR(50) NOT NULL
);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    gid uuid DEFAULT uuid_generate_v4 (),
    --gid uuid NOT NULL DEFAULT uuid_generate_v4 (),
    display_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    personal_status VARCHAR(100) NOT NULL,
    number_of_Individuals INTEGER NOT NULL,
    address_id INTEGER NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address (id),
    number_of_devices INTEGER NOT NULL,
    password TEXT NOT NULL,
    email_active boolean,
    reset_password_code VARCHAR(100)
);

CREATE TABLE provider
(
    id SERIAL PRIMARY KEY NOT NULL,
    gid uuid DEFAULT uuid_generate_v4 (),
    Name VARCHAR(100) NOT NULL ,
    type_supported providerType
    [],
    address VARCHAR
    (100) NOT NULL ,
    email VARCHAR
    (100) NOT NULL,
    phone1 VARCHAR
    (30) ,
    phone2 VARCHAR
    (30) ,
    phone3 VARCHAR
    (30) ,
    po_Box INTEGER
);

    CREATE TABLE bill
    (
        id SERIAL PRIMARY KEY NOT NULL,
        gid uuid DEFAULT uuid_generate_v4 (),
        users_id INTEGER NOT NULL,
        FOREIGN KEY (users_id) REFERENCES users (id),
        provider_id INTEGER NOT NULL,
        FOREIGN KEY (provider_id) REFERENCES provider(id),
        type providerType,
        total_amount FLOAT NOT NULL,
        bill_DATE TIMESTAMP ,
        due_DATE TIMESTAMP ,
        start_DATE TIMESTAMP ,
        end_DATE TIMESTAMP,
        bill_Number INTEGER NOT NULL
    );

    COMMIT;
