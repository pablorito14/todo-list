import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { registerSW } from "virtual:pwa-register";
import { updateMessage,checkPWA } from './PWA-Helpers/pwa.js';

checkPWA();

const updateSW = registerSW({
  async onNeedRefresh() {
    await updateSW(await updateMessage())
  }
});

// si se quiere mostrar un mensaje cuando se RECUPERA la conexion
// window.addEventListener('online',() => {
//   console.log('estamos online')
// })
// si se quiere mostrar un mensaje cuando se PIERDE la conexion
// window.addEventListener('offline',() => {
//   console.log('se perdio la conexion')
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
