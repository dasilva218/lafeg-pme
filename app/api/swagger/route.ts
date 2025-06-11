import { NextResponse } from 'next/server';
import swaggerSpecs from '@/lib/swagger';

export async function GET() {
  return NextResponse.json(swaggerSpecs);
}