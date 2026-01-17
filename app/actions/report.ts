'use server';

import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// ===================================
// 日報 CRUD Server Actions
// これらの関数を呼ぶだけでDBアクセスできます
// ===================================

/**
 * 日報一覧を取得
 * 使い方: const reports = await getReports();
 */
export async function getReports() {
  const reports = await prisma.report.findMany({
    include: { user: true },
    orderBy: { date: 'desc' },
  });
  return reports;
}

/**
 * 自分の日報一覧を取得
 * 使い方: const myReports = await getMyReports();
 */
export async function getMyReports() {
  const user = await getCurrentUser();
  if (!user) return [];

  const reports = await prisma.report.findMany({
    where: { userId: user.id },
    include: { user: true },
    orderBy: { date: 'desc' },
  });
  return reports;
}

/**
 * 日報を1件取得
 * 使い方: const report = await getReport('xxx');
 */
export async function getReport(id: string) {
  const report = await prisma.report.findUnique({
    where: { id },
    include: { user: true },
  });
  return report;
}

/**
 * 日報を作成
 * 使い方: const result = await createReport('今日の内容...');
 */
export async function createReport(content: string) {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, error: 'ログインしてください' };
  }

  if (!content.trim()) {
    return { success: false, error: '内容を入力してください' };
  }

  try {
    const report = await prisma.report.create({
      data: {
        userId: user.id,
        content: content.trim(),
        date: new Date(),
      },
    });

    revalidatePath('/reports');
    return { success: true, report };
  } catch {
    return { success: false, error: '保存に失敗しました' };
  }
}

/**
 * 日報を更新
 * 使い方: const result = await updateReport('xxx', '更新した内容...');
 */
export async function updateReport(id: string, content: string) {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, error: 'ログインしてください' };
  }

  if (!content.trim()) {
    return { success: false, error: '内容を入力してください' };
  }

  // 自分の日報かチェック
  const existing = await prisma.report.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return { success: false, error: '編集権限がありません' };
  }

  try {
    const report = await prisma.report.update({
      where: { id },
      data: { content: content.trim() },
    });

    revalidatePath('/reports');
    revalidatePath(`/reports/${id}`);
    return { success: true, report };
  } catch {
    return { success: false, error: '更新に失敗しました' };
  }
}

/**
 * 日報を削除
 * 使い方: const result = await deleteReport('xxx');
 */
export async function deleteReport(id: string) {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, error: 'ログインしてください' };
  }

  // 自分の日報かチェック
  const existing = await prisma.report.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return { success: false, error: '削除権限がありません' };
  }

  try {
    await prisma.report.delete({ where: { id } });

    revalidatePath('/reports');
    return { success: true };
  } catch {
    return { success: false, error: '削除に失敗しました' };
  }
}
