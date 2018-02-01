const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Person = require('../models/Person').Person;
const Item = require('../models/Person').Item;

router.get('/', (req, res) => {
    console.log('hit shelf route');
    Item.find({}, function(error, response) {
        if(error) {
            res.sendStatus(500);
        } else {
            res.send(response);
        }
    });
});

module.exports = router;