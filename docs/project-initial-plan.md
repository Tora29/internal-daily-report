# プロジェクト初期設計 - サーバーレス構成でAWSの基礎を学ぶ（全員AWS初心者版）

## 概要
5人チーム（初学者〜シニア混成、**全員AWS初心者**）で日報作成アプリを開発。
**サーバーレス構成（S3/CloudFront/Lambda/API Gateway）**を採用し、AWSの基礎をしっかり学ぶ。

## 背景・目的

### チーム構成
- **あなた**: ミドル〜シニア、フロントエンド、バックエンド、インフラ、アーキテクトにそこそこ精通
- **もけ**: 初学者、エンジニア1年目、AWSクラウドプラクティショナー、応用情報所持
- **きゅー**: ジュニア、エンジニア1年目だがお作法の知見あり、AWSクラウドプラクティショナー所持
- **やま**: ジュニア、インフラ系、オンプレメイン、CCNA所持
- **きこ**: シニア、インフラ系、オンプレメイン、PM歴長め、応用情報、SC所持

### プロジェクト方針
- アジャイル開発
- メンバー全員がAWS学習を希望
- **重要**: AWSの基礎をしっかり学ぶ（ブラックボックスを避ける）
- **フルAWS構成で構築**
- **サーバーレス構成**を採用

## 技術選定の決定事項

### 1. AWS構成: サーバーレス構成を採用

**決定**: **S3/CloudFront/Lambda/API Gateway**

**理由**:
- 初学者にAWSの基礎（S3, CloudFront, Lambda, IAM等）をしっかり学べる
- あなたの知見（S3/CloudFront/Lambda/API Gateway）を活かせる
- コストが最安（従量課金、Free Tierフル活用）
- 実務で使えるスキルが身につく
- ブラックボックスが少なく、トラブル時に原因特定しやすい

### 2. データベース: RDS PostgreSQL + Prisma

**理由**:
- リレーショナルDBが日報アプリに最適
- Prismaで型安全、マイグレーション管理が楽
- Free Tier: 750時間/月（1インスタンス分）

### 3. 認証: AWS Cognito

**理由**:
- Google OAuth対応
- Free Tier: 50,000 MAU
- CDKで構築、設定を理解しながら学べる

### 4. IaC: AWS CDK (TypeScript)

**理由**:
- TypeScriptで記述 → チーム全員読める
- AWS公式、コード補完・型チェック
- Next.jsプロジェクトと統合しやすい

### 5. ローカル開発環境: LocalStack + 実AWS（ハイブリッド）

**決定**: **LocalStack（日常開発）+ 実AWS（統合テスト・本番）**

**理由**:
- **履歴書・転職で有利**: LocalStack経験は実務で評価される
- **実務スキル**: 多くの企業がLocalStackを使用
- **コスト**: 完全無料
- **開発効率**: ローカル実行で高速、オフライン可能
- **実AWS併用**: 差異は実AWS環境で最終確認

### 6. API設計: Lambda関数（TypeScript）

**理由**:
- Next.js SSGのため、Lambda関数で実装
- Prismaでデータアクセス、zodでバリデーション

## 決定事項

### 技術スタック

```json
{
  "frontend": "Next.js 16 (App Router, SSG)",
  "deploy_frontend": "S3 + CloudFront",
  "backend": "Lambda (Node.js 20/TypeScript) + API Gateway",
  "auth": "AWS Cognito (Google Provider)",
  "database": "RDS PostgreSQL (t3.micro Free Tier)",
  "orm": "Prisma",
  "storage": "S3",
  "iac": "AWS CDK (TypeScript)",
  "state": "useState + useContext",
  "ui": "daisyUI + TailwindCSS",
  "validation": "zod",
  "test": {
    "unit": "Vitest",
    "e2e": "Playwright"
  },
  "quality": "ESLint + Prettier",
  "ci_cd": "GitHub Actions",
  "monitoring": "CloudWatch",
  "local_dev": "LocalStack + Docker (PostgreSQL)"
}
```

