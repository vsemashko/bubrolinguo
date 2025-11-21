import { query, closePool } from '../connection';
import { logger } from '../../utils/logger';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Database seeding script
 * Populates the database with initial data for MVP
 */

async function runSeedFile(filePath: string, description: string) {
  try {
    logger.info(`Running seed: ${description}`);
    const sql = fs.readFileSync(filePath, 'utf8');
    await query(sql);
    logger.info(`✓ Completed: ${description}`);
  } catch (error) {
    logger.error(`✗ Failed: ${description}`, { error });
    throw error;
  }
}

async function checkTableExists(tableName: string): Promise<boolean> {
  const result = await query(
    `SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = $1
    )`,
    [tableName]
  );
  return result.rows[0].exists;
}

async function getTableCount(tableName: string): Promise<number> {
  const result = await query(`SELECT COUNT(*) as count FROM ${tableName}`);
  return parseInt(result.rows[0].count);
}

async function seedDatabase() {
  try {
    logger.info('Starting database seeding...');

    // Check if tables exist
    const tablesExist = await checkTableExists('users');
    if (!tablesExist) {
      logger.error('Database schema not found. Please run migrations first.');
      process.exit(1);
    }

    const seedsDir = path.join(__dirname, '../seeds');

    // 1. Seed achievements
    logger.info('\n=== Seeding Achievements ===');
    const achievementsCount = await getTableCount('achievements');
    if (achievementsCount === 0) {
      await runSeedFile(
        path.join(seedsDir, 'achievements.sql'),
        'Achievement definitions'
      );
    } else {
      logger.info(`Skipping achievements (already seeded: ${achievementsCount} records)`);
    }

    // 2. Seed lessons
    logger.info('\n=== Seeding Lessons ===');
    const lessonsCount = await getTableCount('lessons');
    if (lessonsCount === 0) {
      await runSeedFile(
        path.join(seedsDir, 'lessons.sql'),
        '10 A1-level lessons with exercises'
      );
    } else {
      logger.info(`Skipping lessons (already seeded: ${lessonsCount} records)`);
    }

    // 3. Seed vocabulary
    logger.info('\n=== Seeding Vocabulary ===');
    const vocabCount = await getTableCount('vocabulary');
    if (vocabCount === 0) {
      await runSeedFile(
        path.join(seedsDir, 'vocabulary.sql'),
        '200 essential A1 vocabulary words'
      );
    } else {
      logger.info(`Skipping vocabulary (already seeded: ${vocabCount} records)`);
    }

    logger.info('\n✓ Database seeding completed successfully!');
    logger.info('\nSeeded data summary:');
    logger.info(`  - Achievements: ${await getTableCount('achievements')}`);
    logger.info(`  - Lessons: ${await getTableCount('lessons')}`);
    logger.info(`  - Vocabulary: ${await getTableCount('vocabulary')}`);

  } catch (error) {
    logger.error('Database seeding failed', { error });
    throw error;
  } finally {
    await closePool();
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      logger.info('Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Seeding process failed', { error });
      process.exit(1);
    });
}

export { seedDatabase };
