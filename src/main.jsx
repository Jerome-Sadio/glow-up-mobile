import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GameProvider } from './context/GameContext'

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <GameProvider>
        <App />
      </GameProvider>
    </StrictMode>,
  )
} catch (error) {
  console.error("CRITICAL ERROR DURING INITIAL RENDER:", error);
  // Optional: Add a simple fallback UI in case of crash
  document.getElementById('root').innerHTML = `<div style="color:white; padding:20px; text-align:center;">Système en échec. Redémarrez l'application.</div>`;
}
