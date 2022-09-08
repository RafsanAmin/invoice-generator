require('dotenv').config({ path: `${__dirname}/.env` });

const dev = process.env.NODE_ENV !== 'production';
const cloudinary = require('cloudinary').v2;
const express = require('express');
const nexti = require('next');
const db = require('mongoose');
const busboy = require('connect-busboy');
const cors = require('cors');
const streamifier = require('streamifier');

const InvoiceDB = require('./database/_invoice');
const fileHandler = require('./util/fileHandler');
const pdfMaker = require('./util/pdfMaker');

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
  })
    .then(() => {
      console.log('Connected to db');
    })
    .catch((err) => {
      console.log(err);
    });
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
  // https redirection
  app.enable('trust proxy');
  app.use(express.json());
  app.use((request, response, next) => {
    if (!dev && !request.secure) {
      return response.redirect(`https://${request.headers.host}${request.url}`);
    }
    next();
  });
  app.use(cors());
  app.use(
    busboy({
      highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
    })
  );
  /* routes */
  app.post('/upload-file', (req, res) => {
    fileHandler(req).then((resp) => {
      res.status(200).json(resp);
    });
  });
  app.post('/add-invoice', async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      const { _id } = await InvoiceDB.create({ ...data, pdf: Buffer.from('empty') });
      res.status(200).json({ _id });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  app.post('/save-invoice', async (req, res) => {
    try {
      const data = req.body;
      const pdf = await pdfMaker(data);
      InvoiceDB.findOneAndUpdate({ _id: data._id }, { ...data, pdf }, (err) => {
        if (err) {
          throw err;
        }
        res.json({ done: true });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  app.get('/get-invoice', async (req, res) => {
    try {
      const x = await InvoiceDB.findById(req.query._id).select(['-pdf', '-__v']);
      console.log(x);
      res.json(x);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  app.get('/get-pdf/:id', async (req, res) => {
    const { pdf } = await InvoiceDB.findById(req.params.id);
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${req.params.id}.pdf"`,
    });
    streamifier.createReadStream(Buffer.from(pdf)).pipe(res);
  });
  app.all('*', handle);
  app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
  });
});
