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
    user_password VARCHAR(60) NULL,
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
    picture VARCHAR(255) NULL
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
INSERT INTO States (state_name) VALUES ('Active')
INSERT INTO States (state_name) VALUES ('Inactive')
GO
-- Create Procedures
-- Procedure to Insert a new User
-- Args: @RoleID, @StateID, @email, @user_name, @user_password, @phone, @birth_date, @creation_date, @CustomerID
CREATE PROCEDURE InsertUser
    @RoleID INT,
    @StateID INT,
    @email VARCHAR(45),
    @user_name VARCHAR(45),
    @user_password VARCHAR(60),
    @phone VARCHAR(45),
    @birth_date DATE,
    -- creation_date would be created automatically
    @CustomerID INT
AS
    INSERT INTO Users (RoleID, StateID, email, user_name, user_password, phone, birth_date, creation_date, CustomerID)
    VALUES (@RoleID, @StateID, @email, @user_name, @user_password, @phone, @birth_date, GETDATE(), @CustomerID)
    SELECT SCOPE_IDENTITY() AS UserID
GO
-- Procedure to Insert a new Customer
CREATE PROCEDURE NewCustomer
    @company_name VARCHAR(45),
    @comercial_name VARCHAR(45),
    @delivery_address VARCHAR(45),
    @phone VARCHAR(45),
    @email VARCHAR(45),
    @CustomerID INT OUTPUT
AS
    SET NOCOUNT ON;
    INSERT INTO Customers (company_name, comercial_name, delivery_address, phone, email)
    VALUES (@company_name, @comercial_name, @delivery_address, @phone, @email)
    SELECT @CustomerID = SCOPE_IDENTITY()
    RETURN;
GO
-- Procedure to Insert a new Product Category
CREATE PROCEDURE InsertProductCategory
    @UserID INT,
    @category_name VARCHAR(45)    
    -- creation_date would be created automatically
AS
    INSERT INTO ProductCategories (UserID, category_name, StateID, creation_date)
    VALUES (@UserID, @category_name, 5, GETDATE())
    SELECT SCOPE_IDENTITY() AS CategoryID
GO
-- Procedure to Insert a new Product
CREATE PROCEDURE InsertProduct
    @CategoryID INT,
    @UserID INT,
    @product_name VARCHAR(45),
    @brand VARCHAR(45),
    @code VARCHAR(45),        
    @price FLOAT,
    @picture VARCHAR(255),
    @initial_stock INT
    -- creation_date would be created automatically    
AS
    INSERT INTO Products (CategoryID, UserID, product_name, brand, code, stock, StateID, price, creation_date, picture)
    VALUES (@CategoryID, @UserID, @product_name, @brand, @code, @initial_stock, 5, @price, GETDATE(), @picture)
    SELECT SCOPE_IDENTITY() AS ProductID
GO
-- Procedure to Insert a new Order
CREATE PROCEDURE InsertOrder
    @user_id INT,
    @order_name NVARCHAR(255),
    @delivery NVARCHAR(255),
    @phone NVARCHAR(20),
    @email NVARCHAR(255),
    @order_details NVARCHAR(MAX) -- JSON containing product details
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        DECLARE @order_id INT, @productId INT, @quantity INT, @price DECIMAL(10, 2), @subtotal DECIMAL(10, 2);
        DECLARE @total_price DECIMAL(10, 2) = 0;

        -- Insert into Orders table
        INSERT INTO Orders (StateID, creation_date, order_name, delivery_address, phone, email, delivery_date, total_price)
        VALUES (2, GETDATE(), @order_name, @delivery, @phone, @email, NULL, 0);

        -- Get the newly created OrderID
        SET @order_id = SCOPE_IDENTITY();

        -- Parse the JSON order details
        DECLARE @details TABLE (
            ProductID INT,
            Quantity INT
        );

        INSERT INTO @details (ProductID, Quantity)
        SELECT 
            ProductID,
            Quantity
        FROM OPENJSON(@order_details)
        WITH (
            ProductID INT '$.id',
            Quantity INT '$.quantity'
        );

        -- Insert each product into OrderDetails
        DECLARE detail_cursor CURSOR FOR
            SELECT ProductID, Quantity FROM @details;

        OPEN detail_cursor;
        FETCH NEXT FROM detail_cursor INTO @productId, @quantity;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Get the price of the product
            SELECT @price = price FROM Products WHERE ProductID = @productId;

            -- Calculate the subtotal
            SET @subtotal = @price * @quantity;

            -- Insert into OrderDetails
            INSERT INTO OrderDetails (OrderID, ProductID, quantity, price, subtotal)
            VALUES (@order_id, @productId, @quantity, @price, @subtotal);

            -- Update the total price
            SET @total_price += @subtotal;            

            FETCH NEXT FROM detail_cursor INTO @productId, @quantity;
        END;

        CLOSE detail_cursor;
        DEALLOCATE detail_cursor;

        -- Update the total price in Orders
        UPDATE Orders
        SET total_price = @total_price
        WHERE OrderID = @order_id;

        COMMIT TRANSACTION;

        -- Return the new OrderID
        SELECT @order_id AS OrderID;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
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
    SELECT SCOPE_IDENTITY() AS OrderDetailID
