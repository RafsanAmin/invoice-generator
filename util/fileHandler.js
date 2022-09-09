const cloudinary = require('cloudinary').v2;
const { getRandomString } = require('./randomServe');

const fileHandler = (req) =>
  new Promise((resolve) => {
    const respData = {
      logo: '',
      items: { 0: '', 1: '', 2: '', 3: '', 4: '' },
    };
    req.pipe(req.busboy);
    req.busboy.on('field', (name, val) => {
      if (name === 'logo') {
        respData.logo = val;
      } else {
        respData.items[name] = val;
      }
    });
    req.busboy.on('file', (fieldname, file) => {
      const fileName = getRandomString(12);
      if (fieldname === 'logo') {
        respData.logo = fileName;
      } else {
        respData.items[fieldname] = fileName;
      }
      const uploadStream = cloudinary.uploader.upload_stream({
        folder: 'invoice',
        use_filename: true,
        overwrite: true,
        filename_override: fileName,
        unique_filename: false,
        resource_type: 'auto',
        invalidate: true,
      });
      file.pipe(uploadStream);
    });
    req.busboy.on('finish', () => {
      resolve(respData);
    });
  });

module.exports = fileHandler;
