# 西村直樹｜編集者・ライター — 個人サイト

静的サイト（HTML / CSS / JS のみ、ビルド不要）。

ソースリポジトリ： https://github.com/nirareba0/naoki-portfolio

GitHub Pages： https://nirareba0.github.io/naoki-portfolio/ （mainブランチ直下を配信）

Netlifyへの手動アップロード用フォルダとZIPは、作業フォルダ直下の `naoki-portfolio-netlify` と `naoki-portfolio-netlify.zip`。トップページから各LPへのボタンと、Googleフォームへの問い合わせリンクを設定済み。

## サービスLP

- `ai-coaching.html`：対話で業務と目的を整理し、実装・運用までつなぐAI導入。
- `web-design.html`：コーチングを生かした対話から、言葉・デザイン・公開まで行うサイト作成。
- トップページの各サービス紹介と、LPのナビ・フッターから相互に移動できる。
- CTAは既存のGoogleフォームへ接続。例示はサンプルであることを明記し、料金とプロフィールは既存サイトをもとに構成。
- 検証：ローカル参照・ページ内リンク・重複ID・画像alt・JS構文、PCと幅390px/320pxの横はみ出し、相談例切り替え、キーボードでの切り替え、FAQ、フォームURLを確認。
- 実測Core Web Vitals、公開URLでのOGP、実際のフォーム送信は未検証。公開先が決まったら各ページにcanonicalと絶対URLのog:imageを設定する。

## ファイル

| ファイル | 役割 |
|---|---|
| `index.html` | トップページ（ヒーロー／プロジェクトマーキー／制作事例・シフト動画／編集の実演／サービス／プロフィール／活動／FAQ／フォーム） |
| `ai-coaching.html` | AI導入 × コーチングのLP。業務の棚卸し、3つの相談例、シフトデモ、進め方、料金、無料相談 |
| `web-design.html` | 対話からつくるサイト制作のLP。編集の実演、制作事例、工程、制作範囲、料金、無料相談 |
| `services.css` / `services.js` | 2本のLP共通スタイルと相談例の切り替え。JavaScriptが無効でも全例を読める |
| `thanks.html` | 旧フォーム用の完了ページ（noindex）。Googleフォームからは使用しない |
| `privacy.html` | プライバシーポリシー |
| `tokushoho.html` | 特定商取引法に基づく表記 |
| `style.css` / `script.js` | 共通スタイルと、表示アニメーション・フォーム検証 |
| `portfolio.css` / `portfolio.js` | 個人サイトの新レイアウト・レスポンシブ対応・動きの停止操作 |
| `assets/portrait.jpg` | **ここに写真を置くとプロフィール欄に表示される**（縦長 4:5、800×1000px 程度） |
| `assets/ember.mp4` / `assets/ember-poster.jpg` | ヒーロー背景の熾火ループ動画（Wan 2.2 TI2V-5B をローカルGPUで生成、4秒ループ）。再生が始まるまでは静止画＋canvas |
| `assets/stilllife.jpg` | AI導入欄の「業務の静物」画像（生成素材）。無い間は表が整列するアニメーション |
| `assets/yamanashi-fund-live.png` | 山梨もしも財団の公式トップページを2026年9月7日に撮影した掲載用スクリーンショット |
| `assets/shift-workflow.mp4` / `assets/shift-poster.jpg` / `assets/shift-ja.vtt` | シフト作成の18秒デモ・ポスター・日本語字幕（架空データ） |
| `assets/yamanashi-fund-intro.mp4` / `assets/yamanashi-fund-main.jpg` | 山梨もしも財団トップページの導入を、公開ページの画像・ロゴ・輪郭・表示タイミングをもとに再現した4.8秒動画と最終画面 |
| `assets/yomutetsu-full.jpg` | Instagram公開埋め込みページから取得した告知ポスター全体。余白を付けて表示 |
| `assets/mark-*.svg` | この個人サイトの紹介用アイコン（各団体の公式ロゴではない） |
| `assets/favicon.svg` | ファビコン |
| `robots.txt` / `.nojekyll` | 検索向け設定と GitHub Pages 用 |

## 公開手順（GitHub Pages）

1. GitHub で新しいリポジトリを作る（例：`homepage`、Public）
2. このフォルダで実行：
   ```
   git remote add origin https://github.com/<ユーザー名>/homepage.git
   git push -u origin main
   ```
