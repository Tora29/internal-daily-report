'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteReport } from '@/app/actions/report';

/**
 * DeleteReportButtonコンポーネントのProps
 */
type Props = {
  /** 削除対象の日報ID */
  reportId: string;
};

/**
 * 日報削除ボタンコンポーネント
 *
 * 削除ボタンをクリックすると確認モーダルを表示し、
 * ユーザーが確認後に日報を削除する。
 *
 * @param props - コンポーネントのProps
 * @param props.reportId - 削除対象の日報ID
 * @returns 削除ボタンと確認モーダルを含むJSX要素
 */
export default function DeleteReportButton({ reportId }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  /**
   * 日報削除処理を実行する
   *
   * 削除成功時はモーダルを閉じてページをリフレッシュし、
   * 失敗時はエラーメッセージをアラート表示する。
   */
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteReport(reportId);
      if (result.success) {
        setModalOpen(false);
        router.refresh();
      } else {
        alert(result.error);
      }
    });
  };

  return (
    <>
      <button
        className="btn btn-error btn-md"
        onClick={() => setModalOpen(true)}
      >
        削除
      </button>

      {modalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">削除確認</h3>
            <p className="py-4">この日報を削除しますか？</p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setModalOpen(false)}
                disabled={isPending}
              >
                キャンセル
              </button>
              <button
                className="btn btn-error"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? '削除中...' : '削除'}
              </button>
            </div>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => setModalOpen(false)}
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
