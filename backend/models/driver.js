const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const driverSchema = new Schema({
  code: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phones: { type: Array, required: true }
});

driverSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Driver', driverSchema);
