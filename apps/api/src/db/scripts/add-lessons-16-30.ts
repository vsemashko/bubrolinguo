import { query, closePool } from '../connection';
import { logger } from '../../utils/logger';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Database update script to add lessons 16-30
 * Expands lesson library from 15 to 30 lessons (MVP target)
 */

async function getTableCount(tableName: string): Promise<number> {
  const result = await query(`SELECT COUNT(*) as count FROM ${tableName}`);
  return parseInt(result.rows[0].count);
}

async function getLessonNumberRange(): Promise<{ min: number; max: number }> {
  const result = await query(
    `SELECT MIN(lesson_number) as min, MAX(lesson_number) as max FROM lessons`
  );
  return {
    min: parseInt(result.rows[0].min) || 0,
    max: parseInt(result.rows[0].max) || 0,
  };
}

async function addNewLessons() {
  try {
    logger.info('Starting lesson expansion (15 → 30 lessons)...\n');

    // Check current lesson count
    const currentCount = await getTableCount('lessons');
    const range = await getLessonNumberRange();

    logger.info(`Current lessons: ${currentCount}`);
    logger.info(`Lesson numbers: ${range.min} - ${range.max}\n`);

    if (currentCount >= 30) {
      logger.info('✓ Database already has 30+ lessons. No action needed.');
      return;
    }

    // Read and execute the new lessons SQL file
    const sqlPath = path.join(__dirname, '../seeds/lessons-a2-b1-extended.sql');

    if (!fs.existsSync(sqlPath)) {
      logger.error(`SQL file not found: ${sqlPath}`);
      throw new Error('Lesson file not found');
    }

    logger.info('Adding lessons 16-30...');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await query(sql);

    // Verify the update
    const newCount = await getTableCount('lessons');
    const newRange = await getLessonNumberRange();

    logger.info(`\n✓ Lessons successfully added!`);
    logger.info(`  Previous: ${currentCount} lessons (${range.min}-${range.max})`);
    logger.info(`  Current:  ${newCount} lessons (${newRange.min}-${newRange.max})`);
    logger.info(`  Added:    ${newCount - currentCount} new lessons`);

    if (newCount >= 30) {
      logger.info('\n🎉 MVP lesson target achieved (30 lessons)!');
    }

  } catch (error: any) {
    // Check if error is due to duplicate lesson numbers
    if (error.message && error.message.includes('unique') && error.message.includes('lesson_number')) {
      logger.warn('\n⚠️  Some lessons already exist (duplicate lesson numbers)');
      logger.info('This is expected if lessons 16-30 were previously added.');

      const currentCount = await getTableCount('lessons');
      logger.info(`Current lesson count: ${currentCount}`);

      if (currentCount >= 30) {
        logger.info('✓ Database has 30+ lessons. All set!');
        return;
      }
    }

    logger.error('Failed to add new lessons', { error });
    throw error;
  } finally {
    await closePool();
  }
}

// Run if called directly
if (require.main === module) {
  addNewLessons()
    .then(() => {
      logger.info('\n✓ Lesson expansion completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Lesson expansion failed', { error });
      process.exit(1);
    });
}

export { addNewLessons };
