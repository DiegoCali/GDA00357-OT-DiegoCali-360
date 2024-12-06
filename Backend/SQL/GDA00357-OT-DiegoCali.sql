-- Create a new database called 'D360'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'D360'
)
CREATE DATABASE D360
GO
-- Use the D360 database
USE D360
GO
-- Create the table for Roles
CREATE TABLE Roles
(
    RoleID INT PRIMARY KEY IDENTITY NOT NULL,
    role_name VARCHAR(45) NULL
)
GO
-- Create the table for States
CREATE TABLE States
(
    StateID INT PRIMARY KEY IDENTITY NOT NULL,
    state_name VARCHAR(45) NULL
)
GO
-- Create the table for Customers
CREATE TABLE Customers
(
    CustomerID INT PRIMARY KEY IDENTITY NOT NULL,
    company_name VARCHAR(45) NULL,
    comercial_name VARCHAR(45) NULL,
    delivery_address VARCHAR(45) NULL,
    phone VARCHAR(45) NULL,
    email VARCHAR(45) NULL
)
GO 
-- Create the table for Users
CREATE TABLE Users
(
    UserID INT PRIMARY KEY IDENTITY NOT NULL,
    RoleID INT NOT NULL FOREIGN KEY REFERENCES Roles(RoleID),
    StateID INT NOT NULL FOREIGN KEY REFERENCES States(StateID),
    email VARCHAR(45) NULL,
    user_name VARCHAR(45) NULL,
    user_password VARCHAR(45) NULL,
    phone VARCHAR(45) NULL,
    birth_date DATE NULL,
    creation_date DATETIME NULL,    
    CustomerID INT NULL FOREIGN KEY REFERENCES Customers(CustomerID)
)
GO
-- Create the table for Products Categories
CREATE TABLE ProductCategories
(
    CategoryID INT PRIMARY KEY IDENTITY NOT NULL,
    UserID INT NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    category_name VARCHAR(45) NULL,
    StateID INT NOT NULL FOREIGN KEY REFERENCES States(StateID),
    creation_date DATETIME NULL
)
GO
-- Create the table for Products
CREATE TABLE Products
(
    ProductID INT PRIMARY KEY IDENTITY NOT NULL,
    CategoryID INT NOT NULL FOREIGN KEY REFERENCES ProductCategories(CategoryID),
    UserID INT NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    product_name VARCHAR(45) NULL,
    brand VARCHAR(45) NULL,
    code VARCHAR(45) NULL,
    stock INT NULL,
    StateID INT NOT NULL FOREIGN KEY REFERENCES States(StateID),
    price FLOAT NULL,
    creation_date DATETIME NULL,
    picture BINARY NULL
)
GO
-- Create the table for Orders
CREATE TABLE Orders
(
    OrderID INT PRIMARY KEY IDENTITY NOT NULL,
    UserID INT NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    StateID INT NOT NULL FOREIGN KEY REFERENCES States(StateID),
    creation_date DATETIME NULL,
    order_name VARCHAR(45) NULL,
    delivery_address VARCHAR(45) NULL,
    phone VARCHAR(45) NULL,
    email VARCHAR(45) NULL,
    delivery_date DATE NULL,
    total_price FLOAT NULL
)
GO
-- Create the table for Order Details
CREATE TABLE OrderDetails
(
    OrderDetailID INT PRIMARY KEY IDENTITY NOT NULL,
    OrderID INT NOT NULL FOREIGN KEY REFERENCES Orders(OrderID),
    ProductID INT NOT NULL FOREIGN KEY REFERENCES Products(ProductID),
    quantity INT NULL,
    price FLOAT NULL,
    subtotal FLOAT NULL
)
GO
-- Adding Basic Data
-- Add Data to the Roles Table
INSERT INTO Roles (role_name) VALUES ('Operator')
INSERT INTO Roles (role_name) VALUES ('Customer')
GO
-- Add Data to the States Table
INSERT INTO States (state_name) VALUES ('Confirmed')
INSERT INTO States (state_name) VALUES ('Pending')
INSERT INTO States (state_name) VALUES ('Cancelled')
INSERT INTO States (state_name) VALUES ('Delivered')
INSERT INTO States (state_name) VALUES ('Inactivated')
GO
-- Create Procedures
-- Procedure to Insert a new User
-- Args: @RoleID, @StateID, @email, @user_name, @user_password, @phone, @birth_date, @creation_date, @CustomerID
CREATE PROCEDURE InsertUser
    @RoleID INT,
    @StateID INT,
    @email VARCHAR(45),
    @user_name VARCHAR(45),
    @user_password VARCHAR(45),
    @phone VARCHAR(45),
    @birth_date DATE,
    @creation_date DATETIME,
    @CustomerID INT
