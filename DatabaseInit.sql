CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	id INT AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(25) NOT NULL,
    department VARCHAR(25) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER(10) NOT NULL,
    totalSales DECIMAL(10,2) NOT NULL DEFAULT 0;
);

INSERT INTO products(product, department, price, quantity)
VALUES('couch', 'furniture', 350, 17),
	('desk', 'furniture', 80, 6),
	('laptop', 'electronics', 500, 60),
	('knife', 'kitchen', 35, 16),
	('whisk', 'kitchen', 3, 7),
	('lamp', 'home', 25, 23),
	('stool', 'furniture', 30, 33),
	('speaker', 'electronics', 15, 18),
	('TV', 'electronics', 350, 46),
    ('scented candle', 'home', 3.5, 16),
    ('carcassonne', 'games', 40, 5),
    ('catan', 'games', 35, 8),
    ('bananas', 'groceries', 0.35, 150),
    ('raspberries', 'groceries', 0.03, 500),
    ('cantaloupe', 'groceries', 1.5, 49);

CREATE TABLE departments(
	department_id INT AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(45) NOT NULL
);

INSERT INTO departments(department) 
VALUES('groceries'),
	('furniture'),
	('electronics'),
	('games'),
	('home'),
	('kitchen');

SELECT * FROM products;
SELECT * FROM departments;