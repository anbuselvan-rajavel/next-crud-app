import { db } from '@/lib/db';
import { items } from '@/drizzle/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

interface Params {
  params: {
    id: string;
  };
}

// GET a single item
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const item = await db.select().from(items).where(eq(items.id, parseInt(id)));
    
    if (!item.length) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    return NextResponse.json(item[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

// PUT (update) an item
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description } = body;
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    
    const updatedItem = await db.update(items)
      .set({ 
        title, 
        description, 
        updatedAt: new Date() 
      })
      .where(eq(items.id, parseInt(id)))
      .returning();
    
    if (!updatedItem.length) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedItem[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE an item
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;
    
    const deletedItem = await db.delete(items)
      .where(eq(items.id, parseInt(id)))
      .returning();
    
    if (!deletedItem.length) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}