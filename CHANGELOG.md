# Change Log

All notable changes will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [[v2.28.8]](https://github.com/multiversx/mx-sdk-dapp/pull/1062)] - 2024-03-07
- [Fixed base64 utils conversion](https://github.com/multiversx/mx-sdk-dapp/pull/1061)

## [[v2.28.7]](https://github.com/multiversx/mx-sdk-dapp/pull/1048)] - 2024-02-13
- [Updated AddressRow data-testids](https://github.com/multiversx/mx-sdk-dapp/pull/1047)

## [[v2.28.6]](https://github.com/multiversx/mx-sdk-dapp/pull/1044)] - 2024-02-08
- [Added option to access URL search param from application load time in `useParseSignedTransactions`](https://github.com/multiversx/mx-sdk-dapp/pull/1042)
- [Fixed wallet connect breaks login with other providers](https://github.com/multiversx/mx-sdk-dapp/pull/1043)
- [Fixed possibly undefined payload on custom toasts](https://github.com/multiversx/mx-sdk-dapp/pull/1036)

## [[v2.28.5]](https://github.com/multiversx/mx-sdk-dapp/pull/1036)] - 2024-02-01
- [Fixed logout with web wallet infinite loop](https://github.com/multiversx/mx-sdk-dapp/pull/1036)

## [[v2.28.4]](https://github.com/multiversx/mx-sdk-dapp/pull/1035)] - 2024-02-01
- [Reverted setting walletconnectV2 `accountProvider` on init](https://github.com/multiversx/mx-sdk-dapp/pull/1036)
- [Fixed setting `loginToken` in `nativeAuthService` losing previous state](https://github.com/multiversx/mx-sdk-dapp/pull/1034)
- [Fixed setting walletconnectV2 `accountProvider` on init](https://github.com/multiversx/mx-sdk-dapp/pull/1033)

## [[v2.28.3]](https://github.com/multiversx/mx-sdk-dapp/pull/1032)] - 2024-01-30
- [Added transaction toast wrapper id](https://github.com/multiversx/mx-sdk-dapp/pull/1031)

## [[v2.28.2]](https://github.com/multiversx/mx-sdk-dapp/pull/1030)] - 2024-01-26
- [Added support for `checkIsValidSender` with array option](https://github.com/multiversx/mx-sdk-dapp/pull/1029)

## [[v2.28.1]](https://github.com/multiversx/mx-sdk-dapp/pull/1028)] - 2024-01-25
- [Added support for Web Wallet multisig token login](https://github.com/multiversx/mx-sdk-dapp/pull/1027)


## [[v2.28.0]](https://github.com/multiversx/mx-sdk-dapp/pull/1022)] - 2024-01-11

- [Updated the min required Node version to 18, updated packages](https://github.com/multiversx/mx-sdk-dapp/pull/1021)

## [[v2.27.1]](https://github.com/multiversx/mx-sdk-dapp/pull/1020)] - 2024-01-10

- [Remove native auth token legacy support](https://github.com/multiversx/mx-sdk-dapp/pull/1018)

## [[v2.27.0]](https://github.com/multiversx/mx-sdk-dapp/pull/1017)] - 2024-01-09

- [Added Experimental Webview Provider](https://github.com/multiversx/mx-sdk-dapp/pull/1012)

## [[v2.26.7]](https://github.com/multiversx/mx-sdk-dapp/pull/1013)] - 2024-01-08

- [Prevent logout before webview login](https://github.com/multiversx/mx-sdk-dapp/pull/1012)

## [[v2.26.6]](https://github.com/multiversx/mx-sdk-dapp/pull/1011)] - 2024-01-05

- [Add custom request option for WC button](https://github.com/multiversx/mx-sdk-dapp/pull/1010)

## [[v2.26.5]](https://github.com/multiversx/mx-sdk-dapp/pull/1009)] - 2024-01-04

- [Fixed provider initialised check](https://github.com/multiversx/mx-sdk-dapp/pull/1008)

## [[v2.26.4]](https://github.com/multiversx/mx-sdk-dapp/pull/1007)] - 2024-01-04

- [Prevent redirects on logout if the provider is both of wallet type and initialised](https://github.com/multiversx/mx-sdk-dapp/pull/1006)

## [[v2.26.3]](https://github.com/multiversx/mx-sdk-dapp/pull/1005)] - 2024-01-03

- [Fix logout issue with web-wallet](https://github.com/multiversx/mx-sdk-dapp/pull/1004)

## [[v2.26.2]](https://github.com/multiversx/mx-sdk-dapp/pull/1003)] - 2023-12-21

- [Adds custom message request capability to webview provider](https://github.com/multiversx/mx-sdk-dapp/pull/1002)

## [[v2.26.1]](https://github.com/multiversx/mx-sdk-dapp/pull/1001)] - 2023-12-21

- [Remove sdk-network-providers from the dependencies](https://github.com/multiversx/mx-sdk-dapp/pull/1000)

## [[v2.26.0]](https://github.com/multiversx/mx-sdk-dapp/pull/998)] - 2023-12-20

- [Prevent logout action when not logged in or provider not initialized](https://github.com/multiversx/mx-sdk-dapp/pull/997)
- [Fix cancel sign message toast](https://github.com/multiversx/mx-sdk-dapp/pull/995)
- [⚠️ Breaking change: message signing URL to use `addOriginToLocationPath`](https://github.com/multiversx/mx-sdk-dapp/pull/994)

## [[v2.25.2]](https://github.com/multiversx/mx-sdk-dapp/pull/993)] - 2023-12-18

- [Upgrade sdks versions](https://github.com/multiversx/mx-sdk-dapp/pull/992)

## [[v2.25.1]](https://github.com/multiversx/mx-sdk-dapp/pull/991)] - 2023-12-14

- [Prevent provider logout when not logged in or initialized](https://github.com/multiversx/mx-sdk-dapp/pull/990)

## [[v2.25.0]](https://github.com/multiversx/mx-sdk-dapp/pull/988)] - 2023-12-14

- [Added latest `axios` version](https://github.com/multiversx/mx-sdk-dapp/pull/989)
- [Prevent redirect on logout if `callbackURL` is the current URL](https://github.com/multiversx/mx-sdk-dapp/pull/987)
- [Fix sign message with web wallet provider](https://github.com/multiversx/mx-sdk-dapp/pull/985)
- [⚠️ Breaking change: Fix typo in AxiosInterceptor](https://github.com/multiversx/mx-sdk-dapp/pull/984)

## [[v2.24.4]](https://github.com/multiversx/mx-sdk-dapp/pull/983)] - 2023-12-11

- [Add entire dappConfig into redux store](https://github.com/multiversx/mx-sdk-dapp/pull/982)
- [Fix CSS injection on SSR/Client side](https://github.com/multiversx/mx-sdk-dapp/pull/981)

## [[v2.24.3]](https://github.com/multiversx/mx-sdk-dapp/pull/979)] - 2023-11-29

- [Removed `senderUsername` and `receiverUsername` for `SetGuardian` tx](https://github.com/multiversx/mx-sdk-dapp/pull/978)
- [Added extra gas fee for guardian transactions](https://github.com/multiversx/mx-sdk-dapp/pull/977)

## [[v2.24.2]](https://github.com/multiversx/mx-sdk-dapp/pull/976)] - 2023-11-28

- [Fixed logout for wallet provider](https://github.com/multiversx/mx-sdk-dapp/pull/975)

## [[v2.24.1]](https://github.com/multiversx/mx-sdk-dapp/pull/974)] - 2023-11-28

- [Fixed logout redirect loop](https://github.com/multiversx/mx-sdk-dapp/pull/973)

## [[v2.24.0]](https://github.com/multiversx/mx-sdk-dapp/pull/972)] - 2023-11-24

- [Full SSR support](https://github.com/multiversx/mx-sdk-dapp/pull/971)

## [[v2.23.1]](https://github.com/multiversx/mx-sdk-dapp/pull/970)] - 2023-11-20

- [Changed transaction sender validation](https://github.com/multiversx/mx-sdk-dapp/pull/969)

## [[v2.23.0]](https://github.com/multiversx/mx-sdk-dapp/pull/956)] - 2023-10-13

- [Added xAlias login methods](https://github.com/multiversx/mx-sdk-dapp/pull/966)
- [Added `sdk-dapp-version` to web wallet communication](https://github.com/multiversx/mx-sdk-dapp/pull/964)
- [Fixed missing `await` for `refreshAccount` in `useCheckTransactionStatus`](https://github.com/multiversx/mx-sdk-dapp/pull/960)
- [Fixed `MultiESDTNFTTransfer` data field highlight and signing](https://github.com/multiversx/mx-sdk-dapp/pull/958)

## [[v2.22.5]](https://github.com/multiversx/mx-sdk-dapp/pull/956)] - 2023-10-13

- [Prevent "document/window is undefined" issue on Next.js](https://github.com/multiversx/mx-sdk-dapp/pull/955)
- [Update the WalletConnect provider to 4.0.4 (@walletconnect 2.10.2)](https://github.com/multiversx/mx-sdk-dapp/pull/957)

## [[v2.22.4]](https://github.com/multiversx/mx-sdk-dapp/pull/954)] - 2023-10-13

- [Integration tests](https://github.com/multiversx/mx-sdk-dapp/pull/953)

## [[v2.22.3]](https://github.com/multiversx/mx-sdk-dapp/pull/949)] - 2023-10-12

- [Add used indexes to addressTable component](https://github.com/multiversx/mx-sdk-dapp/pull/948)

## [[v2.22.2]](https://github.com/multiversx/mx-sdk-dapp/pull/947)] - 2023-10-12

- [Added `ESDTNFTBurn` to `getTokenFromData` helper](https://github.com/multiversx/mx-sdk-dapp/pull/946)
- [Added page reload on login redirect](https://github.com/multiversx/mx-sdk-dapp/pull/944)
- [Fixed `ModalContainer` not working in `StrictMode`](https://github.com/multiversx/mx-sdk-dapp/pull/943)

## [[v2.22.1]](https://github.com/multiversx/mx-sdk-dapp/pull/942)] - 2023-10-02

- [Fixed `WebWalletLoginButtonPropsType` interface](https://github.com/multiversx/mx-sdk-dapp/pull/942)

## [[v2.22.0]](https://github.com/multiversx/mx-sdk-dapp/pull/941)] - 2023-10-02

- [Added support for custom Web Wallet address](https://github.com/multiversx/mx-sdk-dapp/pull/940)

## [[v2.21.1]](https://github.com/multiversx/mx-sdk-dapp/pull/939)] - 2023-09-29

- [Added `getDefaultCallbackUrl` helper](https://github.com/multiversx/mx-sdk-dapp/pull/936)
- [Return native auth token when refreshing the token](https://github.com/multiversx/mx-sdk-dapp/pull/938)

## [[v2.21.0]](https://github.com/multiversx/mx-sdk-dapp/pull/933)] - 2023-09-21

- [Prevent duplicate custom toasts with the same ID](https://github.com/multiversx/mx-sdk-dapp/pull/932)
- [Extend UI/CopyButton icons](https://github.com/multiversx/mx-sdk-dapp/pull/931)

## [[v2.20.6]](https://github.com/multiversx/mx-sdk-dapp/pull/928)] - 2023-09-14

- [Add network option when refreshing a native auth token](https://github.com/multiversx/mx-sdk-dapp/pull/927)

## [[v2.20.5]](https://github.com/multiversx/mx-sdk-dapp/pull/925)] - 2023-09-14

- [Fix refreshNativeAuthTokenLogin signature](https://github.com/multiversx/mx-sdk-dapp/pull/924)

## [[v2.20.4]](https://github.com/multiversx/mx-sdk-dapp/pull/923)] - 2023-09-14

- [Fix custom transaction information overrides - missing properties on 'signed' state transition](https://github.com/multiversx/mx-sdk-dapp/pull/922)

## [[v2.20.3]](https://github.com/multiversx/mx-sdk-dapp/pull/920)] - 2023-09-13

- [Add back cancelAction when cancelling a transaction and remove it from transaction toast discard](https://github.com/multiversx/mx-sdk-dapp/pull/919)

## [[v2.20.2]](https://github.com/multiversx/mx-sdk-dapp/pull/913)] - 2023-09-13

- [Changed Ledger authentication texts for v.23 of MultiversX app](https://github.com/multiversx/mx-sdk-dapp/pull/910)
- [Fix transaction cancellation when a transaction toast is discarded](https://github.com/multiversx/mx-wallet-dapp/pull/915)

## [[v2.20.1]](https://github.com/multiversx/mx-sdk-dapp/pull/913)] - 2023-09-08

- [Fix double login when session is invalid and user is loggedout](https://github.com/multiversx/mx-sdk-dapp/pull/912)

## [[v2.20.0]](https://github.com/multiversx/mx-sdk-dapp/pull/911)] - 2023-09-07

- [Add batch transactions documentation](https://github.com/multiversx/mx-sdk-dapp/pull/909)
- [Batch transactions improvements](https://github.com/multiversx/mx-sdk-dapp/pull/905)

## [[v2.19.9]](https://github.com/multiversx/mx-sdk-dapp/pull/908)] - 2023-09-06

- [Changed `safeRedirect` method to force page reload on logout to ensure fresh states](https://github.com/multiversx/mx-sdk-dapp/pull/907)
- [Fix WalletConnect initialization on background regardless of the selected provider](https://github.com/multiversx/mx-sdk-dapp/pull/906)

## [[v2.19.8]](https://github.com/multiversx/mx-sdk-dapp/pull/904)] - 2023-09-04

- [Removed `loginMethod` from the `isLoggedIn` check](https://github.com/multiversx/mx-sdk-dapp/pull/903)

## [[v2.19.7]](https://github.com/multiversx/mx-sdk-dapp/pull/901)] - 2023-09-01

- [Added ledger usernames validation](https://github.com/multiversx/mx-sdk-dapp/pull/900)

## [[v2.19.6]](https://github.com/multiversx/mx-sdk-dapp/pull/899)] - 2023-08-31

- [Updated `sdk-web-wallet-provider` to support usernames](https://github.com/multiversx/mx-sdk-dapp/pull/898)
- [Added deprecated warnings for login button callbacks](https://github.com/multiversx/mx-sdk-dapp/commit/2e71fbeeebabe479f897db38f10972c55aca44af)

## [[v2.19.5]](https://github.com/multiversx/mx-sdk-dapp/pull/897)] - 2023-08-29

- [Fixed Ledger and Walletconnect login with modals](https://github.com/multiversx/mx-sdk-dapp/pull/895)
-

## [[v2.19.4]](https://github.com/multiversx/mx-sdk-dapp/pull/896)] - 2023-08-28

- [Memoize dappConfig in order to not trigger initializeApp on every DappProvider rerender](https://github.com/multiversx/mx-sdk-dapp/pull/894)

## [[v2.19.3]](https://github.com/multiversx/mx-sdk-dapp/pull/890)] - 2023-08-21

- [Added `DataTestIdsEnum` to `data-testid` HTML tags](https://github.com/multiversx/mx-sdk-dapp/pull/889)
- [Added `addOriginToLocationPath` helper to parse redirect URLs](https://github.com/multiversx/mx-sdk-dapp/pull/888)
- [Prevent signing transactions with sender different from current account](https://github.com/multiversx/mx-sdk-dapp/pull/887)
- [Added ledger login improvements and added support for bluetooth connect](https://github.com/multiversx/mx-sdk-dapp/pull/882)
- [Fixed WalletConnect Provider default logoutRoute](https://github.com/multiversx/mx-sdk-dapp/pull/886)
- [Bumped @multiversx/sdk-native-auth-client to fix RN issues](https://github.com/multiversx/mx-sdk-dapp/pull/885)
- [Fixed the malformed url due to the missing callbackRoute](https://github.com/multiversx/mx-sdk-dapp/pull/884)
- [Updated the @multiversx packages to their latest versions](https://github.com/multiversx/mx-sdk-dapp/pull/883)

## [[v2.19.2]](https://github.com/multiversx/mx-sdk-dapp/pull/881)] - 2023-07-28

- [Changed username fetching logic (skip fetching if already provided)](https://github.com/multiversx/mx-sdk-dapp/pull/880)

## [[v2.19.1]](https://github.com/multiversx/mx-sdk-dapp/pull/879)] - 2023-07-27

- [Added usernames' support](https://github.com/multiversx/mx-sdk-dapp/pull/878)

## [[v2.19.0]](https://github.com/multiversx/mx-sdk-dapp/pull/877)] - 2023-07-26

- [Fixed NextJS provider double mounting](https://github.com/multiversx/mx-sdk-dapp/pull/876)

## [[v2.18.5]](https://github.com/multiversx/mx-sdk-dapp/pull/875)] - 2023-07-24

- [Fixed `optionalRedirect` `setTimout` usage and window redirect](https://github.com/multiversx/mx-sdk-dapp/pull/873)
- [Fixed ledger signing reconnect](https://github.com/multiversx/mx-sdk-dapp/pull/874)
- [Added ledger transport mock](https://github.com/multiversx/mx-sdk-dapp/pull/871)
- [Fixed clear navigation url after signing a message](https://github.com/multiversx/mx-sdk-dapp/pull/872)

## [[v2.18.4]](https://github.com/multiversx/mx-sdk-dapp/pull/870)] - 2023-07-18

- [Fixed styles for the first sign screen buttons](https://github.com/multiversx/mx-sdk-dapp/pull/869)
- [Add support for signing messages with webviewProvider](https://github.com/multiversx/mx-sdk-dapp/pull/868)

## [[v2.18.3]](https://github.com/multiversx/mx-sdk-dapp/pull/867)] - 2023-07-14

-- [Updated @multiversx/sdk-wallet-connect-provider to 4.0.2](https://github.com/multiversx/mx-sdk-dapp/pull/866)
-- [Log the uri on debug env for WalletConnect](https://github.com/multiversx/mx-sdk-dapp/pull/865)

## [[v2.18.2]](https://github.com/multiversx/mx-sdk-dapp/pull/864)] - 2023-07-07

-- [Added `signTransactionsWithGuardianResponse` to WebViewProviderRequestEnums](https://github.com/multiversx/mx-sdk-dapp/pull/863)

## [[v2.18.1]](https://github.com/multiversx/mx-sdk-dapp/pull/862)] - 2023-07-05

- [Fix cancel transaction toast - close behavior. Add support for onClose handlers on custom toasts](https://github.com/multiversx/mx-sdk-dapp/pull/861)

## [[v2.18.0]](https://github.com/multiversx/mx-sdk-dapp/pull/860)] - 2023-07-05

- [Fix cancel transaction toast. Display the toast in the same container as the transaction toasts](https://github.com/multiversx/mx-sdk-dapp/pull/859)

- [Updated @multiversx/sdk-wallet-connect-provider to 4.0.0, Removed WalletConnect V1 Support](https://github.com/multiversx/mx-sdk-dapp/pull/785)

## [[v2.17.2]](https://github.com/multiversx/mx-sdk-dapp/pull/856)] - 2023-07-04

- [Fix WS reconnect](https://github.com/multiversx/mx-sdk-dapp/pull/857)
- [Fix window undefined in NextJS apps](https://github.com/multiversx/mx-sdk-dapp/pull/852)

## [[v2.17.1]](https://github.com/multiversx/mx-sdk-dapp/pull/854)] - 2023-07-03

- [Added `data-testid` to `AddressTable` component](https://github.com/multiversx/mx-sdk-dapp/pull/853)

## [[v2.17.0]](https://github.com/multiversx/mx-sdk-dapp/pull/851)] - 2023-06-30

- [Update fontawesome to LTS](https://github.com/multiversx/mx-sdk-dapp/pull/850)

- [Fix batch transactions status update when the WS response is received](https://github.com/multiversx/mx-sdk-dapp/pull/855)

## [[v2.16.0]](https://github.com/multiversx/mx-sdk-dapp/pull/849)] - 2023-06-28

- [Added support for component injection into custom toasts](https://github.com/multiversx/mx-sdk-dapp/pull/848)

## [[v2.15.2]](https://github.com/multiversx/mx-sdk-dapp/pull/843)] - 2023-06-27

- [Fixed AuthenticatedRoutesWrapper redirect condition](https://github.com/multiversx/mx-sdk-dapp/pull/846)
- [Fixed AuthenticatedRoutesWrapper blocking render on failed wallet login attempt](https://github.com/multiversx/mx-sdk-dapp/pull/845)
- [Added `verifyMessage` test](https://github.com/multiversx/mx-sdk-dapp/pull/844)

## [[v2.15.1]](https://github.com/multiversx/mx-sdk-dapp/pull/843)] - 2023-06-20

- [Fixed ledger init issue on Next.js](https://github.com/multiversx/mx-sdk-dapp/pull/842)

## [[v2.15.0]](https://github.com/multiversx/mx-sdk-dapp/pull/835)] - 2023-06-19

- [Added `on-pull-request.yml` script](https://github.com/multiversx/mx-sdk-dapp/pull/838)
- [Changed local native auth service with mx-sdk-js-native-auth-client package](https://github.com/multiversx/mx-sdk-dapp/pull/837)
- [Changed usage of `dataTestid` to `data-testid`](https://github.com/multiversx/mx-sdk-dapp/pull/836)

## [[v2.14.13]](https://github.com/multiversx/mx-sdk-dapp/pull/835)] - 2023-06-15

- [Fixed SignStep loading button for multiEsdtTransfers](https://github.com/multiversx/mx-sdk-dapp/pull/834)

## [[v2.14.12]](https://github.com/multiversx/mx-sdk-dapp/pull/833)] - 2023-06-14

- [Fixed possible invalid calls to network config endpoint](https://github.com/multiversx/mx-sdk-dapp/pull/832)
- [Fixed double setting of ledger provider on page reload](https://github.com/multiversx/mx-sdk-dapp/pull/827)

## [[v2.14.11]](https://github.com/multiversx/mx-sdk-dapp/pull/831)] - 2023-06-13

- [Fixed double signing same transaction in SignStep](https://github.com/multiversx/mx-sdk-dapp/pull/830)

## [[v2.14.10]](https://github.com/multiversx/mx-sdk-dapp/pull/828)] - 2023-06-09

- [Fixed infinite page reload using nextjs navigation](https://github.com/multiversx/mx-sdk-dapp/pull/822)

## [[v2.14.9]](https://github.com/multiversx/mx-sdk-dapp/pull/826)] - 2023-06-08

- [Added datatestids to login buttons](https://github.com/multiversx/mx-sdk-dapp/pull/825)

## [[v2.14.8]](https://github.com/multiversx/mx-sdk-dapp/pull/824)] - 2023-06-08

- [Fixed miscalculation of USD value of amount in sign flow summary](https://github.com/multiversx/mx-sdk-dapp/pull/823)

## [[v2.14.7]](https://github.com/multiversx/mx-sdk-dapp/pull/821)] - 2023-06-07

- [Fix nextjs hydration issue (duplicate DOM nodes)](https://github.com/multiversx/mx-sdk-dapp/pull/820)

## [[v2.14.6]](https://github.com/multiversx/mx-sdk-dapp/pull/819)] - 2023-06-06

- [Fix children loading issue in NextJs when using DappProvider](https://github.com/multiversx/mx-sdk-dapp/pull/818)

## [[v2.14.5]](https://github.com/multiversx/mx-sdk-dapp/pull/814)] - 2023-06-01

- [Added `data-testid` properties and improved `ConfirmAmount` component](https://github.com/multiversx/mx-sdk-dapp/pull/815)
- [Added extraInfo param for generating nativeAuth token](https://github.com/multiversx/mx-sdk-dapp/pull/813)

## [[v2.14.4]](https://github.com/multiversx/mx-sdk-dapp/pull/812)] - 2023-05-29

- [Added datatestids to toast elements](https://github.com/multiversx/mx-sdk-dapp/pull/811)
- [Fixed ESDTNFTTransaction parsedTransaction not assigning multiTxData on return object](https://github.com/multiversx/mx-sdk-dapp/pull/810)

## [[v2.14.3]](https://github.com/multiversx/mx-sdk-dapp/pull/809)] - 2023-05-27

- [Fixed batch transactions state after sending](https://github.com/multiversx/mx-sdk-dapp/pull/808)

- [Fixed default sign step title override](https://github.com/multiversx/mx-sdk-dapp/pull/807)

## [[v2.14.3]](https://github.com/multiversx/mx-sdk-dapp/pull/809)] - 2023-05-27

- [Fix batch transactions state after sending](https://github.com/multiversx/mx-sdk-dapp/pull/808)

- [Fixed default sign step title override](https://github.com/multiversx/mx-sdk-dapp/pull/807)

## [[v2.14.2]](https://github.com/multiversx/mx-sdk-dapp/pull/806)] - 2023-05-26

- [Fixed/window location for RN](https://github.com/multiversx/mx-sdk-dapp/pull/805)

- [Fixed toast progress for batch transactions when navigate across the app](https://github.com/multiversx/mx-sdk-dapp/pull/804)

- [Fixed failed transaction error message](https://github.com/multiversx/mx-sdk-dapp/pull/802)

- [Added sign steps indexing to distinguish multiple transaction signing](https://github.com/multiversx/mx-sdk-dapp/pull/803)

## [[v2.14.1]](https://github.com/multiversx/mx-sdk-dapp/pull/801)] - 2023-05-24

- [Fixed SignStepBody modularization](https://github.com/multiversx/mx-sdk-dapp/pull/800)

## [[v2.14.0]](https://github.com/multiversx/mx-sdk-dapp/pull/796)] - 2023-05-22

- [Fixed websocket reconnect issue](https://github.com/multiversx/mx-sdk-dapp/pull/797)
- [Updated layout for the sign transaction flow](https://github.com/multiversx/mx-sdk-dapp/pull/795)

## [[v2.13.8]](https://github.com/multiversx/mx-sdk-dapp/pull/794)] - 2023-05-18

- [Fixed early check mechanism for batch transactions (batch transactions tracker)](https://github.com/multiversx/mx-sdk-dapp/pull/793)

## [[v2.13.7]](https://github.com/multiversx/mx-sdk-dapp/pull/792)] - 2023-05-17

- [Added `type` to token data on sign screen, `getEconomicsInfo`, and `useGetEgldPrice` hook](https://github.com/multiversx/mx-sdk-dapp/pull/791)
- [Fix batch transactions fallbacks](https://github.com/multiversx/mx-sdk-dapp/pull/779)

## [[v2.13.6]](https://github.com/multiversx/mx-sdk-dapp/pull/790)] - 2023-05-17

- [Fix nonce management](https://github.com/multiversx/mx-sdk-dapp/pull/788)
- [Guarded account `gasLimit` update in `s` helper](https://github.com/multiversx/mx-sdk-dapp/pull/789)
- [Added flag `preventNonceUpdate` to prevent nonce update](https://github.com/multiversx/mx-sdk-dapp/pull/786)

## [[v2.13.5]](https://github.com/multiversx/mx-sdk-dapp/pull/784)] - 2023-05-13

- [Revert nonce management solution](https://github.com/multiversx/mx-sdk-dapp/pull/781)

## [[v2.13.4]](https://github.com/multiversx/mx-sdk-dapp/pull/782)] - 2023-05-12

- [Improve transaction nonce update management](https://github.com/multiversx/mx-sdk-dapp/pull/781)
- [Prevent updating transaction nonce during signing if nonce is present](https://github.com/multiversx/mx-sdk-dapp/pull/780)

## [[v2.13.3]](https://github.com/multiversx/mx-sdk-dapp/pull/773)] - 2023-05-10

- [Stop ledger double signing before leaving sign screen to 2FA hook](https://github.com/multiversx/mx-sdk-dapp/pull/777)
- [Fixed `dappConfig` not saved in redux store](https://github.com/multiversx/mx-sdk-dapp/pull/776)
- [Fixed cancel transactions flow with web wallet provider](https://github.com/multiversx/mx-sdk-dapp/pull/774)

## [[v2.13.2]](https://github.com/multiversx/mx-sdk-dapp/pull/773)] - 2023-05-09

- [Fixed ledger guardian error activation condition in SignStep](https://github.com/multiversx/mx-sdk-dapp/pull/746)

## [[v2.13.1]](https://github.com/multiversx/mx-sdk-dapp/pull/772)] - 2023-05-09

- [Prevent ledger signing of guarded transactions when MultiversX App is too old](https://github.com/multiversx/mx-sdk-dapp/pull/746)
- [Add batch transactions tracking mechanism](https://github.com/multiversx/mx-sdk-dapp/pull/745)

## [[v2.13.0]](https://github.com/multiversx/mx-sdk-dapp/pull/770)] - 2023-05-09

- [Added `getLedgerVersionOptions` helper](https://github.com/multiversx/mx-sdk-dapp/pull/769)
- [Added `getWebviewToken` helper](https://github.com/multiversx/mx-sdk-dapp/pull/768)

## [[v2.12.9]](https://github.com/multiversx/mx-sdk-dapp/pull/767)] - 2023-05-08

- [Fixed redirect to 2FA hook when `skipGuardian` is set](https://github.com/multiversx/mx-sdk-dapp/pull/766)
- [Fixed incorrect returns of `signMessage`](https://github.com/multiversx/mx-sdk-dapp/pull/765)

## [[v2.12.8]](https://github.com/multiversx/mx-sdk-dapp/pull/762)] - 2023-05-08

- [Fixed setting `skipGuardian` condtion](https://github.com/multiversx/mx-sdk-dapp/pull/761)

## [[v2.12.7]](https://github.com/multiversx/mx-sdk-dapp/pull/762)] - 2023-05-05

- [Allow skip guradian for change guardian transaction](https://github.com/multiversx/mx-sdk-dapp/pull/761)

## [[v2.12.6]](https://github.com/multiversx/mx-sdk-dapp/pull/758)] - 2023-05-05

- [Increment extension provider version](https://github.com/multiversx/mx-sdk-dapp/pull/758)

## [[v2.12.5]](https://github.com/multiversx/mx-sdk-dapp/pull/757)] - 2023-05-05

- [Added `ledgerSignature` to assets in `TokenType`](https://github.com/multiversx/mx-sdk-dapp/pull/756)
- [Fixed checking of base64 encoding in transaction data field](https://github.com/multiversx/mx-sdk-dapp/pull/755)

## [[v2.12.4]](https://github.com/multiversx/mx-sdk-dapp/pull/750)] - 2023-05-03

- [Fixed setting `hasGuardianScreen` flag in `useSignTransactionsWithDevice`](https://github.com/multiversx/mx-sdk-dapp/pull/749)

## [[v2.12.3]](https://github.com/multiversx/mx-sdk-dapp/pull/751)] - 2023-05-03

- [Added `hashSign` option to ledger guarded transactions`](https://github.com/multiversx/mx-sdk-dapp/pull/750)
- [Fixed `signMessage` and `verifyMessage` did not receive correct params and did not clear state `onAbort`](https://github.com/multiversx/mx-sdk-dapp/pull/749)

## [[v2.12.2]](https://github.com/multiversx/mx-sdk-dapp/pull/748)] - 2023-04-28

- [Extend `GuardianScreenType` with `address`](https://github.com/multiversx/mx-sdk-dapp/pull/747)
- [Fixed transaction data parsing in `newTransaction` method](https://github.com/multiversx/mx-sdk-dapp/pull/744)
- [Fixed setting `webviewProvider` overriding `externalProvider`](https://github.com/multiversx/mx-sdk-dapp/pull/746)
- [Remove duplicate `applySignature` from `newTransaction`](https://github.com/multiversx/mx-sdk-dapp/pull/740)

## [[v2.12.1]](https://github.com/multiversx/mx-sdk-dapp/pull/739)] - 2023-04-25

- [Revert transaction data](https://github.com/multiversx/mx-sdk-dapp/pull/738)]

## [[v2.12.0]](https://github.com/multiversx/mx-sdk-dapp/pull/737)] - 2023-04-25

- [Added `dappConfig` slice to control setting `webViewLogin`](https://github.com/multiversx/mx-sdk-dapp/pull/731)]
- [Guardian screen pre-release](https://github.com/multiversx/mx-sdk-dapp/pull/739)
- [Fixed transactions data and signature parsing](https://github.com/multiversx/mx-sdk-dapp/pull/738)

## [[v2.11.3]](https://github.com/multiversx/mx-sdk-dapp/pull/737)] - 2023-04-21

- [Added support for decoding login token within `decodeNativeAuthToken](https://github.com/multiversx/mx-sdk-dapp/pull/736)
- [Fixed transactions signing to prevent unnecessary clearing of URL search params](https://github.com/multiversx/mx-sdk-dapp/pull/735)

## [[v2.11.2]](https://github.com/multiversx/mx-sdk-dapp/pull/730)] - 2023-04-13

- [Fixed access to window by checking type](https://github.com/multiversx/mx-sdk-dapp/pull/730)

## [[v2.11.1]](https://github.com/multiversx/mx-sdk-dapp/pull/729)] - 2023-04-13

- [Fixed access to window object](https://github.com/multiversx/mx-sdk-dapp/pull/728)

## [[v2.11.0]](https://github.com/multiversx/mx-sdk-dapp/pull/725)] - 2023-04-12

- [Added Batch transactions support](https://github.com/multiversx/mx-sdk-dapp/pull/722)
- [Updated WalletConnect provider package](https://github.com/multiversx/mx-sdk-dapp/pull/726)

## [[v2.10.17]](https://github.com/multiversx/mx-sdk-dapp/pull/721)] - 2023-04-04

- [WalletConnect V2 Updated MultiversX Namespace](https://github.com/multiversx/mx-sdk-dapp/pull/720)

## [[v2.10.16]](https://github.com/multiversx/mx-sdk-dapp/pull/718)] - 2023-03-30

- [Fixed sanitizing VsCode callbackUrl](https://github.com/multiversx/mx-sdk-dapp/pull/717)
- [Added missing endpoints](https://github.com/multiversx/mx-sdk-dapp/pull/716)

## [[v2.10.15]](https://github.com/multiversx/mx-sdk-dapp/pull/715)] - 2023-03-28

- [Added missing component for `DappProvider` instead of `index`](https://github.com/multiversx/mx-sdk-dapp/pull/715)

## [[v2.10.14]](https://github.com/multiversx/mx-sdk-dapp/pull/714)] - 2023-03-28

- [Added missing component files instead of `index`](https://github.com/multiversx/mx-sdk-dapp/pull/713)

## [[v2.10.13]](https://github.com/multiversx/mx-sdk-dapp/pull/708)] - 2023-03-27

- [Optimized sign-message reducers](https://github.com/multiversx/mx-sdk-dapp/pull/707)
- [Fixed commonJS compilation to suit Jest testing](https://github.com/multiversx/mx-sdk-dapp/pull/711)
- [Changed `ExplorerLink` icon](https://github.com/multiversx/mx-sdk-dapp/pull/710)
- [Improved `Trim` debounce](https://github.com/multiversx/mx-sdk-dapp/pull/709)

## [[v2.10.12]](https://github.com/multiversx/mx-sdk-dapp/pull/703)] - 2023-03-16

- [Added existing params to clearing URL after signing with web-wallet](https://github.com/multiversx/mx-sdk-dapp/pull/705)

## [[v2.10.11]](https://github.com/multiversx/mx-sdk-dapp/pull/703)] - 2023-03-15

- [Fixed clearing URL after signing with web-wallet](https://github.com/multiversx/mx-sdk-dapp/pull/702)
- [Fixed accessing wallet without keystore index in `AddressTable`](https://github.com/multiversx/mx-sdk-dapp/pull/701)

## [[v2.10.10]](https://github.com/multiversx/mx-sdk-dapp/pull/700)] - 2023-03-15

- [Fix imports from native auth calling imports connected to redux store](https://github.com/multiversx/mx-sdk-dapp/pull/699)

## [[v2.10.9]](https://github.com/multiversx/mx-sdk-dapp/pull/698)] - 2023-03-15

- [Fixed interpreting ESDT in `parseMultiEsdtTransferData`](https://github.com/multiversx/mx-sdk-dapp/pull/697)

## [[v2.10.8]](https://github.com/multiversx/mx-sdk-dapp/pull/696)] - 2023-03-14

- [Fixed guard for undefined window object and type imports. Moved `getIsExtensionAvailable` to `utils/platform`](https://github.com/multiversx/mx-sdk-dapp/pull/695)

## [[v2.10.7]](https://github.com/multiversx/mx-sdk-dapp/pull/694)] - 2023-03-10

- [Added `data-testid` to Sign fields](https://github.com/multiversx/mx-sdk-dapp/pull/693)

## [[v2.10.6]](https://github.com/multiversx/mx-sdk-dapp/pull/692)] - 2023-03-09

- [Changed `TransactionDetailsBody` to always show `ExplorerLink`](https://github.com/multiversx/mx-sdk-dapp/pull/691)

## [[v2.10.5]](https://github.com/multiversx/mx-sdk-dapp/pull/690)] - 2023-03-07

- [Fixed `sanitizeCallbackUrl` return value](https://github.com/multiversx/mx-sdk-dapp/pull/690)
- [Fixed pending transaction toast animation](https://github.com/multiversx/mx-sdk-dapp/pull/681)

## [[v2.10.4]](https://github.com/multiversx/mx-sdk-dapp/pull/686)] - 2023-03-02

- [Added `useGetLastPendingTransactionHash` hook](https://github.com/multiversx/mx-sdk-dapp/pull/666)

## [[v2.10.3]](https://github.com/multiversx/mx-sdk-dapp/pull/685)] - 2023-03-01

- [Remove Bootstrap dependency for the 'authorizationInfo' text](https://github.com/multiversx/mx-sdk-dapp/pull/684)

## [[v2.10.2]](https://github.com/multiversx/mx-sdk-dapp/pull/682)] - 2023-03-01

- [Added `decodeLoginToken` helper; Added `authorizationInfo` in `LedgerLoginContainer` and `WalletConnectLoginContainer`](https://github.com/multiversx/mx-sdk-dapp/pull/680)

## [[v2.10.1]](https://github.com/multiversx/mx-sdk-dapp/pull/679)] - 2023-02-27

- [Changed `hostname` to `origin` in `defaultNativeAuthConfig`](https://github.com/multiversx/mx-sdk-dapp/pull/678)

## [[v2.10.0]](https://github.com/multiversx/mx-sdk-dapp/pull/677)] - 2023-02-27

- [Changed `useVerifyMessage` into `verifyMessage` and update return value](https://github.com/multiversx/mx-sdk-dapp/pull/676)
- [Updated `sdk-core` version](https://github.com/multiversx/mx-sdk-dapp/pull/675)
- [Changed `host` and `hostname` to `origin` in `decodeNativeAuthToken` and `getNativeAuthConfig` return types. Added `authorizationInfo` prop in `ScamPhishinAlert` component](https://github.com/multiversx/mx-sdk-dapp/pull/674)

## [[v2.9.4]](https://github.com/multiversx/mx-sdk-dapp/pull/673)] - 2023-02-26

- [Fixed message listening for Android](https://github.com/multiversx/mx-sdk-dapp/pull/672)

## [[v2.9.3]](https://github.com/multiversx/mx-sdk-dapp/pull/670)] - 2023-02-25

- [Fixed postMessage usage for Android](https://github.com/multiversx/mx-sdk-dapp/pull/671)
- [Fixed npm version displayed in readme](https://github.com/multiversx/mx-sdk-dapp/pull/669)
- [Fixed SSR support](https://github.com/multiversx/mx-sdk-dapp/pull/667)

## [[v2.9.2]](https://github.com/multiversx/mx-sdk-dapp/pull/666)] - 2023-02-24

- [Rewrite block hash logic to fix timing edge cases](https://github.com/multiversx/mx-sdk-dapp/pull/666)

## [[v2.9.1]](https://github.com/multiversx/mx-sdk-dapp/pull/665)] - 2023-02-24

- [Removed Extension button styling](https://github.com/multiversx/mx-sdk-dapp/pull/664)

## [[v2.9.0]](https://github.com/multiversx/mx-sdk-dapp/pull/663)] - 2023-02-24

- [Fixed data decode methods](https://github.com/multiversx/mx-sdk-dapp/pull/662)
- [Walletconnect V2 Multiple Namespaces](https://github.com/multiversx/mx-sdk-dapp/pull/657)

## [[v2.8.10]](https://github.com/multiversx/mx-sdk-dapp/pull/661)] - 2023-02-23

- [Fix husky crashing build](https://github.com/multiversx/mx-sdk-dapp/pull/661)

## [[v2.8.9]](https://github.com/multiversx/mx-sdk-dapp/pull/656)] - 2023-02-23

- [Fixed native auth block hash race condition](https://github.com/multiversx/mx-sdk-dapp/pull/656)
- [Fixed transaction toast progress animation](https://github.com/multiversx/mx-sdk-dapp/pull/654)

## [[v2.8.8]](https://github.com/multiversx/mx-sdk-dapp/pull/652)] - 2023-02-22

- [Added retry mechanism for block hash request](https://github.com/multiversx/mx-sdk-dapp/pull/651)

## [[v2.8.7]](https://github.com/multiversx/mx-sdk-dapp/pull/649)] - 2023-02-20

- [Added block hash shard to native auth config](https://github.com/multiversx/mx-sdk-dapp/pull/650)
- [Changed persist config to local configuration](https://github.com/multiversx/mx-sdk-dapp/pull/648)

## [[v2.8.6]](https://github.com/multiversx/mx-sdk-dapp/pull/647)] - 2023-02-20

- [Updated `nativeAuth` last block hash caching mechanism](https://github.com/multiversx/mx-sdk-dapp/pull/645)
- [Fixed `getScamFlag` method to skip uris and if verified](https://github.com/multiversx/mx-sdk-dapp/pull/646)

## [[v2.8.5]](https://github.com/multiversx/mx-sdk-dapp/pull/644)] - 2023-02-16

## [[v2.8.4]](https://github.com/multiversx/mx-sdk-dapp/pull/643)] - 2023-02-16

- [Added additional exports for redux store helpers](https://github.com/multiversx/mx-sdk-dapp/pull/643)
- [Changed `broadcastLogoutAcrossTabs` function to prevent tab logout for different address](https://github.com/multiversx/mx-sdk-dapp/pull/642)
- [Changed transaction toast message displayed for 1 transaction](https://github.com/multiversx/mx-sdk-dapp/pull/641)
- [Added additional class support for ledger](https://github.com/multiversx/mx-sdk-dapp/pull/639)

## [[v2.8.2]](https://github.com/multiversx/mx-sdk-dapp/pull/638)] - 2023-02-14

- [Fixed `stringIsFloat` function](https://github.com/multiversx/mx-sdk-dapp/pull/638)

## [[v2.8.1]](https://github.com/multiversx/mx-sdk-dapp/pull/637)] - 2023-02-14

- [Fix mainnet EGLD Label](https://github.com/multiversx/mx-sdk-dapp/pull/635)

## [[v2.8.]](https://github.com/multiversx/mx-sdk-dapp/pull/634)] - 2023-02-14

- [Upgrade fontawesome](https://github.com/multiversx/mx-sdk-dapp/pull/633)

## [[v2.7.1]](https://github.com/multiversx/mx-sdk-dapp/pull/632)] - 2023-02-13

- [Fixed ledger issues link](https://github.com/multiversx/mx-sdk-dapp/pull/632)

## [[v2.7.0]](https://github.com/multiversx/mx-sdk-dapp/pull/631)] - 2023-02-13

- [Added the ability to relogin into dapps from xPortal](https://github.com/multiversx/mx-sdk-dapp/pull/629)
- [Breaking change: **xPortal authentication panel layout and Sign Transaction panel layout**.

  Migration guide:

- Use `InnerWalletConnectComponentsClassesType` for styling xPortal screens and `signStepInnerClasses` for styling Sign Transaction modals.](https://github.com/multiversx/mx-sdk-dapp/pull/628)

## [[v2.6.3]](https://github.com/multiversx/mx-sdk-dapp/pull/626)] - 2023-02-10

- [Added caching mechanism for block hash](https://github.com/multiversx/mx-sdk-dapp/pull/625)

## [[v2.6.2]](https://github.com/multiversx/mx-sdk-dapp/pull/624)] - 2023-02-09

- [Fixed NFT display in Sign screen](https://github.com/multiversx/mx-sdk-dapp/pull/623)

## [[v2.6.1]](https://github.com/multiversx/mx-sdk-dapp/pull/622)] - 2023-02-08

- [Fixed addressTable component balance fetch](https://github.com/multiversx/mx-sdk-dapp/pull/621)

## [[v2.6.1]](https://github.com/multiversx/mx-sdk-dapp/pull/622)] - 2023-02-08

- [Fixed addressTable component balance fetch](https://github.com/multiversx/mx-sdk-dapp/pull/621)

## [[v2.6.0]](https://github.com/multiversx/mx-sdk-dapp/pull/620)] - 2023-02-06

- [Breaking change: **Ledger authentication panel layout**.

  Migration guide:

- Use `innerLedgerComponentsClasses` for styling Ledger screens.
- Addresses will trim if container is < 730px, needs to be at least that size.](https://github.com/multiversx/mx-sdk-dapp/pull/619)

## [[v2.5.1]](https://github.com/multiversx/mx-sdk-dapp/pull/618)] - 2023-02-04

- [Fixed ledger cancelled transactions state](https://github.com/multiversx/mx-sdk-dapp/pull/617)

## [[v2.5.0]](https://github.com/multiversx/mx-sdk-dapp/pull/615)] - 2023-02-04

- [Fixed sign transactions with web wallet when data field is empty](https://github.com/multiversx/mx-sdk-dapp/pull/614)
- [Added missing attributes of transaction types](https://github.com/multiversx/mx-sdk-dapp/pull/613)
- [Added Opera Crypto wallet provider - Beta](https://github.com/multiversx/mx-sdk-dapp/pull/600)
- [Added default SignTransactionModal for extra provider](https://github.com/multiversx/mx-sdk-dapp/pull/612)

## [[v2.4.0]](https://github.com/multiversx/mx-sdk-dapp/pull/610)] - 2023-02-03

- [Added support for webview provider automatic login](https://github.com/multiversx/mx-sdk-dapp/pull/609)
- [Extension and WalletConnect login rebranding](https://github.com/multiversx/mx-sdk-dapp/pull/611)

## [[v2.3.5]](https://github.com/multiversx/mx-sdk-dapp/pull/604)] - 2023-02-02

- [Skip login when address is prefilled](https://github.com/multiversx/mx-sdk-dapp/pull/607)

## [[v2.3.4]](https://github.com/multiversx/mx-sdk-dapp/pull/604)] - 2023-02-01

- [Sanitize web wallet login callback URL](https://github.com/multiversx/mx-sdk-dapp/pull/605)

## [[v2.3.3]](https://github.com/multiversx/mx-sdk-dapp/pull/604)] - 2023-01-31

- [Fixed erronated publish 2.3.2](https://github.com/multiversx/mx-sdk-dapp/pull/604)

## [[v2.3.2]](https://github.com/multiversx/mx-sdk-dapp/pull/603)] - 2023-01-31

- [Extracted ledger address screens control to separate hook](https://github.com/multiversx/mx-sdk-dapp/pull/602)

## [[v2.3.1]](https://github.com/multiversx/mx-sdk-dapp/pull/599)] - 2023-01-26

- [Added support to not show meridiem by default in `getHumanReadableTimeFormat` util function](https://github.com/multiversx/mx-sdk-dapp/pull/597)
- [Fixed web wallet cancelled login](https://github.com/multiversx/mx-sdk-dapp/pull/598)

## [[v2.3.0]](https://github.com/multiversx/mx-sdk-dapp/pull/596)] - 2023-01-20

- [Added support for autoLogout callback url](https://github.com/multiversx/mx-sdk-dapp/pull/594)
- [Fixed imports for React Native support](https://github.com/multiversx/mx-sdk-dapp/pull/595)

## [[v2.2.12]](https://github.com/multiversx/mx-sdk-dapp/pull/592)] - 2023-01-17

- [Created `useSignMessage` hook to support message signing](https://github.com/multiversx/mx-sdk-dapp/pull/578)

## [[v2.2.11]](https://github.com/multiversx/mx-sdk-dapp/pull/591)] - 2023-01-17

- [Fixed ledger address table display issue](https://github.com/multiversx/mx-sdk-dapp/pull/590)

## [[v2.2.10](https://github.com/multiversx/mx-sdk-dapp/pull/586)] - 2023-01-17

- [Revert "increase hw-provider package version"](https://github.com/multiversx/mx-sdk-dapp/pull/585)

## [[v2.2.10-alpha.0]](https://github.com/multiversx/mx-sdk-dapp/pull/584)] - 2023-01-17

- [Increase hw-provider package version](https://github.com/multiversx/mx-sdk-dapp/pull/583)
- [Change multiversX defi wallet store urls](https://github.com/multiversx/mx-sdk-dapp/pull/582)

## [[v2.2.9]](https://github.com/multiversx/mx-sdk-dapp/pull/577)] - 2023-01-12

- [Added partial support for Next.js](https://github.com/multiversx/mx-sdk-dapp/pull/559)

## [[2.2.8]](https://api.github.com/repos/multiversx/mx-sdk-dapp/pulls/557)] - 2023-01-12

- [Created first version of @multiversx/sdk-dapp](https://github.com/multiversx/mx-sdk-dapp/pull/538)

## [[2.2.7](https://api.github.com/repos/multiversx/mx-sdk-dapp/pulls/554)] - 2023-01-10

- [Changed branding from elrond to multiversx](https://github.com/multiversx/mx-sdk-dapp/pull/538)

## [[2.2.6](https://github.com/multiversx/mx-sdk-dapp/pull/531)] - 2023-01-09

- [Fixed cancel transaction toast position](https://github.com/multiversx/mx-sdk-dapp/pull/537)
- [Reverted WalletConnect provider to 2.1.0-beta.5 and stability fixes](https://github.com/multiversx/mx-sdk-dapp/pull/539)

## [[2.2.5](https://github.com/multiversx/mx-sdk-dapp/pull/531)] - 2023-01-05

- [Fixed fetching account twice on login. Populate shard from account.](https://github.com/multiversx/mx-sdk-dapp/pull/530)
- [Updated WalletConnect provider to 2.1.0-beta.6 and stability fixes](https://github.com/multiversx/mx-sdk-dapp/pull/529)
- [Refetch account data on network change](https://github.com/multiversx/mx-sdk-dapp/pull/526)

## [[2.2.4](https://github.com/multiversx/mx-sdk-dapp/pull/525)] - 2022-12-28

- [Fixed extension plain login](https://github.com/multiversx/mx-sdk-dapp/pull/523)

## [[2.2.3](https://github.com/multiversx/mx-sdk-dapp/pull/510)] - 2022-12-16

- [Fixed login on nativeAuth block failed](https://github.com/multiversx/mx-sdk-dapp/pull/516)
- [Changed CSS to exclude `!important;` and added className to transaction info components](https://github.com/multiversx/mx-sdk-dapp/pull/517)
- [Added missing actions to TransactionActionsEnum `AxiosInterceptorContext` response](https://github.com/multiversx/mx-sdk-dapp/pull/518)

## [[2.2.2](https://github.com/multiversx/mx-sdk-dapp/pull/512)] - 2022-12-16

- [Fixed loginHooks to have same response and changed `AxiosInterceptorContext` response](https://github.com/multiversx/mx-sdk-dapp/pull/511)

## [[2.2.1](https://github.com/multiversx/mx-sdk-dapp/pull/510)] - 2022-12-16

- [Changed logging in logic to allow signing custom token](https://github.com/multiversx/mx-sdk-dapp/pull/509)
- [Security issue fixed by substituting `anchorme` with linkify.js and fixed `getScamFlag` logic](https://github.com/multiversx/mx-sdk-dapp/pull/508)

## [[2.2.0](https://github.com/multiversx/mx-sdk-dapp/pull/507)] - 2022-12-14

- [Added Axios interceptor wrapper to be used with `nativeAuth`](https://github.com/multiversx/mx-sdk-dapp/pull/506)
- [Changed `signTransactions.ts` import to resolve Next.js support](https://github.com/multiversx/mx-sdk-dapp/pull/505)
- [Upgraded `@elrondnetwork/erdjs-web-wallet-provider` to vesion 2.1.2](https://github.com/multiversx/mx-sdk-dapp/pull/503)
- [Added `nativeAuth` and Storybook](https://github.com/multiversx/mx-sdk-dapp/pull/504)

## [[2.1.20](https://github.com/multiversx/mx-sdk-dapp/pull/500)] - 2022-12-07

- [Allow compatible versions of peer deps](https://github.com/multiversx/mx-sdk-dapp/pull/499)

## [[2.1.19](https://github.com/multiversx/mx-sdk-dapp/pull/498)] - 2022-12-05

- [Fixed web-wallet login on FireFox](https://github.com/multiversx/mx-sdk-dapp/pull/497)

## [[2.1.18](https://github.com/multiversx/mx-sdk-dapp/pull/495)] - 2022-12-01

- [Updated WalletConnect provider to 2.1.0-beta.5](https://github.com/multiversx/mx-sdk-dapp/pull/494)

## [[2.1.17](https://github.com/multiversx/mx-sdk-dapp/pull/493)] - 2022-12-01

- [Fixed setting incremental nonces when signing with ledger](https://github.com/multiversx/mx-sdk-dapp/pull/492)

## [[2.1.16](https://github.com/multiversx/mx-sdk-dapp/pull/490)] - 2022-11-29

- [Fixed logging out with wallet provider](https://github.com/multiversx/mx-sdk-dapp/pull/489)
- [Added `status` param to `getTransactions` API](https://github.com/multiversx/mx-sdk-dapp/pull/488)

## [[2.1.15](https://github.com/multiversx/mx-sdk-dapp/pull/486)] - 2022-11-21

- [Fixed sign new transaction with Ledger after cancelling transaction](https://github.com/multiversx/mx-sdk-dapp/pull/485)

## [[2.1.14](https://github.com/multiversx/mx-sdk-dapp/pull/482)] - 2022-11-21

- [Added custom toast to for displaying components](https://github.com/multiversx/mx-sdk-dapp/pull/481)

## [[2.1.13](https://github.com/multiversx/mx-sdk-dapp/pull/479)] - 2022-11-17

- [Changed custom toast to display transaction objects](https://github.com/multiversx/mx-sdk-dapp/pull/478)
- [Fixed the toast progress bar exceeding boundaries](https://github.com/multiversx/mx-sdk-dapp/pull/477)

## [[2.1.12](https://github.com/multiversx/mx-sdk-dapp/pull/476)] - 2022-11-16

- [Added icon functionality to custom toast](https://github.com/multiversx/mx-sdk-dapp/pull/475)

## [[2.1.11](https://github.com/multiversx/mx-sdk-dapp/pull/474)] - 2022-11-15

- [Changed `ConfirmationScreen` calling sign hooks depeding on device](https://github.com/multiversx/mx-sdk-dapp/pull/461)
- [Updated legacy peers type definitions](https://github.com/multiversx/mx-sdk-dapp/pull/460)

## [[2.1.10](https://github.com/multiversx/mx-sdk-dapp/pull/473)] - 2022-11-11

- [Fixed `getTrimmedHash` helper](https://github.com/multiversx/mx-sdk-dapp/pull/473)

## [[2.1.9](https://github.com/multiversx/mx-sdk-dapp/pull/472)] - 2022-11-11

- [Added `getTransactionLinkWithLabel` helper](https://github.com/multiversx/mx-sdk-dapp/pull/471)

## [[2.1.8](https://github.com/multiversx/mx-sdk-dapp/pull/470)] - 2022-11-10

- [Added fix for missing `transaction.operations`](https://github.com/multiversx/mx-sdk-dapp/pull/468)
- [Added `search` param to get transactions API](https://github.com/multiversx/mx-sdk-dapp/pull/467)

## [[2.1.7](https://github.com/multiversx/mx-sdk-dapp/pull/465)] - 2022-11-04

- [Added `window` and `document` guards for undefined](https://github.com/multiversx/mx-sdk-dapp/pull/464)

## [[2.1.6](https://github.com/multiversx/mx-sdk-dapp/pull/463)] - 2022-11-03

- [Removed `signTransactionsCancelMessage` from persisted state](https://github.com/multiversx/mx-sdk-dapp/pull/462)
- [Changed `useSignTransactions` being called for ledger and extra provider](https://github.com/multiversx/mx-sdk-dapp/pull/461)

## [[2.1.5](https://github.com/multiversx/mx-sdk-dapp/pull/459)] - 2022-11-02

- [Changed `useSignTransaction` hook to prevent multiple sign requests on same transactions](https://github.com/multiversx/mx-sdk-dapp/pull/458)

## [[2.1.4](https://github.com/multiversx/mx-sdk-dapp/pull/457)] - 2022-11-01

- [Changed `Notification` component to render only of content is present](https://github.com/multiversx/mx-sdk-dapp/pull/456)

## [[2.1.3](https://github.com/multiversx/mx-sdk-dapp/pull/455)] - 2022-10-31

- [Changed `onLoginRedirect` callback logic to overwrite callbackRoute navigation](https://github.com/multiversx/mx-sdk-dapp/pull/454)
- [Changed `onLoginRedirect` function to allow sending signature and address params](https://github.com/multiversx/mx-sdk-dapp/pull/453)

## [[2.1.2](https://github.com/multiversx/mx-sdk-dapp/pull/451)] - 2022-10-27

- [Fixed throwing console exception on searching for transaction](https://github.com/multiversx/mx-sdk-dapp/pull/449)
- [Updated WalletConnect provider to 2.1.0-beta.3](https://github.com/multiversx/mx-sdk-dapp/pull/450)

## [[2.1.1](https://github.com/multiversx/mx-sdk-dapp/pull/448)] - 2022-10-20

- [Fixed transaciton signing with extra provider](https://github.com/multiversx/mx-sdk-dapp/pull/444)
- [Changed TimeAgo `div` tag to `span`](https://github.com/multiversx/mx-sdk-dapp/pull/445)
- [Updated WalletConnect provider to 2.1.0-beta.2, added ping helper, show only latest pairing per app](https://github.com/multiversx/mx-sdk-dapp/pull/446)

## [[2.1.0](https://github.com/multiversx/mx-sdk-dapp/pull/443)] - 2022-10-14

- [Fix Trim Component on Safari on iOS 16](https://github.com/multiversx/mx-sdk-dapp/pull/435)
- [Removed moment dependency](https://github.com/multiversx/mx-sdk-dapp/pull/439)
- [Fixed type definitions](https://github.com/multiversx/mx-sdk-dapp/pull/406)

## [[2.1.0-rc3](https://github.com/multiversx/mx-sdk-dapp/pull/433)] - 2022-09-26

- [Added logic to extract transaction value for staking operations](https://github.com/multiversx/mx-sdk-dapp/pull/432)
- [Fixed `UsdValue` intelisense](https://github.com/multiversx/mx-sdk-dapp/pull/431)
- [Delegate redirecting after signing to `TreansactionSender`](https://github.com/multiversx/mx-sdk-dapp/pull/430)

## [[2.1.0-rc2](https://github.com/multiversx/mx-sdk-dapp/pull/428)] - 2022-09-22

- [Added interfaces for `getTransactionValue`](https://github.com/multiversx/mx-sdk-dapp/pull/427)

## [[2.1.0-rc1](https://github.com/multiversx/mx-sdk-dapp/pull/424)] - 2022-09-21

- [Added documentation about registering a websocket listener](https://github.com/multiversx/mx-sdk-dapp/pull/423)
- [Updated @elrondnetwork/erdjs-wallet-connect-provider to 2.1.0-beta.1 with @walletconnect 2.0.0-rc.3](https://github.com/multiversx/mx-sdk-dapp/pull/422)
- [Added option for showing equal sign in front of computed USD value by `getUsdValue` function](https://github.com/multiversx/mx-sdk-dapp/pull/421)
- [Fixed fetching transaction count and smart contract results count from accounts endpoint](https://github.com/multiversx/mx-sdk-dapp/pull/420)
- [Added extra actions names](https://github.com/multiversx/mx-sdk-dapp/pull/419)
- [Added transaction interpreter functions and UI components (rc1)](https://github.com/multiversx/mx-sdk-dapp/pull/418)

## [[2.0.4](https://github.com/multiversx/mx-sdk-dapp/pull/416)] - 2022-09-12

- [Fixed navigating after pressing Cancel on sign modal](https://github.com/multiversx/mx-sdk-dapp/pull/415)
- [Added hook allowing to check for dapp modal visibility](https://github.com/multiversx/mx-sdk-dapp/pull/416)

## [[2.0.3](https://github.com/multiversx/mx-sdk-dapp/pull/414)] - 2022-09-09

- [Added second login attempt error](https://github.com/multiversx/mx-sdk-dapp/pull/408)
- [Fixed `AuthenticatedRoutesWrapper` not detecting pattern routes](https://github.com/multiversx/mx-sdk-dapp/pull/409)
- [Fixed invalidating signed transactions after sign flow was canceled](https://github.com/multiversx/mx-sdk-dapp/pull/413)

## [2.0.2] - 2022-09-01

- [Changed saving account information by using address namespacing](https://github.com/multiversx/mx-sdk-dapp/pull/402)
- [Added ledger login default zero index selection on address table](https://github.com/multiversx/mx-sdk-dapp/pull/403)
- [Changed internal file imports](https://github.com/multiversx/mx-sdk-dapp/pull/404)
- [Fixed setting and rehydrating redux account information](https://github.com/multiversx/mx-sdk-dapp/pull/406)
