DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("potion", "medicine", 2, 100),
("super potion", "medicine", 5, 50),
("max potion", "medicine", 20, 5),
("oran berry", "berries", 2, 100),
("sitrus berry", "berries", 3, 70),
("razz berry", "berries", 4, 80),
("ultra ball", "pokect balls", 30, 50),
("premier ball", "pokect balls", 50, 5),
("fire stone", "evolution", 5, 60),
("dusk stone", "evolution", 1, 100),
("dawn stone", "evolution", 1, 100);