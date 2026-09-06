# 西村直樹｜熱意の編集者 — 個人サイト

静的サイト（HTML / CSS / JS のみ、ビルド不要）。GitHub Pages で公開する前提。

## ファイル

| ファイル | 役割 |
|---|---|
| `index.html` | トップページ（ヒーロー／活動マーキー／課題／3サービス／進め方／プロフィール／活動／FAQ／フォーム） |
| `thanks.html` | フォーム送信後の完了ページ（noindex） |
| `privacy.html` | プライバシーポリシー |
| `tokushoho.html` | 特定商取引法に基づく表記 |
| `style.css` / `script.js` | スタイルと、表示アニメーション・フォーム検証 |
| `assets/portrait.jpg` | **ここに写真を置くとプロフィール欄に表示される**（縦長 4:5、800×1000px 程度） |
| `assets/ember.mp4` / `assets/ember-poster.jpg` | ヒーロー背景の熾火ループ動画（生成素材）。無い間は canvas が熾火を描く |
| `assets/stilllife.jpg` | AI導入欄の「業務の静物」画像（生成素材）。無い間は表が整列するアニメーション |
| `assets/case-01.png` / `assets/case-02.png` | 事例の画面キャプチャ |
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

公開URLが決まったら、`index.html` 内の `https://example.com/`（canonical と og:image、JSON-LD の url）を実URLに置き換える。

## フォームの有効化（FormSubmit）

- フォームは `https://formsubmit.co/naoki.nishimura@kawarabe.com` に送信される
- **公開後に一度、自分でテスト送信する。** 初回だけ FormSubmit から確認メールが届くので、その中の「Activate」を押すと有効になる
- 有効化後、FormSubmit からランダムな英数字のエイリアス（例 `https://formsubmit.co/ab12cd34...`）が案内される。`index.html` の `<form action="...">` をそれに差し替えると、HTMLにメールアドレスが露出しなくなる
- 迷惑メールフォルダに入っていないか確認する

## 公開前に見直すもの

- [ ] 料金の目安（サービス欄の金額はすべて仮案）
- [ ] 「にらレバ」の説明文（内容を推定して書いたもの）
- [ ] 事例01（自社のシフト・予約自動化）の説明文が実態と合っているか
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
