const { Schema, Model } = require('mongoose');

const invoiceSchema = new Schema({
  date: { type: Schema.Types.Date },
  from: {
    logo: String,
    name: String,
    address: String,
    email: String,
    id: Number,
  },
  to: {
    name: String,
    address: String,
    email: String,
    id: Number,
  },
  currency: String,
  items: [
    {
      desc: String,
      quan: Number,
      unit: String,
      uPrice: Number,
      tPrice: Number,
    },
  ],
  subtotal: Number,
  tax: {
    perc: Number,
    amount: Number,
  },
  discount: {
    perc: Number,
    amount: Number,
  },
  total: Number,
  terms: String,
  note: String,
});

const invoiceModel = new Model('invoice', invoiceSchema);

module.exports = invoiceModel;
