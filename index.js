const dev = process.env.NODE_ENV !== 'production';
const express = require('express');
const next = require('next');

const PORT = process.env.PORT || 8000;
const nextApp = next({ dev });
const app = express();
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.all('*', handle);
  app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
  });
});
