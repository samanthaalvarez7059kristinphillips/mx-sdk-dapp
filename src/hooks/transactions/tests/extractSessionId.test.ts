import { extractSessionId } from '../helpers/extractSessionId';

describe('extractSessionId', () => {
  test('should extract and parse the session ID from a valid batchId', () => {
    const batchId = '12345-erd1...';

    const result = extractSessionId(batchId);

    expect(result).toBe(12345);
  });

  test('should return null for an invalid batchId', () => {
    const batchId = 'invalid-batch-id';

    const result = extractSessionId(batchId);

    expect(result).toBeNull();
  });

  test('should return null for an empty batchId', () => {
    const batchId = '';

    const result = extractSessionId(batchId);

    expect(result).toBeNull();
  });

  test('should return null for invalid batchId', () => {
    [null, undefined, true, [], {}, NaN].forEach((invalidBatchId) => {
      const result = extractSessionId(invalidBatchId as any);
      expect(result).toBeNull();
    });
  });
});
