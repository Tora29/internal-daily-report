'use server';

import { cookies } from 'next/headers';

export async function loginAs(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set('mock_user_id', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1週間
  });
}
