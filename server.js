const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
 


app.use(cors({
    origin: ["https://awolfden.github.io/"],
    credentials: true,
    optionsSuccessStatus: 200,
    
}));

app.use(express.static(path.join(__dirname, 'client/build')));

require('./db/db');

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
});

store.on('error', function(error) {
    console.log(error);
});

app.use(session({
    secret: 'worker bee works for me',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: store
}));

const employeeController = require('./controllers/EmployeeController');
const userController = require('./controllers/UserController');


app.use('/employees', employeeController);
app.use('/users', userController);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



app.listen(process.env.PORT || 9001, ()=>{
    console.log('Server is running on port 9001')
});