### アーキテクチャ図

```
┌─────────────────────────────────────────────────────┐
│                   全体構成図                         │
└─────────────────────────────────────────────────────┘

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

GitHub Actions (CI/CD)
  │
  ├─→ S3にデプロイ（フロントエンド）
  ├─→ Lambdaにデプロイ（バックエンド）
  └─→ CloudFront キャッシュクリア


AWS CDK (Infrastructure as Code)
  │
  ├─→ S3バケット作成
  ├─→ CloudFrontディストリビューション作成
  ├─→ Lambda関数作成・デプロイ
  ├─→ API Gateway作成
  ├─→ RDS インスタンス作成
  ├─→ Cognito ユーザープール作成
  └─→ IAMロール・ポリシー作成
```

### 役割分担

```
【アーキテクト・レビュアー】: あなた
├─ アーキテクチャ設計・意思決定
├─ 成果物レビュー（コード、インフラ、設計）
└─ 技術的な方向性の決定

【プロジェクトマネージャー・AWS学習リーダー】: きこ
├─ スプリント計画・進行管理
├─ スコープ調整、リスク管理
├─ コスト・予算管理
├─ AWS学習リーダー（やま・きゅー・もけを牽引）
└─ 実装にも参加（4人チームの一員）

【実装チーム】: きこ + やま + きゅー + もけ（4人）
├─ 全員でAWS学習（きこがリーダー）
├─ 全員でPrismaスキーマ設計
└─ 各自の専門領域を担当しつつ、協力して実装

  【インフラ担当】: やま
  ├─ AWS環境構築（LocalStack + 実AWS）
  ├─ AWS CDK実装
  ├─ RDS管理・Prismaマイグレーション実行
  ├─ CloudWatch監視・ログ設定
  └─ IAMロール・ポリシー設定

  【バックエンド・DevOps担当】: きゅー
  ├─ Lambda関数実装（TypeScript）
  ├─ API設計・実装
  ├─ テスト戦略・実装（Vitest）
  ├─ CI/CD構築（GitHub Actions）
  └─ ESLint/Prettier設定

  【フロント実装担当】: もけ
  ├─ Next.js フロントエンド実装
  ├─ UIコンポーネント作成（daisyUI）
  ├─ ドキュメント作成・更新
  └─ ペアプログラミング（きゅーと組む）
```

### AWS学習方法（4人チーム: きこ・やま・きゅー・もけ）

1. **週次AWS勉強会（30分）**
   - きこがリーダー・ファシリテーター
   - やま・きゅー・もけが参加
   - 前週学んだこと・ハマったことを共有
   - あなた: 質問に答える、方向性を示す

2. **ペアプログラミング・ペア構築**
   - やま + きこ: インフラ構築（CDK, RDS, Cognito）
   - きゅー + もけ: フロント・バックエンド実装
   - あなた: レビュアーとして定期的に確認

