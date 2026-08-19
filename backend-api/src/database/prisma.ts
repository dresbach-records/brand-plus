import { config } from '../config';
import { Pool } from 'pg';

let pgPool: Pool | null = null;

export function getDatabasePool(): Pool {
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: config.database.url,
      ssl: { rejectUnauthorized: false },
      max: config.database.poolMax,
      min: config.database.poolMin,
    });

    pgPool.on('error', (err) => {
      console.error('[Backend-Database] Unexpected PG pool client error:', err);
    });
  }
  return pgPool;
}

export async function executeQuery<T = any>(text: string, params?: any[]): Promise<T[]> {
  const pool = getDatabasePool();
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (config.env === 'development' && duration > 200) {
      console.warn(`[Backend-Database] Slow query (${duration}ms): ${text.slice(0, 100)}`);
    }
    return res.rows as T[];
  } catch (error) {
    console.error('[Backend-Database] Query Error:', error, { text, params });
    throw error;
  }
}

export async function checkDatabaseHealth(): Promise<{ status: 'healthy' | 'unhealthy'; latencyMs: number }> {
  const start = Date.now();
  try {
    const rows = await executeQuery('SELECT 1 as health_check;');
    const latencyMs = Date.now() - start;
    return {
      status: rows.length > 0 ? 'healthy' : 'unhealthy',
      latencyMs,
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      latencyMs: Date.now() - start,
    };
  }
}
