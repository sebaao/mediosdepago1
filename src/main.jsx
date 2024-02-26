import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_CLIENT_ID_PAYPAL,
        currency: 'USD'
      }}
    >
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);
 