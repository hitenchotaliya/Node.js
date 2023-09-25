
const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 8000;
const cookieparser = require("cookie-parser");
var bodyParser = require('body-parser');
require("./src/DB/config");
require("dotenv").config();


app.use(express.static(__dirname + '/src/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieparser());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'hbs');


const router = require('./src/Routes/route');
app.use('/', router);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);   
});