import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { logger } from '../utils/logger';

// Database configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'bubrolinguo',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: parseInt(process.env.DB_POOL_SIZE || '20'), // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create the connection pool
export const pool = new Pool(dbConfig);

// Pool error handling
pool.on('error', (err: Error) => {
  logger.error('Unexpected error on idle client', { error: err.message });
  process.exit(-1);
});

// Pool connect event
pool.on('connect', () => {
  logger.debug('New client connected to database pool');
});

// Pool remove event
pool.on('remove', () => {
  logger.debug('Client removed from database pool');
});

/**
 * Execute a query with automatic connection management
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;

    logger.debug('Executed query', {
      query: text,
      duration: `${duration}ms`,
      rows: result.rowCount,
    });

    return result;
  } catch (error) {
    logger.error('Database query error', {
      query: text,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
  const client = await pool.connect();
  logger.debug('Client acquired from pool');
  return client;
}

/**
 * Execute a function within a transaction
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    logger.debug('Transaction started');

    const result = await callback(client);

    await client.query('COMMIT');
    logger.debug('Transaction committed');

    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Transaction rolled back', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  } finally {
    client.release();
    logger.debug('Client released back to pool');
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const result = await query('SELECT NOW() as now');
    logger.info('Database connection successful', {
      timestamp: result.rows[0].now,
      database: dbConfig.database,
      host: dbConfig.host,
    });
    return true;
  } catch (error) {
    logger.error('Database connection failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      database: dbConfig.database,
      host: dbConfig.host,
    });
    return false;
  }
}

/**
 * Close all connections in the pool
 */
export async function closePool(): Promise<void> {
  await pool.end();
  logger.info('Database pool closed');
}

/**
 * Helper function to build WHERE clauses with proper escaping
 */
export function buildWhereClause(
  conditions: Record<string, any>,
  startIndex: number = 1
): { whereClause: string; values: any[] } {
  const keys = Object.keys(conditions).filter(
    (key) => conditions[key] !== undefined
  );

  if (keys.length === 0) {
    return { whereClause: '', values: [] };
  }

  const whereParts: string[] = [];
  const values: any[] = [];
  let paramIndex = startIndex;

  keys.forEach((key) => {
    whereParts.push(`${key} = $${paramIndex}`);
    values.push(conditions[key]);
    paramIndex++;
  });

  return {
    whereClause: `WHERE ${whereParts.join(' AND ')}`,
    values,
  };
}

/**
 * Helper function for pagination
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export function buildPaginationClause(params: PaginationParams): {
  limitClause: string;
  offsetValue: number;
  limitValue: number;
} {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 20));
  const offset = (page - 1) * limit;

  return {
    limitClause: `LIMIT ${limit} OFFSET ${offset}`,
    offsetValue: offset,
    limitValue: limit,
  };
}

/**
 * Helper to check if a record exists
 */
export async function exists(
  table: string,
  conditions: Record<string, any>
): Promise<boolean> {
  const { whereClause, values } = buildWhereClause(conditions);
  const result = await query(
    `SELECT EXISTS(SELECT 1 FROM ${table} ${whereClause})`,
    values
  );
  return result.rows[0].exists;
}

// Export types for convenience
export type { QueryResult, PoolClient } from 'pg';
