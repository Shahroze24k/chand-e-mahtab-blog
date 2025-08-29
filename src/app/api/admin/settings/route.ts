import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      aboutEn,
      aboutUr,
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      email,
      phone,
    } = body;

    // Update or create site meta
    const siteMeta = await prisma.siteMeta.upsert({
      where: { id: 'main' },
      update: {
        aboutEn: aboutEn || '',
        aboutUr: aboutUr || '',
        facebook: facebook || '',
        twitter: twitter || '',
        instagram: instagram || '',
        linkedin: linkedin || '',
        youtube: youtube || '',
        email: email || '',
        phone: phone || '',
      },
      create: {
        id: 'main',
        aboutEn: aboutEn || '',
        aboutUr: aboutUr || '',
        facebook: facebook || '',
        twitter: twitter || '',
        instagram: instagram || '',
        linkedin: linkedin || '',
        youtube: youtube || '',
        email: email || '',
        phone: phone || '',
      },
    });

    return NextResponse.json(
      { 
        message: 'Settings updated successfully',
        siteMeta 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
