/* Create orderdetails table*/
CREATE TABLE IF NOT EXISTS orderdetails(
    id SERIAL PRIMARY KEY,
    orderid INTEGER REFERENCES orders(id),
    productid INTEGER REFERENCES products(id),
    quantity INTEGER
);
