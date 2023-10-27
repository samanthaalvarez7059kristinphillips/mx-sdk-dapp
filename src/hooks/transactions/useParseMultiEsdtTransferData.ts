import { useEffect, useState } from 'react';
import { Transaction } from '@multiversx/sdk-core';
import {
  MultiSignTransactionType,
  TransactionDataTokenType,
  TransactionsDataTokensType
} from 'types';
import { getTokenFromData } from 'utils/transactions/getTokenFromData';
import { parseMultiEsdtTransferData } from 'utils/transactions/parseMultiEsdtTransferData';

const defaultTransactionInfo: TransactionDataTokenType = {
  tokenId: '',
  amount: '',
  type: '',
  multiTxData: '',
  receiver: ''
};

interface UseParseMultiEsdtTransferDataPropsType {
  transactions?: Transaction[];
}

interface UseParseMultiEsdtTransferDataReturnType {
  parsedTransactionsByDataField: TransactionsDataTokensType;
  getTxInfoByDataField: (
    data: string,
    multiTransactionData?: string
  ) => TransactionDataTokenType;
  allTransactions: MultiSignTransactionType[];
}

export function useParseMultiEsdtTransferData({
  transactions
}: UseParseMultiEsdtTransferDataPropsType): UseParseMultiEsdtTransferDataReturnType {
  const [parsedTransactionsByDataField, setParsedTransactions] =
    useState<TransactionsDataTokensType>({});
  const [allTransactions, setAllTransactions] = useState<
    MultiSignTransactionType[]
  >([]);

  function addTransactionDataToParsedInfo(
    data: string,
    txInfo: TransactionDataTokenType
  ) {
    setParsedTransactions((existing) => ({
      ...existing,
      [data]: txInfo
    }));
  }

  function getTxInfoByDataField(
    data: string,
    multiTransactionData?: string
  ): TransactionDataTokenType {
    if (parsedTransactionsByDataField == null) {
      return defaultTransactionInfo;
    }

    if (data in parsedTransactionsByDataField) {
      return parsedTransactionsByDataField[data];
    }

    if (
      multiTransactionData != null &&
      String(multiTransactionData) in parsedTransactionsByDataField
    ) {
      return parsedTransactionsByDataField[multiTransactionData];
    }

    return defaultTransactionInfo;
  }

  function extractTransactionESDTData() {
    if (transactions && transactions.length > 0) {
      const allTxs: MultiSignTransactionType[] = [];
      transactions.forEach((transaction, transactionIndex) => {
        const txData = transaction.getData().toString();
        const multiTxs = parseMultiEsdtTransferData(txData);

        if (multiTxs.length > 0) {
          multiTxs.forEach((trx, idx) => {
            const newTx: MultiSignTransactionType = {
              transaction,
              multiTxData: trx.data,
              transactionIndex: idx
            };
            addTransactionDataToParsedInfo(trx.data, {
              tokenId: trx.token ? trx.token : '',
              amount: trx.amount ? trx.amount : '',
              type: trx.type,
              nonce: trx.nonce ? trx.nonce : '',
              multiTxData: trx.data,
              receiver: trx.receiver
            });
            allTxs.push(newTx);
          });
        } else {
          const transactionData = transaction.getData().toString();

          const { tokenId, amount } = getTokenFromData(transactionData);

          if (tokenId) {
            addTransactionDataToParsedInfo(transactionData, {
              tokenId,
              amount,
              receiver: transaction.getReceiver().bech32()
            });
          }
          allTxs.push({
            transaction,
            transactionIndex,
            multiTxData: transactionData
          });
        }
      });

      setAllTransactions(allTxs);
    }
  }

  useEffect(() => {
    extractTransactionESDTData();
  }, [transactions?.length]);

  return {
    parsedTransactionsByDataField,
    getTxInfoByDataField,
    allTransactions
  };
}
