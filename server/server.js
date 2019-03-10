require('./config/config');

const express = require('express')
const app = express()

const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// resource

app.get('/usuarios', function (request, response) {
    res.json('get usuario')
})

// POST
app.post('/usuarios', function (request, response) {

    let body = request.body;

    if (body.name === undefined) {
        response.status(400).json({
            ok: false,
            message: 'Name is required'
        });
    } else {
        response.json({ body })
    }


})
app.put('/usuarios/:id', function (request, response) {

    let id = request.params.id;

    response.json({
        id
    });
})
app.delete('/usuarios/:id', function (req, res) {
    res.json('delete usuario')
})

app.listen(process.env.PORT, () => {
    console.log('Listen on port: ', process.env.PORT);

})