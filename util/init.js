import randomNumber from './random';

export default {
  date: '',
  id: randomNumber(10),
  from: {
    logo: '',
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
    {
      desc: 'Your Product Desx',
      quan: 0,
      unit: 'pcs',
      uPrice: 0,
      tPrice: 0,
    },
    {
      desc: 'Your Product Desx',
      quan: 0,
      unit: 'pcs',
      uPrice: 0,
      tPrice: 0,
    },
    {
      desc: 'Your Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product DesxYour Product Desx',
      quan: 0,
      unit: 'pcs',
      uPrice: 0,
      tPrice: 0,
    },
    {
      desc: 'Your Product Desx',
      quan: 0,
      unit: 'pcs',
      uPrice: 0,
      tPrice: 0,
    },
    {
      desc: 'Your Product Desx',
      quan: 0,
      unit: 'pcs',
      uPrice: 0,
      tPrice: 0,
    },
  ],
  subtotal: 0,
  tax: {
    perc: 0,
    amount: 0,
  },
  discount: {
    perc: 0,
    amount: 0,
  },
  total: 0,
  terms: '',
  note: '',
};
