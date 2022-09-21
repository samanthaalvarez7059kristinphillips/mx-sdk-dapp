
# dapp-core

> A library that holds the core functional logic of a dapp on the Elrond Network

[![NPM](https://img.shields.io/npm/v/dapp-core.svg)](https://www.npmjs.com/package/@elrondnetwork/dapp-core) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

See [Dapp template](https://dapp-template.elrond.com/) for live demo or checkout usage in the [Github repo](https://github.com/ElrondNetwork/dapp-template)

# Installation

The library can be installed via npm or yarn.

```bash
npm install @elrondnetwork/dapp-core
```

or

```bash
yarn add @elrondnetwork/dapp-core
```

If you need only the dapp-core basic logic, without the additional UI, consider using the `--no-optional` flag.
This will not install the packages needed for the optional UI components.

```bash
npm install @elrondnetwork/dapp-core --no-optional
```

or

```bash
yarn add @elrondnetwork/dapp-core --no-optional
```

### **If you're transitioning from dapp-core 1.x to dapp-core 2.0, please read the [Migration guide](https://github.com/ElrondNetwork/dapp-core/wiki/Migration-guide-2.0)**

# Usage

dapp-core aims to abstract and simplify the process of interacting with users' wallets and with the Elrond Network, allowing developers to easily get started with a new application or integrate dapp-core into an existing application.

This library covers two main areas: **User Identity** and **Transactions**. The API for interacting with library's logic is exposed via hooks and methods that can be called for logging in the user, getting the status of the user or sending transactions.

However, to simplify usage even further, the library also comes with a default UI that already uses these hooks and methods under the hood. These UI elements can be easily customized with custom css classes.

The default UI is exposed via the `UI` module.

`import * as DappUI from "@elrondnetwork/dapp-core/UI";`

**Please be aware that this style of importing might also import unused code.**


To reduce the amount of dead code, you can use named imports for each component like

```typescript
import { UnlockPage } from "@elrondnetwork/dapp-core/UI/pages";
or
import { UnlockPage } from "@elrondnetwork/dapp-core/UI/pages/UnlockPage";
```

More on this below.

## Prerequisites

There are a couple of requirements that need to be met for the application to work properly.

***If you experience bugs, please make sure that you read these, before opening an issue***

<details>
  <summary>
      React
  </summary>

### React

This library was built for applications that use React, it might not be suitable for usage with other libraries or frameworks.

  </details>

<details>
  <summary>
    DappProvider
 </summary>

### DappProvider

You need to wrap your application with the **DappProvider** component, which is exported by the library, as we need to create a global Context to be able to manipulate the data.

- import the Provider:

```typescript
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers/DappProvider';
or
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
```
- Wrap your application with this Provider.

```jsx
<DappProvider
    environment="devnet"
    customNetworkConfig={customNetworkConfig}
>
```
`environment` is a required key that is needed to configure the app's endpoints for a specific environment. Accepted values are `testnet`, `devnet` and `mainnet` (also configured in `EnvironmentsEnum`)

DappProvider also accepts an optional `customNetworkConfig` object with a couple of keys.
This allows using different APIs and different connection providers to configure your network configuration.

**All keys are optional**

```typescript
{
  id?: string;
  name?: string;
  egldLabel?: string;
  decimals?: string;
  digits?: string;
  gasPerDataByte?: string;
  walletConnectDeepLink?: string; // a string that will create a deeplink for an application that is used on a mobile phone, instead of generating the login QR code.
  walletConnectBridgeAddresses?: string; // a string that is used to establish the connection to walletConnect library;
  walletAddress?: string;
  apiAddress?: string;
  explorerAddress?: string;
  apiTimeout?: 4000;
}
```


  </details>

<details>
  <summary>
    UI Wrappers
 </summary>

### UI Wrappers

The library exposes a couple of Components that are connected to the redux store and are used to display various elements
when something happens inside the app:

- `TransactionsToastList` will display new transactions in nice toasts at the bottom of the screen. This component is fully customizable.

```jsx
  import {TransactionsToastList} from "@elrondnetwork/dapp-core/UI/TransactionsToastList";

  <App>
    <TransactionsToastList
      toastId?: string,
      title: string,
      className?: string
    />
    <Content/>
  </App>

```

- `SignTransactionsModals` will show a modal when a new transaction is submitted, prompting the user to verify and sign it.

**Important! This is required** to make transactions work, except when you use hooks to sign the transactions manually (more on this below).

```jsx
  import {SignTransactionsModals} from "@elrondnetwork/dapp-core/UI/SignTransactionsModals";

  <App>
    <SignTransactionsModals />
    <Content/>
  </App>
```

`NotificationModal` Will show a modal to the user with various warnings and errors.

```jsx
  import {NotificationModal} from "@elrondnetwork/dapp-core/UI/NotificationModal";

  <App>
    <NotificationModal />
    <Content/>
  </App>
```

If you want to show custom notifications, you can use the `useGetNotification` hook to get the notifications (like insufficient funds, errors etc).

</details>

## User Identity

Dapp-core makes logging in and persisting user's session easy and hassle-free.

A handy component is AuthenticatedRoutesWrapper, which can be used to protect certain routes and redirect the user to login page if the user is not authenticated.

Import from dapp-core:

```typescript
import { AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core/wrappers/AuthenticatedRoutesWrapper';
or
import { AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core/wrappers';
```

Use with routes:

```jsx
  <AuthenticatedRoutesWrapper
    routes={routes}
    unlockRoute="/unlock"
  >
    {appContent}
  </AuthenticatedRoutesWrapper>
```

**routes** should be an array with objects with a signature similar to this:

```typescript
{
    path: "/dashboard",
    title: "Dashboard",
    component: Dashboard,
    authenticatedRoute: true,
  }
```

The important parts that makes this component work are the flag **authenticatedRoute: true** and the key **path**, which means that this route should be accessible only to authenticated users.

  <details>
    <summary>
      Login UI
  </summary>

### Login UI

There are a couple of very handy React components that can be used to login the user and protect certain routes if the user is not logged in.

Under the `DappUI` object mentioned above, you can find 4 buttons (one for each provider) which abstract away all the logic of loggin in the user and render the default UI. These buttons can be easily customized with a custom css class.
The exported buttons are:

- ExtensionLoginButton
- WalletConnectLoginButton
- LedgerLoginButton
- WebWalletLoginButton

example:

```jsx
<ExtensionLoginButton
  callbackRoute="/dashboard"
  buttonClassName="extension-login"
  loginButtonText="Extension login"
/>
```

They can also be used with children

```jsx
<ExtensionLoginButton
  callbackRoute="/dashboard"
  buttonClassName="extension-login"
  loginButtonText="Extension login"
>
  <>
    <icon/>
    <p>Login text</p>
  <>
</ExtensionLoginButton>
```

`WalletConnectLoginButton` and `LedgerLoginButton` will trigger a modal with a QR code and the ledger login UI, respectively.
These are automatically triggered by the buttons.

If, however, you want access to these containers without the buttons,
you can easily import and use them.

```jsx
<WalletConnectLoginContainer
  callbackRoute={callbackRoute}
  loginButtonText="Login with Maiar"
  title='Maiar Login',
  logoutRoute='/unlock',
  className='wallect-connect-login-modal',
  lead='Scan the QR code using Maiar',
  wrapContentInsideModal={wrapContentInsideModal}
  redirectAfterLogin={redirectAfterLogin}
  token={token}
  onLoginRedirect={onLoginRedirect}
  onClose={onClose}
  isWalletConnectV2={true} // by default is false and will use walletconnect version 1
  />
```

```jsx
<LedgerLoginContainer
  callbackRoute={callbackRoute}
  className='ledger-login-modal',
  wrapContentInsideModal={wrapContentInsideModal}
  redirectAfterLogin={redirectAfterLogin}
  token={token}
  onClose={onClose}
  onLoginRedirect={onLoginRedirect}
  />
```

All login buttons and hooks accept a prop called `redirectAfterLogin` which specifies of the user should be redirected automatically after login.
The default value for this boolean is false, since most apps listen for the "isLoggedIn" boolean and redirect programmatically.


Another handly component is AuthenticatedRoutesWrapper, which can be used to protect certain routes and redirect the user to login page if the user is not authenticated.

Import from dapp-core:

```typescript
import { AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core/wrappers/AuthenticatedRoutesWrapper';
```

Use with routes:

```jsx
<AuthenticatedRoutesWrapper
    routes={routes}
    unlockRoute={routeNames.unlock}
  >
    {appContent}
  </AuthenticatedRoutesWrapper>
```

**routes** should be an array with objects with a signature similar to this:

```typescript
{
    path: "/dashboard",
    title: "Dashboard",
    component: Dashboard,
    authenticatedRoute: true,
  }
```

The important parts that makes this component work are the flag **authenticatedRoute: true** and the key **path**, which means that this route should be accessible only to authenticated users.

</details>

  <details><summary>
Login hooks
  </summary>

### Login hooks

This area covers the login hooks, which expose a trigger function and the login data, ready to be rendered.

These hooks are exposed as named exports, which can be imported from dapp-core:

```typescript
import { useExtensionLogin, useWalletConnectLogin, useLedgerLogin, useWebWalletLogin } from '@elrondnetwork/dapp-core/hooks';
or
import { useExtensionLogin } from '@elrondnetwork/dapp-core/hooks/login/useExtensionLogin';
import { useWalletConnectLogin } from '@elrondnetwork/dapp-core/hooks/login/useWebWalletLogin';
import { useLedgerLogin } from '@elrondnetwork/dapp-core/hooks/login/useLedgerLogin';
import { useWebWalletLogin } from '@elrondnetwork/dapp-core/hooks/login/useWebWalletLogin';
```

There are 4 available hooks:

- useExtensionLogin
- useWalletConnectLogin
- useLedgerLogin
- useWebWalletLogin

All hooks have the same response signature:

return type is as follows:

```typescript
const [initiateLogin, genericLoginReturnType, customLoginReturnType] = useLoginHook({
    callbackRoute,
    logoutRoute,
    onLoginRedirect,
  });
```

- **initiateLogin** is a function that needs to be called for the login flow to be initiated;
- **genericLoginReturnType** is an object that is exactly the same for all hooks:

```typescript
{
  error: string,
  loginFailed: boolean,
  isLoading: boolean,
  isLoggedIn: boolean
}
```

- **customLoginReturnType** is an object that is custom for each hook and returns specific data for that login:

  - null for useExtensionLogin;

  - null for useWebWalletConnect;

  - `{ uriDeepLink: string, qrCodeSvg: svgElement }` for useWalletConnectLogin;

  -

```typescript
{
  accounts: string[];
  showAddressList: boolean;
  startIndex: number;
  selectedAddress: SelectedAddress | null;
  onGoToPrevPage: () => void;
  onGoToNextPage: () => void;
  onSelectAddress: (address: SelectedAddress | null) => void;
  onConfirmSelectedAddress: () => void;
}
```

for useLedgerLogin;

</details>

  <details>
<summary>
Reading User State
  </summary>

### Reading User State

Once logged in, the user's session is persisted and can be read and deleted via a couple of handy functions.

For logging out, the library exposes a simple function called **logout**, which can be called to clear the user data.

the function accepts 2 arguments:
- `callbackUrl: string (optional)` the url to redirect the user to after logging him out
- `onRedirect: (callbackUrl: string) => void (optional)` a function that will be called instead of redirecting the user.
This allows you to control how the redirect is done, for example, with react-router-dom, instead of window.location.href assignment.
*Important* this function will not be called for web wallet logout

You can opt-in for using the `useIdleTimer` hook, which logs out the user after a period of inactivity (default set to 10 minutes). Optionally it accepts an `onLogout` function that fulfills your dapp's specific logout business logic. Make sure to call the above `logout` function inside this `onLogout` callback.

You can also opt-in for using the `useRegisterWebsocketListener` hook. The hooks accepts a callback which will get fired once a websocket message is received, receiving the `string` argument provided by the event. Optionally you can simply listen to changes on account/transactions with the `useGetWebsocketEvent` hook.

There are 2 ways of reading the user current state: hooks (to be used inside components and for reacting to changes in the data) and simple functions (for reading data outside of React components or inside handlers).

- hooks: `useGetLoginInfo, useGetAccountInfo, useGetNetworkConfig, useGetWebsocketEvent`;
- functions: `getAccount, getAccountBalance, getAccountShard, getAddress, getIsLoggedIn;`

</details>

## Transactions

The dapp-core library exposes a straight-forward way of sending transactions and tracking their status, with a couple of handy UI components;

<details><summary>
Sending Transactions
  </summary>

### Sending Transactions

The API for sending transactions is a function called **sendTransactions**:

`import { sendTransactions } from "@elrondnetwork/dapp-core";`

It can be used to send a transaction with minimum information:

```typescript
const { sessionId, error } = await sendTransactions({
    transactions: [
        {
          value: '1000000000000000000',
          data: 'ping',
          receiver: contractAddress
        },
      ],
    callbackRoute?: string // (optional, defaults to window.location.pathname) the route to be redirected to after signing. Will not redirect if the user is already on the specified route;
    transactionsDisplayInfo: TransactionsDisplayInfoType // (optional, default to null) custom message for toasts texts;
    minGasLimit?: number (optional, defaults to 50_000);
    sessionInformation?: any (optional, defaults to null) extra sessionInformation that will be passed back to you via getSignedTransactions hook;
    signWithoutSending?: boolean // (optional, defaults to false), the transaction will be signed without being sent to the blockchain;
    completedTransactionsDelay?: number // delay the transaction status from going into "successful" state;
    redirectAfterSigning?: boolean // (optional, defaults to true), whether to redirect to the provided callbackRoute;
    });
```

It returns a Promise that will be fulfilled with `{error?: string; sessionId: string | null;}`

`sessionId` is the transaction's batch id which can be used to track a transaction's status and react to it.

**Important! For the transaction to be signed, you will have to use either  `SignTransactionsModals` defined above, in the `Prerequisites` section,
or the `useSignTransactions` hook defined below. If you don't use one of these, the transactions won't be signed**

</details>

<details><summary>
Transaction Signing Flow
  </summary>

### Transaction Signing Flow

Once a transaction has been submitted, you have to use either the `SignTransactionsModals` or the `useSignTransactions` hook,
for the user to be prompted in his provider (Extension, Maiar etc) to sign the transaction.

If you don't want to use the default modals that appear for the user when the signing process happens,
you have to use the `useSignTransactions` hook to sign those transactions.

```typescript
 const {
    callbackRoute,
    transactions,
    error,
    sessionId,
    onAbort,
    hasTransactions,
    canceledTransactionsMessage
  } = useSignTransactions();
```

This hook will let you know if there are any transactions and you can programmatically abort the signing process.

We suggest displaying a message on the screen that confirms the transaction that needs to be signed.

You can also get the provider via

```typescript
  const { providerType, provider } = useGetAccountProvider();
```

and use that to display an appropriate message to the user.

For ledger, signing a transaction is simple if you're using the `SignTransactionsModal` component.

It is fully customizable and will take care of walking the user through the signing flow.

If, however, you want to implement a different experience, you will have to use the `useSignTransactionsWithLedger` hook.

it accepts the following props:

```typescript
{
  onCancel: () => void;
}
```

and returns an object with the following keys:

```typescript
{
  onSignTransaction: () => void;
  onNext: () => void;
  onPrev: () => void;
  waitingForDevice: boolean;
  onAbort: (e: React.MouseEvent) => void;
  isLastTransaction: boolean;
  currentStep: number;
  signedTransactions?: Record<string, Transaction>;
  currentTransaction: {
      transaction: Transaction;
      transactionTokenInfo: {
          tokenId: string;
          amount: string;
          receiver: string;
          type?: string;
          nonce?: string;
          multiTxData?: string;
      };
      isTokenTransaction: boolean;
      tokenDecimals: number;
      dataField: string;
  };
  }
```

</details>

<details><summary>
Tracking a transaction
  </summary>

### Tracking a transaction

The library exposes a hook called useTrackTransactionStatus;

```typescript
import {useTrackTransactionStatus} from @elrondnetwork/dapp-core/hooks;

const transactionStatus = useTrackTransactionStatus({
  transactionId: sessionId,
  onSuccess,
  onFail,
  onCancelled,
});
```

transactionStatus has the following information about the transaction:

```typescript
{
  isPending,
  isSuccessful,
  isFailed,
  isCancelled,
  errorMessage,
  status,
  transactions
}
```

It's safe to pass in `null` as a sessionId, so if the transaction wasn't yet sent, the hook will just return an empty object.

</details>

<details><summary>
Tracking transactions' statuses
  </summary>

### Tracking transactions' statuses

Dapp-core also exposes a number of handy hooks for tracking all, pending, failed, successful and timed out transactions.

Use:

- `useGetPendingTransactions` to get a list of all pending transactions.
- `useGetSuccessfulTransactions` to get a list of all successful transactions.
- `useGetFailedTransactions` to get a list of all pending transactions.

An especially useful hook called `useGetActiveTransactionsStatus` will keep you updated with the status
of all transactions at a certain point in time.

it's return signature is

```typescript
{
  pending: boolean, // at least one transaction is pending;
  hasPendingTransactions: boolean, // the user has at least 1 pending transaction active;
  timedOut: boolean, // there are no pending transactions and at least one has timed out;
  fail: boolean, // there are no pending and no timedOut transactions and at least one has failed;
  success: boolean, // all transactions are successful and all smart contract calls have been processed successfully;
}
```

</details>

  <details><summary>
Transaction Toasts UI
  </summary>

### Transaction Toasts UI

dapp-core also exposes a toast component for tracking transactions that uses the above mentioned hooks and displays toasts with transactions statuses.

The toasts list is exposed via **TransactionsToastList** UI component and can be used just by rendering it inside the application.
`TransactionToastList` component renders also custom toasts. A custom toast can be added using the util function: `addNewCustomToast` and can be removed using `deleteCustomToast`

When `TransactionToastList` is also used for displaying custom toasts, is enough to call `addNewCustomToast` to add new custom toast to the list;

```jsx
<App>
  <Router/>
  <TransactionsToastList />
</App>
```

**Important**: This has to be inside the `<DappProvider/>` children.

In case you don't want to use `TransactionToastList` and just display a custom toast, then you have to import `CustomToast` component
```jsx
const customToast = addNewCustomToast(
  {
    toastId: 'toast-id',
    message: '',
    type: 'custom',
    duration: 2000
  }
);

<CustomToast
  {...customToast}
  onDelete: () => deleteCustomToast(toastId)
 />
```

</details>

  <details><summary>
Removing transactions manually
  </summary>

### Removing transactions manually
Dapp-core takes care to change transactions' statuses and removes them when needed,
but if you need to do this manually, you can use the exposed functions for this:

```typescript
  removeTransactionsToSign(sessionId);
  removeSignedTransaction(sessionId);
  removeAllTransactionsToSign();
  removeAllSignedTransactions();

```

</details>

# Unit testing with Jest

The dapp-core library exposes bundles for both CommonJS and ESModules, however, in some enviornments, Jest might require manual mapping of the CommonJS output. To implement it, add the following snippet inside your jest config file.

```javascript
moduleNameMapper: {
    '@elrondnetwork/dapp-core/(.*)':
      '<rootDir>/node_modules/@elrondnetwork/dapp-core/__commonjs/$1.js'
}
```
# Dapp-core exports

Since version 2.0, dapp-core does not have a default export object.
You have to import everything from its own separate module. Below you can find all the exports.

You can either import everything from a module, or if you really want to make sure you're not importing anything
that is not used, you can import everything from its own file.

You can either go into their specific folder in the module for extra trimming, or import everything together.

for example, these 2 imports are both valid:

```typescript
import { useExtensionLogin, useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
```
and
```typescript
import { useExtensionLogin } from '@elrondnetwork/dapp-core/hooks/login';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks/account';

```

## constants exports

```typescript
import {
  GAS_PRICE_MODIFIER,
  GAS_PER_DATA_BYTE,
  GAS_LIMIT,
  GAS_PRICE,
  DECIMALS,
  DIGITS,
  mnemonicWords,
  ledgerErrorCodes,
  fallbackNetworkConfigurations
 } from '@elrondnetwork/dapp-core/constants';
```

## hooks exports

### Login

```typescript
import {
  useExtensionLogin,
  useLedgerLogin,
  useWalletConnectLogin,
  useWebWalletLogin
} from '@elrondnetwork/dapp-core/hooks/login';
```

### Account
```typescript
import {
  useGetAccount, // if you only need the account as on network
  useGetAccountInfo, // if you need all account information from store
  useGetAccountProvider,
  useGetLoginInfo,
  useGetWebsocketSignalTimestamp // get a Date.now() timestamp every time a change occurs on the account on network
 } from '@elrondnetwork/dapp-core/hooks/account';
```

### Transactions
```typescript
import {
  useCheckTransactionStatus,

  useGetActiveTransactionsStatus,
  useGetFailedTransactions,
  useGetPendingTransactions,
  useGetSignedTransactions,
  useGetSignTransactionsError,
  useGetSuccessfulTransactions,

  useGetTokenDetails,
  useGetTransactionDisplayInfo,
  useParseMultiEsdtTransferData,

  useParseSignedTransactions,
  useSignMultipleTransactions,
  useSignTransactions,
  useSignTransactionsWithDevice,
  useSignTransactionsWithLedger,
} from '@elrondnetwork/dapp-core/hooks/transactions';
```

### Misc
```typescript
import {
  useDebounce,
  useGetNetworkConfig,
  useGetNotification,
  useUpdateEffect
} from '@elrondnetwork/dapp-core/hooks';
```

## services exports

```typescript
import {
  removeTransactionsToSign,
  removeSignedTransaction,
  removeAllSignedTransactions,
  removeAllTransactionsToSign,
  isCrossShardTransaction,
  sendTransactions,
  signTransactions,
  calcTotalFee
} from '@elrondnetwork/dapp-core/services';
```

## utils exports

### Account

```typescript
import {
  addressIsValid,
  getAccount,
  getAccountBalance,
  getAccountShard,
  getAddress,
  getLatestNonce,
  getShardOfAddress,
  refreshAccount,
  setNonce,
  signMessage
} from '@elrondnetwork/dapp-core/utils/account';
```

### Operations

```typescript
import {
  calculateFeeLimit,
  formatAmount,
  nominate,
  getUsdValue,
} from '@elrondnetwork/dapp-core/utils/operations';
```

### Transactions

```typescript
import {
  getTokenFromData,
  isTokenTransfer,
  parseMultiEsdtTransferData,
  parseTransactionAfterSigning,
} from '@elrondnetwork/dapp-core/utils/transactions';
```

### Validation

```typescript
import {
 getIdentifierType,
 stringIsFloat,
 stringIsInteger,
 isContract,
 isStringBase64,
} from '@elrondnetwork/dapp-core/utils';
```

### Misc

```typescript
import {
  encodeToBase64,
  decodeBase64,
  logout,
  getTokenFromData,
  getIsLoggedIn,
  isSelfESDTContract,
  getAddressFromDataField,
} from '@elrondnetwork/dapp-core/utils';
```

## Wrappers

```typescript
import {
  DappProvider,
  AuthenticatedRoutesWrapper,
  AppInitializer,
} from '@elrondnetwork/dapp-core/wrappers';
```

## Web-specific imports

```typescript
import {
  useIdleTimer
} from '@elrondnetwork/dapp-core/web';
```


## UI

```typescript
import {
  CopyButton,
  FormatAmount,
  ExplorerLink,
  ExtensionLoginButton,
  LedgerLoginButton,
  LedgerLoginContainer,
  NotificationModal,
  PageState,
  ProgressSteps,
  SignTransactionsModals,
  SignWithDeviceModal,
  SignWithExtensionModal,
  SignWithLedgerModal,
  TransactionsToastList,
  TransactionToast,
  Trim,
  UsdValue,
  WalletConnectLoginButton,
  WalletConnectLoginContainer,
} from '@elrondnetwork/dapp-core/UI';
```

or

```typescript
import { CopyButton } from '@elrondnetwork/dapp-core/UI/CopyButton';
import { FormatAmount } from '@elrondnetwork/dapp-core/UI/FormatAmount';
import { ExplorerLink } from '@elrondnetwork/dapp-core/UI/ExplorerLink';

etc
```

**Important**: `shouldRenderDefaultCss` was removed from all components.


## React Native support

We are aware that there are projects out there that would like to use this library to allow users to seamlessly authenticate with Maiar.

You can use this library for its utility functions, like "formatAmount, parseAmount", mnemonic words list or its constants.

However, certain architectural decisions that we made do not work out of the box with React Native runtime (neither Metro nor Re.pack).
Due to this, you cannot yet use the DappProvider wrapping logic in a React Native application.

We have a couple of solutions in mind and are actively working on exploring ways to overcome these limitations.
Until then, you can use @elrondnetwork/erdjs libraries and @walletconnect to connect to Maiar.
There are also guide for doing this from the [community](https://github.com/S4F-IT/maiar-integration/blob/master/README.md)


## Roadmap

See the [open issues](https://github.com/ElrondNetwork/dapp-core/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

One can contribute by creating _pull requests_, or by opening _issues_ for discovered bugs or desired features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Developers

The [Elrond Team](https://elrond.com/team/).

## License

GPL-3.0-or-later
