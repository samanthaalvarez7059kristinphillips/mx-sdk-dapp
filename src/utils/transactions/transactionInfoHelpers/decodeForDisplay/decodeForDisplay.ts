import {
  DecodedDisplayType,
  DecodeForDisplayPropsType,
  DecodeMethodEnum
} from 'types/serverTransactions.types';

import {
  decodeByMethod,
  getDisplayValueAndValidationWarnings,
  getSmartDecodedParts
} from './helpers';

export const decodeForDisplay = ({
  input,
  decodeMethod,
  identifier
}: DecodeForDisplayPropsType) => {
  const display: DecodedDisplayType = {
    displayValue: '',
    validationWarnings: []
  };

  if (input.includes('@')) {
    const parts = input.split('@');
    const decodedParts = getDisplayValueAndValidationWarnings({
      parts,
      identifier,
      decodeMethod,
      display
    });
    display.displayValue = decodedParts.join('@');

    return display;
  }

  if (input.includes('\n')) {
    const parts = input.split('\n');
    const initialDecodedParts = parts.map((part) => {
      const base64Buffer = Buffer.from(String(part), 'base64');
      if (decodeMethod === DecodeMethodEnum.raw) {
        return part;
      } else {
        return decodeByMethod(base64Buffer.toString('hex'), decodeMethod);
      }
    });

    const decodedParts =
      decodeMethod === DecodeMethodEnum.smart
        ? getSmartDecodedParts({
            parts,
            decodedParts: initialDecodedParts,
            identifier
          })
        : initialDecodedParts;

    display.displayValue = decodedParts.join('\n');

    return display;
  }

  display.displayValue = decodeByMethod(input, decodeMethod);

  return display;
};
