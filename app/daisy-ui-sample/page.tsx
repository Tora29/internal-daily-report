'use client';

import { useState } from 'react';

export default function DaisyUISamplePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">DaisyUI サンプル</h1>
          <p className="mt-4 text-lg text-base-content/70">
            DaisyUIの主要コンポーネントの使用例
          </p>
        </div>

        {/* Buttons */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">ボタン</h2>
            <div className="flex flex-wrap gap-2">
              <button className="btn">Default</button>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-accent">Accent</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-error">Error</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-link">Link</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn btn-sm">Small</button>
              <button className="btn">Normal</button>
              <button className="btn btn-lg">Large</button>
              <button className="btn btn-wide">Wide</button>
              <button className="btn btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button className="btn btn-disabled">Disabled</button>
              <button className="btn btn-primary loading">Loading</button>
            </div>
          </div>
        </section>

        {/* Alerts */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">アラート</h2>
            <div className="space-y-4">
              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>情報: 新しいバージョンが利用可能です。</span>
              </div>
              <div className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>成功: データが正常に保存されました。</span>
              </div>
              <div className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>警告: ディスクの空き容量が少なくなっています。</span>
              </div>
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>エラー: リクエストの処理に失敗しました。</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">カード</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="card bg-base-200 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">カードタイトル</h3>
                  <p>カードのコンテンツがここに入ります。</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">詳細</button>
                  </div>
                </div>
              </div>
              <div className="card bg-primary text-primary-content shadow-md">
                <div className="card-body">
                  <h3 className="card-title">カラーカード</h3>
                  <p>背景色を変更したカードです。</p>
                </div>
              </div>
              <div className="card image-full bg-base-200 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">画像カード</h3>
                  <p>画像を背景にしたカードです。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">フォーム要素</h2>
            <div className="space-y-4">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">テキスト入力</span>
                </label>
                <input
                  type="text"
                  placeholder="テキストを入力"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">セレクト</span>
                </label>
                <select className="select select-bordered" defaultValue="">
                  <option disabled value="">
                    選択してください
                  </option>
                  <option>オプション1</option>
                  <option>オプション2</option>
                  <option>オプション3</option>
                </select>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">テキストエリア</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="複数行のテキスト"
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox" />
                  <span className="label-text">チェックボックス</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="radio" name="radio-1" className="radio" />
                  <span className="label-text">ラジオボタン1</span>
                </label>
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="radio" name="radio-1" className="radio" />
                  <span className="label-text">ラジオボタン2</span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="toggle" />
                  <span className="label-text">トグルスイッチ</span>
                </label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">レンジスライダー</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="40"
                  className="range"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">バッジ</h2>
            <div className="flex flex-wrap gap-2">
              <div className="badge">Default</div>
              <div className="badge badge-primary">Primary</div>
              <div className="badge badge-secondary">Secondary</div>
              <div className="badge badge-accent">Accent</div>
              <div className="badge badge-success">Success</div>
              <div className="badge badge-warning">Warning</div>
              <div className="badge badge-error">Error</div>
              <div className="badge badge-ghost">Ghost</div>
              <div className="badge badge-outline">Outline</div>
              <div className="badge badge-lg">Large</div>
            </div>
          </div>
        </section>

        {/* Modal */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">モーダル</h2>
            <button
              className="btn btn-primary"
              onClick={() => setModalOpen(true)}
            >
              モーダルを開く
            </button>

            {modalOpen && (
              <dialog className="modal modal-open">
                <div className="modal-box">
                  <h3 className="text-lg font-bold">モーダルタイトル</h3>
                  <p className="py-4">
                    これはモーダルの内容です。ここに任意のコンテンツを配置できます。
                  </p>
                  <div className="modal-action">
                    <button className="btn" onClick={() => setModalOpen(false)}>
                      閉じる
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => setModalOpen(false)}
                    >
                      OK
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
          </div>
        </section>

        {/* Tabs */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">タブ</h2>
            <div role="tablist" className="tabs tabs-boxed">
              <a role="tab" className="tab">
                タブ1
              </a>
              <a role="tab" className="tab tab-active">
                タブ2
              </a>
              <a role="tab" className="tab">
                タブ3
              </a>
            </div>
          </div>
        </section>

        {/* Loading */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">ローディング</h2>
            <div className="flex flex-wrap gap-4">
              <span className="loading loading-spinner loading-xs"></span>
              <span className="loading loading-spinner loading-sm"></span>
              <span className="loading loading-spinner loading-md"></span>
              <span className="loading loading-spinner loading-lg"></span>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <span className="loading loading-dots loading-xs"></span>
              <span className="loading loading-dots loading-sm"></span>
              <span className="loading loading-dots loading-md"></span>
              <span className="loading loading-dots loading-lg"></span>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <span className="loading loading-ring loading-xs"></span>
              <span className="loading loading-ring loading-sm"></span>
              <span className="loading loading-ring loading-md"></span>
              <span className="loading loading-ring loading-lg"></span>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">テーブル</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>名前</th>
                    <th>職種</th>
                    <th>お気に入り</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>田中太郎</td>
                    <td>フロントエンド開発者</td>
                    <td>React</td>
                  </tr>
                  <tr className="hover">
                    <th>2</th>
                    <td>佐藤花子</td>
                    <td>バックエンド開発者</td>
                    <td>Node.js</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>鈴木次郎</td>
                    <td>デザイナー</td>
                    <td>Figma</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Collapse (Accordion) */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">アコーディオン</h2>
            <div className="space-y-2">
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  アコーディオン1
                </div>
                <div className="collapse-content">
                  <p>これは最初のアコーディオンの内容です。</p>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion" />
                <div className="collapse-title text-xl font-medium">
                  アコーディオン2
                </div>
                <div className="collapse-content">
                  <p>これは2番目のアコーディオンの内容です。</p>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion" />
                <div className="collapse-title text-xl font-medium">
                  アコーディオン3
                </div>
                <div className="collapse-content">
                  <p>これは3番目のアコーディオンの内容です。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">プログレスバー</h2>
            <div className="space-y-4">
              <progress
                className="progress w-full"
                value="0"
                max="100"
              ></progress>
              <progress
                className="progress progress-primary w-full"
                value="25"
                max="100"
              ></progress>
              <progress
                className="progress progress-secondary w-full"
                value="50"
                max="100"
              ></progress>
              <progress
                className="progress progress-accent w-full"
                value="75"
                max="100"
              ></progress>
              <progress
                className="progress progress-success w-full"
                value="100"
                max="100"
              ></progress>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center">
          <p className="text-base-content/60">
            DaisyUI の詳細は{' '}
            <a
              href="https://daisyui.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              公式ドキュメント
            </a>{' '}
            をご覧ください
          </p>
        </div>
      </div>
    </div>
  );
}
