show databases;

CREATE DATABASE MI_BILLING_APP_DB; 

USE MI_BILLING_APP_DB;

CREATE TABLE area(
	area_id SMALLINT NOT NULL,
    area_name VARCHAR(32) NOT NULL
);

INSERT INTO area VALUES
(01, 'GOPI NATH BAZAAR'),
(02, 'MALVIYA NAGAR'),
(03, 'Jail Rd'),
(01, 'Express Rd'),
(02, 'Maal RD');

SELECT * FROM AREA;

-- +---------+------------------+
-- | area_id | area_name        |
-- +---------+------------------+
-- |       1 | GOPI NATH BAZAAR |
-- |       2 | MALVIYA NAGAR    |
-- |       3 | Jail Rd          |
-- |       1 | Express Rd       |
-- |       2 | Maal RD          |
-- +---------+------------------+

CREATE TABLE City(
	city_id CHAR(3) PRIMARY KEY,
    city_name VARCHAR(32) NOT NULL
);

INSERT INTO city VALUES
('DLH','Delhi'),
('KNP','Kanpur'),
('BNG','Banglore'),
('TRV', 'Trivandrum'),
('HYD', 'Hyderabad')
;

CREATE TABLE Storetype(
	store_type VARCHAR(32) UNIQUE NOT NULL
);

INSERT INTO Storetype VALUES
('MI Homes'), ('MI Studios'), ('MI Authorised');

CREATE TABLE Store(
	store_id INT PRIMARY KEY,
    store_name VARCHAR(32) NOT NULL,
    pincode INT  NOT NULL,
    store_type VARCHAR(32),
    CONSTRAINT fk_StoretypeStore FOREIGN KEY(store_type) REFERENCES Storetype(store_type)
);

INSERT INTO Store VALUES
(1, 'MI STORE 1', '123456', 'MI Homes'),
(2, 'MI STORE 2', '121212', 'MI Studios'),
(3, 'MI STORE 3', '121213', 'MI Authorised'),
(4, 'MI STORE 4', '121214', 'MI Homes'),
(5, 'MI STORE 5', '121215', 'MI Studios'),
(6, 'MI STORE 6', '121216', 'MI Authorised');

SELECT * FROM Store;

-- +----------+------------+---------+---------------+
-- | store_id | store_name | pincode | store_type    |
-- +----------+------------+---------+---------------+
-- |        1 | MI STORE 1 |  123456 | MI Homes      |
-- |        2 | MI STORE 2 |  121212 | MI Studios    |
-- |        3 | MI STORE 3 |  121213 | MI Authorised |
-- |        4 | MI STORE 4 |  121214 | MI Homes      |
-- |        5 | MI STORE 5 |  121215 | MI Studios    |
-- |        6 | MI STORE 6 |  121216 | MI Authorised |
-- +----------+------------+---------+---------------+

CREATE TABLE POS(
	pos_id CHAR(16) PRIMARY KEY,
    city_id CHAR(3),
    area_id SMALLINT,
    machine_id SMALLINT,
    store_id INT,
    CONSTRAINT fk_CityPOS FOREIGN KEY(city_id) REFERENCES City(city_id),
    CONSTRAINT fk_StorePOS FOREIGN KEY(store_id) REFERENCES Store(store_id)
);

INSERT INTO POS VALUES
('KNP_01_01_2@3DRF', 'KNP', 01, 01, 1),
('KNP_01_02_2@3DRF', 'KNP', 01, 02, 1),
('KNP_02_01_9DSN0K', 'KNP', 02, 01, 1),
('DLH_01_01_3SDK34', 'DLH', 01, 01, 4),
('DLH_01_02_3SDK34', 'DLH', 01, 02, 4),
('DLH_02_01_NSDKLN', 'DLH', 02, 01, 2), 
('DLH_02_02_3SDK34', 'DLH', 02, 02, 2),
;

