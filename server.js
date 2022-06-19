//Dependencies
const express = require('express');
const mongoose = require('mongoose');

//Initialize the Express App 
const app = express();

//Comfigure app Settings
require('dotenv').config();

const {PORT  = 4000, MONGODB_URL} = process.env;

//Connect to mongoDB
mongoose.connect(MONGODB_URL);

//Mongo Status listeners
const db = mongoose.connection
db.on('connected', () => console.log('Connected ot MongoDb'));
db.on('Error',  (err) => console.log('Error with MongoDb: ' + err.message))

//Mount MiddleWare

//Mount Routes
app.get('/', (req, res) => {
    res.send('hello World')
})

//Tell Express to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
})