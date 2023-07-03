import { DecodeMethodEnum } from 'types/serverTransactions.types';
import { getWindowLocation } from 'utils/window/getWindowLocation';

export const getEventListInitialDecodeMethod = () => {
  const { hash } = getWindowLocation();
  const hashValues = hash.split('/');
  const initialDecodeMethod = hashValues[2] ?? DecodeMethodEnum.raw;
  return initialDecodeMethod;
};
