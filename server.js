//Dependencies
const express = require('express');

//Initialize the Express App 
const app = express();

//Comfigure app Settings
require('dotenv').config();

const {PORT  = 4000, MONGODB_URL} = process.env.PORT;

//Mount MiddleWare

//Mount Routes
app.get('/', (req, res) => {
    res.send('hello World')
})

//Tell Express to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
})