const pdfMaker = ({ data }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
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
      }
      .from {
        display: flex;
        max-width: 60%;
      }
      .from h1 {
        font-size: 2rem;
      }
      .inputs {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }
      .inputs > div {
        display: flex;
        gap: 0.5rem;
      }
      .inputsUD {
        display: grid;
        grid-template-columns: 6fr 3fr 3fr;
        gap: 0.35rem;
        margin-bottom: 1rem;
      }
      .sp {
        grid-template-columns: 1fr;
        margin-bottom: 0rem;
      }
      .spp {
        grid-template-columns: 1fr;
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
      }
      .ainputs > div {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }
      .to {
        position: relative;
        background-color: #fff;
        border-radius: 9px;
        padding: 1.5rem;
        margin-top: 3rem;
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
        position: absolute;
        font-size: 1.3rem;
        top: -25px;
        left: 2.5rem;
        padding-inline: 0.5rem;
        background: linear-gradient(90deg, red 0%, var(--pink-hot) 65%);
        background-clip: text;
        color: transparent;
      }
      .to h2::after {
        content: '';
        inset: 0;
        background-color: #fff;
        position: absolute;
        z-index: -1;
      }
      .table {
        margin-block: 1.5rem;
      }
      .table .head {
        display: grid;
        min-width: 950px;
        grid-template-columns: 4.5fr 1.875fr 1fr 0.875fr 1.75fr 2fr;
        gap: 0.5rem;
        background: linear-gradient(90deg, #e23547 0%, var(--pink-hot) 65%);
        border-radius: 5px;
        justify-items: center;
        padding: 1rem 1.5rem;
      }
      .table .head p {
        color: #fff;
        font-weight: 600;
      }
      .table .item {
        display: grid;
        min-width: 950px;
        grid-template-columns: 4.5fr 1.875fr 1fr 0.875fr 1.75fr 2fr;
        gap: 0.5rem;
        border-bottom: 2px solid var(--pink);
        align-items: center;
        padding: 1rem 1.5rem;
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
        grid-template-columns: 0.8fr 1fr;
        gap: 5rem;
      }
      .bottom .left {
        display: grid;
        gap: 1rem;
      }
      .b > div {
        gap: 1rem;
      }
      .b p {
        font-size: 1.3rem;
        text-align: right;
      }
      .b h3 {
        font-size: 1.3rem;
      }
      .b h3,
      .b h1 {
        color: var(--pink-darker);
      }
    </style>
  </head>
  <body>
    <div>
      <div class="top">
        <div class="from">
          <div class="logo">
            <img src="${data.photos.logo}" width="210" />
          </div>
          <div class="inputs">
            <h1>${data.from.name}</h1>
            <div>
              <h4>Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</h4>
              <p>
                ${data.from.address}
              </p>
            </div>
            <div>
              <h4>E-mail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</h4>
              <p>${data.from.email}</p>
            </div>
            <div>
              <h4>Retailer ID&nbsp;&nbsp;:</h4>
              <p>${data.from.id}</p>
            </div>
          </div>
        </div>
        <div class="header">
          <h2>INVOICE</h2>
          <div class="ainputs">
            <div>
              <h4>Invoice Number:</h4>
              <h4>Invoice Date:</h4>
            </div>
            <div>
              <p>${data.id}</p>
              <p>${data.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="to">
        <h2>Invoice To</h2>
        <div class="inputsUD">
          <div>
            <h4>Client Name</h4>
            <p>${data.to.name}</p>
          </div>
          <div>
            <h4>Client Id</h4>
            <p>${data.to.id}</p>
          </div>
          <div>
            <h4>E-mail</h4>
            <p>${data.to.email}</p>
          </div>
        </div>
        <div class="inputsUD sp">
          <div>
            <h4>Address</h4>
            <p>
              ${data.to.address}
            </p>
          </div>
        </div>
      </div>
      <br />
      <div class="inputsUD sp">
        <div>
          <h4>Currency</h4>
          <p>$ US-Dollar</p>
        </div>
      </div>
      <div class="table">
        <div class="head">
          <div>
            <p>Product Description</p>
          </div>
          <div>
            <p>Photo</p>
          </div>
          <div>
            <p>Quantity</p>
          </div>
          <div>
            <p>Unit</p>
          </div>
          <div>
            <p>Unit Price</p>
          </div>
          <div>
            <p>Total Price</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p style="text-align: left">Product Description</p>
          </div>

          <img src="./public/tunibibi-2x-225x58.png" alt="" />

          <div>
            <p>100</p>
          </div>
          <div>
            <p>Pcs</p>
          </div>
          <div>
            <p>$1500</p>
          </div>
          <div>
            <p>$15000</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p style="text-align: left">Product Description</p>
          </div>

          <img src="./public/tunibibi-2x-225x58.png" alt="" />

          <div>
            <p>100</p>
          </div>
          <div>
            <p>Pcs</p>
          </div>
          <div>
            <p>$1500</p>
          </div>
          <div>
            <p>$15000</p>
          </div>
        </div>
        <div class="item">
          <div>
            <p style="text-align: left">Product Description</p>
          </div>

          <img src="./public/tunibibi-2x-225x58.png" alt="" />

          <div>
            <p>100</p>
          </div>
          <div>
            <p>Pcs</p>
          </div>
          <div>
            <p>$1500</p>
          </div>
          <div>
            <p>$15000</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="inputsUD spp">
            <div>
              <h4>Terms & Conditions</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident eius, quasi
                deleniti nemo quae voluptatem minima eos id, nihil suscipit, obcaecati porro
                perferendis sint. Cumque fugiat perspiciatis explicabo culpa veniam at rem deserunt,
                maxime omnis facere ad accusantium nihil nulla eos blanditiis excepturi quibusdam
              </p>
            </div>
          </div>
          <div class="inputsUD spp">
            <div>
              <h4>Notes</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident eius, quasi
                deleniti nemo quae voluptatem minima eos id, nihil suscipit, obcaecati porro
                perferendis sint. Cumque fugiat perspiciatis explicabo culpa veniam at rem deserunt,
                maxime omnis facere ad accusantium nihil nulla eos blanditiis excepturi quibusdam
              </p>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="ainputs b">
            <div>
              <h3>Total:</h3>
              <h3>Discount:</h3>
              <h3>Tax (15%):</h3>
              <h1>Net Total:</h1>
            </div>
            <div>
              <p>$1500</p>
              <p>$150</p>
              <p>$150</p>
              <h1 style="color: #000; text-align: right">$15000000000000</h1>
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
      <img src="./public/tunibibi-2x-225x58.png" alt="" />
    </div>
  </body>
</html>
`;

module.exports = pdfMaker;
