// ===================================
// サンプルページ: ユーザー一覧
// このページをコピーして改造してください
// ===================================

// Server Actions から関数を import
import { getReports } from '@/app/actions/report';

// Server Component なので 'use client' は不要
// 直接 await でデータを取得できる
export default async function DailyListPage() {
  // Server Actions の関数を呼ぶだけ！
  const reports = await getReports();

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>日付</th>
            <th>作成者</th>
            <th>タイトル</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.date.toLocaleDateString()}</td>
              <td>{report.userId}</td>
              <td>{report.content}</td>
              <td className="flex gap-2">
                <button className="btn btn-primary btn-md">編集</button>
                <button className="btn btn-error btn-md">削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
