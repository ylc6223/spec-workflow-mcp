#!/usr/bin/env node

/**
 * Deployment script for SPEC Workflow MCP Documentation
 * Supports both manual and automated deployment to Vercel
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const DOCS_DIR = 'packages/docs';
const BUILD_DIR = `${DOCS_DIR}/.vitepress/dist`;

function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = level === 'error' ? '❌' : level === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function runCommand(command, description) {
  log(`Running: ${description}`);
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    log(`Completed: ${description}`, 'success');
  } catch (error) {
    log(`Failed: ${description} - ${error.message}`, 'error');
    process.exit(1);
  }
}

function checkPrerequisites() {
  log('Checking prerequisites...');
  
  // Check if docs directory exists
  if (!existsSync(DOCS_DIR)) {
    log(`Documentation directory not found: ${DOCS_DIR}`, 'error');
    process.exit(1);
  }
  
  // Check if package.json exists in docs
  if (!existsSync(path.join(DOCS_DIR, 'package.json'))) {
    log(`Package.json not found in ${DOCS_DIR}`, 'error');
    process.exit(1);
  }
  
  log('Prerequisites check passed', 'success');
}

function buildDocs() {
  log('Building documentation...');
  
  // Install dependencies
  runCommand('pnpm install', 'Installing root dependencies');
  runCommand(`cd ${DOCS_DIR} && pnpm install`, 'Installing docs dependencies');
  
  // Build documentation
  runCommand(`cd ${DOCS_DIR} && pnpm build`, 'Building VitePress documentation');
  
  // Verify build output
  if (!existsSync(BUILD_DIR)) {
    log(`Build output directory not found: ${BUILD_DIR}`, 'error');
    process.exit(1);
  }
  
  log('Documentation build completed', 'success');
}

function deployToVercel() {
  log('Deploying to Vercel...');
  
  try {
    // Check if Vercel CLI is installed
    execSync('vercel --version', { stdio: 'pipe' });
  } catch (error) {
    log('Vercel CLI not found. Installing...', 'info');
    runCommand('npm install -g vercel', 'Installing Vercel CLI');
  }
  
  // Deploy to Vercel
  const isProduction = process.argv.includes('--prod');
  const deployCommand = isProduction ? 'vercel --prod' : 'vercel';
  
  runCommand(deployCommand, `Deploying to Vercel${isProduction ? ' (Production)' : ' (Preview)'}`);
}

function main() {
  const args = process.argv.slice(2);
  
  log('🚀 Starting deployment process for SPEC Workflow MCP Documentation');
  
  // Parse arguments
  const buildOnly = args.includes('--build-only');
  const skipBuild = args.includes('--skip-build');
  
  try {
    checkPrerequisites();
    
    if (!skipBuild) {
      buildDocs();
    }
    
    if (!buildOnly) {
      deployToVercel();
    }
    
    log('🎉 Deployment process completed successfully!', 'success');
    log('📖 Your documentation should be available at the Vercel URL provided above');
    
  } catch (error) {
    log(`Deployment failed: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Show usage information
if (process.argv.includes('--help')) {
  console.log(`
SPEC Workflow MCP Documentation Deployment Script

Usage: node scripts/deploy.js [options]

Options:
  --help        Show this help message
  --build-only  Only build the documentation, don't deploy
  --skip-build  Skip build step, only deploy
  --prod        Deploy to production (default: preview)

Examples:
  node scripts/deploy.js                    # Build and deploy to preview
  node scripts/deploy.js --prod             # Build and deploy to production  
  node scripts/deploy.js --build-only       # Only build, don't deploy
  node scripts/deploy.js --skip-build       # Only deploy (assumes already built)
`);
  process.exit(0);
}

// Run the deployment
main();