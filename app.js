require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const connectDb = require('./db/connectDb');

const errorHandlerMiddleware = require('./middlewares/errorHandler');
const notFoundRouteMiddleware = require('./middlewares/notFoundRoute');
const authenticateUserMiddleware = require('./middlewares/authenticateUser');

const authRoutes = require('./routes/authRoutes');
const buyerRoutes = require('./routes/buyerRoutes');

app.use(express.json());
app.use('/api/auth/',authRoutes);
app.use('/api/buyer/',buyerRoutes);
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