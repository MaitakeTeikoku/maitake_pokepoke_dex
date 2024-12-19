## Todo
1. GitHubからクローン。
    ```bash
    git clone https://github.com/MaitakeTeikoku/maitake_pokepoke_dex.git
    ```
1. Reactのプロジェクトを作成。
    ```bash
    npm create vite@latest maitake_pokepoke_dex
    ```
    ```bash
    Select a framework: » React
    Select a variant: » TypeScript + SWC
    ```
1. ディレクトリの移動。
    ```bash
    cd maitake_pokepoke_dex
    ```
1. ライブラリをインストール。
    ```bash
    npm install
    ```
    ```bash
    npm install @yamada-ui/react @yamada-ui/lucide
    ```
1. ローカルで起動。
    ```bash
    npm run dev
    ```
1. 以下を削除し、クリーンアップ。
    - src/assets
    - src/index.css
    - src/App.css
    - public/vite.svg
    - src/App.tsxを以下に変更。
        ```tsx
        function App() {

          return (
            <>
            </>
          )
        }

        export default App
        ```
    - publicにfavicon.icoをアップロード。
    - index.htmlを以下に変更。（`lang="ja"`、`link  href="/favicon.ico"`、`<title></title>`）
        ```html
        <!doctype html>
        <html lang="ja">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>ポケポケカード図鑑</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>
        ```
    - vite.config.jsのdefineConfig内を以下に変更。（`server: { host: true }`を追記。Yamada UIをインポート。）
        ```ts
        import { defineConfig, Plugin } from "vite"
        import { getColorModeScript } from "@yamada-ui/react"
        import react from '@vitejs/plugin-react-swc'

        function injectScript(): Plugin {
          return {
            name: "vite-plugin-inject-scripts",
            transformIndexHtml(html) {
              const content = getColorModeScript({
                initialColorMode: "system",
              })

              return html.replace("<body>", `<body><script>${content}</script>`)
            },
          }
        }

        // https://vite.dev/config/
        export default defineConfig({
          plugins: [react(), injectScript()],
          server: { host: true }
        })
        ```
    - main.tsxを以下に変更し、Yamada UIをインポート。
        ```tsx
        import { StrictMode } from 'react'
        import { createRoot } from 'react-dom/client'
        import { UIProvider, extendConfig } from '@yamada-ui/react'
        import App from './App.tsx'

        const customConfig = extendConfig({ initialColorMode: "system" })

        createRoot(document.getElementById('root')!).render(
          <StrictMode>
            <UIProvider config={customConfig}>
              <App />
            </UIProvider>
          </StrictMode>
        )
        ```
1. package.jsonの"scripts"に以下を追記。
    ```json
    "git": "git add . && git commit && git push origin main"
    ```
1. コミットしてプッシュ。
    ```bash
    npm run git
    ```

---
### Github Actionsを利用する場合
1. ライブラリをインストール。
    ```bash
    npm i --save-dev @types/node
    ```
1. vite.config.jsのdefineConfig内を変更。
    ```ts
    export default defineConfig({
      base: process.env.GITHUB_PAGES ? 'REPOSITORY_NAME' : './',
      plugins: [react()],
    })
    ```
1. ブラウザで、Github ActionsでGithub Pagesにデプロイするように設定。
1. .github/workflows/main.ymlを作成し、以下を記述。
    ```yml
    # 静的コンテンツを GitHub Pages にデプロイするためのシンプルなワークフロー
    name: Deploy static content to Pages

    on:
      # デフォルトブランチを対象としたプッシュ時にで実行されます
      push:
        branches: ['main']

      # Actions タブから手動でワークフローを実行できるようにします
      workflow_dispatch:

    # GITHUB_TOKEN のパーミッションを設定し、GitHub Pages へのデプロイを許可します
    permissions:
      contents: read
      pages: write
      id-token: write

    # 1 つの同時デプロイメントを可能にする
    concurrency:
      group: 'pages'
      cancel-in-progress: true

    jobs:
      # デプロイするだけなので、単一のデプロイジョブ
      deploy:
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v4
          - name: Set up Node
            uses: actions/setup-node@v4
            with:
              node-version: 20
              cache: 'npm'
          - name: Install dependencies
            run: npm ci
          - name: Build
            run: npm run build
          - name: Setup Pages
            uses: actions/configure-pages@v4
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              # dist フォルダーのアップロード
              path: './dist'
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```

---
---


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
