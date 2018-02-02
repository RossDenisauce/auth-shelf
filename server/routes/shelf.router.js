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
router.post('/:id', (req, res) => {
    if (req.isAuthenticated()) { 
	console.log('data to save: ', req.body);
	// create an instance of our model
    let itemToAdd = new Item(req.body);
    
    Person.findByIdAndUpdate(
        {"_id": req.params.id},
        {$push: {items: itemToAdd} },
        (pusherror, doc) => {
            if (pusherror) {
                console.log('error on push to items array: ', pusherror);
                res.sendStatus(500);
            } else {
                console.log('updated Document: ', doc);
                res.sendStatus(201);
            }
        }
    );
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
      }
}); // end post route

router.delete('/:username/:id', (req, res) => {
    if (req.isAuthenticated()) {
        Person.findOneAndUpdate(
            {"username": req.params.username},
            {$pull: {items: {"_id": req.params.id}} },
            (error, doc) => {
                if (error) {
                    console.log('error on delete from items array: ', error);
                    res.sendStatus(500);
                } else {
                    console.log('deleted Document: ', doc);
                    res.sendStatus(200);
                }
            }
        );
    } else {
        console.log('Error on auth');
        
        // failure best handled on the server. do redirect here.
        res.sendStatus(500);
    }
});

module.exports = router;

