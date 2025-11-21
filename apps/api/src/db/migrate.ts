#!/usr/bin/env node
/**
 * Database Migration Runner
 *
 * Usage:
 *   npm run db:migrate        - Run all pending migrations
 *   npm run db:migrate:reset  - Drop all tables and re-run migrations
 */

import * as fs from 'fs';
import * as path from 'path';
import { pool, query } from './connection';
import { logger } from '../utils/logger';

const SCHEMA_FILE = path.join(__dirname, 'schema.sql');

async function runMigration(): Promise<void> {
  try {
    logger.info('Starting database migration...');

    // Read schema file
    const schemaSql = fs.readFileSync(SCHEMA_FILE, 'utf-8');

    // Execute schema
    await query(schemaSql);

    logger.info('✓ Database schema created successfully');
    logger.info('Migration completed successfully');
  } catch (error) {
    logger.error('Migration failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

async function resetDatabase(): Promise<void> {
  try {
    logger.warn('⚠️  Resetting database - all data will be lost!');

    // Drop all tables
    const dropTablesSql = `
      DROP TABLE IF EXISTS refresh_tokens CASCADE;
      DROP TABLE IF EXISTS user_characters CASCADE;
      DROP TABLE IF EXISTS characters CASCADE;
      DROP TABLE IF EXISTS ai_conversations CASCADE;
      DROP TABLE IF EXISTS daily_activity CASCADE;
      DROP TABLE IF EXISTS user_achievements CASCADE;
      DROP TABLE IF EXISTS achievements CASCADE;
      DROP TABLE IF EXISTS user_vocabulary CASCADE;
      DROP TABLE IF EXISTS user_progress CASCADE;
      DROP TABLE IF EXISTS vocabulary CASCADE;
      DROP TABLE IF EXISTS lessons CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
    `;

    await query(dropTablesSql);
    logger.info('✓ All tables dropped');

    // Re-run migration
    await runMigration();

    logger.info('✓ Database reset complete');
  } catch (error) {
    logger.error('Database reset failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

async function main() {
  const command = process.argv[2];

  try {
    if (command === 'reset') {
      await resetDatabase();
    } else {
      await runMigration();
    }

    await pool.end();
    process.exit(0);
  } catch (error) {
    await pool.end();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { runMigration, resetDatabase };
