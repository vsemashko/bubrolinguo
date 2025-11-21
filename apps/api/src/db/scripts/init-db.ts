/**
 * Database Initialization Script
 *
 * This script initializes the database by:
 * 1. Running all migrations
 * 2. Seeding initial data
 *
 * Usage:
 *   npm run db:init
 *
 * For production:
 *   NODE_ENV=production npm run db:init
 */

import { runMigration } from '../migrate';
import { seedDatabase } from './seed';

async function initializeDatabase() {
  console.log('🚀 Starting database initialization...\n');

  try {
    // Step 1: Run migrations
    console.log('📋 Step 1: Running migrations...');
    await runMigration();
    console.log('✅ Migrations completed successfully\n');

    // Step 2: Seed database
    console.log('🌱 Step 2: Seeding database...');
    await seedDatabase();
    console.log('✅ Seeding completed successfully\n');

    console.log('🎉 Database initialization completed successfully!');
    console.log('\nYour database is now ready with:');
    console.log('  - 15 lessons (A1-A2 level)');
    console.log('  - 425 vocabulary words');
    console.log('  - 58 achievements');
    console.log('\nYou can now start the API server with: npm run dev');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

// Run initialization
if (require.main === module) {
  initializeDatabase();
}

export { initializeDatabase };
