import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json(
      { 
        message: 'Logout successful',
        success: true 
      },
      { status: 200 }
    );

    // Clear the admin token cookie
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Immediately expire
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
