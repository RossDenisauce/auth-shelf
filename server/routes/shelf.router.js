const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Person = require('../models/Person').Person;
const Item = require('../models/Person').Item;


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

// POST route
router.post('/', (req, res) => {
	console.log('data to save: ', req.body);
	// create an instance of our model
	let itemToAdd = new newData(req.body);

	// create a new Document in our database and collection
	itemToAdd.save( (error, saveditem) => {
		if (error) {
			console.log('error on save: ', error);
			res.sendStatus(500);
		} else {
			console.log('new swapi Document: ', saveditem);
			res.sendStatus(201);
		}
	}); // end save

}); // end post route

module.exports = router;