import { join } from 'path';
import { promises as fs } from 'fs';
import { ensureDirectoryExists } from './path-utils.js';

interface SessionData {
  dashboardUrl: string;
  startedAt: string;
  pid: number;
}

export class SessionManager {
  private projectPath: string;
  private sessionFilePath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
    this.sessionFilePath = join(projectPath, '.spec-workflow', 'session.json');
  }

  async createSession(dashboardUrl: string): Promise<void> {
    const sessionData: SessionData = {
      dashboardUrl,
      startedAt: new Date().toISOString(),
      pid: process.pid
    };

    // Ensure .spec-workflow directory exists
    await ensureDirectoryExists(join(this.projectPath, '.spec-workflow'));

    // Write session.json
    await fs.writeFile(this.sessionFilePath, JSON.stringify(sessionData, null, 2), 'utf-8');
  }

  async getSession(): Promise<SessionData | null> {
    try {
      const sessionContent = await fs.readFile(this.sessionFilePath, 'utf-8');
      return JSON.parse(sessionContent) as SessionData;
    } catch (error) {
      // Session file doesn't exist or is invalid
      return null;
    }
  }


  async getDashboardUrl(): Promise<string | undefined> {
    const session = await this.getSession();
    return session?.dashboardUrl;
  }
}