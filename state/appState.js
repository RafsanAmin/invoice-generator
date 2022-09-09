import debounce from '../util/debounce';
import { randomNumber } from '../util/random';

export const reducer = (prev, action) => {
  const t = prev[action.form];

  const f = { ...prev };
  const countTotal = () => {
    let total = 0;
    f.items.forEach((elem) => {
      total += Number(elem.tPrice);
    });
    f.total = total;
    if (prev.tax.perc !== null) {
      f.tax.amount = Number(total) * (Number(prev.tax.perc) / 100);
    }
    if (prev.discount.perc !== null) {
      f.discount.amount = Number(total) * (Number(prev.discount.perc) / 100);
    }
    f.nettotal = Number(total) + Number(f.tax.amount) - Number(f.discount.amount);
  };
  switch (action.type) {
    case 'INPUT_1':
      return { ...prev, [action.field]: action.data };
    case 'INPUT_2':
      return {
        ...prev,
        [action.form]: {
          ...t,
          [action.field]: action.data,
        },
      };
    case 'TITLE_1':
      f.title[action.field] = action.data;
      return f;
    case 'TITLE_2':
      f.title[action.form][action.field] = action.data;

      return f;
    case 'ADD_PHOTO_ITEM':
      debounce(() => {
        if (action.file.size > 2 * (2 << 20)) {
          alert('FILE CANT BE MORE THAN 2MB');
          return f;
        }

        if (action.file.type !== 'image/png' && action.file.type !== 'image/jpeg') {
          alert('FILE ONLY CAN BE PNG & JPEG');
          return f;
        }
        f.photos.items[action.index] = action.file;
      });
      return f;
    case 'DEL_PHOTO_ITEM':
      f.photos.items[action.index] = '';
      return f;
    case 'ADD_LOGO':
      if (action.file.size > 2 * (2 << 20)) {
        alert('FILE CANT BE MORE THAN 2MB');
        return f;
      }

      if (action.file.type !== 'image/png' && action.file.type !== 'image/jpeg') {
        alert('FILE ONLY CAN BE PNG & JPEG');
        return f;
      }
      f.photos.logo = action.file;
      return f;
    case 'DEL_LOGO':
      f.photos.logo = '';
      return f;
    case 'ITEM_DEL':
      debounce(() => {
        f.items.splice(action.index, 1);
        f.photos.items[action.index] = '';
        countTotal();
      });
      return f;
    case 'ITEM_ADD':
      debounce(() => {
        f.items.push({
          desc: '',
          quan: 0,
          unit: '',
          uPrice: 0,
          tPrice: 0,
        });
      });
      return f;
    case 'ITEM_EDIT':
      f.items[action.index][action.field] = action.data;
      countTotal();
      return f;
    case 'PERC_SET':
      f[action.field].perc = action.perc;
      f[action.field].amount = prev.total * (action.perc / 100);
      countTotal();
      return f;
    case 'AMNT_SET':
      f[action.field].amount = action.amount;
      countTotal();
      return f;
    case 'INIT':
      return action.init;
    default:
      return prev;
  }
};
export const init = {
  idI: '',
  date: '',
  id: randomNumber(10),
  photos: {
    logo: '',
    items: { 0: '', 1: '', 2: '', 3: '', 4: '' },
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
    index: 0,
    symbol: '$',
    name: 'US Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'USD',
    name_plural: 'US dollars',
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
