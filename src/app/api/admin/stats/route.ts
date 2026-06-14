import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();

    // Fetch basic order counts
    const total_orders = await db.collection('orders').countDocuments();
    const pending_orders = await db.collection('orders').countDocuments({ status: 'pending' });
    const completed_orders = await db.collection('orders').countDocuments({ status: 'completed' });

    // Calculate total revenue
    const revenuePipeline = await db.collection('orders').aggregate([
      { $group: { _id: null, total: { $sum: '$total_amount' } } }
    ]).toArray();
    const total_earnings = revenuePipeline.length > 0 ? revenuePipeline[0].total : 0;

    // Monthly earnings distribution (past 6 months)
    const monthlyPipeline = await db.collection('orders').aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$order_date' } },
          total: { $sum: '$total_amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();

    const monthly_earnings = monthlyPipeline.map(item => ({
      month: item._id,
      total: item.total
    }));

    // Location-based sales count
    const locationPipeline = await db.collection('orders').aggregate([
      {
        $group: {
          _id: '$delivery_location',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    const location_stats = locationPipeline.map(item => ({
      delivery_location: item._id,
      count: item.count
    }));

    return NextResponse.json({
      total_orders,
      total_earnings,
      pending_orders,
      completed_orders,
      monthly_earnings,
      location_stats
    });
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to compile dashboard statistics: ' + error.message },
      { status: 500 }
    );
  }
}
