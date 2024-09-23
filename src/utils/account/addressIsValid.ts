import { Address } from '@multiversx/sdk-core';

function canTransformToPublicKey(address: string) {
  try {
    const checkAddress = new Address(address);
    return Boolean(checkAddress.bech32());
  } catch {
    return false;
  }
}

export function addressIsValid(destinationAddress: string) {
  const isValidBach =
    destinationAddress.length === 62 && /^\w+$/.test(destinationAddress);

  return isValidBach && canTransformToPublicKey(destinationAddress);
}
