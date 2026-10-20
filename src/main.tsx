import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App.tsx'
import '@fontsource-variable/dm-sans/opsz.css'
import '@fontsource/dm-serif-display/400-italic.css'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
