import { EnvironmentsEnum, NetworkType } from 'types';

export const DEFAULT_MIN_GAS_LIMIT = 50_000;

export const fallbackNetworkConfigurations: Record<
  keyof typeof EnvironmentsEnum,
  NetworkType
> = {
  devnet: {
    id: 'devnet',
    chainId: 'D',
    name: 'Devnet',
    egldLabel: 'xEGLD',
    egldDenomination: '18',
    decimals: '4',
    gasPerDataByte: '1500',
    walletConnectDeepLink:
      'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/',
    walletConnectBridgeAddresses: ['https://bridge.walletconnect.org'],
    walletConnectV2RelayAddresses: ['wss://relay.walletconnect.com'],
    walletAddress: 'https://devnet-wallet.elrond.com',
    apiAddress: 'https://devnet-api.elrond.com',
    explorerAddress: 'http://devnet-explorer.elrond.com',
    apiTimeout: '4000'
  },
  testnet: {
    id: 'testnet',
    chainId: 'T',
    name: 'Testnet',
    egldLabel: 'xEGLD',
    egldDenomination: '18',
    decimals: '4',
    gasPerDataByte: '1500',
    walletConnectDeepLink:
      'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/',
    walletConnectBridgeAddresses: ['https://bridge.walletconnect.org'],
    walletConnectV2RelayAddresses: ['wss://relay.walletconnect.com'],
    walletAddress: 'https://testnet-wallet.elrond.com',
    apiAddress: 'https://testnet-api.elrond.com',
    explorerAddress: 'http://testnet-explorer.elrond.com',
    apiTimeout: '4000'
  },
  mainnet: {
    id: 'mainnet',
    chainId: '1',
    name: 'Mainnet',
    egldLabel: 'xEGLD',
    egldDenomination: '18',
    decimals: '4',
    gasPerDataByte: '1500',
    walletConnectDeepLink:
      'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/',
    walletConnectBridgeAddresses: ['https://bridge.walletconnect.org'],
    walletConnectV2RelayAddresses: ['wss://relay.walletconnect.com'],
    walletAddress: 'https://wallet.elrond.com',
    apiAddress: 'https://api.elrond.com',
    explorerAddress: 'https://explorer.elrond.com',
    apiTimeout: '4000'
  }
};

const { chainId: devnetChainId } = fallbackNetworkConfigurations[
  EnvironmentsEnum.devnet
];
const { chainId: testnetChainId } = fallbackNetworkConfigurations[
  EnvironmentsEnum.testnet
];
const { chainId: mainnetChainId } = fallbackNetworkConfigurations[
  EnvironmentsEnum.mainnet
];

export { devnetChainId, testnetChainId, mainnetChainId };

export const chainIdByEnvironment: Record<EnvironmentsEnum, string> = {
  [EnvironmentsEnum.devnet]: devnetChainId,
  [EnvironmentsEnum.testnet]: testnetChainId,
  [EnvironmentsEnum.mainnet]: mainnetChainId
};

export const chainIdToEnvironment: Record<string, EnvironmentsEnum> = {
  [devnetChainId]: EnvironmentsEnum.devnet,
  [testnetChainId]: EnvironmentsEnum.testnet,
  [mainnetChainId]: EnvironmentsEnum.mainnet
};
