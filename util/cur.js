/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// no-eslint

const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`${__dirname}/arj.json`, 'utf-8'));
const print = [];

for (const ind in data) {
  const elem = data[ind];
  print.push([elem, `${elem.symbol_native}-${elem.code} || ${elem.name}`]);
}

fs.writeFileSync(`${__dirname}/currency.json`, JSON.stringify(print), { encoding: 'utf8' });
