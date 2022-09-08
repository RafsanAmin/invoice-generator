const cloudinary = require('cloudinary').v2;
const { getRandomString } = require('./randomServe');

const fileHandler = (req) =>
  new Promise((resolve) => {
    const respData = {
      logo: '',
      items: {},
    };
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file) => {
      const fileName = getRandomString(12);
      if (fieldname === 'logo') {
        respData.logo = fileName;
      } else {
        respData.items[fieldname] = fileName;
      }
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'invoice',
          use_filename: true,
          overwrite: true,
          filename_override: fileName,
          unique_filename: false,
          resource_type: 'auto',
          invalidate: true,
        },
        (err, respond) => {
          console.log(err, respond);
        }
      );
      file.pipe(uploadStream);
    });
    req.busboy.on('finish', () => {
      resolve(respData);
    });
  });

module.exports = fileHandler;
