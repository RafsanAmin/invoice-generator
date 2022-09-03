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
// import init from '../util/init';
import { init, reducer } from '../state/appState';
import currency from '../util/currency.json';

const app = () => {
  const appState = useReducer(reducer, init);

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
            list={currency}
            active={appState[0].currency.index}
            handle={(e, i) => {
              appState[1]({
                type: 'INPUT_1',
                field: 'currency',
                data: { ...e, index: i },
              });
            }}
          />
          <Table />
          <Total
            label={appState[0].title.total}
            labH={(e) => appState[1]({ type: 'TITLE_1', field: 'total', data: e })}
            value={appState[0].total}
          />
          <div className={Styles.bottom}>
            <div>
              <TextArea
                rows={{ min: 5, max: 7, lineH: 17 }}
                label={appState[0].title.terms}
                labH={(e) => appState[1]({ type: 'TITLE_1', field: 'terms', data: e })}
                value={appState[0].terms}
                setValue={(e) => appState[1]({ type: 'INPUT_1', field: 'terms', data: e })}
              />
              <TextArea
                rows={{ min: 5, max: 7, lineH: 17 }}
                label={appState[0].title.note}
                labH={(e) => appState[1]({ type: 'TITLE_1', field: 'note', data: e })}
                value={appState[0].note}
                setValue={(e) => appState[1]({ type: 'INPUT_1', field: 'note', data: e })}
              />
            </div>

            <div className={Styles.prices}>
              <Adjuster
                label={appState[0].title.discount}
                labH={(e) => appState[1]({ type: 'TITLE_1', field: 'discount', data: e })}
                name="discount"
              />
              <Adjuster
                label={appState[0].title.tax}
                labH={(e) => appState[1]({ type: 'TITLE_1', field: 'tax', data: e })}
                name="tax"
              />
              <Total
                size="lg"
                label={appState[0].title.nettotal}
                labH={(e) => appState[1]({ type: 'TITLE_1', field: 'nettotal', data: e })}
                value={appState[0].nettotal}
              />
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