3. **AWS公式リソース活用**
   - [AWS Skill Builder](https://aws.amazon.com/training/)（無料）
   - [Serverless Land](https://serverlessland.com/)（サーバーレスパターン集）
   - AWS公式ハンズオン（Lambda, API Gateway, CDK）

4. **LocalStack公式リソース活用**（4人チーム）
   - [LocalStack公式ドキュメント](https://docs.localstack.cloud/)
   - [LocalStack GitHub](https://github.com/localstack/localstack)
   - [LocalStack チュートリアル](https://docs.localstack.cloud/tutorials/)
   - awslocal コマンドリファレンス

5. **ドキュメント化（必須）**（4人チーム）
   - やま: CDK構築内容・LocalStackセットアップ手順を記録
   - きゅー: API仕様書を作成
   - もけ: セットアップガイドを作成（学習を兼ねる）
   - きこ: AWS学習の振り返り・ナレッジ共有
   - LocalStackと実AWSの差異を記録（4人全員）
   - あなた: ドキュメントレビュー、不足部分の指摘

## 開発環境の構成

### 環境分離（LocalStack + 実AWS ハイブリッド）

```
1. ローカル開発（各自のPC）
   ├─ Next.js (npm run dev → npm run build → out/)
   ├─ LocalStack (Docker): Lambda, API Gateway, S3, IAM等
   │   ├─ Lambda関数デプロイ → LocalStack
   │   ├─ API Gateway → http://localhost:4566
   │   └─ S3バケット作成
   └─ PostgreSQL: Docker（LocalStackとは別コンテナ）

   起動方法:
   docker-compose up -d
   # → LocalStack + PostgreSQL が起動

   LocalStack使用例:
   awslocal s3 mb s3://my-bucket
   awslocal lambda create-function ...
   awslocal apigateway create-rest-api ...

   メリット:
   ├─ 完全オフライン開発
   ├─ 高速（ローカル実行）
   ├─ コスト: $0
   └─ 履歴書に「LocalStack使用」と記載可能

2. 開発環境（AWS・共有）
   ├─ S3 + CloudFront（developブランチ自動デプロイ）
   ├─ Lambda + API Gateway（開発ステージ）
   ├─ RDS（開発DB）
   └─ Cognito（開発ユーザープール）

   用途:
   ├─ LocalStackで開発 → 実AWS開発環境で統合テスト
   ├─ CloudFront等、LocalStackで再現しにくいもの
   └─ チーム全体での動作確認

   自動デプロイ:
   git push origin develop
   # → GitHub Actions
   #   ├─ Next.js ビルド → S3アップロード
   #   ├─ Lambda関数ビルド → デプロイ
   #   └─ CloudFront キャッシュクリア

3. 本番環境（AWS）
   ├─ S3 + CloudFront（mainブランチ自動デプロイ）
   ├─ Lambda + API Gateway（本番ステージ）
   ├─ RDS（本番DB）
   └─ Cognito（本番ユーザープール）

   自動デプロイ:
   git push origin main
   # → GitHub Actions（同上）
```

### LocalStack と実AWSの使い分け

```
日常開発フロー:

1. ローカル開発（LocalStack）
   ├─ Lambda関数実装
   ├─ API Gateway設定
   ├─ ローカルテスト
   └─ フロント ⇔ LocalStack API 統合

2. 動作確認（実AWS開発環境）
   ├─ 1日1回、実AWS環境にデプロイ
   ├─ CloudFront, Cognito等の動作確認
   └─ LocalStackとの差異を確認・記録

3. デプロイ（実AWS本番環境）
   ├─ PRマージ後、自動デプロイ
   └─ 本番環境での動作確認

LocalStackと実AWSの差異が出た場合:
├─ ドキュメント化
├─ 回避策を記録
└─ チームで共有
```

## チーム内コミュニケーションルール

### 意思決定プロセス（全員AWS初心者なので民主的に）

1. **提案フェーズ**
   - 誰でも提案可能
   - ドキュメント化して共有
   - 提案内容:
     - なぜこの構成/実装なのか
     - 他の選択肢と比較
     - コスト・学習コストの見積もり
     - AWS公式ドキュメント・ベストプラクティスへの参照

2. **議論フェーズ**
   - 全員でレビュー（週次ミーティングまたはGitHub Discussion）
   - 質問・懸念事項を出し合う
   - AWS経験者が少ないので、公式ドキュメント基準

3. **決定フェーズ**
   - あなた + きこで最終決定
   - 決定内容をドキュメント更新

4. **実装フェーズ**
   - ペアで実装（属人化防止）
   - 途中経過を週次で報告

5. **振り返りフェーズ**
   - スプリント終了時に振り返り
   - 「AWS学習で良かった点・改善点」を共有

### AWS関連のトラブルシューティング

```
1. まずAWS公式ドキュメントを確認
2. CloudWatch Logsでエラー確認
3. GitHub Issuesで質問（チーム内共有）
4. AWS re:Post（AWSコミュニティ）で質問
5. Stack Overflow, Serverless Landで事例検索
6. それでも解決しない場合 → AWS Supportに問い合わせ
   （Developer Supportは$29/月、検討の価値あり）
```

## MVP スコープ

```
必須機能:
├─ Google認証（Cognito）
├─ 日報CRUD（作成・閲覧・編集・削除）
├─ ユーザー管理（自分の日報のみ閲覧・編集）
└─ シンプルなUI（daisyUI）

技術的達成目標:
├─ AWS環境構築完了（S3/CloudFront/Lambda/API Gateway/RDS/Cognito）
├─ AWS CDKでインフラ管理
├─ CI/CD構築（GitHub Actions）
├─ テスト環境整備（Vitest + Playwright）
├─ コード品質チェック自動化（ESLint + Prettier）
└─ CloudWatch監視・アラート設定

学習目標（4人チーム: きこ・やま・きゅー・もけ）:
├─ 4人全員がS3, CloudFront, Lambda, API Gatewayの基本を理解
├─ 4人全員がAWSコンソールで各リソースを確認・操作できる
├─ やまがCDKでインフラをコード管理できる
├─ きゅーがLambda関数を実装できる
├─ もけがフロントエンドからAWS APIを呼び出せる
└─ きこが4人のAWS学習をリード、IAM・Cognito・RDS・CloudWatchの基本概念を全員理解
```

## 次のステップ

### 最初にやること

1. **環境準備**
   - AWSアカウント準備（MFA、IAMユーザー、コストアラート）
   - 開発環境セットアップ（Node.js, Docker, AWS CLI, CDK, awslocal）
   - GitHub Projects でプロジェクト管理開始

2. **AWS学習開始**（きこリーダー、4人チーム）
   - AWSサーバーレス + LocalStack チュートリアル
   - AWS CDK Workshopを学習
   - あなた: 学習内容をレビュー、方向性を示す

3. **スプリント計画**（きこ主導）
   - MVPのユーザーストーリー作成
   - 優先順位付け、タスク分割

### 開発フェーズ（大まかな流れ）

```
環境構築
├─ LocalStack + 実AWS環境構築
├─ CDK, Prismaスキーマ設計
└─ あなた: 設計・構築内容レビュー

実装・統合
├─ Lambda関数、API Gateway実装
├─ フロント ⇔ API統合
└─ あなた: コードレビュー、API設計レビュー

テスト・CI/CD・リリース
├─ テスト、CI/CD構築、監視設定
└─ あなた: 最終レビュー、リリース承認
```

## コスト見積もり（AWS Free Tier活用）

```
前提: 5人チーム、開発期間3ヶ月

【Free Tier範囲内（$0）】
├─ Lambda: 100万リクエスト/月、40万GB-秒/月
├─ API Gateway: 100万リクエスト/月（12ヶ月間）
├─ RDS t3.micro: 750時間/月（1インスタンス、12ヶ月間）
├─ Cognito: 50,000 MAU
├─ S3: 5GB、20,000 GETリクエスト
├─ CloudFront: 1TB転送/月（12ヶ月間）
└─ CloudWatch: 基本メトリクス

【Free Tier超過時の想定コスト】
├─ Lambda: ~$0（MVP規模なら無料範囲内）
├─ API Gateway: ~$0（100万リクエスト未満）
├─ RDS: ~$0（Free Tier内、750時間/月 = 24時間×31日）
├─ Cognito: $0（50,000 MAU未満）
├─ S3: ~$0.5/月（数GB程度）
├─ CloudFront: ~$0（1TB未満）
└─ その他（CloudWatch Logs等）: ~$2-5/月

合計: 月$0〜5程度（ほぼFree Tier内）

【12ヶ月後（Free Tier期限切れ後）の想定コスト】
※ API Gateway, CloudFront, RDSのFree Tierが終了

夜間RDS停止の場合:
├─ RDS t3.micro: $6-8/月（12時間稼働、夜間停止）
├─ API Gateway: $0.35/月（月10万リクエスト想定）
├─ CloudFront: $0.85/月（月10GB転送想定）
├─ S3: $0.5/月（数GB程度）
├─ Lambda: $0（100万リクエスト/月以内）
├─ Cognito: $0（50,000 MAU以内）
└─ CloudWatch: $2-3/月

合計: 月$10-13程度（夜間RDS停止運用）
※ 5人で割ると1人あたり月$2-3程度

24時間RDS稼働の場合:
├─ RDS t3.micro: $12-15/月（24時間稼働）
├─ 他サービス: $4-6/月
└─ 合計: 月$16-21程度

【コスト削減ポイント】
- RDS: 夜間停止（手動 or Lambda自動化）で約50%削減
- Lambda: Provisioned Concurrency使わない（Cold Start許容）
- CloudFront: キャッシュTTL長めに設定
- S3: ライフサイクルポリシーで古いファイル削除

【リスク対策】
- コストアラート設定（$10, $50で通知）
- 週次でコスト確認（やま担当、AWS Cost Explorer）
- 不要なリソースは即削除
- タグでリソース管理（dev, prod等）
```

## プロジェクト管理

### スプリント体制

- **週次スプリント**: きこ主導、全員参加
  - スプリント計画・振り返り
  - あなた: レビュー・フィードバック

- **デイリースタンドアップ**: 15分（きこ進行）

- **実装**: 4人チーム（きこ・やま・きゅー・もけ）
  - ペアプログラミング推奨
  - あなた: レビュアーとして定期確認

### 推奨プロジェクト管理ツール

**GitHub Projects**（推奨）
- 理由: 無料、コードと統合、学習コスト低
- 機能: イシュー管理、カンバンボード、マイルストーン
- テンプレート: Automated kanban with reviews

### 開発環境の統一

- Docker Composeで LocalStack + PostgreSQL 統一
- Node.js バージョン統一（.nvmrc: `20`）
- AWS CLI, CDK, awslocal バージョン統一
- セットアップスクリプトで環境構築を自動化
- 初学者もけのオンボーディングコストを削減

## 注意点・リスク

### リスクと対策

1. **4人全員がAWS初心者（サーバーレス構成）**
   - リスク: セットアップが複雑、迷走する可能性
   - 対策:
     - きこがAWS学習リーダーとしてチームを牽引
     - AWS公式ドキュメント・ベストプラクティスを基準に
     - 週次で学習内容を共有
     - 小さく始める（最初はLocalStackでS3だけ等）
     - あなた: レビューを通じて方向性を示す

2. **初学者もけのキャッチアップ**
   - リスク: AWS + React + TypeScript、全部初めてで混乱
   - 対策:
     - まずNext.js + TypeScriptに集中
     - ペアプログラミング（きゅーと組む）
     - UIコンポーネント作成から始める
     - AWS学習は余裕があれば
     - ドキュメント作成を通じて学習

3. **AWS コスト超過**
   - リスク: Free Tier超過、RDS稼働し続けて課金
   - 対策:
     - コストアラート設定（$10, $50で通知）
     - 週次でコスト確認（やま担当、Cost Explorer）
     - 開発中のRDSは夜間停止（手動 or Lambda自動化）
     - 不要リソース即削除
     - タグでリソース管理
     - 推奨月予算: $5-10

4. **Lambda Cold Start**
   - リスク: アクセス少ない時、初回レスポンスが遅い（1-2秒）
   - 対策:
     - MVP段階では許容（ユーザー5人のみ）
     - Lambda関数のバンドルサイズを小さく保つ

5. **CDK学習コスト**
   - リスク: やまがCDK初めて、時間かかる
   - 対策:
     - きこがメンターとしてサポート
     - AWS CDK Workshopを事前学習
     - 最初は小さいスタックから（S3のみ等）
     - あなた: CDKコードレビュー

6. **LocalStackと実AWSの差異**
   - リスク: LocalStackで動作するが実AWSで動かない
   - 対策:
     - 定期的に実AWS開発環境にデプロイして動作確認
     - 差異が出たらドキュメント化してチームで共有
     - LocalStack公式ドキュメントで既知の問題を確認
     - CloudFront, Cognito等、LocalStackで再現しにくいものは実AWSメイン
     - CI/CDで実AWSへの自動デプロイ・テスト

7. **LocalStackセットアップの複雑さ**
   - リスク: Docker, awslocal等、初学者に複雑
   - 対策:
     - セットアップスクリプト（setup-localstack.sh）を用意
     - docker-compose up -d で一発起動
     - もけ向けに詳細なセットアップガイド作成（もけ自身が作成）
     - きこ・やまがペアで最初のセットアップをサポート
     - あなた: セットアップ手順レビュー

8. **スコープクリープ**
   - リスク: 「あれもこれも」で完成しない
   - 対策:
     - MVPを定義（上記参照）
     - きこが優先順位管理
     - 「Phase 2でやる」リスト作成

9. **属人化（特にやま）**
   - リスク: やまだけがAWS環境を理解、他メンバーが置いてけぼり
   - 対策:
     - ペアプロ必須（きこ・やまペア）
     - ドキュメント化徹底
     - 週次勉強会で知識共有（きこ主導）
     - きゅーもLambda実装を通じてAWS学習

## 参考リソース

### LocalStack
- [LocalStack公式ドキュメント](https://docs.localstack.cloud/)
- [LocalStack GitHub](https://github.com/localstack/localstack)
- [LocalStack チュートリアル](https://docs.localstack.cloud/tutorials/)
- [awslocal CLI](https://github.com/localstack/awscli-local)
- [LocalStack サポートサービス一覧](https://docs.localstack.cloud/references/coverage/)

### AWS公式

#### サーバーレス
- [AWS Lambda ドキュメント](https://docs.aws.amazon.com/lambda/)
- [Amazon API Gateway ドキュメント](https://docs.aws.amazon.com/apigateway/)
- [Serverless Land](https://serverlessland.com/)（パターン集）

#### インフラ・その他
- [AWS CDK ドキュメント](https://docs.aws.amazon.com/cdk/)
- [AWS CDK Workshop](https://cdkworkshop.com/)（TypeScript版推奨）
- [Amazon S3 ドキュメント](https://docs.aws.amazon.com/s3/)
- [Amazon CloudFront ドキュメント](https://docs.aws.amazon.com/cloudfront/)
- [Amazon RDS ドキュメント](https://docs.aws.amazon.com/rds/)
- [Amazon Cognito ドキュメント](https://docs.aws.amazon.com/cognito/)
- [AWS Skill Builder（無料学習）](https://aws.amazon.com/training/)
- [AWS re:Post（コミュニティ）](https://repost.aws/)

### Next.js
- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

### データベース・ORM
- [Prisma ドキュメント](https://www.prisma.io/docs)
- [Prisma + PostgreSQL ガイド](https://www.prisma.io/docs/orm/overview/databases/postgresql)
- [Prisma + AWS Lambda](https://www.prisma.io/docs/orm/more/deployment/serverless/deploy-to-aws-lambda)

### UI
- [daisyUI](https://daisyui.com/)
- [TailwindCSS](https://tailwindcss.com/)

### テスト
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)

### その他
- [zod（バリデーション）](https://zod.dev/)
- [GitHub Actions ドキュメント](https://docs.github.com/actions)
