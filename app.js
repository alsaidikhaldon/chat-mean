require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');



// initialize app with express
const app = express();


// Database cconnection with mongoose

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log("datbase is connected ...!");
});
mongoose.connection.on('error', (err) => {
    console.log(" cant creat connection with data base" + err);

});


// Middlewares 

app.use(bodyParser.json());



// set ROUTES *****

// Route requires
const Routes = require('./backend/routes/routes');


// Routes

app.use('/', Routes);
//app.use('/signup', UserRoutes);




// route test

app.get('/', (req, res, next) => {
    res.send('im a first route');

});









// ... static public folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server ******

const _PORT = process.env.PORT;

app.listen(_PORT, () => {
    console.log(`Server started on port`);
});