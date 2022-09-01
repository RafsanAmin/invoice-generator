import { randomNumber } from './random';

export default {
  date: '',
  id: randomNumber(10),
  photos: {
    logo: '',
    items: {},
  },
  from: {
    name: '',
    address: '',
    email: '',
    id: randomNumber(10),
  },
  to: {
    name: '',
    address: '',
    email: '',
    id: randomNumber(10),
  },
  currency: '',
  items: [
    {
      desc: '',
      quan: 0,
      unit: '',
      uPrice: 0,
      tPrice: 0,
    },
  ],
  tax: {
    perc: null,
    amount: 0,
  },
  discount: {
    perc: null,
    amount: 0,
  },
  nettotal: 0,
  total: 0,
  terms: '',
  note: '',
};
