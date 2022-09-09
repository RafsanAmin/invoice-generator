const puppeteer = require('puppeteer');
const Promise = require('bluebird');

async function generatePdf(file, opt, callback) {
  const options = opt;
  let args = ['--no-sandbox', '--disable-setuid-sandbox'];
  if (options.args) {
    args = options.args;
    delete options.args;
  }

  const browser = await puppeteer.launch({
    args,
    headless: !opt.debug,
  });
  const page = await browser.newPage();

  if (file.content) {
    await page.setContent(file.content, {
      waitUntil: 'networkidle0', // wait for page to load completely
    });
  } else {
    await page.goto(file.url, {
      waitUntil: ['load', 'networkidle0'], // wait for page to load completely
    });
  }
  if (options.autoHeightAndSinglePage) {
    await page.setViewport({
      width: options.widthViewport, // special width in integer for autoHeightAndSinglePage
      height: 1,
      deviceScaleFactor: 1,
    });
    const height = await page.evaluate(() => document.documentElement.offsetHeight); // sir, -auto-height who wants
    options.height = height;
    options.width = `${String(options.widthViewport)}px`;
    options.pageRanges = '1';
  }

  return Promise.props(page.pdf(options))
    .then(async (data) => {
      await browser.close();
      return Buffer.from(Object.values(data));
    })
    .asCallback(callback);
}
const pdfMaker = (data) =>
  new Promise((resolve, reject) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <style>
          :root {
            --pink-darker: hsl(342, 92%, 47%);
            --pink-dark: hsl(342, 79%, 55%);
            --pink: hsl(342, 94%, 63%);
            --pink-hot: hsl(335, 100%, 60%);
            --pink-light: hsl(342, 100%, 82%);
            --pink-lighter: hsl(342, 73%, 94%);
            --pink-lightest: hsl(340, 100%, 99%);
          }
          p,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            word-wrap: break-word !important;
          }
          html,
          body {
            padding: 1.5rem;
            margin: 0;
            font-family: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
              Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 20px;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
            font-family: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
              Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            margin: 0;
            padding: 0;
            font-style: normal;
          }
          *:focus,
          *:active {
            outline: none;
          }

          input {
            width: 100% !important;
          }
          .top {
            display: flex;
            justify-content: space-between;
            gap: 1rem
          }
          .from {
            display: flex;
            max-width: 60%;
            gap: 1rem;
          }
          .from h1 {
            font-size: 2rem;
          }
          .from img{
            padding: 1rem;
          }
          .inputs {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            width: 100%;
          }
          .inputs > div {
            gap: 0.5rem;
          }
          .inputsUD {
            display: grid;
            grid-template-columns: minmax(0, 6fr) minmax(0, 3fr) minmax(0, 3fr);
            gap: 0.35rem;
            margin-bottom: 1rem;
          }
          .sp {
            grid-template-columns: minmax(0, 1fr);
            margin-bottom: 0rem;
          }
          .spp {
            grid-template-columns: minmax(0, 1fr);
            margin-bottom: 0rem;
          }
          .spp > div p {
            font-size: 1rem !important;
          }
          .inputsUD > div {
            display: flex;
            flex-direction: column;
          }
          .inputsUD > div p {
            font-size: 1.2rem;
          }
          .header {
            text-align: right;
          }
          .header h2 {
            font-size: 2rem;
            color: var(--pink-dark);
            margin-bottom: 0.5rem;
          }
          .ainputs {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            text-align: left;
            width: 100%;
          }
          .ainputs > div {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }
          .to {
            position: relative;
            padding: 1.5rem;
            margin-top: 3rem;
            position: relative;
            background-color: #fff;
            border-radius: 9px;
            background: linear-gradient(270deg, #fff 0%, #fff 65%) padding-box,
              linear-gradient(270deg, red 0%, var(--pink-hot) 65%) border-box;
            border: 4px solid transparent;
          }
          .to::after {
            content: '';
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            position: absolute;
            background: linear-gradient(270deg, red 0%, var(--pink-hot) 65%);
            z-index: -5;
            border-radius: 12px;
          }
          .to h2 {
            font-size: 1.3rem;
            padding-inline: 0.5rem;
            background-image: linear-gradient(90deg, red 0%, var(--pink-hot) 65%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .to .h2 {
            top: -25px;
            left: 2.5rem;
            background-color: #fff;
            position: absolute;
          }
          .table {
            margin-block: 1.5rem;
          }
          .head {
            display: grid;
            min-width: 950px;
            place-items: center;
            grid-template-columns: minmax(0, 4.5fr) minmax(0, 1.875fr) minmax(0, 1fr) minmax(0, 0.875fr) minmax(0, 1.75fr) minmax(0, 2fr);
            gap: 0.5rem;
            background: linear-gradient(90deg, red 0%, var(--pink-hot) 65%);
            border-radius: 5px;
            justify-items: center;
            padding: 1rem 1.5rem;
          }
          .head > div {
            background-color: transparent;
            width: 100%;
            text-align: center;
          }
          .table .head p {
            color: #fff;
            text-align: center;
            font-weight: 600;
          }
          .table .item {
            display: grid;
            min-width: 950px;
            grid-template-columns: minmax(0, 4.5fr) minmax(0, 1.875fr) minmax(0, 1fr) minmax(0, 0.875fr) minmax(
                0,
                1.75fr
              ) minmax(0, 2fr);
            gap: 0.5rem;
            border-bottom: 1px solid var(--pink);
            align-items: center;
            padding: 1rem 1.5rem;
          }
          .table .item div {
            max-width: 100%;
          }
          .table .item img {
            width: 100%;
            padding: 0.1rem;
            max-height: 210px;
            object-fit: cover;
          }
          .table .item p {
            font-weight: 400;
            text-align: center;
          }
          .bottom {
            display: grid;
            grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
            gap: 5rem;
          }
          .bottom .left {
            display: grid;
            gap: 1rem;
            width: 100%;
            grid-template-columns: minmax(0, 1fr);
          }
          .b > div {
            gap: 1rem;
            max-width: 400px;
          }
          .b p {
            font-size: 1.3rem;
            text-align: right;
            font-weight: 700;
          }
          .b h3 {
            font-size: 1.3rem;
          }
          .b h3,
          .b h1 {
            color: var(--pink-darker);
          }
          .h{
            font-weight: 400 !important;
          }
        </style>
      </head>
      <body>
        <div>
          <div class="top">
            <div class="from">
              <div class="logo">
                <img src="https://res.cloudinary.com/dyjrfa6c2/image/upload/invoice/${
                  data?.photos.logo
                }" width="210" />
              </div>
              <div class="inputs">
                <h1>${data.from.name}</h1>
                <div>
                  <h4>${data.title.from.address}:</h4>
                  <p>${data.from.address}</p>
                </div>
                <div>
                  <h4>${data.title.from.email}:</h4>
                  <p>${data.from.email}</p>
                </div>
                <div>
                  <h4>${data.title.from.id}:</h4>
                  <p>${data.from.id}</p>
                </div>
              </div>
            </div>
            <div class="header">
              <h2>${data.title.main}</h2>
              <div class="ainputs">
                <div>
                  <h4>${data.title.id}:</h4>
                  <h4>${data.title.date}:</h4>
                </div>
                <div>
                  <p>${data.id}</p>
                  <p>${data.date}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="to">
            <div class="h2"><h2>${data.title.to.main}</h2></div>
            <div class="inputsUD">
              <div>
                <h4>${data.title.to.name}</h4>
                <p>${data.to.name}</p>
              </div>
              <div>
                <h4>${data.title.to.id}</h4>
                <p>${data.to.id}</p>
              </div>
              <div>
                <h4>${data.title.to.email}</h4>
                <p>${data.to.email}</p>
              </div>
            </div>
            <div class="inputsUD sp">
              <div>
                <h4>${data.title.to.address}</h4>
                <p>${data.to.address}</p>
              </div>
            </div>
          </div>
          <br />
          <div class="inputsUD sp">
            <div>
              <h4>Currency</h4>
              <p>${data.currency.symbol_native}-${data.currency.code} || ${data.currency.name}</p>
            </div>
          </div>
          <div class="table">
            <div class="head">
              <div>
                <p>${data.title.items.desc}</p>
              </div>
              <div>
                <p>${data.title.items.photo}</p>
              </div>
              <div>
                <p>${data.title.items.quan}</p>
              </div>
              <div>
                <p>${data.title.items.unit}</p>
              </div>
              <div>
                <p>${data.title.items.uPrice}</p>
              </div>
              <div>
                <p>${data.title.items.tPrice}</p>
              </div>
            </div>
            ${data.items
              .map(
                (elem, ind) => `
            <div class="item">
              <div>
                <p style="text-align: left; white-space: pre-wrap">${elem.desc}</p>
              </div>
              <div>
                ${
                  data?.photos.items[ind]
                    ? ` <img
                      src="https://res.cloudinary.com/dyjrfa6c2/image/upload/invoice/${data?.photos.items[ind]}"
                      alt="No Image"
                    />`
                    : `<p>No Image</p>`
                }
              </div>
              <div>
                <p>${elem.quan}</p>
              </div>
              <div>
                <p>${elem.unit}</p>
              </div>
              <div>
                <p>${data.currency.symbol} ${elem.uPrice}</p>
              </div>
              <div>
                <p>${data.currency.symbol} ${elem.tPrice}</p>
              </div>
            </div>
            `
              )
              .join('')}
          </div>
          <div class="bottom">
            <div class="left">
              <div class="inputsUD spp">
                <div>
                  <h4>${data.title.terms}</h4>
                  <p style="white-space: pre-wrap;">${data.terms}</p>
                </div>
              </div>
              <div class="inputsUD spp">
                <div>
                  <h4>${data.title.note}</h4>
                  <p style="white-space: pre-wrap;">${data.note}</p>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="ainputs b">
                <div>
                  <h3>${data.title.total}:</h3>
                  <h3>
                    ${data.title.discount} ${data.discount.perc ? `(${data.discount.perc}%)` : ''}:
                  </h3>
                  <h3>${data.title.tax} ${data.tax.perc ? `(${data.tax.perc}%)` : ''}:</h3>
                  <h1>${data.title.nettotal}:</h1>
                </div>
                <div>
                  <p><span class="h">${data.currency.symbol}</span> ${data.total}</p>
                  <p><span class="h">${data.currency.symbol}</span> ${data.discount.amount}</p>
                  <p><span class="h">${data.currency.symbol}</span> ${data.tax.amount}</p>
                  <h1 style="color: #000; text-align: right">
                    <span class="h">${data.currency.symbol}</span> ${data.nettotal}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <hr />
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem">
          <p>Powered By</p>
          <img src="http://localhost:3000/tunibibi-2x-225x58.png" alt="" />
        </div>
      </body>
    </html>

    `;
    generatePdf(
      { content: htmlContent },
      {
        widthViewport: 1550,
        autoHeightAndSinglePage: true,
        printBackground: true,
      }
    )
      .then((pdfBuffer) => {
        resolve(pdfBuffer);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = pdfMaker;
