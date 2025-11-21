/**
 * Database Health Check Script
 *
 * This script checks the database status:
 * 1. Verifies connection
 * 2. Checks if migrations have been run
 * 3. Counts lessons, vocabulary, achievements
 *
 * Usage:
 *   npm run db:check
 */

import { query, closePool } from '../connection';

interface CheckResult {
  status: 'ok' | 'warning' | 'error';
  message: string;
  count?: number;
}

async function checkDatabase(): Promise<void> {
  console.log('🔍 Checking database status...\n');

  const results: CheckResult[] = [];

  try {
    // Check 1: Database connection
    console.log('1. Testing database connection...');
    try {
      await query('SELECT NOW()');
      results.push({ status: 'ok', message: 'Database connection successful' });
      console.log('   ✅ Connected\n');
    } catch (error) {
      results.push({
        status: 'error',
        message: `Database connection failed: ${error}`,
      });
      console.log('   ❌ Failed\n');
      throw error;
    }

    // Check 2: Tables exist
    console.log('2. Checking if tables exist...');
    const tableQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;

    const tablesResult = await query(tableQuery);
    const tables = tablesResult.rows.map((row) => row.table_name);

    const requiredTables = [
      'users',
      'lessons',
      'vocabulary',
      'user_vocabulary',
      'user_progress',
      'achievements',
      'user_achievements',
      'mock_exams',
      'exam_questions',
    ];

    const missingTables = requiredTables.filter((t) => !tables.includes(t));

    if (missingTables.length === 0) {
      results.push({
        status: 'ok',
        message: `All ${requiredTables.length} required tables exist`,
        count: tables.length,
      });
      console.log(`   ✅ Found ${tables.length} tables`);
      console.log(`   Tables: ${tables.join(', ')}\n`);
    } else {
      results.push({
        status: 'error',
        message: `Missing tables: ${missingTables.join(', ')}`,
      });
      console.log(`   ❌ Missing tables: ${missingTables.join(', ')}\n`);
    }

    // Check 3: Lessons count
    console.log('3. Checking lessons...');
    const lessonsResult = await query('SELECT COUNT(*) FROM lessons');
    const lessonsCount = parseInt(lessonsResult.rows[0].count);

    if (lessonsCount > 0) {
      results.push({
        status: 'ok',
        message: `Found ${lessonsCount} lessons`,
        count: lessonsCount,
      });
      console.log(`   ✅ ${lessonsCount} lessons\n`);
    } else {
      results.push({
        status: 'warning',
        message: 'No lessons found. Run: npm run db:seed',
      });
      console.log('   ⚠️  No lessons found\n');
    }

    // Check 4: Vocabulary count
    console.log('4. Checking vocabulary...');
    const vocabResult = await query('SELECT COUNT(*) FROM vocabulary');
    const vocabCount = parseInt(vocabResult.rows[0].count);

    if (vocabCount > 0) {
      results.push({
        status: 'ok',
        message: `Found ${vocabCount} vocabulary words`,
        count: vocabCount,
      });
      console.log(`   ✅ ${vocabCount} vocabulary words\n`);
    } else {
      results.push({
        status: 'warning',
        message: 'No vocabulary found. Run: npm run db:seed',
      });
      console.log('   ⚠️  No vocabulary found\n');
    }

    // Check 5: Achievements count
    console.log('5. Checking achievements...');
    const achievementsResult = await query(
      'SELECT COUNT(*) FROM achievements'
    );
    const achievementsCount = parseInt(achievementsResult.rows[0].count);

    if (achievementsCount > 0) {
      results.push({
        status: 'ok',
        message: `Found ${achievementsCount} achievements`,
        count: achievementsCount,
      });
      console.log(`   ✅ ${achievementsCount} achievements\n`);
    } else {
      results.push({
        status: 'warning',
        message: 'No achievements found. Run: npm run db:seed',
      });
      console.log('   ⚠️  No achievements found\n');
    }

    // Check 6: Mock Exams count
    console.log('6. Checking mock exams...');
    const examsResult = await query('SELECT COUNT(*) FROM mock_exams');
    const examsCount = parseInt(examsResult.rows[0].count);

    if (examsCount > 0) {
      results.push({
        status: 'ok',
        message: `Found ${examsCount} mock exams`,
        count: examsCount,
      });
      console.log(`   ✅ ${examsCount} mock exams\n`);
    } else {
      results.push({
        status: 'warning',
        message: 'No mock exams found. Run: npm run db:seed',
      });
      console.log('   ⚠️  No mock exams found\n');
    }

    // Check 7: Exam Questions count
    console.log('7. Checking exam questions...');
    const questionsResult = await query('SELECT COUNT(*) FROM exam_questions');
    const questionsCount = parseInt(questionsResult.rows[0].count);

    if (questionsCount > 0) {
      results.push({
        status: 'ok',
        message: `Found ${questionsCount} exam questions`,
        count: questionsCount,
      });
      console.log(`   ✅ ${questionsCount} exam questions\n`);
    } else {
      results.push({
        status: 'warning',
        message: 'No exam questions found. Run: npm run db:seed',
      });
      console.log('   ⚠️  No exam questions found\n');
    }

    // Check 8: Users count
    console.log('8. Checking users...');
    const usersResult = await query('SELECT COUNT(*) FROM users');
    const usersCount = parseInt(usersResult.rows[0].count);

    results.push({
      status: 'ok',
      message: `Found ${usersCount} users`,
      count: usersCount,
    });
    console.log(`   ℹ️  ${usersCount} users registered\n`);

    // Summary
    console.log('═'.repeat(50));
    console.log('SUMMARY\n');

    const errorCount = results.filter((r) => r.status === 'error').length;
    const warningCount = results.filter((r) => r.status === 'warning').length;
    const okCount = results.filter((r) => r.status === 'ok').length;

    console.log(`✅ Passed: ${okCount}`);
    console.log(`⚠️  Warnings: ${warningCount}`);
    console.log(`❌ Errors: ${errorCount}\n`);

    if (errorCount > 0) {
      console.log('❌ Database has errors. Please fix them before starting the API.');
      console.log('\nTo initialize the database, run:');
      console.log('  npm run db:init\n');
      process.exit(1);
    } else if (warningCount > 0) {
      console.log('⚠️  Database has warnings. Consider seeding data.');
      console.log('\nTo seed the database, run:');
      console.log('  npm run db:seed\n');
      process.exit(0);
    } else {
      console.log('✅ Database is healthy and ready!\n');
      console.log('Database contains:');
      console.log(`  - ${lessonsCount} lessons`);
      console.log(`  - ${vocabCount} vocabulary words`);
      console.log(`  - ${achievementsCount} achievements`);
      console.log(`  - ${examsCount} mock exams`);
      console.log(`  - ${questionsCount} exam questions`);
      console.log(`  - ${usersCount} users\n`);
      process.exit(0);
    }
  } catch (error) {
    console.error('\n❌ Database check failed:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Verify your .env file has correct database credentials');
    console.log('2. Ensure PostgreSQL is running');
    console.log('3. Check if the database exists: createdb bubrolinguo');
    console.log('4. Run migrations: npm run db:migrate\n');
    process.exit(1);
  } finally {
    await closePool();
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

// Run check
if (require.main === module) {
  checkDatabase();
}

export { checkDatabase };
