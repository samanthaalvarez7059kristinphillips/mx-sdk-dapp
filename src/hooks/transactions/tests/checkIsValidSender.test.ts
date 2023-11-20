import { checkIsValidSender } from '../helpers/checkIsValidSender';

describe('checkIsValidSender tests', () => {
  test('should return true if senderAccount is null', () => {
    expect(
      checkIsValidSender(
        null,
        'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex'
      )
    ).toBe(true);
  });

  test('should return true if address matches senderAccount.address', () => {
    const mockAccount = {
      address: 'erd1l5xzvt9qwykn900jyxx7rueywy8nwm5sppeh4de4qukucacr2e6s2n5pk5'
    };

    expect(
      checkIsValidSender(
        mockAccount,
        'erd1l5xzvt9qwykn900jyxx7rueywy8nwm5sppeh4de4qukucacr2e6s2n5pk5'
      )
    ).toBe(true);
  });

  test('should return true if address matches senderAccount.activeGuardianAddress', () => {
    const mockAccount = {
      address: 'erd1l5xzvt9qwykn900jyxx7rueywy8nwm5sppeh4de4qukucacr2e6s2n5pk5',
      activeGuardianAddress:
        'erd1pu4ru4qu8jt2qmk8vh9xdp8wj234t3mhfwp4zu2fmkmvg8j4hqfqqzw7ud'
    };
    expect(
      checkIsValidSender(
        mockAccount,
        'erd1pu4ru4qu8jt2qmk8vh9xdp8wj234t3mhfwp4zu2fmkmvg8j4hqfqqzw7ud'
      )
    ).toBe(true);
  });

  test('should return false if address does not match any in senderAccount', () => {
    const mockAccount = {
      address: 'erd1l5xzvt9qwykn900jyxx7rueywy8nwm5sppeh4de4qukucacr2e6s2n5pk5',
      activeGuardianAddress:
        'erd1pu4ru4qu8jt2qmk8vh9xdp8wj234t3mhfwp4zu2fmkmvg8j4hqfqqzw7ud'
    };
    expect(
      checkIsValidSender(
        mockAccount,
        'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex'
      )
    ).toBe(false);
  });
});