SELECT * FROM POS Natural Join City Natural Join Store;

-- +----------+---------+------------------+---------+------------+-----------+------------+---------+------------+
-- | store_id | city_id | pos_id           | area_id | machine_id | city_name | store_name | pincode | store_type |
-- +----------+---------+------------------+---------+------------+-----------+------------+---------+------------+
-- |        4 | DLH     | DLH_01_01_3SDK34 |       1 |          1 | Delhi     | MI STORE 4 |  121214 | MI Homes   |
-- |        4 | DLH     | DLH_01_02_3SDK34 |       1 |          2 | Delhi     | MI STORE 4 |  121214 | MI Homes   |
-- |        2 | DLH     | DLH_02_01_NSDKLN |       2 |          1 | Delhi     | MI STORE 2 |  121212 | MI Studios |
-- |        2 | DLH     | DLH_02_02_3SDK34 |       2 |          2 | Delhi     | MI STORE 2 |  121212 | MI Studios |
-- |        1 | KNP     | KNP_01_01_2@3DRF |       1 |          1 | Kanpur    | MI STORE 1 |  123456 | MI Homes   |
-- |        1 | KNP     | KNP_01_02_2@3DRF |       1 |          2 | Kanpur    | MI STORE 1 |  123456 | MI Homes   |
-- |        1 | KNP     | KNP_02_01_9DSN0K |       2 |          1 | Kanpur    | MI STORE 1 |  123456 | MI Homes   |
-- +----------+---------+------------------+---------+------------+-----------+------------+---------+------------+

CREATE TABLE operator(
	username VARCHAR(32) Primary Key,
    first_name VARCHAR(32),
    second_name VARCHAR(32),
    password VARCHAR(108) NOT NULL,
    dob TIMESTAMP NOT NULL,
    gender CHAR(1),
    aadhar_no BIGINT NOT NULL,
    total_transacions INT DEFAULT 0,
    join_date TIMESTAMP NOT NULL,
    nationality VARCHAR(32),
    city VARCHAR(32),
    pincode INT,
    pos_id CHAR(16),
    CONSTRAINT chk_gender CHECK (gender in ('M', 'F')),
    CONSTRAINT fk_POSOperator FOREIGN KEY(pos_id) REFERENCES POS(pos_id)
);

INSERT INTO operator VALUES
('operator1', 'Asim', 'Junaid', '$2b$08$FxEftJWgCkuPnKgbn3Zf.OWi8e6xwW.eDEIg2nN/A/Ztor7zf64.m', '1995-05-05  00:00:00', 'M', 123456789102, 7, '2022-05-05  00:00:00', 'Indian', 'Kanpur', 123445, 'KNP_01_01_2@3DRF'),
('operator2', 'Lisa', 'George','$2b$08$A0s8.ZqNX9zmizsS1Fgew.K7iwl/XpoJoHyy1fMaoHWaxqCYwjYju', '1996-05-05  00:00:00', 'F', 123456789103, 12, '2022-01-05  00:00:00', 'Indian', 'Hyderabad', 123446, 'DLH_02_02_3SDK34'),
('operator3', 'John', 'Cena', '$2b$08$yD3ETloUau3m6x5Iu6EC4OrHj4fFPAGBSYN.cERD4nHtbFRQ7irji', '1997-05-05  00:00:00', 'M', 123456789104, 56, '2022-02-05  00:00:00', 'Indian', 'Mumbai', 123447, 'DLH_02_01_NSDKLN'),
('operator4', 'Visa', 'Morgh', '$2b$08$Y6BWf.kxHh4cHj084n8B4.CApb.V26.L2ZYWoYNM36BZd3vabcZuS', '1998-05-05  00:00:00', 'F', 123456789105, 12, '2022-04-05  00:00:00', 'Indian', 'Banglore', 123448, 'KNP_02_01_9DSN0K'),
('operator5', 'Arman', 'Nawaz', '$2b$08$1NqkQOJla7P6HCkLSz8irO4iWm.W93oAAa2N5m3D/Ro6LZcEpvssq', '1999-05-05  00:00:00', 'M', 123456789106, 45, '2022-05-05  00:00:00', 'Indian', 'Amethi', 123449, 'KNP_01_02_2@3DRF'),
('operator6', 'Great', 'Khali', '$2b$08$muraffNmCZZtiv70CHNOfOvQzbUCkBF1e9Jvsoo.eFzkag92ov4he', '2001-05-05  00:00:00', 'M', 123456789107, 19, '2022-08-05  00:00:00', 'Indian', 'Chennai', 122449, 'DLH_01_01_3SDK34'),
('operator7', 'Dell', 'Inspiron', '$2b$08$OgUN/DIyrfzY7kqpW216zOVpMZuRYrEKnTGVvOAXb7uK1p1dgoFDa', '2002-05-05  00:00:00', 'M', 123456789108, 10, '2022-08-05  00:00:00', 'Indian', 'Chennai', 122449, 'DLH_01_02_3SDK34');


