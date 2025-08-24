import { PathUtils } from './path-utils.js';
import { join } from 'path';

describe('PathUtils', () => {
  const projectPath = '/test/project';
  
  test('getWorkflowRoot returns correct path', () => {
    const expected = join(projectPath, '.spec-workflow');
    expect(PathUtils.getWorkflowRoot(projectPath)).toBe(expected);
  });
  
  test('getSpecPath returns correct path', () => {
    const specName = 'test-spec';
    const expected = join(projectPath, '.spec-workflow', 'specs', specName);
    expect(PathUtils.getSpecPath(projectPath, specName)).toBe(expected);
  });
  
  test('getArchiveSpecPath returns correct path', () => {
    const specName = 'test-spec';
    const expected = join(projectPath, '.spec-workflow', 'archive', 'specs', specName);
    expect(PathUtils.getArchiveSpecPath(projectPath, specName)).toBe(expected);
  });
});