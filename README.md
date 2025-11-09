# internal-daily-report

Discord サーバーでの活動を日報で報告するためのシステムです。

## ブランチ戦略（GitHub Flow）

シンプルなGitHub Flowを採用します。

```
main         → 本番環境（自動デプロイ）
  ↑
feature/*    → 機能開発ブランチ
```

### ブランチ運用ルール

- **main**: 本番環境、保護ブランチ、PRのみマージ可
- **feature/\***: 個別機能開発、mainからブランチを切る
  - 例: `feature/auth-cognito`, `feature/daily-report-crud`

### 開発フロー

1. **ブランチ作成**: `git checkout -b feature/xxx main`
2. **LocalStackで開発・テスト**: ローカル環境で開発
3. **PR作成**: `feature/xxx → main`
4. **コードレビュー**: チームメンバー同士のレビュー後、テックリードにレビュー依頼
5. **マージ**: main にマージ → 本番環境に自動デプロイ

### 実AWS環境での統合テスト（必要時）

LocalStackと実AWSの差異確認が必要な場合:

- GitHub Actionsのワークフローを手動実行（`workflow_dispatch`）
- PRブランチを指定して実AWS環境にデプロイ・テスト
- 問題なければmainにマージ

### コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/) を推奨:

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント変更
refactor: リファクタリング
test: テスト追加・修正
chore: ビルド・設定変更
```

例:

```
feat: add Google OAuth with Cognito
fix: resolve Lambda cold start issue
docs: update setup guide for LocalStack
```

## 環境セットアップ

### 前提条件

以下をインストールしてください:

- Node.js 20.x (推奨: [nvm](https://github.com/nvm-sh/nvm)使用)
- Docker & Docker Compose
- AWS CLI v2
- [awslocal CLI](https://github.com/localstack/awscli-local) (LocalStack用)

```bash
# Node.js 20 インストール（nvmの場合）
nvm install 20
nvm use 20

# AWS CLI インストール確認
aws --version

# awslocal インストール
pip install awscli-local
```

### 初回セットアップ

```bash
# 1. リポジトリをクローン
git clone https://github.com/your-org/internal-daily-report.git
cd internal-daily-report

# 2. 依存関係インストール
npm install

# 3. 環境変数設定
cp .env.local .env
# .env を編集して必要な値を設定（個人用の設定）

# 4. LocalStack + PostgreSQL 起動
docker-compose up -d

# 5. データベースマイグレーション
npm run db:migrate

# 6. 開発サーバー起動
npm run dev
```

### LocalStack確認

```bash
# LocalStackの起動確認
docker-compose ps

# LocalStack S3バケット作成例
awslocal s3 mb s3://test-bucket
awslocal s3 ls

# LocalStack Lambda一覧確認例
awslocal lambda list-functions
```

## 開発コマンド

### ローカル開発

```bash
# 開発サーバー起動（ホットリロード対応）
npm run dev

# アクセス: http://localhost:3000

# LocalStack + PostgreSQL 起動
docker-compose up -d

# LocalStack + PostgreSQL 停止
docker-compose down

# LocalStack + PostgreSQL ログ確認
docker-compose logs -f
```

### ビルド

```bash
# Next.js ビルド（SSG出力 → out/）
npm run build

# 本番モード起動
npm start
```

### コード品質チェック

```bash
# Lint チェック
npm run lint

# コードフォーマット
npm run format

# フォーマットチェック（CI用）
npm run format:check

# テスト実行
npm test

# テスト実行（UI付き）
npm run test:ui

# テスト実行（CI用）
npm run test:run
```

### データベース

```bash
# Prismaマイグレーション作成
npm run db:migrate

# Prisma Studio起動（DB GUI）
npm run db:studio

# Prismaスキーマ再生成
npm run db:generate
```

## デプロイフロー

### 自動デプロイ（GitHub Actions）

```
feature/* → main にマージ
  ↓
GitHub Actions 自動実行
  ├─ Next.js ビルド → S3 アップロード
  ├─ Lambda関数 ビルド → デプロイ
  └─ CloudFront キャッシュクリア
  ↓
本番環境に反映
```

### 手動デプロイ（実AWS統合テスト用）

GitHub Actionsのワークフロー画面から `workflow_dispatch` で手動実行可能:

1. GitHubリポジトリの **Actions** タブを開く
2. 対象ワークフローを選択
3. **Run workflow** → ブランチ選択 → 実行

## プロジェクト管理

### タスク管理

- **GitHub Projects** を使用してタスク管理
- イシュー駆動開発を推奨

## AWSアーキテクチャ

```
ユーザー
  │
  ↓
CloudFront (CDN)
  │
  ├─→ S3 (静的ファイル: HTML, CSS, JS)
  │     ├─ Next.js SSG出力（npm run build → out/）
  │     └─ 画像、フォント等
  │
  └─→ API Gateway (REST API)
        │
        └─→ Lambda関数（TypeScript）
              │
              ├─→ RDS PostgreSQL (Prisma経由)
              │     └─ 日報データ、ユーザーデータ
              │
              └─→ Cognito（認証・認可）
```

## 参考リソース

### AWS公式

- [AWS Lambda ドキュメント](https://docs.aws.amazon.com/lambda/)
- [Amazon API Gateway ドキュメント](https://docs.aws.amazon.com/apigateway/)
- [AWS CDK ドキュメント](https://docs.aws.amazon.com/cdk/)
- [AWS Skill Builder（無料学習）](https://aws.amazon.com/training/)

### LocalStack

- [LocalStack公式ドキュメント](https://docs.localstack.cloud/)
- [LocalStack GitHub](https://github.com/localstack/localstack)
- [awslocal CLI](https://github.com/localstack/awscli-local)

### Next.js

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

### データベース・ORM

- [Prisma ドキュメント](https://www.prisma.io/docs)
- [Prisma + PostgreSQL ガイド](https://www.prisma.io/docs/orm/overview/databases/postgresql)

## ライセンス

MIT
