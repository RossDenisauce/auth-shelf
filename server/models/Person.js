const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema

const ItemsSchema = new Schema({
  description: {type: String, required: true},
  image_url:  String
});


const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  item: [ItemsSchema]
});


module.exports = {
  Person: mongoose.model('Person', PersonSchema),
  Item: mongoose.model('Item', ItemsSchema)
};
