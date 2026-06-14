import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { seedProducts } from '@/lib/seed';

export async function GET() {
  try {
    // Attempt database seed if database is empty
    await seedProducts();

    const db = await getDb();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products: ' + error.message }, { status: 500 });
  }
}
