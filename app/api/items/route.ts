import { db } from '@/lib/db';
import { items } from '@/drizzle/schema';
import { NextResponse } from 'next/server';

// GET all items
export async function GET() {
  try {
    const allItems = await db.select().from(items).orderBy(items.createdAt);
    return NextResponse.json(allItems);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

// POST a new item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newItem = await db.insert(items).values({
      title,
      description,
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json(newItem[0], { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}