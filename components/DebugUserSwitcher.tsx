'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { loginAs } from '@/app/actions/auth';

type User = {
  id: string;
  name: string;
  role: 'admin' | 'member';
};

// ===================================
// チームメンバー設定
// 自分のチームのコメントを外して使用してください
// ===================================

// --- Team A ---
// const MOCK_USERS: User[] = [
//   { id: 'tora', name: 'とら', role: 'admin' },
//   { id: 'kyu', name: 'きゅー', role: 'member' },
//   { id: 'shun', name: 'しゅん', role: 'member' },
// ];

// --- Team B ---
const MOCK_USERS: User[] = [
  { id: 'ika', name: 'いか', role: 'admin' },
  { id: 'moke', name: 'もけ', role: 'member' },
  { id: 'kiko', name: 'きこ', role: 'member' },
];

type DebugUserSwitcherProps = {
  currentUserId?: string | null;
};

export function DebugUserSwitcher({ currentUserId }: DebugUserSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUserChange = (userId: string) => {
    startTransition(async () => {
      await loginAs(userId);
      router.refresh();
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-base-200 rounded-lg p-3 shadow-lg border border-base-300">
        <div className="text-xs text-base-content/60 mb-2">
          Debug: User {isPending && '(switching...)'}
        </div>
        <select
          className="select select-bordered select-sm w-full"
          value={currentUserId ?? ''}
          onChange={(e) => handleUserChange(e.target.value)}
          disabled={isPending}
        >
          <option value="" disabled>
            Select user
          </option>
          {MOCK_USERS.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
