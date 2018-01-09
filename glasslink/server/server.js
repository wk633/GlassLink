const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/', (req, res)=>{
    res.send('Hello World!');
})
app.listen(config.SERVER_PORT, ()=>{
    console.log(`Server start at port ${config.SERVER_PORT}`);
})