AS
    INSERT INTO Users (RoleID, StateID, email, user_name, user_password, phone, birth_date, creation_date, CustomerID)
    VALUES (@RoleID, @StateID, @email, @user_name, @user_password, @phone, @birth_date, @creation_date, @CustomerID)
GO
-- Procedure to Insert a new Customer
CREATE PROCEDURE InsertCustomer
    @company_name VARCHAR(45),
    @comercial_name VARCHAR(45),
    @delivery_address VARCHAR(45),
    @phone VARCHAR(45),
    @email VARCHAR(45)
AS
    INSERT INTO Customers (company_name, comercial_name, delivery_address, phone, email)
    VALUES (@company_name, @comercial_name, @delivery_address, @phone, @email)
GO
-- Procedure to Insert a new Product Category
CREATE PROCEDURE InsertProductCategory
    @UserID INT,
    @category_name VARCHAR(45),
    @StateID INT,
    @creation_date DATETIME
AS
    INSERT INTO ProductCategories (UserID, category_name, StateID, creation_date)
    VALUES (@UserID, @category_name, @StateID, @creation_date)
GO
-- Procedure to Insert a new Product
CREATE PROCEDURE InsertProduct
    @CategoryID INT,
    @UserID INT,
    @product_name VARCHAR(45),
    @brand VARCHAR(45),
    @code VARCHAR(45),
    @stock INT,
    @StateID INT,
    @price FLOAT,
    @creation_date DATETIME,
    @picture BINARY
AS
    INSERT INTO Products (CategoryID, UserID, product_name, brand, code, stock, StateID, price, creation_date, picture)
    VALUES (@CategoryID, @UserID, @product_name, @brand, @code, @stock, @StateID, @price, @creation_date, @picture)
GO
-- Procedure to Insert a new Order
CREATE PROCEDURE InsertOrder
    @UserID INT,
    @StateID INT,
    @creation_date DATETIME,
    @order_name VARCHAR(45),
    @delivery_address VARCHAR(45),
    @phone VARCHAR(45),
    @email VARCHAR(45),
    @delivery_date DATE,
    @total_price FLOAT
AS
    INSERT INTO Orders (UserID, StateID, creation_date, order_name, delivery_address, phone, email, delivery_date, total_price)
    VALUES (@UserID, @StateID, @creation_date, @order_name, @delivery_address, @phone, @email, @delivery_date, @total_price)
GO
-- Procedure to Insert a new Order Detail
CREATE PROCEDURE InsertOrderDetail
    @OrderID INT,
    @ProductID INT,
    @quantity INT,
    @price FLOAT,
    @subtotal FLOAT
AS
    INSERT INTO OrderDetails (OrderID, ProductID, quantity, price, subtotal)
    VALUES (@OrderID, @ProductID, @quantity, @price, @subtotal)
GO
-- Procedure to Inactivate a Product
CREATE PROCEDURE InactivateProduct
    @ProductID INT
AS
    UPDATE Products
    SET StateID = 5
    WHERE ProductID = @ProductID
GO
-- Views
-- View to get all active products that are above 0 in stock
CREATE VIEW [ActiveProducts]
AS
    SELECT *
    FROM Products
    WHERE StateID = 1 AND stock > 0
GO
-- View to get total of orders in August 2024
CREATE VIEW [TotalOrdersAugust2024]
AS
    SELECT COUNT(*)
    FROM Orders
    WHERE YEAR(creation_date) = 2024 AND MONTH(creation_date) = 8
GO
-- View to get the top 10 clients with the highest total price in orders in all history
CREATE VIEW [Top10Clients]
AS
    SELECT TOP 10
        c.CustomerID,
        c.company_name,
        c.comercial_name,
        SUM(o.total_price) AS total_price
    FROM Customers c
    JOIN Users u ON c.CustomerID = u.CustomerID
    JOIN Orders o ON u.UserID = o.UserID
    GROUP BY c.CustomerID, c.company_name, c.comercial_name
    ORDER BY total_price DESC
GO
-- View to get top 10 products most sold in all history
CREATE VIEW [Top10Products]
AS
    SELECT TOP 10
        p.ProductID,
        p.product_name,
        p.brand,
        SUM(od.quantity) AS total_sold
    FROM Products p
    JOIN OrderDetails od ON p.ProductID = od.ProductID
    GROUP BY p.ProductID, p.product_name, p.brand
    ORDER BY total_sold DESC
