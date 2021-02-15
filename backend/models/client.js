const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 20 },
  phone: { type: String, required: true, minlength: 13, maxlength: 13 },
  notification: { type: String, maxlength: 30 },
  travelData: {
    departureDate: { type: Date },
    departureCity: { type: String },
    arrivalCity: { type: String }
  }
});

module.exports = mongoose.model('Client', clientSchema);
