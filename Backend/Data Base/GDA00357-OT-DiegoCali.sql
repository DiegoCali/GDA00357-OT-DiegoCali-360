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
    email VARCHAR(45) NULL,
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
-- Adding Data to the Tables
-- Add Data to the Roles Table
INSERT INTO Roles (role_name) VALUES ('Operator')
INSERT INTO Roles (role_name) VALUES ('Customer')
-- Add Data to the States Table
INSERT INTO States (state_name) VALUES ('Confirmed')
INSERT INTO States (state_name) VALUES ('Pending')
INSERT INTO States (state_name) VALUES ('Cancelled')
INSERT INTO States (state_name) VALUES ('Delivered')
-- Add Data to the Customers Table
INSERT INTO Customers (company_name, comercial_name, delivery_address, phone, email) VALUES (
    'Company1', 'Comercial1', 'Address1', '123456789', 'mymail@mail.com'
)
INSERT INTO Customers (company_name, comercial_name, delivery_address, phone, email) VALUES (
    'Company2', 'Comercial2', 'Address2', '987654321', 'nomail@mail.com'
)
-- Add Data to the Users Table
INSERT INTO Users (RoleID, StateID, email, user_name, user_password, phone, birth_date, creation_date, CustomerID) VALUES (
    1, 1, 'diego@mail.com', 'Diego', '123456', '123456789', '1990-01-01', GETDATE(), NULL
)
INSERT INTO Users (RoleID, StateID, email, user_name, user_password, phone, birth_date, creation_date, CustomerID) VALUES (
    2, 1, 'pablo@mail.com', 'Pablo', '123456', '987654321', '1990-01-01', GETDATE(), 1
)
-- Add Data to the ProductCategories Table
INSERT INTO ProductCategories (UserID, category_name, StateID, creation_date) VALUES (
    1, 'Category1', 1, GETDATE()
)
INSERT INTO ProductCategories (UserID, category_name, StateID, creation_date) VALUES (
    1, 'Category2', 1, GETDATE()
)
-- Add Data to the Products Table
INSERT INTO Products (CategoryID, UserID, product_name, brand, code, stock, StateID, price, creation_date, picture) VALUES (
    1, 1, 'Product1', 'Brand1', '123456', 10, 1, 100.00, GETDATE(), NULL
)
INSERT INTO Products (CategoryID, UserID, product_name, brand, code, stock, StateID, price, creation_date, picture) VALUES (
    2, 1, 'Product2', 'Brand2', '654321', 5, 1, 200.00, GETDATE(), NULL
)
-- Add Data to the Orders Table
INSERT INTO Orders (UserID, StateID, creation_date, order_name, delivery_address, phone, email, delivery_date, total_price) VALUES (
    2, 1, GETDATE(), 'Order1', 'Address1', '123456789', 'lorem@mail.com', '2020-01-01', 300.00
)
INSERT INTO Orders (UserID, StateID, creation_date, order_name, delivery_address, phone, email, delivery_date, total_price) VALUES (
    2, 1, GETDATE(), 'Order2', 'Address2', '987654321', 'ipsum@mail.com', '2020-01-02', 400.00
)
-- Add Data to the OrderDetails Table
INSERT INTO OrderDetails (OrderID, ProductID, quantity, price, subtotal) VALUES (
    1, 1, 2, 100.00, 200.00
)
INSERT INTO OrderDetails (OrderID, ProductID, quantity, price, subtotal) VALUES (
    1, 2, 1, 200.00, 200.00
)
