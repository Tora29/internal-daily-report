# Daily Report - ハッカソン スターターキット

日報登録システムのハッカソン用ベースリポジトリです。

## チーム構成

| チーム | メンバー                    | ブランチ | Supabase     |
| ------ | --------------------------- | -------- | ------------ |
| Team A | とら(admin), きゅー, しゅん | `team-a` | nippo-team-a |
| Team B | いか(admin), もけ, きこ     | `team-b` | nippo-team-b |

## 技術スタック

- **Frontend**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS 4 + daisyUI 5
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma 6
- **Deploy**: Vercel

---

## セットアップ手順

### 1. ブランチを切る

```bash
# リポジトリをクローン
git clone https://github.com/Tora29/internal-daily-report.git
cd internal-daily-report

# 自分のチームのブランチを作成
# Team A の場合
git checkout -b team-a

# Team B の場合
git checkout -b team-b
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. チーム設定を変更

**自分のチームに合わせて、以下の2ファイルを編集してください。**

#### `prisma/seed.ts`

```typescript
// Team A の場合: そのまま
// Team B の場合: Team A をコメントアウトし、Team B のコメントを外す

// --- Team A ---
// const users = [
//   { id: 'tora', name: 'とら', role: 'admin' },
//   ...
// ];

// --- Team B ---
const users = [
  { id: 'ika', name: 'いか', role: 'admin' },
  { id: 'moke', name: 'もけ', role: 'member' },
  { id: 'kiko', name: 'きこ', role: 'member' },
];
```

#### `components/DebugUserSwitcher.tsx`

同様に Team A / Team B のコメントを切り替え

### 4. 環境変数を設定

```bash
cp .env.example .env
```

`.env` を編集して、自分のチームの Supabase 接続情報を設定:

```bash
# Team A
DATABASE_URL="postgresql://postgres.uhmzoirgajuhrjarvdla:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.uhmzoirgajuhrjarvdla:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?pgbouncer=true"

# Team B
DATABASE_URL="postgresql://postgres.qwyxirhdbdotqqylrojd:[PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.qwyxirhdbdotqqylrojd:[PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres?pgbouncer=true"
```

> **パスワードはチームリーダーに確認してください**

### 5. データベース初期化

```bash
npm run db:reset
```

### 6. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 にアクセス

---

## 開発ガイド

### お手本

| 種類           | 説明                               | ファイル                       |
| -------------- | ---------------------------------- | ------------------------------ |
| ページ         | ユーザー一覧（データ取得のお手本） | `app/user-sample/page.tsx`     |
| ページ         | DaisyUI コンポーネント集           | `app/daisy-ui-sample/page.tsx` |
| Server Actions | 様々なパターンのサンプル           | `app/actions/sample.ts`        |

**コードをコピーして改造してください！**

### 用意されている関数

`app/actions/report.ts` に日報操作の関数が用意されています。**これを呼ぶだけでDBアクセスできます！**

```typescript
// 日報一覧を取得
import { getReports } from '@/app/actions/report';
const reports = await getReports();

// 自分の日報だけ取得
import { getMyReports } from '@/app/actions/report';
const myReports = await getMyReports();

// 日報を1件取得
import { getReport } from '@/app/actions/report';
const report = await getReport('日報のID');

// 日報を作成
import { createReport } from '@/app/actions/report';
const result = await createReport('今日の内容...');
if (result.success) {
  // 成功: result.report に作成した日報
} else {
  // エラー: result.error にメッセージ
}

// 日報を更新
import { updateReport } from '@/app/actions/report';
const result = await updateReport('日報のID', '更新した内容');

