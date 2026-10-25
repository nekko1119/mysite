# My Site

自己紹介サイトの実装です。

## 構造

Astro を使用しています。
ディレクトリ構造は https://docs.astro.build/en/basics/project-structure/ に従っています。

CI による lint / type-check と、Playwright を使った VRT（Visual Regression Testing）が動いています。Dependabot による依存関係の更新が動いています。
GitHub Copilot に PR レビューをしてもらっています。

## Development

main ブランチへの push（通常は PR マージ）で自動でデプロイされます。

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

## Node.js のバージョン

`package.json` の `devEngines.runtime` を正とし、CI の `pnpm/setup` がこれを参照します。pnpm 自体のバージョンは同じく `packageManager` から読まれます。

`.node-version` は fnm のために残しています。fnm が解決できるのは `.node-version` / `.nvmrc` / `engines.node` のみで `devEngines.runtime` には未対応のためです（`fnm use --help` の `--resolve-engines` を参照）。
fnm が `devEngines` に対応したら `.node-version` は削除できます。

## バージョン更新

1. ローカルブランチで `package.json` のバージョンを更新する
2. PR を出す
3. マージ後、マージコミットを指すタグを作成する
4. GitHub Release を作成する
