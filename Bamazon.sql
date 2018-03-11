CREATE DATABASE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Express','Chevrolet',37.19,63),
('California','Ferrari',55.81,68),
('Elise','Lotus',22.72,6),
('Cougar','Mercury',84.95,42),
('Lancer','Mitsubishi',72.87,80),
('Venza','Toyota',20.82,53),
('Firebird','Pontiac',77.07,82),
('Outback','Subaru',34.40,18),
('S-Class','Mercedes-Benz',93.64,14),
('Aero 8','Morgan',91.29,96),
('CL-Class','Mercedes-Benz',87.86,41),
('Azera','Hyundai',48.58,18),
('G-Class','Mercedes-Benz',70.23,70),
('Edge','Ford',33.67,80),
('E350','Ford',57.20,22),
('G3','Pontiac',32.88,38),
('Supra','Toyota',94.75,54),
('LaCrosse','Buick',16.50,42),
('Ram Wagon B150','Dodge',40.62,76),
('F-Series','Ford',5.47,40),
('SL-Class','Mercedes-Benz',26.95,48),
('Golf','Volkswagen',42.92,86),
('Sierra','GMC',10.17,87),
('Yukon','GMC',82.62,68),
('LeMans','Pontiac',91.60,82);
