const { Schema, model } = require('mongoose');

const str = { type: String, required: false };
const num = { type: Number, required: false };

const invoiceSchema = new Schema({
  id: str,
  date: str,
  pdf: { type: Schema.Types.Buffer },
  photos: {
    logo: '',
    items: { 0: str, 1: str, 2: str, 3: str, 4: str },
  },
  title: {
    main: str,
    id: str,
    date: str,
    terms: str,
    note: str,
    tax: str,
    discount: str,
    total: str,
    nettotal: str,
    from: {
      address: str,
      email: str,
      id: str,
    },
    to: {
      main: str,
      name: str,
      address: str,
      email: str,
      id: str,
    },
    items: {
      desc: str,
      photo: str,
      quan: str,
      unit: str,
      uPrice: str,
      tPrice: str,
    },
  },
  from: {
    name: str,
    address: str,
    email: str,
    id: str,
  },
  to: {
    name: str,
    address: str,
    email: str,
    id: str,
  },
  currency: {
    index: 0,
    symbol: str,
    name: str,
    symbol_native: str,
    decimal_digits: num,
    rounding: num,
    code: str,
    name_plural: str,
  },
  items: [
    {
      desc: str,
      quan: num,
      unit: str,
      uPrice: num,
      tPrice: num,
    },
  ],
  total: num,
  tax: {
    perc: Schema.Types.Mixed,
    amount: num,
  },
  discount: {
    perc: Schema.Types.Mixed,
    amount: num,
  },
  nettotal: num,
  terms: str,
  note: str,
});

const invoiceModel = model('invoice', invoiceSchema);

module.exports = invoiceModel;
