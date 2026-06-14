import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { readLocalDb, writeLocalDb } from '@/lib/localDb';

// Pre-seeded mock orders for fallback display
const mockOrders = [
  {
    id: 8,
    customer_name: 'Bishwaprotap RAy',
    phone: '01788974534',
    email: 'baburay214@gmail.com',
    address: 'House 62, Road 10 ,Sector 10 , Uttara Dhaka',
    delivery_location: 'inside',
    subtotal: 40998.00,
    delivery_charge: 60.00,
    total_amount: 41058.00,
    order_date: new Date(Date.now() - 3600000).toISOString(),
    status: 'pending',
    items: [
      { product_id: 20, product_name: 'UGREEN 145W Power Bank', quantity: 1, price: 7999.00 },
      { product_id: 15, product_name: 'Huawei Watch GT 3 Pro', quantity: 1, price: 32999.00 }
    ]
  },
  {
    id: 5,
    customer_name: 'Gazi Faizul Islam',
    phone: '01788974534',
    email: 'gazi.faizul@gmail.com',
    address: 'House 62, Road 10 ,Sector 10 , Uttara Dhaka',
    delivery_location: 'inside',
    subtotal: 82997.00,
    delivery_charge: 60.00,
    total_amount: 83057.00,
    order_date: new Date(Date.now() - 86400000).toISOString(),
    status: 'completed',
    items: [
      { product_id: 1, product_name: 'Sony WH-1000XM4 Wireless Headphones', quantity: 1, price: 29999.00 },
      { product_id: 2, product_name: 'Apple AirPods Pro', quantity: 1, price: 24999.00 },
      { product_id: 3, product_name: 'Samsung Galaxy Watch 5', quantity: 1, price: 27999.00 }
    ]
  },
  {
    id: 1,
    customer_name: 'Bishwaprotap RAy',
    phone: '01788974534',
    email: 'baburay214@gmail.com',
    address: 'House 62, Road 10 ,Sector 10 , Uttara Dhaka',
    delivery_location: 'outside',
    subtotal: 163992.00,
    delivery_charge: 110.00,
    total_amount: 164102.00,
    order_date: new Date(Date.now() - 604800000).toISOString(),
    status: 'pending',
    items: [
      { product_id: 1, product_name: 'Sony WH-1000XM4 Wireless Headphones', quantity: 2, price: 29999.00 },
      { product_id: 3, product_name: 'Samsung Galaxy Watch 5', quantity: 2, price: 27999.00 },
      { product_id: 4, product_name: 'Anker PowerCore 26800mAh', quantity: 2, price: 4999.00 },
      { product_id: 7, product_name: 'Samsung Galaxy Buds2 Pro', quantity: 2, price: 18999.00 }
    ]
  }
];

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, phone, email, address, delivery, cartItems, subtotal, deliveryCharge, total } = body;

  // Validate required fields
  if (!name || !phone || !address || !delivery || !cartItems || cartItems.length === 0) {
    return NextResponse.json(
      { success: false, message: 'Missing required fields or cart is empty' },
      { status: 400 }
    );
  }

  try {
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
        price: parseFloat(item.price),
        image: item.image
      }))
    };

    await db.collection('orders').insertOne(newOrder);

    return NextResponse.json({
      success: true,
      message: 'Order placed successfully!',
      orderId: nextOrderId
    });
  } catch (error: any) {
    console.warn('MongoDB connection failed. Saving order to local JSON fallback. Error:', error.message);
    
    // Save to local JSON fallback DB
    try {
      const localDb = readLocalDb();
      // Calculate next ID
      const lastLocalOrder = localDb.orders[localDb.orders.length - 1];
      const nextLocalId = lastLocalOrder ? (lastLocalOrder.id + 1) : 1001;

      const newOrder = {
        id: nextLocalId,
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
          price: parseFloat(item.price),
          image: item.image
        }))
      };

      localDb.orders.push(newOrder);
      writeLocalDb(localDb);

      return NextResponse.json({
        success: true,
        message: 'Order placed successfully (Saved locally)!',
        orderId: nextLocalId
      });
    } catch (localError: any) {
      return NextResponse.json(
        { success: false, message: 'Failed to process order locally: ' + localError.message },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const orders = await db.collection('orders').find({}).sort({ order_date: -1 }).toArray();
    return NextResponse.json({ orders });
  } catch (error: any) {
    console.warn('MongoDB connection failed. Loading orders from local JSON fallback. Error:', error.message);
    
    // Read from local JSON fallback DB
    try {
      const localDb = readLocalDb();
      // Sort local orders by date descending
      const sortedLocalOrders = [...localDb.orders].sort(
        (a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
      );
      
      // If local DB has no orders, merge with mock orders so it's not empty
      const finalOrders = sortedLocalOrders.length > 0 ? sortedLocalOrders : mockOrders;

      return NextResponse.json({ orders: finalOrders });
    } catch (localError: any) {
      return NextResponse.json({ orders: mockOrders });
    }
  }
}
