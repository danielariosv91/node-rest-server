require('./config/config');

const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// import users service
app.use(require('./routes/users'));

// mongoose connect 
mongoose.connect(process.env.URL_DB,
    { useNewUrlParser: true, useCreateIndex: true },
    (error, response) => {
        if (error) throw error;

        console.log('MONGO ONLINE');
    });

app.listen(process.env.PORT, () => {
    console.log('Listen on port: ', process.env.PORT);

})