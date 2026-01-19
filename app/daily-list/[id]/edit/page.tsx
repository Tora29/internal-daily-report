// ===================================
// 日報編集ページ
// URL: /daily-list/[id]/edit
// 機能: 指定された日報の内容を編集・更新
// ===================================

import { getReport, updateReport } from '@/app/actions/report';
import Link from 'next/link';

// date型のデータをYYYY-MM-DDのフォーマットにする関数
function formatDateToInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

type Props = {
  params: { id: string };
};

export default async function EditPage({ params }: Props) {
  // URL パラメータから日報IDを取得し、編集対象の日報を取得する
  const resolvedParams = await Promise.resolve(params);
  const report = await getReport(resolvedParams.id);

  if (!report) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-xl font-bold text-red-500">日報が見つかりません</h1>
      </div>
    );
  }

  const reportDate = formatDateToInput(report.date);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-xl font-bold">日報編集</h1>

      <form action={updateReport} className="space-y-4">
        <input type="hidden" name="id" value={report.id} />

        <div className="space-y-2">
          <label className="label">
            <span className="label-text">日付</span>
          </label>
          <input
            type="date"
            name="date"
            defaultValue={reportDate}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="label">
            <span className="label-text">タイトル</span>
          </label>
          <textarea
            name="content"
            defaultValue={report.content}
            className="textarea textarea-bordered w-full min-h-48"
            placeholder="今日やったこと / 明日やること など"
            required
          />
        </div>

        <div className="flex gap-2 justify-end">
          {/* 戻る = 一覧へ遷移 */}
          <Link href="/daily-list" className="btn btn-ghost">
            戻る
          </Link>

          {/* 登録 = DB保存 → 一覧へ redirect */}
          <button type="submit" className="btn btn-primary">
            更新
          </button>
        </div>
      </form>
    </div>
  );
}
