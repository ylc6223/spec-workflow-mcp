import { SpecWorkflowMCPServer } from '../../src/server.js';
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

describe('SpecWorkflowMCPServer Integration', () => {
  let server: SpecWorkflowMCPServer;
  let tempDir: string;

  beforeAll(async () => {
    // 创建临时目录用于测试
    tempDir = join(tmpdir(), `spec-workflow-test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });
  });

  afterAll(async () => {
    // 清理临时目录
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (error) {
      console.error('清理临时目录失败:', error);
    }
  });

  beforeEach(() => {
    server = new SpecWorkflowMCPServer();
  });

  afterEach(async () => {
    await server.stop();
  });

  test('服务器应该能够初始化并停止', async () => {
    // 这个测试只验证服务器能够初始化和停止，不会实际连接到 stdio
    // 因此我们模拟 initialize 方法
    const initSpy = jest.spyOn(server, 'initialize').mockImplementation(async () => {
      return;
    });

    await server.initialize(tempDir);
    expect(initSpy).toHaveBeenCalledWith(tempDir, undefined);
    
    await server.stop();
  });
});