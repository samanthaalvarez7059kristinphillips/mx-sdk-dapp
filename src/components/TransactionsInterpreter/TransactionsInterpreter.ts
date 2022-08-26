import { MAINNET_EGLD_LABEL } from 'constants/network';
import {
  ServerTransactionType,
  TokenArgumentType
} from 'types/serverTransactions.types';
import { getFormattedAmount } from 'utils/operations/getFormattedAmount';
import { isContract } from 'utils/smartContracts';
import { getTokenFromData } from 'utils/transactions/getTokenFromData';
import { getNetworkLink } from './helpers/getNetworkLink';
import { getTransactionMethod } from './helpers/getTransactionMethod';
import { getTransactionReceiver } from './helpers/getTransactionReceiver';
import { getTransactionReceiverAssets } from './helpers/getTransactionReceiverAssets';
import { getTransactionTokens } from './helpers/getTransactionTokens';
import { getTransactionTransferType } from './helpers/getTransactionTransferType';
import { ExtendedTransactionType } from './helpers/types';
import { urlBuilder } from './helpers/urlBuilder';

export type FormatAmountConfig = {
  egldLabel?: string;
  digits?: number;
  decimals?: number;
  showLastNonZeroDecimal?: boolean;
  showLabel?: boolean;
  token?: string;
};

export type ParseTransactionsConfiguration = {
  formatAmountConfig: FormatAmountConfig;
  networkAddress?: string;
};

const defaultConfig: ParseTransactionsConfiguration = {
  formatAmountConfig: {
    egldLabel: MAINNET_EGLD_LABEL
  },
  networkAddress: ''
};

export function parseTransactions(
  transactions: ServerTransactionType[],
  address: string,
  { formatAmountConfig, networkAddress } = defaultConfig
): ExtendedTransactionType[] {
  return transactions.map((transaction) =>
    processTransaction({
      transaction,
      address,
      formatAmountConfig,
      networkAddress
    })
  );
}

type ProcessTransactionParams = {
  transaction: ServerTransactionType;
  address: string;
  formatAmountConfig: FormatAmountConfig;
  networkAddress?: string;
};

export function processTransaction({
  transaction,
  address,
  formatAmountConfig = {
    egldLabel: MAINNET_EGLD_LABEL
  },
  networkAddress = ''
}: ProcessTransactionParams): ExtendedTransactionType {
  const tokenIdentifier =
    transaction.tokenIdentifier ?? getTokenFromData(transaction.data).tokenId;

  const receiver = getTransactionReceiver(transaction);
  const receiverAssets = getTransactionReceiverAssets(transaction);

  const direction = getTransactionTransferType(address, transaction, receiver);
  const method = getTransactionMethod(transaction);
  const transactionTokens: TokenArgumentType[] = getTransactionTokens(
    transaction
  );
  let tokenLabel = formatAmountConfig.egldLabel ?? MAINNET_EGLD_LABEL;
  if (transactionTokens.length > 0) {
    const txToken = transactionTokens[0];
    tokenLabel = txToken.ticker ?? tokenLabel;
  }

  const formattedValue = getFormattedAmount(transaction, formatAmountConfig);
  const fullFormattedValue = getFormattedAmount(transaction, {
    ...formatAmountConfig,
    showLastNonZeroDecimal: true
  });

  const senderLink = getNetworkLink(
    networkAddress,
    urlBuilder.accountDetails(transaction.sender)
  );
  const receiverLink = getNetworkLink(
    networkAddress,
    urlBuilder.accountDetails(receiver)
  );
  const senderShardLink = getNetworkLink(
    networkAddress,
    urlBuilder.senderShard(transaction.senderShard)
  );
  const receiverShardLink = getNetworkLink(
    networkAddress,
    urlBuilder.receiverShard(transaction.receiverShard)
  );

  const transactionHash = transaction.originalTxHash
    ? `${transaction.originalTxHash}#${transaction.txHash}`
    : transaction.txHash;
  const transactionLink = getNetworkLink(
    networkAddress,
    urlBuilder.transactionDetails(transactionHash)
  );

  return {
    ...transaction,
    tokenIdentifier,
    receiver,
    receiverAssets,
    tokenLabel,
    amountInfo: {
      formattedValue,
      fullFormattedValue
    },
    transactionDetails: {
      direction,
      method,
      transactionTokens,
      isContract: isContract(transaction.sender)
    },
    links: {
      senderLink,
      receiverLink,
      senderShardLink,
      receiverShardLink,
      transactionLink
    }
  };
}
