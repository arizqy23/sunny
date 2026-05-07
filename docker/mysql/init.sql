-- Sunny DB Initialization
CREATE DATABASE IF NOT EXISTS sunny_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON sunny_db.* TO 'sunny'@'%';
FLUSH PRIVILEGES;