GO
-- Base Data
-- Add Data to the Customers Table
EXEC InsertCustomer 'Company 1', 'Comercial 1', 'Address 1', '123456789', 'lorem@mail.com'
EXEC InsertCustomer 'Company 2', 'Comercial 2', 'Address 2', '987654321', 'ipsum@mail.com'
EXEC InsertCustomer 'Company 3', 'Comercial 3', 'Address 3', '111222333', 'dolor@mail.com'
EXEC InsertCustomer 'Company 4', 'Comercial 4', 'Address 4', '444555666', 'sit@mail.com'
EXEC InsertCustomer 'Company 5', 'Comercial 5', 'Address 5', '777888999', 'amet@mail.com'
EXEC InsertCustomer 'Company 6', 'Comercial 6', 'Address 6', '000111222', 'consectetur@mail.com'
EXEC InsertCustomer 'Company 7', 'Comercial 7', 'Address 7', '333444555', 'adipiscing@mail.com'
EXEC InsertCustomer 'Company 8', 'Comercial 8', 'Address 8', '666777888', 'elit@mail.com'
EXEC InsertCustomer 'Company 9', 'Comercial 9', 'Address 9', '999000111', 'sed@mail.com'
EXEC InsertCustomer 'Company 10', 'Comercial 10', 'Address 10', '222333444', 'do@mail.com'
EXEC InsertCustomer 'Company 11', 'Comercial 11', 'Address 11', '555666777', 'eiusmod@mail.com'
EXEC InsertCustomer 'Company 12', 'Comercial 12', 'Address 12', '888999000', 'tempor@mail.com'
EXEC InsertCustomer 'Company 13', 'Comercial 13', 'Address 13', '111222333', 'incididunt@mail.com'
EXEC InsertCustomer 'Company 14', 'Comercial 14', 'Address 14', '444555666', 'ut@mail.com'
EXEC InsertCustomer 'Company 15', 'Comercial 15', 'Address 15', '777888999', 'labore@mail.com'
GO
-- Add Data to the Users Table
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 1, 1, 'operator1@mail.com', 'Operator One', 'password1', '1234567890', '1980-01-01', @DATE, NULL
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 1, 1, 'operator2@mail.com', 'Operator Two', 'password2', '2345678901', '1981-02-02', @DATE, NULL
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 1, 1, 'operator3@mail.com', 'Operator Three', 'password3', '3456789012', '1982-03-03', @DATE, NULL
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 1, 1, 'operator4@mail.com', 'Operator Four', 'password4', '4567890123', '1983-04-04', @DATE, NULL
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 1, 1, 'operator5@mail.com', 'Operator Five', 'password5', '5678901234', '1984-05-05', @DATE, NULL
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer1@mail.com', 'Customer One', 'password6', '6789012345', '1985-06-06', @DATE, 1
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer2@mail.com', 'Customer Two', 'password7', '7890123456', '1986-07-07', @DATE, 2
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer3@mail.com', 'Customer Three', 'password8', '8901234567', '1987-08-08', @DATE, 3
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer4@mail.com', 'Customer Four', 'password9', '9012345678', '1988-09-09', @DATE, 4
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer5@mail.com', 'Customer Five', 'password10', '0123456789', '1989-10-10', @DATE, 5
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer6@mail.com', 'Customer Six', 'password11', '1234509876', '1990-11-11', @DATE, 6
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer7@mail.com', 'Customer Seven', 'password12', '2345610987', '1991-12-12', @DATE, 7
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer8@mail.com', 'Customer Eight', 'password13', '3456721098', '1992-01-13', @DATE, 8
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer9@mail.com', 'Customer Nine', 'password14', '4567832109', '1993-02-14', @DATE, 9
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer10@mail.com', 'Customer Ten', 'password15', '5678943210', '1994-03-15', @DATE, 10
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer11@mail.com', 'Customer Eleven', 'password16', '6789054321', '1995-04-16', @DATE, 11
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer12@mail.com', 'Customer Twelve', 'password17', '7890165432', '1996-05-17', @DATE, 12
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer13@mail.com', 'Customer Thirteen', 'password18', '8901276543', '1997-06-18', @DATE, 13
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer14@mail.com', 'Customer Fourteen', 'password19', '9012387654', '1998-07-19', @DATE, 14
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertUser 2, 1, 'customer15@mail.com', 'Customer Fifteen', 'password20', '0123498765', '1999-08-20', @DATE, 15
GO
-- Add Data to the ProductCategories Table
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertProductCategory 1, 'Category 1', 1, @DATE
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertProductCategory 1, 'Category 2', 1, @DATE
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertProductCategory 1, 'Category 3', 1, @DATE
GO
-- Add Data to the Products Table
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertProduct 1, 1, 'Product 1', 'Brand 1', 'Code 1', 100, 1, 100.00, @DATE, NULL
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertProduct 1, 1, 'Product 2', 'Brand 2', 'Code 2', 200, 1, 200.00, @DATE, NULL
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertProduct 1, 1, 'Product 3', 'Brand 3', 'Code 3', 300, 1, 300.00, @DATE, NULL
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertProduct 2, 1, 'Product 4', 'Brand 4', 'Code 4', 400, 1, 400.00, @DATE, NULL
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertProduct 2, 1, 'Product 5', 'Brand 5', 'Code 5', 500, 1, 500.00, @DATE, NULL
GO
-- Add Data to the Orders Table
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 6, 1, @DATE, 'Order 2', 'Address 2', '2345678901', 'ipsum@mail.com', '2024-08-02', 200.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 7, 1, @DATE, 'Order 3', 'Address 3', '3456789012', 'dolor@mail.com', '2024-08-03', 300.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 8, 1, @DATE, 'Order 4', 'Address 4', '4567890123', 'sit@mail.com', '2024-08-04', 400.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 9, 1, @DATE, 'Order 5', 'Address 5', '5678901234', 'amet@mail.com', '2024-08-05', 500.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 10, 1, @DATE, 'Order 6', 'Address 6', '6789012345', 'consectetur@mail.com', '2024-08-06', 600.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 11, 1, @DATE, 'Order 7', 'Address 7', '7890123456', 'adipiscing@mail.com', '2024-08-07', 700.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 12, 1, @DATE, 'Order 8', 'Address 8', '8901234567', 'elit@mail.com', '2024-08-08', 800.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 13, 1, @DATE, 'Order 9', 'Address 9', '9012345678', 'sed@mail.com', '2024-08-09', 900.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 14, 1, @DATE, 'Order 10', 'Address 10', '0123456789', 'do@mail.com', '2024-08-10', 1000.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 15, 1, @DATE, 'Order 11', 'Address 11', '1234509876', 'eiusmod@mail.com', '2024-08-11', 1100.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 6, 1, @DATE, 'Order 12', 'Address 12', '2345610987', 'tempor@mail.com', '2024-07-01', 1200.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 7, 1, @DATE, 'Order 13', 'Address 13', '3456721098', 'incididunt@mail.com', '2024-07-02', 1300.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 8, 1, @DATE, 'Order 14', 'Address 14', '4567832109', 'ut@mail.com', '2024-07-03', 1400.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 9, 1, @DATE, 'Order 15', 'Address 15', '5678943210', 'labore@mail.com', '2024-07-04', 1500.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 10, 1, @DATE, 'Order 16', 'Address 16', '6789054321', 'et@mail.com', '2024-07-05', 1600.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 11, 1, @DATE, 'Order 17', 'Address 17', '7890165432', 'dolore@mail.com', '2024-07-06', 1700.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 12, 1, @DATE, 'Order 18', 'Address 18', '8901276543', 'magna@mail.com', '2024-07-07', 1800.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 13, 1, @DATE, 'Order 19', 'Address 19', '9012387654', 'aliqua@mail.com', '2024-07-08', 1900.00
GO
DECLARE @DATE DATETIME = GETDATE()
EXEC InsertOrder 14, 1, @DATE, 'Order 20', 'Address 20', '0123498765', 'ut@mail.com', '2024-07-09', 2000.00
GO
-- Add Data to the OrderDetails Table
EXEC InsertOrderDetail 1, 1, 1, 100.00, 100.00
EXEC InsertOrderDetail 2, 2, 2, 200.00, 400.00
EXEC InsertOrderDetail 3, 3, 3, 300.00, 900.00
EXEC InsertOrderDetail 4, 4, 4, 400.00, 1600.00
EXEC InsertOrderDetail 5, 5, 5, 500.00, 2500.00
EXEC InsertOrderDetail 6, 1, 1, 100.00, 100.00
EXEC InsertOrderDetail 7, 2, 2, 200.00, 400.00
EXEC InsertOrderDetail 8, 3, 3, 300.00, 900.00
EXEC InsertOrderDetail 9, 4, 4, 400.00, 1600.00
EXEC InsertOrderDetail 10, 5, 5, 500.00, 2500.00
EXEC InsertOrderDetail 11, 1, 1, 100.00, 100.00
EXEC InsertOrderDetail 12, 2, 2, 200.00, 400.00
EXEC InsertOrderDetail 13, 3, 3, 300.00, 900.00
EXEC InsertOrderDetail 14, 4, 4, 400.00, 1600.00
EXEC InsertOrderDetail 15, 5, 5, 500.00, 2500.00
EXEC InsertOrderDetail 16, 1, 1, 100.00, 100.00
EXEC InsertOrderDetail 17, 2, 2, 200.00, 400.00
EXEC InsertOrderDetail 18, 3, 3, 300.00, 900.00
EXEC InsertOrderDetail 19, 4, 4, 400.00, 1600.00
EXEC InsertOrderDetail 20, 5, 5, 500.00, 2500.00
GO
-- Inactivate a Product
EXEC InactivateProduct 1
GO
-- Select Views
SELECT * FROM ActiveProducts
GO
SELECT * FROM TotalOrdersAugust2024
GO
SELECT * FROM Top10Clients
GO
SELECT * FROM Top10Products
GO