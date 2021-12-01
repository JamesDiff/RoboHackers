PRODUCTS
Must have title, description, price, and inventory quantity Must belong to at least one category If there is no photo, there must be a placeholder photo used

table: products
id ID
title VARCHAR(255)
description VARCHAR(255)
price INTEGER 
inventory_qty INTEGER
"category_id" FK -> categories table 
img_url VARCHAR(255)
img_url_placeholder VARCHAR

USERS
Users must have a valid email address Users email must be unique

table: users
id ID
firstname VARCHAR
lastname VARCHAR
password ENCRYPTED VARCHAR
email VARCHAR UNIQUE
street VARCHAR
city VARCHAR
state VARCHAR
zip VARCHAR
phone VARCHAR

users_orders


ORDER
Orders must belong to a user OR guest session (authenticated vs unauthenticated) Orders must contain line items that capture the price, current product ID and quantity If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

table: orders
id ID
"userId" FK users
"line
total_price INTEGER
orderStatus VARCHAR


orders_product
id ID
"orderId" FK orders
"productId" FK products
priceAtTime Integer

REVIEWS
All reviews must belong to a product All reviews must belong to a user All reviews must be at least X characters

table: reviews
Id ID
"productId" FK products
"userId" FK user
review VARCHAR(255)