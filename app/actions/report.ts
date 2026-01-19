'use server';

import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
  if (!id) {
    throw new Error('日報IDが指定されていません');
  }

  const report = await prisma.report.findUnique({
    where: { id },
    include: { user: true },
  });
  return report;
}

/**
 * 日報を作成
 * 使い方: フォームアクションから呼び出す
 */
export async function createReport(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('ログインしてください');
  }

  const dateStr = formData.get('date') as string;
  const content = formData.get('content') as string;

  if (!dateStr || !content.trim()) {
    throw new Error('必須項目を入力してください');
  }

  try {
    await prisma.report.create({
      data: {
        userId: user.id,
        content: content.trim(),
        date: new Date(dateStr),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '不明なエラー';
    throw new Error(`保存に失敗しました: ${errorMessage}`);
  }

  revalidatePath('/daily-list');
  redirect('/daily-list');
}

/**
 * 日報を更新
 * 使い方: フォームアクションから呼び出す
 */
export async function updateReport(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('左下のDebug欄からログインしてください');
  }

  const id = formData.get('id') as string;
  const dateStr = formData.get('date') as string;
  const content = formData.get('content') as string;

  if (!id || !dateStr || !content.trim()) {
    throw new Error('必須項目を入力してください');
  }

  // 自分の日報かチェック
  const existing = await prisma.report.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    throw new Error('編集権限がありません');
  }

  try {
    await prisma.report.update({
      where: { id },
      data: {
        date: new Date(dateStr),
        content: content.trim(),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '不明なエラー';
    throw new Error(`更新に失敗しました: ${errorMessage}`);
  }

  revalidatePath('/daily-list');
  redirect('/daily-list');
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
