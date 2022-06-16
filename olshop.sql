-- Category Table

CREATE TABLE tb_category(
    id VARCHAR(255) PRIMARY KEY,
    category VARCHAR(255),
    image TEXT
);

-- Add createdAt and UpdatedAt

ALTER TABLE
    tb_category
ADD
    COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
AFTER
    image;

ALTER TABLE
    tb_category
ADD
    COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
AFTER
    createdAt;

-- Add column isActive on tb_category

ALTER TABLE
    tb_category
ADD
    COLUMN isActive ENUM('active', 'inactive')
AFTER
    image;