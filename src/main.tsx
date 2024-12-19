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