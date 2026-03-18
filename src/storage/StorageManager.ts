export interface GameStatistics {
  totalGames: number;
  totalScore: number;
  bestScore: number;
  totalTime: number;
  averageScore: number;
  longestSnake: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
}

const DEFAULT_STATISTICS: GameStatistics = {
  totalGames: 0,
  totalScore: 0,
  bestScore: 0,
  totalTime: 0,
  averageScore: 0,
  longestSnake: 0
};

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  difficulty: 'normal'
};

export class StorageManager {
  private readonly HIGH_SCORE_KEY = 'snake_high_score';
  private readonly STATISTICS_KEY = 'snake_statistics';
  private readonly SETTINGS_KEY = 'snake_settings';

  getHighScore(): number {
    try {
      const value = localStorage.getItem(this.HIGH_SCORE_KEY);
      return value ? parseInt(value, 10) : 0;
    } catch {
      return 0;
    }
  }

  setHighScore(score: number): void {
    try {
      const current = this.getHighScore();
      if (score > current) {
        localStorage.setItem(this.HIGH_SCORE_KEY, String(score));
      }
    } catch {
      // Storage not available
    }
  }

  getStatistics(): GameStatistics {
    try {
      const data = localStorage.getItem(this.STATISTICS_KEY);
      return data ? JSON.parse(data) : { ...DEFAULT_STATISTICS };
    } catch {
      return { ...DEFAULT_STATISTICS };
    }
  }

  updateStatistics(score: number, timeMs: number, snakeLength: number): void {
    try {
      const stats = this.getStatistics();
      stats.totalGames++;
      stats.totalScore += score;
      stats.bestScore = Math.max(stats.bestScore, score);
      stats.totalTime += timeMs;
      stats.longestSnake = Math.max(stats.longestSnake, snakeLength);
      stats.averageScore = Math.floor(stats.totalScore / stats.totalGames);
      localStorage.setItem(this.STATISTICS_KEY, JSON.stringify(stats));
    } catch {
      // Storage not available
    }
  }

  getSettings(): GameSettings {
    try {
      const data = localStorage.getItem(this.SETTINGS_KEY);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : { ...DEFAULT_SETTINGS };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  saveSettings(settings: Partial<GameSettings>): void {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(updated));
    } catch {
      // Storage not available
    }
  }

  clearAll(): void {
    try {
      localStorage.removeItem(this.HIGH_SCORE_KEY);
      localStorage.removeItem(this.STATISTICS_KEY);
      localStorage.removeItem(this.SETTINGS_KEY);
    } catch {
      // Storage not available
    }
  }
}
