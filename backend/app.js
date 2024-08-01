const express = require('express');
const app = express();
const user = require('./router/user'); 
require('dotenv').config();
const book = require('./router/book');
const favourites = require('./router/favBook');
const cart = require('./router/cart');
const orders = require('./router/order');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json("hello backend");
});

app.use('/', user);
app.use('/book', book);
app.use('/favourites', favourites);
app.use('/cart', cart);
app.use('/orders', orders);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
