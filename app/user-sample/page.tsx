// ===================================
// サンプルページ: ユーザー一覧
// このページをコピーして改造してください
// ===================================

// Server Actions から関数を import
import { getUsersWithReports } from '@/app/actions/sample';

// Server Component なので 'use client' は不要
// 直接 await でデータを取得できる
export default async function ExampleUsersPage() {
  // Server Actions の関数を呼ぶだけ！
  const users = await getUsersWithReports();

  return (
    <div className="container mx-auto p-4">
      {/* ページタイトル */}
      <h1 className="text-2xl font-bold mb-6">ユーザー一覧（サンプル）</h1>

      {/* 説明 */}
      <div className="alert alert-info mb-6">
        <span>
          このページは実装のお手本です。コードを参考にしてください。
          <br />
          ファイル: <code>app/user-sample/page.tsx</code>
        </span>
      </div>

      {/* ユーザーカード一覧 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          // key は必ず設定（一意なIDを使う）
          <div key={user.id} className="card bg-base-200 shadow-sm">
            <div className="card-body">
              {/* アバターと名前 */}
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content w-12 rounded-full">
                    <span className="text-lg">{user.name[0]}</span>
                  </div>
                </div>
                <div>
                  <h2 className="card-title">{user.name}</h2>
                  <p className="text-sm opacity-60">@{user.id}</p>
                </div>
              </div>

              {/* バッジ（条件分岐の例） */}
              <div className="mt-2">
                {user.role === 'admin' ? (
                  <span className="badge badge-primary">管理者</span>
                ) : (
                  <span className="badge badge-ghost">メンバー</span>
                )}
              </div>

              {/* 統計情報 */}
              <div className="stats stats-vertical shadow mt-4">
                <div className="stat">
                  <div className="stat-title">日報数</div>
                  <div className="stat-value text-lg">
                    {user.reports.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* コードの説明 */}
      <div className="mt-8 p-4 bg-base-200 rounded-lg">
        <h2 className="text-lg font-bold mb-2">このページのポイント</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <code>
              import &#123; getUsersWithReports &#125; from
              &apos;@/app/actions/sample&apos;
            </code>{' '}
            で関数を import
          </li>
          <li>
            <code>await getUsersWithReports()</code> でデータを取得
          </li>
          <li>
            <code>users.map()</code> で繰り返し表示
          </li>
          <li>
            <code>key=&#123;user.id&#125;</code> を必ず設定
          </li>
          <li>条件分岐は三項演算子を使用</li>
        </ul>
      </div>
    </div>
  );
}
