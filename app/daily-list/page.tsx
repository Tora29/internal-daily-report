// ===================================
// 日報一覧ページ
// ===================================

import Link from 'next/link';
import { getReports } from '@/app/actions/report';

// 非同期でデータ取得
export default async function DailyListPage() {
  // 日報一覧取得
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
                <Link href={`/daily-list/${report.id}/edit`}>
                  <button type="button" className="btn btn-primary btn-md">
                    編集
                  </button>
                </Link>
                <button className="btn btn-error btn-md">削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
