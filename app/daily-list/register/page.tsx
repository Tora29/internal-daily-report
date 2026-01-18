// ===================================
// 日報一覧ページ
// ===================================

import { getReports } from '@/app/actions/report';
  import Link from 'next/link'
import { createReport } from '@/app/actions/report'

function todayYYYYMMDD(): string {
  const d = new Date()
  // input[type=date] は YYYY-MM-DD
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function DailyNewPage() {
  const today = todayYYYYMMDD()

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-xl font-bold">日報登録</h1>

      <form action={createReport} className="space-y-4">
        <div className="space-y-2">
          <label className="label">
            <span className="label-text">日付</span>
          </label>
          <input
            type="date"
            name="date"
            defaultValue={today}
            className="input input-bordered w-full"
            required
          />
          {/* 要件が YYYYMMDD 表示なら、登録時に変換・表示ラベルだけ別途対応可能 */}
        </div>

        <div className="space-y-2">
          <label className="label">
            <span className="label-text">タイトル</span>
          </label>
          <textarea
            name="title"
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
            登録
          </button>
        </div>
      </form>
    </div>
  )
}

