import fs from 'fs/promises';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), 'data', 'cache');

interface CacheEntry<T> {
  timestamp: number;
  ttl: number;
  data: T;
}

export class FileCache<T> {
  constructor(
    private filename: string,
    private defaultTTL: number = 7 * 24 * 60 * 60 * 1000 // 7 days
  ) {}

  private get filePath() {
    return path.join(CACHE_DIR, this.filename);
  }

  async get(): Promise<T | null> {
    try {
      await fs.mkdir(CACHE_DIR, { recursive: true });
      const raw = await fs.readFile(this.filePath, 'utf-8');
      const entry: CacheEntry<T> = JSON.parse(raw);
      const now = Date.now();
      if (now - entry.timestamp < entry.ttl) {
        console.log(`[Cache] HIT: ${this.filename}`);
        return entry.data;
      }
      console.log(`[Cache] STALE: ${this.filename}`);
      return null;
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        console.log(`[Cache] MISS: ${this.filename}`);
        return null;
      }
      console.error(`[Cache] Error reading ${this.filename}:`, err);
      return null;
    }
  }

  async set(data: T, ttl?: number): Promise<void> {
    const entry: CacheEntry<T> = {
      timestamp: Date.now(),
      ttl: ttl ?? this.defaultTTL,
      data,
    };
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(entry, null, 2), 'utf-8');
    console.log(`[Cache] SET: ${this.filename}`);
  }

  async clear(): Promise<void> {
    try {
      await fs.unlink(this.filePath);
      console.log(`[Cache] CLEARED: ${this.filename}`);
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        console.error(`[Cache] Error clearing ${this.filename}:`, err);
      }
    }
  }
}