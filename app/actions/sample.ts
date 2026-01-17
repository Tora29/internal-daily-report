'use server';

// ===================================
// サンプル Server Actions
// このファイルを参考にして新しいアクションを作ってください
// ===================================

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// -----------------------------------
// 1. データ取得（シンプル）
// -----------------------------------

/**
 * 全ユーザーを取得
 */
export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

/**
 * 全ユーザーを取得（日報付き）
 * user-sample/page.tsx で使用
 */
export async function getUsersWithReports() {
  const users = await prisma.user.findMany({
    include: {
      reports: true,
    },
  });
  return users;
}

/**
 * ユーザーを1件取得
 */
export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

// -----------------------------------
// 2. データ取得（関連データ付き）
// -----------------------------------

/**
 * ユーザーと日報を一緒に取得
 */
export async function getUserWithReports(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      reports: true, // 関連する日報も取得
    },
  });
  return user;
}

/**
 * 全ユーザーと日報数を取得
 */
export async function getUsersWithReportCount() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { reports: true },
      },
    },
  });
  return users;
}

// -----------------------------------
// 3. 条件付き取得
// -----------------------------------

/**
 * 管理者だけ取得
 */
export async function getAdmins() {
  const admins = await prisma.user.findMany({
    where: {
      role: 'admin',
    },
  });
  return admins;
}

/**
 * 日報をキーワードで検索
 */
export async function searchReports(keyword: string) {
  const reports = await prisma.report.findMany({
    where: {
      content: {
        contains: keyword,
      },
    },
    include: { user: true },
    orderBy: { date: 'desc' },
  });
  return reports;
}

// -----------------------------------
// 4. 認証が必要な操作
// -----------------------------------

/**
 * ログイン中のユーザー情報を取得
 */
export async function getMe() {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'ログインしてください' };
  }
  return { success: true, user };
}

/**
 * 自分の日報だけ取得
 */
export async function getMyReportsExample() {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const reports = await prisma.report.findMany({
    where: { userId: user.id },
    orderBy: { date: 'desc' },
  });
  return reports;
}

// -----------------------------------
// 5. データ作成（成功/失敗を返す）
// -----------------------------------

/**
 * 何かを作成するパターン
 * 戻り値: { success: true, data: ... } または { success: false, error: '...' }
 */
export async function createSomething(content: string) {
  // 1. 認証チェック
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'ログインしてください' };
  }

  // 2. バリデーション
  if (!content.trim()) {
    return { success: false, error: '内容を入力してください' };
  }

  // 3. 作成
  try {
    const report = await prisma.report.create({
      data: {
        userId: user.id,
        content: content.trim(),
        date: new Date(),
      },
    });
    return { success: true, data: report };
  } catch {
    return { success: false, error: '作成に失敗しました' };
  }
}

// -----------------------------------
// 6. データ更新
// -----------------------------------

/**
 * 何かを更新するパターン
 */
export async function updateSomething(id: string, content: string) {
  // 1. 認証チェック
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'ログインしてください' };
  }

  // 2. 権限チェック（自分のデータか確認）
  const existing = await prisma.report.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return { success: false, error: '編集権限がありません' };
  }

  // 3. 更新
  try {
    const updated = await prisma.report.update({
      where: { id },
      data: { content: content.trim() },
    });
    return { success: true, data: updated };
  } catch {
    return { success: false, error: '更新に失敗しました' };
  }
}

// -----------------------------------
// 7. データ削除
// -----------------------------------

/**
 * 何かを削除するパターン
 */
export async function deleteSomething(id: string) {
  // 1. 認証チェック
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'ログインしてください' };
  }

  // 2. 権限チェック
  const existing = await prisma.report.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return { success: false, error: '削除権限がありません' };
  }

  // 3. 削除
  try {
    await prisma.report.delete({ where: { id } });
    return { success: true };
  } catch {
    return { success: false, error: '削除に失敗しました' };
  }
}
