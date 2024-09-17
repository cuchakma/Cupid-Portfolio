const express = require('express');
const app = express()
const path = require('path');
const cors = require('./config/corsOptions')
const PORT = process.env.PORT || 3500;
const logEvents = require('./eventEmitterModule');

//custom middlewares logger
app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`)
    next();
});


//use cors
app.use(cors.cors());

//form data middleware
app.use(express.urlencoded({extended:false}));

app.use(express.json());

//serve static files like css, images and others
app.use(express.static(path.join(__dirname, '/assets')));
// app.use('/sub-directory',express.static(path.join(__dirname, '/assets')));

//will redirect all request to the routes folder for sub directory
// app.use('/sub-directory', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

//from root directory onwars these routes will be called
app.use('/', require('./routes/root'));

app.listen(PORT, () => {
    console.log(`Running On ${PORT}`);
});