// 日報を削除
import { deleteReport } from '@/app/actions/report';
const result = await deleteReport('日報のID');
```

### ページの作り方

1. `app/` の下にフォルダを作る（例: `app/reports/`）
2. `page.tsx` ファイルを作る
3. 関数を import して使う

**例: 日報一覧ページ** (`app/reports/page.tsx`)

```typescript
import { getReports } from '@/app/actions/report';

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <div>
      {reports.map((report) => (
        <div key={report.id} className="card bg-base-200 mb-4 p-4">
          <p>{report.user.name}</p>
          <p>{report.content}</p>
        </div>
      ))}
    </div>
  );
}
```

### `'use client'` って何？

- **フォームや useState を使うとき** → 先頭に `'use client'` を書く
- **データ表示だけ** → `'use client'` は不要

### DaisyUI の使い方

- `app/daisy-ui-sample/page.tsx` を見てコピペ
- `btn`, `card`, `alert` などのクラスを使う
- 公式: https://daisyui.com/components/

---

## 開発フロー

### ブランチ戦略

```
main (ベース)
  │
  ├── team-a (Team A 開発)
  │     └── feature/xxx (機能ブランチ)
  │
  └── team-b (Team B 開発)
        └── feature/xxx (機能ブランチ)
```

### 機能開発の流れ

```bash
# 1. 機能ブランチを作成
git checkout -b feature/日報一覧

# 2. 開発・コミット
git add .
git commit -m "feat: 日報一覧ページを追加"

# 3. チームブランチにマージ
git checkout team-a
git merge feature/日報一覧
git push origin team-a
```

---

## 認証システム（Mock Auth）

本番の認証は実装せず、**なりきり認証**を採用しています。

### 使い方

画面左下のデバッグUIでユーザーを切り替えられます。

### Server Actions での取得

```typescript
// app/actions/report.ts
'use server';

import { getCurrentUser } from '@/lib/auth';

export async function createReport(content: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error('ログインしてください');

  // user.id, user.name, user.role が使える
  // ...
}
```

### Server Component での取得

```typescript
// app/reports/page.tsx
import { getCurrentUser } from '@/lib/auth';

export default async function ReportsPage() {
  const user = await getCurrentUser();

  return <div>こんにちは、{user?.name}さん</div>;
}
```

---

## 便利コマンド

```bash
# 開発サーバー
npm run dev

# ビルド
npm run build

# Lint チェック
npm run lint

# フォーマット
npm run format

# テスト
npm run test:run

# DB リセット（テーブル再作成 + シード）
npm run db:reset

# DB シードのみ
npm run db:seed

# Prisma Studio（DB GUI）
npm run db:studio
```

---

## データベース

### スキーマ

```prisma
model User {
  id        String   @id
  name      String
  role      String   @default("member")
  reports   Report[]
}

model Report {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(...)
  date      DateTime
  content   String
}
```

### Prisma の使い方

```typescript
import { prisma } from '@/lib/prisma';

// 日報一覧取得
const reports = await prisma.report.findMany({
  include: { user: true },
  orderBy: { date: 'desc' },
});

// 日報作成
await prisma.report.create({
  data: {
    userId: user.id,
    content: '今日の日報...',
  },
});
```

---

## ディレクトリ構成

```
/
├── app/                    # Next.js App Router
│   ├── actions/           # Server Actions（用意済み）
│   │   ├── auth.ts        # loginAs()
│   │   ├── report.ts      # 日報CRUD（getReports, createReport等）
│   │   └── sample.ts      # サンプルコード集（コピーして使う）
│   ├── user-sample/page.tsx      # お手本ページ（コピーして使う）
│   ├── daisy-ui-sample/page.tsx  # DaisyUIサンプル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/            # UIコンポーネント
│   ├── Navbar.tsx         # ナビゲーション
│   └── DebugUserSwitcher.tsx
├── lib/                   # ユーティリティ
│   ├── auth.ts            # getCurrentUser()
│   └── prisma.ts          # Prisma Client
├── prisma/
│   ├── schema.prisma      # DBスキーマ
│   └── seed.ts            # シードデータ
└── .env.example           # 環境変数テンプレート
```

---

## トラブルシューティング

### DB接続エラー

```
Can't reach database server
```

→ `.env` の `DATABASE_URL` と `DIRECT_URL` を確認

### 認証エラー

```
Authentication failed
```

→ パスワードが正しいか確認（チームリーダーに聞く）

### キャッシュの問題

```bash
rm -rf .next
npm run dev
```

---

## ライセンス

MIT
