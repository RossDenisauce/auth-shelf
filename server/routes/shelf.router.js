const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Person = require('../models/Person').Person;

router.get('/', (req, res) => {
    console.log('hit shelf route');
    Person.find({}, function(error, response) {
        if(error) {
            res.sendStatus(500);
        } else {
            res.send(response);
        }
    });
});

module.exports = router;