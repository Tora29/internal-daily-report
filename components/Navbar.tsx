// ===================================
// ナビゲーションバー
// DaisyUI の navbar コンポーネントを使用
// ===================================

import Link from 'next/link';

export function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow-sm px-4">
      {/* ロゴ・タイトル（左側） */}
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Daily Report
        </Link>
      </div>

      {/* ナビゲーションリンク（右側） */}
      <div className="flex-none gap-2">
        <Link href="/daily-list/register" className="btn btn-ghost btn-sm">
          登録
        </Link>
      </div>
    </div>
    
  );
}
