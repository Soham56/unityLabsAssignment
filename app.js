require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Connect to the database with provided MONGO_URI
const connectDb = require('./db/connectDb');

//Error Handler Middleware
const errorHandlerMiddleware = require('./middlewares/errorHandler');
//Not found Route Middleware
const notFoundRouteMiddleware = require('./middlewares/notFoundRoute');
//Authenticate User Middlware
const authenticateUserMiddleware = require('./middlewares/authenticateUser');
//Verify a buyer user
const verifyBuyerMiddleware = require('./middlewares/verifyBuyer');
//Verify a seller user
const verifySellerMiddleware = require('./middlewares/verifySeller');

const authRoutes = require('./routes/authRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const sellersRoutes = require('./routes/sellersRoutes');

//Connecting all middlewares
app.use(express.json());
app.use('/api/auth/',authRoutes);
app.use('/api/buyer/',[authenticateUserMiddleware,verifyBuyerMiddleware,buyerRoutes]);
app.use('/api/seller/',[authenticateUserMiddleware,verifySellerMiddleware,sellersRoutes]);
app.use(errorHandlerMiddleware);
app.use(notFoundRouteMiddleware);

const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port http://localhost:${PORT}/`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();