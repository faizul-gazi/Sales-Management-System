import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { seedProducts, productsData } from '@/lib/seed';

export async function GET() {
  try {
    // Attempt database seed if database is empty
    await seedProducts();

    const db = await getDb();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json(products);
  } catch (error: any) {
    console.warn('MongoDB connection unavailable. Falling back to local static catalog. Error:', error.message);
    return NextResponse.json(productsData);
  }
}
