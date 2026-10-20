import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App.tsx'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/playfair-display/400-italic.css'
import '@fontsource/playfair-display/600-italic.css'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