SELECT * FROM operator;

-- +-----------+------------+-------------+--------------------------------------------------------------+---------------------+--------+--------------+-------------------+---------------------+-------------+-----------+---------+------------------+
-- | username  | first_name | second_name | password                                                     | dob                 | gender | aadhar_no    | total_transacions | join_date           | nationality | city      | pincode | pos_id           |
-- +-----------+------------+-------------+--------------------------------------------------------------+---------------------+--------+--------------+-------------------+---------------------+-------------+-----------+---------+------------------+
-- | operator1 | Asim       | Junaid      | $2b$08$FxEftJWgCkuPnKgbn3Zf.OWi8e6xwW.eDEIg2nN/A/Ztor7zf64.m | 1995-05-05 00:00:00 | M      | 123456789102 |                 7 | 2022-05-05 00:00:00 | Indian      | Kanpur    |  123445 | KNP_01_01_2@3DRF |
-- | operator2 | Lisa       | George      | $2b$08$A0s8.ZqNX9zmizsS1Fgew.K7iwl/XpoJoHyy1fMaoHWaxqCYwjYju | 1996-05-05 00:00:00 | F      | 123456789103 |                12 | 2022-01-05 00:00:00 | Indian      | Hyderabad |  123446 | DLH_02_02_3SDK34 |
-- | operator3 | John       | Cena        | $2b$08$yD3ETloUau3m6x5Iu6EC4OrHj4fFPAGBSYN.cERD4nHtbFRQ7irji | 1997-05-05 00:00:00 | M      | 123456789104 |                56 | 2022-02-05 00:00:00 | Indian      | Mumbai    |  123447 | DLH_02_01_NSDKLN |
-- | operator4 | Visa       | Morgh       | $2b$08$Y6BWf.kxHh4cHj084n8B4.CApb.V26.L2ZYWoYNM36BZd3vabcZuS | 1998-05-05 00:00:00 | F      | 123456789105 |                12 | 2022-04-05 00:00:00 | Indian      | Banglore  |  123448 | KNP_02_01_9DSN0K |
-- | operator5 | Arman      | Nawaz       | $2b$08$1NqkQOJla7P6HCkLSz8irO4iWm.W93oAAa2N5m3D/Ro6LZcEpvssq | 1999-05-05 00:00:00 | M      | 123456789106 |                45 | 2022-05-05 00:00:00 | Indian      | Amethi    |  123449 | KNP_01_02_2@3DRF |
-- | operator6 | Great      | Khali       | $2b$08$muraffNmCZZtiv70CHNOfOvQzbUCkBF1e9Jvsoo.eFzkag92ov4he | 2001-05-05 00:00:00 | M      | 123456789107 |                19 | 2022-08-05 00:00:00 | Indian      | Chennai   |  122449 | DLH_01_01_3SDK34 |
-- | operator7 | Dell       | Inspiron    | $2b$08$OgUN/DIyrfzY7kqpW216zOVpMZuRYrEKnTGVvOAXb7uK1p1dgoFDa | 2002-05-05 00:00:00 | M      | 123456789108 |                10 | 2022-08-05 00:00:00 | Indian      | Chennai   |  122449 | DLH_01_02_3SDK34 |
-- +-----------+------------+-------------+--------------------------------------------------------------+---------------------+--------+--------------+-------------------+---------------------+-------------+-----------+---------+------------------+

