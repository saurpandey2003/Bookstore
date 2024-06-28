const express = require('express');
const app = express();
const user = require('./router/user'); 
require('dotenv').config();
const book=require('./router/book')
const favourites=require('./router/favBook')
const cart=require("./router/cart")
const orders=require('./router/order')

app.use(express.json()); // Use express.json() for JSON parsing

// Route for the root endpoint
app.get('/', (req, res) => {
    res.status(200).json("hello backend");
});


// Route for user-related endpoints
app.use('/', user);
app.use('/book',book);
app.use('/favourites',favourites);
app.use('/cart',cart);
app.use('/orders',orders);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
