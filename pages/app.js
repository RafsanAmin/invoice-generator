import React, { useReducer } from 'react';
import Adjuster from '../components/formUtil/adjuster';
import Select from '../components/formUtil/select';
import TextArea from '../components/formUtil/textarea';
import From from '../components/from';
import Header from '../components/header';
import Table from '../components/table/table';
import To from '../components/to';
import Total from '../components/total';
import AppContext from '../context/AppContext';
import Styles from '../scss/app.module.scss';
import debounce from '../util/debounce';
import init from '../util/init';

const app = () => {
  const appState = useReducer((prev, action) => {
    const t = prev[action.form];
    const f = { ...prev };
    const countTotal = () => {
      let total = 0;
      f.items.forEach((elem) => {
        total += elem.tPrice;
      });
      f.total = total;
      if (prev.tax.perc !== null) {
        f.tax.amount = total * (prev.tax.perc / 100);
      }
      if (prev.discount.perc !== null) {
        f.discount.amount = total * (prev.discount.perc / 100);
      }
      f.nettotal = total + f.tax.amount - f.discount.amount;
    };
    switch (action.type) {
      case 'INPUT_1':
        return { ...prev, [action.field]: [action.data] };
      case 'INPUT_2':
        return {
          ...prev,
          [action.form]: {
            ...t,
            [action.field]: action.data,
          },
        };
      case 'ADD_PHOTO_ITEM':
        debounce(() => {
          if (action.file.size > 2 * (2 << 20)) {
            alert('FILE CANT BE MORE THAN 2MB');
            return f;
          }
          if (action.file.type !== 'image/png' || action !== 'image/jpg') {
            alert('FILE ONLY CAN BE PNG & JPEG');
            return f;
          }
          f.photos.items[action.index] = action.file;
        });
        return f;
      case 'DEL_PHOTO_ITEM':
        delete f.photos.items[action.index];
        return f;
      case 'ADD_LOGO':
        f.photos.logo = action.file;
        return f;
      case 'DEL_LOGO':
        f.photos.logo = '';
        return f;
      case 'ITEM_DEL':
        debounce(() => {
          f.items.splice(action.index, 1);
          countTotal();
        });
        return f;
      case 'ITEM_ADD':
        debounce(() => {
          f.items.push({
            desc: '',
            quan: 0,
            unit: '',
            uPrice: 0,
            tPrice: 0,
          });
        });
        return f;
      case 'ITEM_EDIT':
        f.items[action.index][action.field] = action.data;
        countTotal();
        return f;
      case 'PERC_SET':
        f[action.field].perc = action.perc;
        f[action.field].amount = prev.total * (action.perc / 100);
        countTotal();
        return f;
      case 'AMNT_SET':
        f[action.field].amount = action.amount;
        countTotal();
        return f;
      default:
        return prev;
    }
  }, init);
  return (
    <div className={Styles.supCont}>
      <AppContext.Provider value={appState}>
        <div className={Styles.cont}>
          <div className={Styles.top}>
            <From />
            <Header />
          </div>
          <To />
          <Select
            list={[
              ['s', 's'],
              ['d', 'd'],
            ]}
          />
          <Table />
          <Total title="Total" value={appState[0].total} />
          <div className={Styles.bottom}>
            <div>
              <TextArea
                rows={{ min: 5, max: 7, lineH: 17 }}
                label="Terms & Conditions"
                value={appState[0].terms}
                setValue={(e) => appState[1]({ type: 'INPUT_1', field: 'terms', data: e })}
              />
              <TextArea
                rows={{ min: 5, max: 7, lineH: 17 }}
                label="Notes"
                value={appState[0].note}
                setValue={(e) => appState[1]({ type: 'INPUT_1', field: 'note', data: e })}
              />
            </div>

            <div className={Styles.prices}>
              <Adjuster header="Discount" name="discount" />
              <Adjuster header="Tax" name="tax" />
              <Total size="lg" title="Net Total" value={appState[0].nettotal} />
            </div>
          </div>
        </div>
        <hr />
        <button type="button" style={{ fontSize: '1.2rem' }}>
          <i className="fas fa-download" />
          {'  '}
          Download PDF
        </button>
        <button type="button" style={{ fontSize: '1.2rem' }}>
          <i className="fas fa-save    " />
          {'  '}
          Save
        </button>
      </AppContext.Provider>
    </div>
  );
};

export default app;
