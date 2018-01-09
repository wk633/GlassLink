const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./userRouter');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user', userRouter);
app.listen(config.SERVER_PORT, ()=>{
    console.log(`Server start at port ${config.SERVER_PORT}`);
})