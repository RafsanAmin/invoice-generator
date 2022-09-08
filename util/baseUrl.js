const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://raf-invoicegenerator.herokuapp.com/';

export default url;
