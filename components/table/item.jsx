/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import Styles from '../../scss/table.module.scss';
import Input from '../formUtil/input';
import TextArea from '../formUtil/textarea';

function Item({ index }) {
  const [d, dispatch] = useContext(AppContext);
  const [edit, setEdit] = useState(false);
  const [l, setL] = useState(0);
  const { desc, quan, unit, uPrice, tPrice } = d.items[index];
  const Edit = (e) => {
    e.stopPropagation();
    setEdit((s) => !s);
  };
  const Delete = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ITEM_DEL', index });
  };
  useEffect(() => {
    dispatch({ type: 'ITEM_EDIT', index, field: 'tPrice', data: quan * uPrice });
  }, [quan, uPrice]);
  useEffect(() => {
    if (d.items.length > l && index === d.items.length - 1) {
      setEdit(true);
    }
    setL(d.items.length);
  }, [d.items.length]);
  return (
    <div className={Styles.itemCont}>
      <div className={`${Styles.grid} ${Styles.item}`}>
        {edit ? (
          <>
            <div
              style={{
                textAlign: 'left',
                paddingInlineStart: '4rem',
              }}
            >
              <TextArea
                rows={{ min: 5, max: 5, lineH: 18 }}
                value={desc}
                setValue={(s) => dispatch({ type: 'ITEM_EDIT', index, field: 'desc', data: s })}
                placeholder="Description"
              />
            </div>
            <div>
              <Input
                value={quan}
                setValue={(s) => {
                  Number(s) < 0 || Number.isNaN(Number(s))
                    ? dispatch({ type: 'ITEM_EDIT', index, field: 'quan', data: quan })
                    : dispatch({ type: 'ITEM_EDIT', index, field: 'quan', data: s });
                }}
              />
            </div>
            <div>
              <Input
                value={unit}
                setValue={(s) => {
                  dispatch({ type: 'ITEM_EDIT', index, field: 'unit', data: s });
                }}
              />
            </div>
            <div>
              <Input
                value={uPrice}
                setValue={(s) => {
                  Number(s) < 0 || Number.isNaN(Number(s))
                    ? dispatch({ type: 'ITEM_EDIT', index, field: 'uPrice', data: 0 })
                    : dispatch({ type: 'ITEM_EDIT', index, field: 'uPrice', data: s });
                }}
              />
            </div>
            <Input
              value={tPrice}
              setValue={(s) => {
                Number(s) < 0 || Number.isNaN(Number(s))
                  ? dispatch({ type: 'ITEM_EDIT', index, field: 'uPrice', data: 0 })
                  : dispatch({ type: 'ITEM_EDIT', index, field: 'uPrice', data: s });
              }}
              readOnly
            />
          </>
        ) : (
          <>
            <div>
              <p
                style={{
                  textAlign: 'left',
                  paddingLeft: '4rem',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {desc}
              </p>
            </div>
            <div>
              <p>{quan}</p>
            </div>
            <div>
              <p>{unit}</p>
            </div>
            <div>
              <p>{uPrice}</p>
            </div>
            <div>
              <p>{tPrice}</p>
            </div>
          </>
        )}
      </div>
      <div className={`${Styles.button}`}>
        <button type="button" onClick={Edit}>
          {edit ? (
            <>
              {'  '}
              <i className="fas fa-check    " />
              {'  '}
            </>
          ) : (
            <i className="fas fa-edit" />
          )}
        </button>
        <button type="button" onClick={Delete}>
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  );
}

export default Item;
