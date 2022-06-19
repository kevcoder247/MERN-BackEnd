//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan');

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
db.on('Error',  (err) => console.log('Error with MongoDb: ' + err.message));


//Set up our model
const peopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
}, {timestamps: true});

const People = mongoose.model('People', peopleSchema)

//Mount MiddleWare
app.use(cors()); //Access-Control-Allow
app.use(morgan('dev'));
app.use(express.json())//this  creates req.body from incoming JSON
//only when wxpress is serving html
 //app.use(express.urlencoded({extended: false}))

//Mount Routes=============================================>
app.get('/', (req, res) => {
    res.send('hello World')
})

//INDEX
app.get('/people', async (req, res) => {
    try{
        //gets information from the data base
        // const people = await People.find({});
        //sends information to the user
        // res.send(people);

        //Another way to do it on one line
        res.json(await People.find({}))
    } catch (error){
        console.log('error:', error);
        res.json({error: 'something went wrong- check console'})
    }
})
//Non async awaits, what we learned previously
// app.get('/people', (req, res) => {
//     People.find({}, (err, people) => {
//         res.send(people)
//     })
// })

//CREATE
app.post('/people', async (req, res) =>{
    try {
       res.json(await People.create(req.body));
    } catch (error) {
        console.log('error:' , error);
        res.json({error: 'something happened- check the console'});
    }
})

//UPDATE
app.put('/people/:id', async(req, res) => {
    try {
       res.json(await People.findByIdAndUpdate(
       req.params.id, 
       req.body, 
       {new: true}
       )); 
    } catch (error) {
       console.log('error', error);
       res.json({error: 'Something went wron in - check console'}); 
    }
})

//DELETE
app.delete('/people/:id', async (req, res) => {
    try {
        res.json(await People.findByIdAndDelete(req.params.id));
    } catch (error) {
        
    }
})

//Tell Express to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
})