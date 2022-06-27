import { combineReducers } from '@reduxjs/toolkit';

import { ReducersEnum } from 'types/reducers';
import account from './slices/accountInfoSlice';
import dappModal from './slices/dappModalsSlice';
import loginInfo from './slices/loginInfoSlice';
import modals from './slices/modalsSlice';
import networkConfig from './slices/networkConfigSlice';
import toasts from './slices/toastsSlice';
import transactions from './slices/transactionsSlice';
import transactionsInfo from './slices/transactionsInfoSlice';

const reducers = {
  [ReducersEnum.account]: account,
  [ReducersEnum.networkConfig]: networkConfig,
  [ReducersEnum.loginInfo]: loginInfo,
  [ReducersEnum.modals]: modals,
  [ReducersEnum.dappModal]: dappModal,
  [ReducersEnum.toasts]: toasts,
  [ReducersEnum.transactions]: transactions,
  [ReducersEnum.transactionsInfo]: transactionsInfo
};

const getRootReducer = (customReducers = {}) =>
  combineReducers({ ...reducers, ...customReducers });

export default getRootReducer;
