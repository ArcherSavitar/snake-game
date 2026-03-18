export interface LeaderboardEntry {
  rank: number;
  score: number;
  date: string;
  playerName: string;
}

export class Leaderboard {
  private readonly STORAGE_KEY = 'snake_leaderboard';
  private readonly MAX_ENTRIES = 10;

  getEntries(): LeaderboardEntry[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addEntry(name: string, score: number): number {
    try {
      const entries = this.getEntries();
      const entry: LeaderboardEntry = {
        rank: 0,
        score,
        date: new Date().toISOString(),
        playerName: name
      };

      entries.push(entry);
      entries.sort((a, b) => b.score - a.score);
      const topEntries = entries.slice(0, this.MAX_ENTRIES);

      // Update ranks
      topEntries.forEach((e, i) => e.rank = i + 1);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(topEntries));

      // Find the rank of the new entry
      const rank = topEntries.findIndex(
        e => e.score === score && e.date === entry.date
      );
      return rank >= 0 ? rank + 1 : -1;
    } catch {
      return -1;
    }
  }

  isHighScore(score: number): boolean {
    const entries = this.getEntries();
    if (entries.length < this.MAX_ENTRIES) {
      return true;
    }
    return score > entries[entries.length - 1].score;
  }

  clear(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // Storage not available
    }
  }
}
