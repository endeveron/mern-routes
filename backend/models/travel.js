const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  seatsAmount: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  person: {
    name: { type: String, required: true, maxlength: 20 },
    phone: { type: String, required: true, maxlength: 17 },
    isConfirmed: { type: Boolean, required: true }
  },
  notification: { type: String, maxlength: 30 }
});

const travelSchema = new Schema({
  departureDate: { type: Date, required: true },
  departureCity: { type: String, required: true },
  departurePlace: { type: String, required: true },

  arrivalTime: { type: Date, required: true },
  arrivalCity: { type: String, required: true },
  arrivalPlace: { type: String, required: true },

  seatsAmount: { type: Number, required: true },
  seatsReserved: { type: Number, required: true },
  price: { type: Number, required: true },
  creatorId: { type: String, required: true },

  luggagePrices: { type: [{ type: Number }] },
  promoNotification: { type: String },
  orders: { type: [orderSchema] }
});

module.exports = mongoose.model('Travel', travelSchema);
