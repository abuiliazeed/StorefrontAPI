# API Documentation
The online storefront API is able to showcase product. Users able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.

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
