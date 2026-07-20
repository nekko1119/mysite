# My Site

自己紹介サイトの実装です。

## 構造

Astro を使用しています。
ディレクトリ構造は https://docs.astro.build/en/basics/project-structure/ に従っています。

CIによるlint, type-check, playwrightを使ったVRTが動いています。dependabotによる依存更新が動いています。
CopilotにPRレビューをしてもらっています。

## Development

PR が main ブランチにマージされると自動でデプロイされます。

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

1. ローカルブランチで `package.json` のバージョンを更新する
2. PR を出す
3. マージ後、マージコミットを指すタグを作成する
4. GitHub Release を作成する
