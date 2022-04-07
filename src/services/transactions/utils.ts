import { Transaction } from '@elrondnetwork/erdjs/out';
import BigNumber from 'bignumber.js';
import { gasPerDataByte, gasPriceModifier } from 'constants/index';
import { calculateFeeLimit } from 'utils/operations';

export function calcTotalFee(transactions: Transaction[], minGasLimit: number) {
  let totalFee = new BigNumber(0);

  transactions.forEach((tx) => {
    const fee = calculateFeeLimit({
      gasPerDataByte,
      gasPriceModifier,
      minGasLimit: String(minGasLimit),
      gasLimit: tx
        .getGasLimit()
        .valueOf()
        .toString(),
      gasPrice: tx
        .getGasPrice()
        .valueOf()
        .toString(),
      data: tx.getData().toString(),
      chainId: tx.getChainID().valueOf()
    });
    totalFee = totalFee.plus(new BigNumber(fee));
  });

  return totalFee;
}
