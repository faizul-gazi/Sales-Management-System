import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === 'admin' && password === 'admin123') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Admin authentication error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server authentication error' },
      { status: 500 }
    );
  }
}
