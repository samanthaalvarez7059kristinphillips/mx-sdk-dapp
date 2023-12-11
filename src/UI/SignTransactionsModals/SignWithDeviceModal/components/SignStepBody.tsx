import React from 'react';
import { Address } from '@multiversx/sdk-core/out';
import classNames from 'classnames';
import { withStyles, WithStylesImportType } from 'hocs/withStyles';
import { useGetEgldPrice, useGetNetworkConfig } from 'hooks';
import { useGetTokenDetails } from 'hooks/transactions/useGetTokenDetails';
import { ActiveLedgerTransactionType, MultiSignTransactionType } from 'types';
import { NftEnumType } from 'types/tokens.types';
import { TransactionData } from 'UI/TransactionData';
import { getEgldLabel } from 'utils/network/getEgldLabel';
import { formatAmount } from 'utils/operations/formatAmount';
import { isTokenTransfer } from 'utils/transactions/isTokenTransfer';
import { getIdentifierType } from 'utils/validation/getIdentifierType';
import { useSignStepsClasses } from '../hooks';
import { ConfirmAmount } from './components/ConfirmAmount';
import { ConfirmFee } from './components/ConfirmFee';
import { ConfirmReceiver } from './components/ConfirmReceiver';
import { NftSftPreviewComponent } from './components/NftSftPreviewComponent';

export interface SignStepInnerClassesType {
  buttonsWrapperClassName?: string;
  inputGroupClassName?: string;
  inputLabelClassName?: string;
  inputValueClassName?: string;
  errorClassName?: string;
  scamAlertClassName?: string;
  buttonClassName?: string;
  progressClassName?: string;
}

export interface SignStepBodyPropsType {
  error: string | null;
  callbackRoute?: string;
  currentStep: number;
  currentTransaction: ActiveLedgerTransactionType | null;
  allTransactions: MultiSignTransactionType[];
  signStepInnerClasses?: SignStepInnerClassesType;
  isGuarded?: boolean;
}

const SignStepBodyComponent = ({
  currentTransaction,
  error,
  signStepInnerClasses,
  globalStyles,
  styles
}: SignStepBodyPropsType & WithStylesImportType) => {
  const egldLabel = getEgldLabel();

  if (!currentTransaction) {
    return null;
  }

  const { network } = useGetNetworkConfig();
  const {
    inputGroupClassName,
    inputLabelClassName,
    inputValueClassName,
    errorClassName
  } = signStepInnerClasses || {};

  const { tokenId, nonce, amount, multiTxData, receiver } =
    currentTransaction.transactionTokenInfo;

  const isTokenTransaction = Boolean(
    tokenId && isTokenTransfer({ tokenId, erdLabel: egldLabel })
  );

  const { isNft, isEgld, isEsdt } = getIdentifierType(tokenId);

  // If the token has a nonce means that this is an NFT. Eg: TokenId=TOKEN-1hfr, nonce=123 => NFT id=TOKEN-1hfr-123
  const appendedNonce = nonce ? `-${nonce}` : '';
  const nftId = `${tokenId}${appendedNonce}`;

  const { tokenDecimals, tokenAvatar, tokenLabel, type, esdtPrice } =
    useGetTokenDetails({
      tokenId: nonce && nonce?.length > 0 ? nftId : tokenId
    });

  const transactionReceiver = multiTxData
    ? new Address(receiver).bech32()
    : currentTransaction.transaction.getReceiver().toString();

  const getFormattedAmount = ({ addCommas }: { addCommas: boolean }) =>
    formatAmount({
      input: isTokenTransaction
        ? amount
        : currentTransaction.transaction.getValue().toString(),
      decimals: isTokenTransaction ? tokenDecimals : Number(network.decimals),
      digits: Number(network.digits),
      showLastNonZeroDecimal: false,
      addCommas
    });

  const formattedAmount = getFormattedAmount({ addCommas: true });
  const rawAmount = getFormattedAmount({ addCommas: false });

  const scamReport = currentTransaction.receiverScamInfo;
  const classes = useSignStepsClasses(scamReport, globalStyles);

  const token = isNft ? nftId : tokenId || egldLabel;
  const shownAmount = isNft ? amount : formattedAmount;

  const { price: egldPrice } = useGetEgldPrice();
  let tokenPrice;

  if (isEgld && egldPrice) {
    tokenPrice = egldPrice;
  }

  if (isNft) {
    tokenPrice = null;
  }

  if (isEsdt && type) {
    tokenPrice = esdtPrice ?? null;
  }

  const shouldShowAmount =
    isEgld || isEsdt || (Boolean(type) && type !== NftEnumType.NonFungibleESDT);

  const data = currentTransaction.transaction.getData().toString();

  return (
    <div className={styles?.summary}>
      <div className={styles?.fields}>
        {isNft && type && (
          <NftSftPreviewComponent
            txType={type}
            tokenLabel={tokenLabel}
            tokenId={tokenId}
            tokenAvatar={tokenAvatar}
          />
        )}

        <ConfirmReceiver
          scamReport={scamReport}
          receiver={transactionReceiver}
        />

        <div className={styles?.columns}>
          {shouldShowAmount && (
            <div className={styles?.column}>
              <ConfirmAmount
                tokenAvatar={tokenAvatar}
                formattedAmount={shownAmount}
                rawAmount={rawAmount}
                token={token}
                tokenType={isEgld ? egldLabel : type}
                tokenPrice={tokenPrice}
              />
            </div>
          )}

          <div className={styles?.column}>
            <ConfirmFee
              tokenAvatar={tokenAvatar}
              egldLabel={egldLabel}
              transaction={currentTransaction.transaction}
            />
          </div>
        </div>

        {data && (
          <TransactionData
            className={inputGroupClassName}
            data={data}
            highlight={multiTxData}
            innerTransactionDataClasses={{
              transactionDataInputLabelClassName: inputLabelClassName,
              transactionDataInputValueClassName: inputValueClassName
            }}
            isScCall={!tokenId}
            transactionIndex={currentTransaction.transactionIndex}
          />
        )}

        {error && (
          <p className={classNames(classes.errorMessage, errorClassName)}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export const SignStepBody = withStyles(SignStepBodyComponent, {
  ssrStyles: () =>
    import(
      'UI/SignTransactionsModals/SignWithDeviceModal/components/signStepBodyStyles.scss'
    ),
  clientStyles: () =>
    require('UI/SignTransactionsModals/SignWithDeviceModal/components/signStepBodyStyles.scss')
      .default
});
