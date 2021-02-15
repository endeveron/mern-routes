const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passengerSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 20 },
  phone: { type: String, required: true, minlength: 13, maxlength: 13 },
  password: { type: String, required: true, minlength: 6, maxlength: 8 },
});

passengerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Passenger', passengerSchema);
