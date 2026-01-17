import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('mock_user_id')?.value;

  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId },
  });
}
