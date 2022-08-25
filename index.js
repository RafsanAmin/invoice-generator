require('dotenv').config({ path: `${__dirname}/.env` });

const dev = process.env.NODE_ENV !== 'production';
const express = require('express');
const nexti = require('next');
const db = require('mongoose');
const cloudinary = require('cloudinary');

const PORT = process.env.PORT || 3000;
const nextApp = nexti({ dev });
const app = express();
const { DB_KEY, cloud_name, api_key, api_secret } = process.env;
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  /* init */
  db.connect(DB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then(() => {
      console.log('Connected to db');
    })
    .catch((err) => {
      console.log(err);
    });
  cloudinary.v2.config({
    cloud_name,
    api_key,
    api_secret,
  });
  // https redirection
  app.enable('trust proxy');
  app.use((request, response, next) => {
    if (!dev && !request.secure) {
      return response.redirect(`https://${request.headers.host}${request.url}`);
    }
    next();
  });
  /* routes */
  app.all('*', handle);
  app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
  });
  app.post('/makeInvoice', () => {});
});