CREATE TABLE Customer(
	cus_ph BIGINT PRIMARY KEY,
    cus_name VARCHAR(32),
    email VARCHAR(32) NOT NULL UNIQUE,
    shopped_amt BIGINT Default 0
);


INSERT INTO Customer VALUES
(1234567890, 'Customer 1', 'customer1@email.com', 1200),
(1234567891, 'Customer 2', 'customer2@email.com', 12000),
(1234567893, 'Customer 3', 'customer3@email.com', 13000),
(1234567894, 'Customer 4', 'customer4@email.com', 2000),
(1234567895, 'Customer 5', 'customer5@email.com', 12000);


CREATE TABLE Category(
	category_name VARCHAR(32) PRIMARY KEY
);

CREATE TABLE Product(
	product_id SMALLINT PRIMARY KEY,
    product_name VARCHAR(64) NOT NULL,
    category_name VARCHAR(32) NOT NULL,
    cost INT NOT NULL,
    CONSTRAINT fk_categoryProduct FOREIGN KEY(category_name) REFERENCES Category(category_name)
);

INSERT INTO Category Values
('Laptop'), ('Smart Phone'), ('Power Bank'), ('Smart Watch');

INSERT INTO Product Values
(1, 'Xioami 12 Pro 5G', 'Smart Phone', 62999),
(2, 'Mi NoteBook Pro Win 11', 'Laptop', 59999),
(3, 'Xiaomi 11i 5G', 'Smart Phone', 21999),
(4, 'Xiaomi 11i Hypercharge 5G', 'Smart Phone', 23999),
(5, 'Redmi Smart Band Pro', 'Smart Watch', 3999);

SELECT * FROM Product;

-- +------------+---------------------------+---------------+-------+
-- | product_id | product_name              | category_name | cost  |
-- +------------+---------------------------+---------------+-------+
-- |          1 | Xioami 12 Pro 5G          | Smart Phone   | 62999 |
-- |          2 | Mi NoteBook Pro Win 11    | Laptop        | 59999 |
-- |          3 | Xiaomi 11i 5G             | Smart Phone   | 21999 |
-- |          4 | Xiaomi 11i Hypercharge 5G | Smart Phone   | 23999 |
-- |          5 | Redmi Smart Band Pro      | Smart Watch   |  3999 |
-- +------------+---------------------------+---------------+-------+

CREATE TABLE Stock(
	serial_no CHAR(12) PRIMARY KEY,
	product_id SMALLINT,
    pos_id CHAR(16),
    CONSTRAINT fk_stockPos FOREIGN KEY(pos_id) REFERENCES pos(pos_id)
);

