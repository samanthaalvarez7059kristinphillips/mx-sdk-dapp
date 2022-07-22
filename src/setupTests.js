window.scrollTo = jest.fn();

jest.mock('./utils/network/getEgldLabel', () => {
  return {
    __esModule: true, // this property makes it work
    default: () => {
      return 'EGLD';
    }
  };
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});
