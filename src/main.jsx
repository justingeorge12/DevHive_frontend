import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store.js'
import {Provider} from 'react-redux'
import { NextUIProvider } from '@nextui-org/react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>

    <Provider store={store}>
      <App />
    </Provider>
    </NextUIProvider>

  </React.StrictMode>,
)