INSERT INTO Stock VALUES
('00000000001', 1, 'DLH_01_01_3SDK34'),
('00000000002', 1, 'DLH_01_02_3SDK34'),
('00000000003', 1, 'DLH_02_01_NSDKLN'),
('00000000004', 1, 'DLH_02_02_3SDK34'),
('00000000005', 1, 'KNP_01_01_2@3DRF'),
('00000000006', 1, 'KNP_01_02_2@3DRF'),
('00000000007', 1, 'KNP_02_01_9DSN0K'),
('00000000008', 1, 'DLH_01_01_3SDK34'),
('00000000009', 1, 'DLH_01_01_3SDK34'),
('00000000010', 1, 'DLH_01_01_3SDK34'),
('00000000012', 1, 'DLH_01_02_3SDK34'),
('00000000013', 1, 'DLH_02_01_NSDKLN'),
('00000000014', 1, 'DLH_02_02_3SDK34'),
('00000000015', 1, 'KNP_01_01_2@3DRF'),
('00000000016', 1, 'KNP_01_02_2@3DRF'),
('00000000017', 2, 'KNP_02_01_9DSN0K'),
('00000000018', 2, 'DLH_01_01_3SDK34'),
('00000000019', 2, 'DLH_01_01_3SDK34'),
('00000000020', 2, 'DLH_01_01_3SDK34'),
('00000000022', 2, 'DLH_01_02_3SDK34'),
('00000000023', 2, 'DLH_02_01_NSDKLN'),
('00000000024', 2, 'DLH_02_02_3SDK34'),
('00000000025', 2, 'KNP_01_01_2@3DRF'),
('00000000026', 2, 'KNP_01_02_2@3DRF'),
('00000000027', 2, 'KNP_02_01_9DSN0K')
;

Select serial_no, product_name, store_name, city_name from Stock Natural Join Product Natural Join pos Natural Join store NATURAL JOIN city order by store_name, serial_no;
-- +-------------+------------------------+------------+-----------+
-- | serial_no   | product_name           | store_name | city_name |
-- +-------------+------------------------+------------+-----------+
-- | 00000000005 | Xioami 12 Pro 5G       | MI STORE 1 | Kanpur    |
-- | 00000000006 | Xioami 12 Pro 5G       | MI STORE 1 | Kanpur    |
-- | 00000000007 | Xioami 12 Pro 5G       | MI STORE 1 | Kanpur    |
-- | 00000000015 | Xioami 12 Pro 5G       | MI STORE 1 | Kanpur    |
-- | 00000000016 | Xioami 12 Pro 5G       | MI STORE 1 | Kanpur    |
-- | 00000000017 | Mi NoteBook Pro Win 11 | MI STORE 1 | Kanpur    |
-- | 00000000025 | Mi NoteBook Pro Win 11 | MI STORE 1 | Kanpur    |
-- | 00000000026 | Mi NoteBook Pro Win 11 | MI STORE 1 | Kanpur    |
-- | 00000000027 | Mi NoteBook Pro Win 11 | MI STORE 1 | Kanpur    |
-- | 00000000003 | Xioami 12 Pro 5G       | MI STORE 2 | Delhi     |
-- | 00000000004 | Xioami 12 Pro 5G       | MI STORE 2 | Delhi     |
-- | 00000000013 | Xioami 12 Pro 5G       | MI STORE 2 | Delhi     |
-- | 00000000014 | Xioami 12 Pro 5G       | MI STORE 2 | Delhi     |
-- | 00000000023 | Mi NoteBook Pro Win 11 | MI STORE 2 | Delhi     |
-- | 00000000024 | Mi NoteBook Pro Win 11 | MI STORE 2 | Delhi     |
-- | 00000000001 | Xioami 12 Pro 5G       | MI STORE 4 | Delhi     |
-- | 00000000002 | Xioami 12 Pro 5G       | MI STORE 4 | Delhi     |
-- | 00000000008 | Xioami 12 Pro 5G       | MI STORE 4 | Delhi     |
-- | 00000000009 | Xioami 12 Pro 5G       | MI STORE 4 | Delhi     |
-- | 00000000010 | Xioami 12 Pro 5G       | MI STORE 4 | Delhi     |
-- | 00000000012 | Xioami 12 Pro 5G       | MI STORE 4 | Delhi     |
-- | 00000000018 | Mi NoteBook Pro Win 11 | MI STORE 4 | Delhi     |
-- | 00000000019 | Mi NoteBook Pro Win 11 | MI STORE 4 | Delhi     |
-- | 00000000020 | Mi NoteBook Pro Win 11 | MI STORE 4 | Delhi     |
-- | 00000000022 | Mi NoteBook Pro Win 11 | MI STORE 4 | Delhi     |
-- +-------------+------------------------+------------+-----------+

