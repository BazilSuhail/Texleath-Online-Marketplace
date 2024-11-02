import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import reportWebVitals from './reportWebVitals';
import { CartStateProvider } from './ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <CartStateProvider>
      <App />
    </CartStateProvider>
  </React.StrictMode>
); 

reportWebVitals();