3. GitHub のリポジトリ → Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `/ (root)` にして Save
4. 数分後に `https://<ユーザー名>.github.io/homepage/` で公開される

公開URLが決まったら、`index.html` にcanonicalとJSON-LDのurlを追加し、og:imageを実URLの絶対パスにする。

## お問い合わせ（Googleフォーム）

- サイト内の入力フォームとFormSubmitの送信処理は撤去済み。
- Googleフォームを作成・公開し、`index.html` の `#google-form-link` へ共有URLを設定済み。
- 公開フォーム：`https://docs.google.com/forms/d/e/1FAIpQLSd0KixjZ9qp4IN2YhDHNsjw01QhMLWU0YslcL0QJP-TNa-7_g/viewform`
- お名前、メールアドレス、相談種別、相談内容、個人情報の取り扱いへの同意を収集。お名前・メールアドレス・相談内容・同意は必須。
- 回答先のGoogleスプレッドシートと、送信後メッセージを設定済み。
- `../tools/create_google_form.gs` は、同じ構成のフォームを再作成するときの控えとして残している。

## 公開前に見直すもの

- [ ] 料金の目安（サービス欄の金額はすべて仮案）
- [ ] 「にらレバ」の説明文（内容を推定して書いたもの）
- [x] 山梨もしも財団の制作サイト `https://yamanashifund.org/` を事例カードに設定（HTTP 200確認済み）
- [ ] AI導入の3段料金（相場から仮決め）
- [ ] 資格名の表記（ICF認定スクール CAM・CCAP）
- [ ] 写真 `assets/portrait.jpg` の配置
- [ ] canonical / og:image の URL
- [ ] 特商法表記の支払・キャンセル条件が実際の運用と合っているか

## ローカル確認

```
python -m http.server 8765
```
→ http://127.0.0.1:8765/

## 今回の改修（2026-09-07）

- 見出しを「あなたの熱は、編集できる。」、肩書きを「編集者・ライター」に統一。
- 熾火の背景を活かし、制作事例を冒頭直後に配置。韮崎市100人カイギ、このサイト、山梨もしも財団を掲載。
- ジャーナリングを提供プログラム・冒頭のマーキーから削除。本人のプロフィールにある経験の記述は維持。
- ヨムテツの表記をカタカナに統一し「哲学対話」をサブタイトルに。正方形素材を全体表示。
- シフト事例は「GASアプリで休み希望入力 → スプレッドシートへ反映 → AIがベース作成 → 人が確認」に修正。Slack通知や全自動化の記述は削除。
- マーキーを実績・活動のアイコンに変更。背景動画とマーキーの停止ボタン、動きを減らす設定に対応。

動画は `../tools/shift_video.py` でPillowとFFmpegを使用して生成。事例カードは紹介用デザインで、実サイトの画面キャプチャではない。

山梨もしも財団の事例動画は `../tools/fund_intro_video.py` で生成。公式サイトの2026年9月7日時点の公開素材と、ページ内に記述されたアニメーションの順序・時間をもとにトップページ導入を再現している。

検証結果とPC・モバイルの画像は `../review/` に保存。Googleフォームは公開画面で項目・選択肢・必須設定を確認済み。ローカルサイト自体の新たな公開・デプロイは行っていない。

ヨムテツ全体画像の取得元：`https://www.instagram.com/p/DVOAICiElMl/embed/`。以前の正方形サムネイルは元画像が切れていたため差し替えた。

## 動画の再生成（ローカルGPU）

ComfyUI は `D:\ComfyUI-work\ComfyUI`（venv 同梱）、モデルは `D:\ComfyUI-work\models`。

```
cd D:\ComfyUI-work\ComfyUI && venv\Scripts\python.exe main.py --listen 127.0.0.1 --port 8188 --disable-auto-launch
python gen\wan_i2v.py gen\ember-start.png ember_v2 --frames 121 --w 1280 --h 704 --seed <任意>
ffmpeg -framerate 24 -i D:\ComfyUI-work\ComfyUI\output\ember_v2_%05d_.png -c:v libx264 -pix_fmt yuv420p -crf 18 gen\ember_v2_raw.mp4
```
その後、先頭1秒を末尾にクロスフェードして継ぎ目のないループにする（`gen/` の手順は git 履歴のコミットメッセージ参照）。RTX 4070 Ti で1本約18分。
