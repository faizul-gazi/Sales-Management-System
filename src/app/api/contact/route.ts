import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    // Validate input fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Emulate MySQL AUTO_INCREMENT
    const lastMsg = await db.collection('contact_messages').find().sort({ id: -1 }).limit(1).toArray();
    const nextId = lastMsg.length > 0 ? (lastMsg[0].id + 1) : 1;

    const newMessage = {
      id: nextId,
      name: name.trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      message: message.trim(),
      created_at: new Date()
    };

    await db.collection('contact_messages').insertOne(newMessage);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We will contact you soon.'
    });
  } catch (error: any) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact message: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const messages = await db.collection('contact_messages').find({}).sort({ created_at: -1 }).toArray();
    return NextResponse.json({ messages });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages: ' + error.message },
      { status: 500 }
    );
  }
}
