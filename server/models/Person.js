const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema

const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});


const ItemsSchema = new Schema({
  description: {type: String, required: true},
  placer: [PersonSchema],
  image_url:  String
})



module.exports = mongoose.model('Person', PersonSchema);
