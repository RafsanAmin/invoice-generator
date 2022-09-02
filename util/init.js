import { randomNumber } from './random';

export default {
  date: '',
  id: randomNumber(10),
  photos: {
    logo: '',
    items: {},
  },
  title: {
    main: 'INVOICE',
    id: 'Invoice Number',
    date: 'Invoice Date',
    from: {
      address: 'Address',
      email: 'E-mail',
      id: 'Retailer Id.',
    },
    to: {
      main: 'Invoice To',
      name: 'Client Name',
      address: 'Address',
      email: 'E-mail',
      id: 'Client Id',
    },
    items: {
      desc: 'Product Description',
      photo: 'Photo',
      quan: 'Quantity',
      unit: 'Unit',
      uPrice: 'Unit Price',
      tPrice: 'Total Price',
    },
    terms: 'Terms & Conditions',
    note: 'Notes',
    tax: 'Tax',
    discount: 'Discount',
    total: 'Total',
    nettotal: 'Net Total',
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
  currency: {
    symbol: '৳',
  },
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
