import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// For migrations
export const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

// For query purposes
export const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);

// Run migrations (for development)
if (process.env.NODE_ENV === 'development') {
  const runMigrations = async () => {
    try {
      await migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' });
      console.log('Migrations completed');
    } catch (error) {
      console.error('Error during migration:', error);
    }
  };
  
  runMigrations();
}