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
  base: process.env.GITHUB_PAGES ? 'REPOSITORY_NAME' : './',
  plugins: [react(), injectScript()],
  server: { host: true }
})