GO
-- Procedure to insert a user and a customer
CREATE PROCEDURE InsertCustomer
    @email VARCHAR(45),
    @user_name VARCHAR(45),
    @user_password VARCHAR(60),
    @phone VARCHAR(45),
    @birth_date DATE,
    @company_name VARCHAR(45),
    @comercial_name VARCHAR(45),
    @delivery_address VARCHAR(45),
    @phone_customer VARCHAR(45),
    @email_customer VARCHAR(45)
AS
    DECLARE @NewCustomerID INT
    EXEC NewCustomer @company_name, @comercial_name, @delivery_address, @phone_customer, @email_customer,
        @CustomerID = @NewCustomerID OUTPUT;
    EXEC InsertUser 2, 5, @email, @user_name, @user_password, @phone, @birth_date, @NewCustomerID;
GO
-- Procedure to insert an Operator
CREATE PROCEDURE InsertOperator
    @email VARCHAR(45),
    @user_name VARCHAR(45),
    @user_password VARCHAR(60),
    @phone VARCHAR(45),
    @birth_date DATE
AS
    EXEC InsertUser 1, 5, @email, @user_name, @user_password, @phone, @birth_date, NULL;
GO
-- Procedure to Update a User
CREATE PROCEDURE UpdateUser
    @UserID INT,    
    @email VARCHAR(45),
    @user_name VARCHAR(45),
    @user_password VARCHAR(60),
    @phone VARCHAR(45),
    @birth_date DATE
AS
    UPDATE Users
    SET email = @email,
        user_name = @user_name,
        user_password = @user_password,
        phone = @phone,
        birth_date = @birth_date
    WHERE UserID = @UserID
GO
-- Procedure to change the password of a User
CREATE PROCEDURE ChangePassword
    @UserID INT,
    @user_password VARCHAR(60)
AS
    UPDATE Users
    SET user_password = @user_password
    WHERE UserID = @UserID
GO
-- Procedure to Update a Customer
CREATE PROCEDURE UpdateCustomer
    @CustomerID INT,
    @company_name VARCHAR(45),
    @comercial_name VARCHAR(45),
    @delivery_address VARCHAR(45),
    @phone VARCHAR(45),
    @email VARCHAR(45)
AS
    UPDATE Customers
    SET company_name = @company_name,
        comercial_name = @comercial_name,
        delivery_address = @delivery_address,
        phone = @phone,
        email = @email
    WHERE CustomerID = @CustomerID
GO
-- Procedure to Update a Product Category
CREATE PROCEDURE UpdateProductCategory
    @CategoryID INT,
    @category_name VARCHAR(45)
AS
    UPDATE ProductCategories
    SET category_name = @category_name
    WHERE CategoryID = @CategoryID
GO
-- Procedure to Update a Product
CREATE PROCEDURE UpdateProduct
    @ProductID INT,
    @product_name VARCHAR(45),
    @brand VARCHAR(45),
    @code VARCHAR(45),
    @stock INT,
    @price FLOAT,
    @picture VARCHAR(255)
AS
    UPDATE Products
    SET product_name = @product_name,
        brand = @brand,
        code = @code,
        stock = @stock,
        price = @price,
        picture = @picture
    WHERE ProductID = @ProductID
GO
-- Procedure to Update an Order
CREATE PROCEDURE UpdateOrder
    @OrderID INT,
    @order_name VARCHAR(45),
    @delivery_address VARCHAR(45),
    @phone VARCHAR(45),
    @email VARCHAR(45),
    @delivery_date DATE,
    @total_price FLOAT
