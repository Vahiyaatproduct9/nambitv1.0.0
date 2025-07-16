export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { Email } from '@/api/sendemail';

export async function POST(req: Request) {
    const body = await req.json();
    const { email, condition, name, date, time } = body;
    const status = await Email(email, condition, name, date, time);
    return NextResponse.json({ status });
}
