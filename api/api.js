/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import Axios from 'axios';
import baseURL from '../util/baseUrl';

Axios.defaults.baseURL = baseURL;

const API = {
  savePhotos(photos) {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('logo', photos.logo);
      if (photos.items !== {}) {
        for (const elem in photos.items) {
          form.append(elem, photos.items[elem]);
        }
      }
      Axios.post('/upload-file', form)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  saveInvoice(data) {
    return new Promise((resolve, reject) => {
      this.savePhotos(data.photos).then((photos) => {
        Axios.post('/save-invoice', { ...data, photos })
          .then((res) => {
            const id = res.data._id;
            resolve(id);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  },
  createInvoice(data) {
    return new Promise((resolve, reject) => {
      Axios.post('/add-invoice', data)
        .then((res) => {
          const dt = res.data;
          resolve(dt);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getInvoice(data) {
    return new Promise((resolve, reject) => {
      Axios.get('/get-invoice', { params: { _id: data } })
        .then((res) => {
          const dt = res.data;
          console.log(dt);
          resolve(dt);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default API;
