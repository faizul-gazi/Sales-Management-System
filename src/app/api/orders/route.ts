import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, address, delivery, cartItems, subtotal, deliveryCharge, total } = body;

    // Validate required fields
    if (!name || !phone || !address || !delivery || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields or cart is empty' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Emulate MySQL AUTO_INCREMENT ID by finding the max numeric ID
    const lastOrder = await db.collection('orders').find().sort({ id: -1 }).limit(1).toArray();
    const nextOrderId = lastOrder.length > 0 ? (lastOrder[0].id + 1) : 1;

    const newOrder = {
      id: nextOrderId,
      customer_name: name.trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      address: address.trim(),
      delivery_location: delivery,
      subtotal: parseFloat(subtotal),
      delivery_charge: parseFloat(deliveryCharge),
      total_amount: parseFloat(total),
      order_date: new Date(),
      created_at: new Date(),
      status: 'pending',
      items: cartItems.map((item: any) => ({
        product_id: Number(item.id),
        product_name: item.name,
        quantity: Number(item.quantity),
        price: parseFloat(item.price)
      }))
    };

    await db.collection('orders').insertOne(newOrder);

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully!',
      orderId: nextOrderId
    });
  } catch (error: any) {
    console.error('Error submitting order:', error);
    return NextResponse.json(
      { success: false, message: 'Error submitting order: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const orders = await db.collection('orders').find({}).sort({ order_date: -1 }).toArray();
    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders: ' + error.message }, { status: 500 });
  }
}