CREATE TABLE Warranty(
	warranty_id SMALLINT PRIMARY KEY,
    warranty_name VARCHAR(32) NOT NULL,
    warranty_type VARCHAR(32) NOT NULL,
    available_until TIMESTAMP,
    days_valid INT NOT NULL,
    CHECK (warranty_type IN ('MI OFFICIAL', 'THIRD PARTY'))
);

INSERT INTO 
Warranty(warranty_id, warranty_type, warranty_name, available_until, days_valid)
VALUES
(1, 'MI OFFICIAL', 'MI One Year', NULL, 365),
(2, 'MI OFFICIAL', 'MI Two Year', NULL, 730),
(3, 'THIRD PARTY', 'ABC One Year', '2025-01-01 00:00:00', 365),
(4, 'MI OFFICIAL', 'MI Quarterly', '2026-01-01 00:00:00', 90)
;

CREATE TABLE Product_warranty(
	product_id SMALLINT,
    warranty_id SMALLINT,
    price INT DEFAULT 0, 
    CONSTRAINT PRIMARY KEY(product_id, warranty_id)
);

INSERT INTO Product_warranty VALUES
(1, 1, 0),
(1, 2, 1000),
(1, 3, 0),
(1, 4, 1000),
(2, 3, 0),
(2, 1, 0),
(2, 4, 2000)
;

Select product_id, product_name, warranty_name, days_valid, price From product_warranty Natural Join product Natural Join warranty;

-- +------------+------------------------+---------------+------------+-------+
-- | product_id | product_name           | warranty_name | days_valid | price |
-- +------------+------------------------+---------------+------------+-------+
-- |          1 | Xioami 12 Pro 5G       | MI One Year   |        365 |     0 |
-- |          1 | Xioami 12 Pro 5G       | MI Two Year   |        730 |  1000 |
-- |          1 | Xioami 12 Pro 5G       | ABC One Year  |        365 |     0 |
-- |          1 | Xioami 12 Pro 5G       | MI Quarterly  |         90 |  1000 |
-- |          2 | Mi NoteBook Pro Win 11 | MI One Year   |        365 |     0 |
-- |          2 | Mi NoteBook Pro Win 11 | ABC One Year  |        365 |     0 |
-- |          2 | Mi NoteBook Pro Win 11 | MI Quarterly  |         90 |  2000 |
-- +------------+------------------------+---------------+------------+-------+

CREATE TABLE Transaction(
	transaction_id VARCHAR(64) PRIMARY KEY,
    cus_ph BIGINT,
    amount INT,
    items INT,
    pos_id CHAR(16),
    status BOOL,
    CONSTRAINT check (status IN (TRUE, FALSE)),
    CONSTRAINT fk_transactionPOS FOREIGN KEY(pos_id) REFERENCES pos(pos_id)
);

Alter table operator RENAME COLUMN total_transacions to total_transactions;

SET SQL_SAFE_UPDATES = 0;

Update operator SET total_transactions = 1 where 1 = 1;

select pos_id, first_name, second_name, total_transactions from pos natural join operator;

-- +------------------+------------+-------------+--------------------+
-- | pos_id           | first_name | second_name | total_transactions |
-- +------------------+------------+-------------+--------------------+
-- | KNP_01_01_2@3DRF | Asim       | Junaid      |                  1 |
-- | KNP_01_02_2@3DRF | Arman      | Nawaz       |                  1 |
-- | KNP_02_01_9DSN0K | Visa       | Morgh       |                  1 |
-- | DLH_02_01_NSDKLN | John       | Cena        |                  1 |
-- | DLH_02_02_3SDK34 | Lisa       | George      |                  1 |
-- | DLH_01_01_3SDK34 | Great      | Khali       |                  1 |
-- | DLH_01_02_3SDK34 | Dell       | Inspiron    |                  1 |
-- +------------------+------------+-------------+--------------------+

