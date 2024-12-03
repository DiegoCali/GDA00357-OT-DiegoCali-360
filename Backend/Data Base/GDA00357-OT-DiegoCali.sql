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
-- Adding Data to the Tables
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
