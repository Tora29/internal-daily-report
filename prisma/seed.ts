import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ===================================
// チームメンバー設定
// 自分のチームのコメントを外して使用してください
// ===================================

// --- Team A ---
// const users = [
//   { id: 'tora', name: 'とら', role: 'admin' },
//   { id: 'kyu', name: 'きゅー', role: 'member' },
//   { id: 'shun', name: 'しゅん', role: 'member' },
// ];

// --- Team B ---
const users = [
  { id: 'ika', name: 'いか', role: 'admin' },
  { id: 'moke', name: 'もけ', role: 'member' },
  { id: 'kiko', name: 'きこ', role: 'member' },
];

// ===================================
// サンプル日報（各チームで編集してください）
// ===================================
const sampleReports = [
  {
    userId: users[0].id, // admin
    date: new Date('2025-01-15'),
    content: `## 今日やったこと
- スターターキットの初期構築
- Prisma + Supabase の接続設定
- Mock Auth システムの実装

## 明日やること
- Server Actions の実装
- ジュニアへのオンボーディング準備

## 所感
チーム開発の土台が整ってきた。明日からは本格的に開発開始できそう。`,
  },
  {
    userId: users[0].id, // admin
    date: new Date('2025-01-16'),
    content: `## 今日やったこと
- Server Actions と Cookie 認証の連携
- サンプルデータの投入スクリプト作成

## 明日やること
- 日報一覧ページの実装
- コードレビュー

## 所感
認証周りがシンプルにまとまった。ジュニアも迷わず使えるはず。`,
  },
  {
    userId: users[1].id, // member 1
    date: new Date('2025-01-15'),
    content: `## 今日やったこと
- 環境構築
- Next.js の基本を学習
- DaisyUI のコンポーネントを試す

## 明日やること
- 日報入力フォームの作成
- Tailwind CSS に慣れる

## 所感
初めてのNext.jsだけど、サンプルコードがあるのでなんとかなりそう！`,
  },
  {
    userId: users[1].id, // member 1
    date: new Date('2025-01-16'),
    content: `## 今日やったこと
- 日報入力フォームのUI作成
- フォームのバリデーション実装

## 明日やること
- Server Action との連携
- エラーハンドリングの追加

## 所感
DaisyUIのおかげでUIがサクサク作れる。楽しい！`,
  },
  {
    userId: users[2].id, // member 2
    date: new Date('2025-01-15'),
    content: `## 今日やったこと
- Git の使い方を復習
- プロジェクト構成の理解
- ヘッダーコンポーネントの作成

## 明日やること
- ナビゲーションの実装
- レスポンシブ対応

## 所感
チーム開発は初めてだけど、先輩が丁寧に教えてくれて助かる。`,
  },
  {
    userId: users[2].id, // member 2
    date: new Date('2025-01-16'),
    content: `## 今日やったこと
- ナビゲーションコンポーネントの実装
- モバイル対応のハンバーガーメニュー作成

## 明日やること
- フッターの実装
- 共通レイアウトの整理

## 所感
レスポンシブ対応、思ったより難しい。でも勉強になる！`,
  },
];

async function main() {
  console.log('Seeding database...');

  // ユーザーの作成
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: { name: user.name, role: user.role },
      create: user,
    });
    console.log(`Created/Updated user: ${user.name} (${user.role})`);
  }

  // 既存の日報を削除（リセット用）
  await prisma.report.deleteMany();
  console.log('Cleared existing reports');

  // サンプル日報の作成
  for (const report of sampleReports) {
    await prisma.report.create({
      data: report,
    });
    console.log(
      `Created report for ${report.userId} on ${report.date.toISOString().split('T')[0]}`
    );
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
