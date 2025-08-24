import { isSpecificPortAvailable } from './utils.js';

// Mock createServer
jest.mock('net', () => ({
  createServer: jest.fn().mockImplementation(() => ({
    listen: jest.fn((port, host, callback) => {
      // Simulate server started successfully
      callback();
    }),
    once: jest.fn((event, callback) => {
      // Simulate close event
      if (event === 'close') {
        callback();
      }
    }),
    close: jest.fn(),
    on: jest.fn()
  }))
}));

describe('Utils', () => {
  test('isSpecificPortAvailable returns true when port is available', async () => {
    const result = await isSpecificPortAvailable(8080);
    expect(result).toBe(true);
  });
});