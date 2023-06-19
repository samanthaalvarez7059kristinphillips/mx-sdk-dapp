import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import { NativeAuthConfigType } from 'types';
import {
  getLatestBlockHash,
  LatestBlockHashType
} from './helpers/getLatestBlockHash';

import { getNativeAuthConfig, getTokenExpiration } from './methods';

export const nativeAuth = (config?: NativeAuthConfigType) => {
  const {
    origin,
    apiAddress,
    expirySeconds,
    blockHashShard,
    extraInfo: extraInfoFromConfig,
    gatewayUrl,
    extraRequestHeaders
  } = getNativeAuthConfig(config) as NativeAuthConfigType;

  const nativeAuthClient = new NativeAuthClient({
    origin,
    apiUrl: apiAddress,
    expirySeconds,
    blockHashShard,
    gatewayUrl,
    extraRequestHeaders
  });

  const initialize = async (
    extraInfo?: { [key: string]: string },
    latestBlockInfo?: LatestBlockHashType
  ): Promise<string> => {
    if (!apiAddress || !origin) {
      return '';
    }

    const getBlockHash = (): Promise<string> =>
      nativeAuthClient.getCurrentBlockHash();

    const response =
      latestBlockInfo ??
      (await getLatestBlockHash(apiAddress, blockHashShard, getBlockHash));

    const { hash, timestamp } = response;
    const encodedExtraInfo = nativeAuthClient.encodeValue(
      JSON.stringify({
        ...(extraInfo ?? extraInfoFromConfig),
        ...(timestamp ? { timestamp } : {})
      })
    );
    const encodedOrigin = nativeAuthClient.encodeValue(origin);

    return `${encodedOrigin}.${hash}.${expirySeconds}.${encodedExtraInfo}`;
  };

  const getToken = ({
    address,
    token,
    signature
  }: {
    address: string;
    token: string;
    signature: string;
  }): string => nativeAuthClient.getToken(address, token, signature);

  return {
    getNativeAuthConfig,
    initialize,
    getToken,
    getTokenExpiration
  };
};