AS
    UPDATE Orders
    SET order_name = @order_name,
        delivery_address = @delivery_address,
        phone = @phone,
        email = @email,
        delivery_date = @delivery_date,
        total_price = @total_price
    WHERE OrderID = @OrderID
GO
-- Procedure to Update an Order Detail
CREATE PROCEDURE UpdateOrderDetail
    @OrderDetailID INT,
    @quantity INT,
    @price FLOAT,
    @subtotal FLOAT
AS
    UPDATE OrderDetails
    SET quantity = @quantity,
        price = @price,
        subtotal = @subtotal
    WHERE OrderDetailID = @OrderDetailID
GO
-- Procedure to Inactivate a User
CREATE PROCEDURE InactivateUser
    @UserID INT
AS
    UPDATE Users
    SET StateID = 6
    WHERE UserID = @UserID
GO
-- Procedure to Inactivate a Product
CREATE PROCEDURE InactivateProduct
    @ProductID INT
AS
    UPDATE Products
    SET StateID = 6
    WHERE ProductID = @ProductID
GO
-- Procedure to Activate a Product
CREATE PROCEDURE ActivateProduct
    @ProductID INT
AS
    UPDATE Products
    SET StateID = 4
    WHERE ProductID = @ProductID
GO
-- Procedure to Cancel an Order
CREATE PROCEDURE CancelOrder
    @OrderID INT
AS
    UPDATE Orders
    SET StateID = 3
    WHERE OrderID = @OrderID
GO
-- Procedure to Confirm an Order
CREATE PROCEDURE ConfirmOrder
    @OrderID INT
AS    
    -- Get the Order Details (ProductID, Quantity) and save them in a Table,
    -- Generate a pointer and update stock with ProductID and Quantity using UpdateStock function
    -- Wrap all this in a transaction, so that if any of the updates fail, the whole transaction is rolled back
    BEGIN TRANSACTION
        BEGIN TRY
        UPDATE Orders
        SET StateID = 1
        WHERE OrderID = @OrderID
        DECLARE @OrderDTable TABLE
        (
            ProductID INT,
            Quantity INT
        )
        INSERT INTO @OrderDTable
        SELECT ProductID, Quantity
        FROM OrderDTable
        WHERE OrderID = @OrderID
        DECLARE @Pointer INT
        DECLARE @ProductID INT
        DECLARE @Quantity INT
        DECLARE OrderDetailsCursor CURSOR FOR
        SELECT ProductID, Quantity
        FROM @OrderDTable
        OPEN OrderDetailsCursor
        FETCH NEXT FROM OrderDetailsCursor INTO @ProductID, @Quantity
        WHILE @@FETCH_STATUS = 0
        BEGIN
            SET @Quantity = -@Quantity
            EXEC UpdateStock @ProductID, @Quantity
            FETCH NEXT FROM OrderDetailsCursor INTO @ProductID, @Quantity
        END
        CLOSE OrderDetailsCursor
        DEALLOCATE OrderDetailsCursor
    COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW
    END CATCH
GO
-- Procedure to Deliver an Order
CREATE PROCEDURE DeliverOrder
    @OrderID INT
AS
    UPDATE Orders
    SET StateID = 4
    WHERE OrderID = @OrderID
GO
-- Procedure to Set the total price of an Order
CREATE PROCEDURE SetOrder 
    @OrderID INT,
    @total FLOAT
AS 
    UPDATE Orders
    SET total_price = @total
    WHERE OrderID = @OrderID
GO
-- Procedure to Login with email
CREATE PROCEDURE LoginEmail
    @email nvarchar(45)
AS
BEGIN
    SELECT * FROM Users WHERE email = @email
END
GO
-- Procedure to Search User Role
CREATE PROCEDURE SearchUserRole
    @RoleID INT
AS
BEGIN
    SELECT * FROM Roles WHERE RoleID = @RoleID
END
GO
-- Procedure to Update Stock
CREATE PROCEDURE UpdateStock
    @ProductID INT,
    @Quantity INT
AS
BEGIN
    UPDATE Products
    SET Stock = Stock + @Quantity
    WHERE ProductID = @ProductID
END
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
-- Create admin user
EXEC InsertOperator 'operator@mail.com', 'Admin', '123456', '4444-4444', '1990-01-01';
GO
-- Procedure to get products by category
CREATE PROCEDURE GetProductsOfCategory
    @CategoryID INT
AS
BEGIN
    SELECT ProductID, product_name, price, stock, picture
    FROM Products
    WHERE CategoryID = @CategoryID
END
GO