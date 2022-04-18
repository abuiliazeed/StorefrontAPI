/* Create Orders Table*/
/* Create order table that refrence the user id as a refrence as well as order status */
CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(id),
    status VARCHAR(255)
);



