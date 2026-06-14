import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { readLocalDb, writeLocalDb } from '@/lib/localDb';

// Pre-seeded mock messages for fallback display
const mockMessages = [
  {
    id: 3,
    name: 'Bishwaprotap RAy',
    phone: '01788974534',
    email: 'baburay214@gmail.com',
    message: 'Hello TryUsBD! Your products are awesome. Do you offer home delivery inside Manikdee?',
    created_at: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 2,
    name: 'Bishwaprotap RAy',
    phone: '01788974534',
    email: 'baburay214@gmail.com',
    message: 'Can I pay cash on delivery inside Dhaka Cantonment?',
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 1,
    name: 'Gazi Faizul Islam',
    phone: '01788974534',
    email: 'gazi.faizul@gmail.com',
    message: 'I want to place bulk order for headphones, please contact me soon.',
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, phone, email, message } = body;

  // Validate input fields
  if (!name || !phone || !message) {
    return NextResponse.json(
      { success: false, message: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
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
    console.warn('MongoDB connection unavailable. Saving contact message to local JSON fallback. Error:', error.message);
    
    // Save to local JSON DB
    try {
      const localDb = readLocalDb();
      const lastLocalMsg = localDb.contact_messages[localDb.contact_messages.length - 1];
      const nextLocalId = lastLocalMsg ? (lastLocalMsg.id + 1) : 1001;

      const newMessage = {
        id: nextLocalId,
        name: name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        message: message.trim(),
        created_at: new Date()
      };

      localDb.contact_messages.push(newMessage);
      writeLocalDb(localDb);

      return NextResponse.json({
        success: true,
        message: 'Message sent successfully (Saved locally)! We will contact you soon.'
      });
    } catch (localError: any) {
      return NextResponse.json(
        { success: false, message: 'Failed to process message locally: ' + localError.message },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const messages = await db.collection('contact_messages').find({}).sort({ created_at: -1 }).toArray();
    return NextResponse.json({ messages });
  } catch (error: any) {
    console.warn('MongoDB connection unavailable. Loading messages from local JSON fallback. Error:', error.message);
    
    // Read from local JSON DB
    try {
      const localDb = readLocalDb();
      const sortedLocalMessages = [...localDb.contact_messages].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // If local DB is empty, merge with mock messages
      const finalMessages = sortedLocalMessages.length > 0 ? sortedLocalMessages : mockMessages;

      return NextResponse.json({ messages: finalMessages });
    } catch (localError: any) {
      return NextResponse.json({ messages: mockMessages });
    }
  }
}
