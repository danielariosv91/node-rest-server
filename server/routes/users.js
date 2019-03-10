const express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
const app = express()

// resource usuarios
app.get('/usuarios', function (request, response) {

    let from = Number(request.query.from) || 0;
    let limit = Number(request.query.limit) || 5;

    // condicion de filtro. 
    //User.find({google: true})

    // solo usuarios activos { state: true }
    User.find({ state: true }, 'name email role google')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return response.status(400).json({
                    ok: false,
                    err
                })
            }

            User.count({ state: true }, (err, count) => {
                response.json({
                    ok: true,
                    users,
                    count
                })
            });
        })
})

// POST
app.post('/usuarios', function (request, response) {

    let body = request.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((error, userDb) => {
        if (error) {
            return response.status(400).json({
                ok: false,
                error
            })
        }

        response.json({
            ok: true,
            user: userDb
        })
    });

    // if (body.name === undefined) {
    //     response.status(400).json({
    //         ok: false,
    //         message: 'Name is required'
    //     });
    // } else {
    //     response.json({ body })
    // }
})

/**
 * PUT METHOD
 */
app.put('/usuarios/:id', function (request, response) {

    let id = request.params.id;
    let body = _.pick(request.body, ['name', 'email', 'img', 'role', 'state']);

    // Ineficiente
    // delete body.password;

    let options = {
        new: true,
        runValidators: true
    }

    User.findByIdAndUpdate(id, body, options, (error, userDb) => {
        if (error) {
            return response.status(400).json({
                ok: false,
                error
            })
        }

        response.json({
            ok: true,
            user: userDb
        });
    })

})
app.delete('/usuarios/:id', function (request, response) {
    let id = request.params.id;
    let options = {
        state: false
    }

    // borrado fisicamente en la base de datos 
    //User.findByIdAndRemove(id, (err, deletedUser) => {
    User.findByIdAndUpdate(id, options, { new: true }, (err, deletedUser) => {
        if (err) {
            return response.status(400).json({
                ok: false,
                err
            })
        }

        if (!deletedUser) {
            return response.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            })
        }

        response.json({
            ok: true,
            user: deletedUser
        });
    })
})

module.exports = app;