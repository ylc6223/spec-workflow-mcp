#!/usr/bin/env node

import { execSync } from 'child_process';

// 按依赖顺序构建包
const buildOrder = [
  'core',
  'dashboard-backend',
  'dashboard-frontend',
  'spec-workflow-mcp',
  'vscode-extension'
];

console.log('开始按顺序构建所有包...');

for (const pkg of buildOrder) {
  console.log(`\n构建 ${pkg} 包...`);
  try {
    execSync(`pnpm --filter @specflow/${pkg === 'spec-workflow-mcp' ? pkg : pkg.replace('-', '-')} build`, { 
      stdio: 'inherit' 
    });
    console.log(`✅ ${pkg} 构建成功`);
  } catch (error) {
    console.error(`❌ ${pkg} 构建失败`);
    process.exit(1);
  }
}

console.log('\n🎉 所有包构建成功!');