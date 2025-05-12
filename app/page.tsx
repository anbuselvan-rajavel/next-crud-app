import { db } from '@/lib/db';
import { items } from '@/drizzle/schema';

import Dashboard from './components/dashboard';


export const revalidate = 0;

export default async function HomePage() {
  const allItems = await db.select().from(items).orderBy(items.createdAt);

  return <Dashboard allItems={allItems} />;
}