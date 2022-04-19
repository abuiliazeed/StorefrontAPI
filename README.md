# Storefront Backend Project

## Description
The online storefront API is able to showcase product. Users able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

## Getting Started
Clone this repo by running the following command
```
git clone https://github.com/abuiliazeed/StorefrontAPI.git
```
go to the project directory by running the following command
```
cd Storefront-API
```
There is two ways to spin up the database:
- First Method is manually creating two databases one for development storefrontdb and another one for testing storefrontdbtest
you can do so by following the following command
```
CREATE DATABASE storefrontdb;
CREATE DATABASE storefrontdbtest;
```
- Second Method : Spinning up a database docker container by running the following command
```
docker-compose up -d
```
run the following command to install all the dependencies
```
npm install
```
You can also populate the database with the usre,product,orders,orderdetails using the following command
```
db-migrate up
```
run the following command to start the Testing for the API endpoints
```
npm run test
```
run the following command to start the server
```
npm start
```
- Now you can navigate to the localhost:3000 to see the server running
- expreminting the API
- I Have made it easy for you i created a postman collection to test the API endpoints
Here is the link:
- https://go.postman.co/workspace/My-Workspace~e724996d-a7b4-413a-8302-e9e078570bfb/collection/5602590-0d6d99fb-c133-4bd9-b4e6-f0bc7045aee4?action=share&creator=5602590

## Server Information
- The API is running on port 3000

## Database Information
- The database is running on port 5432

## Technologies used
- Docker to spin up a postgres docker container preinitialized with two databases one for develeopment and one for testing.
- The application is built using Node/Express
- The database is built using Postgres
- The API is Authenticated using JWT (jasonwebtoken package)
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jasmine from npm for testing

## Software Architecture
- The Database was designed using four tables one for the users, one for the products, one for the orders and one for the order details.
- we seperated the order and order details into two different tables in order to avoid storing multiple products in a single column in the order table.
- instead the orderdetails table stores the product id and the quantity of the product in the order.
- Users can have multiple orders and orders can have multiple orderdetails and orderdetails can have multiple products.
- The API was designed using the Model Controller Route Archticture to make it developer friendly

## API Endpoints
#### Products
- Get All products [token required] >> GET /products
- Get product by id [token required] >> GET /products/:id
- Update product by id [token required] >> PUT /products/:id
- Create product [token required] >> POST /products
- Delete product by id [token required] >> DELETE /products/:id

#### Users
- Get All users [token required] >> GET /users
- Get users by id [token required] >> GET /users/:id
- Update users by id [token required] >> PUT /users/:id
- Create users >> POST /users
- Delete users by id [token required] >> DELETE /users/:id
- Authenticate user >> post /users/authenticate


#### Orders
- Current Order by user (args: user id)[token required] >> GET /orders/current
- Get all orders [token required] >> GET /orders
- Create order [token required] >> POST /orders
- Update order by id [token required] >> PUT /orders/:id

#### Order details
- Get all orderdetails [token required] >> GET /orderdetails
- Create orderdetails [token required] >> POST /orderdetails
- Update orderdetails by id [token required] >> PUT /orderdetails/:id
- Delete orderdetails by id [token required] >> DELETE /orderdetails/:id

## Data Shapes
#### Product
- id: SERIAL PRIMARY KEY
- name: varchar(255)
- price: float4

#### User
- id: SERIAL PRIMARY KEY
- firstName: varchar(255)
- lastName: varchar(255)
- password: varchar(255)

#### Orders
- id: SERIAL PRIMARY KEY
- user_id: integer
- status of order : varchar(255) (active or complete)

#### Order Details
- id: SERIAL PRIMARY KEY
- id of each product in the order : integer
- quantity of each product in the order: integer
- order id: integer

