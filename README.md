# My Site

自己紹介サイトの実装です。

## 構造

Astro を使用しています。
ディレクトリ構造は https://docs.astro.build/en/basics/project-structure/ に従っています。

CIによるlint, type-check, playwrightを使ったVRTが動いています。dependabotによる依存更新が動いています。
CopilotにPRレビューをしてもらっています。

## Development

PRがmainにマージされると自動でデプロイされます。

Install deps

```
pnpm install
```

Run

```
pnpm dev
```

Build

```
pnpm build
```

バージョン更新

1. ローカルブランチでpackage.jsonのバージョンを更新する
2. PRを出す
3. マージ後、マージコミットに対してタグを作成
4. Releases作成