ALTER TABLE stock ADD COLUMN SOLD BOOL DEFAULT FALSE;

CREATE TABLE Bill(
	transaction_id VARCHAR(64),
    cus_ph BIGINT,
    serial_no CHAR(12),
    date TIMESTAMP,
    pos_id CHAR(16) NOT NULL,
    CONSTRAINT FOREIGN KEY(transaction_id) References transaction(transaction_id),
    CONSTRAINT FOREIGN KEY(cus_ph) REFERENCES Customer(cus_ph),
    CONSTRAINT FOREIGN KEY(pos_id) references pos(pos_id),
    CONSTRAINT PRIMARY KEY(transaction_id) 
);

CREATE TABLE active_warranty(
	serial_no CHAR(12),
    cus_ph BIGINT,
    warranty_id SMALLINT,
    valid_until TIMESTAMP,
    CONSTRAINT FOREIGN KEY(serial_no) REFERENCES Stock(serial_no),
    CONSTRAINT FOREIGN KEY(warranty_id) REFERENCES warranty(warranty_id),
    CONSTRAINT FOREIGN KEY(cus_ph) references customer(cus_ph)
);


ALTER TABLE area ADD COLUMN city_id CHAR(3) NOT NULL;
UPDATE area SET city_id = 'DLH';
UPDATE area SET city_id = 'KNP' where area_name = 'Express Rd' OR area_name = 'Maal RD';

ALTER TABLE transaction ADD COLUMN date TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP);
ALTER TABLE operator RENAME COLUMN total_transactions TO total_items_billed;
SET autocommit = 1;

ALTER TABLE transaction ADD COLUMN offline_payment BOOL DEFAULT FALSE;
ALTER TABLE transaction ADD COLUMN discount INT DEFAULT 0;
ALTER TABLE bill DROP COLUMN transaction_id;
ALTER TABLE bill ADD COLUMN transaction_id VARCHAR(64);
ALTER TABLE active_warrranty ADD CONSTRAINT unique(serial_no);
ALTER TABLE stock ADD COLUMN store_id INT;
ALTER TABLE stock ADD CONSTRAINT FOREIGN KEY (store_id) REFERENCES store(store_id);
SELECT * FROM stock;
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'DLH_01_01_3SDK34') where pos_id = 'DLH_01_01_3SDK34';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'DLH_01_02_3SDK34') where pos_id = 'DLH_01_02_3SDK34';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'DLH_02_01_NSDKLN') where pos_id = 'DLH_02_01_NSDKLN';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'DLH_02_02_3SDK34') where pos_id = 'DLH_02_02_3SDK34';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'KNP_01_01_2@3DRF') where pos_id = 'KNP_01_01_2@3DRF';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'KNP_01_02_2@3DRF') where pos_id = 'KNP_01_02_2@3DRF';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'KNP_02_01_9DSN0K') where pos_id = 'KNP_02_01_9DSN0K';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'DLH_02_01_NSDKLN') where pos_id = 'DLH_02_01_NSDKLN';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'DLH_02_02_3SDK34') where pos_id = 'DLH_02_02_3SDK34';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'KNP_01_01_2@3DRF') where pos_id = 'KNP_01_01_2@3DRF';
UPDATE stock set store_id = (SELECT store_id FROM pos WHERE pos_id = 'KNP_01_02_2@3DRF') where pos_id = 'KNP_01_02_2@3DRF';
select * from transaction;

ALTER TABLE stock DROP CONSTRAINT fk_stockPos;
ALTER TABLE transaction ADD CONSTRAINT FOREIGN KEY(transaction_id) REFERENCES BILL(transaction_id);
Select * from transaction order by transaction_id desc;

