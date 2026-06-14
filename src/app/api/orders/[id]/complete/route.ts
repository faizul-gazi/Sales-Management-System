import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = parseInt(id, 10);

    if (isNaN(orderId)) {
      return NextResponse.json({ success: false, message: 'Invalid order ID' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('orders').updateOne(
      { id: orderId },
      { $set: { status: 'completed' } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error completing order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to complete order: ' + error.message },
      { status: 500 }
    );
  }
}
