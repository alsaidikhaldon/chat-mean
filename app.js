require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session =  require('express-session');
const cookieParser = require('cookie-parser');






// initialize app with express
const app = express();


// 

// Database cconnection with mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log("datbase is connected ...!");
});
mongoose.connection.on('error', (err) => {
    console.log(" cant creat connection with data base" + err);

});

 
// ************** Middlewares ***************

// Middleware  ----> parser

app.use(bodyParser.json());



// Middleware  ----> cors

app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
  }));

// Middleware  ----> passport
app.use(session({
    name : 'projectSession',
    resave : false,
    saveUninitialized : false,
    secret : 'secret',
    cookie :{ 
        maxAge : 36000000,
        httpOnly : false,
        secure : false
    }
}));
require('./config/passport.config')
app.use(passport.initialize());
app.use(passport.session());





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ************************ set ROUTES ****************************/

// Route requires
const Routes = require('./backend/routes/routes');


// Routes

app.use('/', Routes);




// route test

// app.get('/', (req, res, next) => {
//     res.send('im a first route');

// });


// ... static public folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server ******

const _PORT = process.env.PORT;

app.listen(_PORT, () => {
    console.log(`Server started on port --> ` + _PORT );
});