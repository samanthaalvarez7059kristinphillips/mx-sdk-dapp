import {
  CrossWindowProviderRequestEnums,
  CrossWindowProviderResponseEnums
} from '@multiversx/sdk-web-wallet-cross-window-provider/out/types';
export { CrossWindowProviderRequestEnums, CrossWindowProviderResponseEnums };

export enum TransactionServerStatusesEnum {
  pending = 'pending',
  fail = 'fail',
  invalid = 'invalid',
  success = 'success',
  executed = 'executed',
  notExecuted = 'not executed',
  rewardReverted = 'reward-reverted'
}

export enum SignedMessageStatusesEnum {
  pending = 'pending',
  failed = 'failed',
  signed = 'signed',
  cancelled = 'cancelled'
}

export enum TransactionBatchStatusesEnum {
  signed = 'signed',
  cancelled = 'cancelled',
  success = 'success',
  sent = 'sent',
  fail = 'fail',
  timedOut = 'timedOut',
  invalid = 'invalid'
}

export enum LoginMethodsEnum {
  ledger = 'ledger',
  walletconnect = 'walletconnect',
  walletconnectv2 = 'walletconnectv2',
  wallet = 'wallet',
  extension = 'extension',
  opera = 'opera',
  extra = 'extra',
  none = ''
}

export enum NotificationTypesEnum {
  warning = 'warning',
  error = 'error',
  success = 'success'
}

export enum TypesOfSmartContractCallsEnum {
  MultiESDTNFTTransfer = 'MultiESDTNFTTransfer',
  ESDTNFTTransfer = 'ESDTNFTTransfer'
}

export enum EnvironmentsEnum {
  testnet = 'testnet',
  devnet = 'devnet',
  mainnet = 'mainnet'
}

export enum ToastsEnum {
  custom = 'custom',
  transaction = 'transaction'
}

export enum TransactionTypesEnum {
  MultiESDTNFTTransfer = 'MultiESDTNFTTransfer',
  ESDTTransfer = 'ESDTTransfer',
  ESDTNFTBurn = 'ESDTNFTBurn',
  ESDTNFTTransfer = 'ESDTNFTTransfer',
  esdtTransaction = 'esdtTransaction',
  nftTransaction = 'nftTransaction',
  scCall = 'scCall'
}

export enum TransactionsDefaultTitles {
  success = 'Transaction successful',
  failed = 'Transaction failed',
  pending = 'Processing transaction',
  timedOut = 'Transaction timed out',
  // Appears in batch transactions when the batch status is invalid (set the batch status to invalid for each transaction)
  invalid = 'Transaction invalid'
}

export enum PlatformsEnum {
  ios = 'ios',
  reactNative = 'reactNative',
  web = 'web',
  webWallet = 'webWallet'
}

export enum WebViewProviderRequestBaseEnums {
  signTransactionsWithGuardianResponse = 'SIGN_TRANSACTIONS_WITH_GUARDIAN_RESPONSE',
  reloginRequest = 'RELOGIN_REQUEST'
}
export const WebViewProviderRequestEnums = {
  ...CrossWindowProviderRequestEnums,
  ...WebViewProviderRequestBaseEnums
};

export enum WebViewProviderResponseBaseEnums {
  reloginResponse = 'RELOGIN_RESPONSE'
}

export const WebViewProviderResponseEnums = {
  ...CrossWindowProviderResponseEnums,
  ...WebViewProviderResponseBaseEnums
};
