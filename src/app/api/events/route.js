import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Cosmosile"); // Replace with your actual database name

    const events = await db.collection("events").find({}).toArray();
    
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching events', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("Cosmosile"); // Replace with your actual database name
    
    const body = await request.json();
    const { name, email, eventDate, description } = body;
    
    const result = await db.collection("events").insertOne({
      name,
      email,
      eventDate: new Date(eventDate),
      description,
    });

    return NextResponse.json({ message: 'Event created successfully', eventId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating event', error: error.message }, { status: 500 });
  }
}