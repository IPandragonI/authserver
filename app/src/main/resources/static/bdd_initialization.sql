CREATE TABLE IF NOT EXISTS client
(
    id          INT AUTO_INCREMENT,
    name        VARCHAR(255),
    realm_id    INT,
    company_id  INT,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS role
(
    id          INT AUTO_INCREMENT,
    name        VARCHAR(255),
    description TEXT,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS plan
(
    id          INT AUTO_INCREMENT,
    name        VARCHAR(255),
    description TEXT,
    price       DECIMAL(10, 2),
    max_users   INT  DEFAULT 0,
    max_realms  INT  DEFAULT 0,
    features    TEXT DEFAULT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS company
(
    id                   INT AUTO_INCREMENT,
    name                 VARCHAR(255),
    description          TEXT,
    domain               VARCHAR(255),
    email                VARCHAR(255),
    phone                VARCHAR(50),
    address              TEXT,
    city                 VARCHAR(100),
    state                VARCHAR(100),
    country              VARCHAR(100),
    postal_code          VARCHAR(20),
    website              VARCHAR(255),
    enabled              BOOLEAN,
    verified             BOOLEAN,
    sso_enabled          BOOLEAN,
    subscription_status  VARCHAR(50),
    trial_ends_at        DATETIME,
    subscription_ends_at DATETIME,
    logo_url             VARCHAR(500),
    siret                VARCHAR(14),
    vat                  VARCHAR(20),
    plan_id              INT NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE (email),
    FOREIGN KEY (plan_id) REFERENCES plan (id)
);

CREATE TABLE IF NOT EXISTS user
(
    id          INT AUTO_INCREMENT,
    username    VARCHAR(255) NOT NULL,
    email       VARCHAR(255),
    firstname   VARCHAR(255),
    lastname    VARCHAR(255),
    password    VARCHAR(255) NOT NULL,
    verified_at DATETIME,
    company_id  INT,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE (username),
    UNIQUE (email),
    FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE IF NOT EXISTS realm
(
    id          INT AUTO_INCREMENT,
    name        VARCHAR(50) NOT NULL,
    description TEXT,
    enabled     BOOLEAN,
    company_id  int         NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE IF NOT EXISTS user_realm
(
    realm_id    INT,
    user_id     INT,
    added_at    DATETIME,
    last_access DATETIME,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (realm_id, user_id),
    FOREIGN KEY (realm_id) REFERENCES realm (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE IF NOT EXISTS user_role
(
    role_id     INT,
    user_id     INT,
    assigned_at DATETIME,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, user_id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE IF NOT EXISTS user_session
(
    user_id       INT,
    realm_id      INT,
    id            INT AUTO_INCREMENT,
    session_token VARCHAR(512) NOT NULL,
    refresh_token VARCHAR(512),
    ip            VARCHAR(45),
    ua            TEXT,
    expires_at    DATETIME     NOT NULL,
    revoked       BOOLEAN,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (realm_id) REFERENCES realm (id)
);

CREATE TABLE IF NOT EXISTS audit_log
(
    id          INT AUTO_INCREMENT,
    action      VARCHAR(255),
    description TEXT,
    ip          VARCHAR(45),
    ua          TEXT,
    realm_id    INT,
    user_id     INT,
    PRIMARY KEY (id),
    FOREIGN KEY (realm_id) REFERENCES realm (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO role (name, description)
VALUES ('ADMIN', 'Realm administrator with elevated privileges'),
       ('SUPER_ADMIN', 'System-wide administrator with highest privileges'),
       ('REALM_ADMIN', 'Realm owner and manager'),
       ('USER', 'Standard user with limited access');

INSERT INTO plan (name, description, price, max_users, max_realms, features)
VALUES ('Free', 'Basic plan with limited features', 0.00, 3, 1, 'Basic support, Limited analytics'),
       ('Pro', 'Professional plan with advanced features', 29.99, 10, 5, 'Advanced analytics, Priority support'),
       ('Enterprise', 'Enterprise plan with full features and support', 99.99, 100, 50,
        'Dedicated account manager, Custom integrations');