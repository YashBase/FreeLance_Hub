import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';          // ✅ Import Redux Provider
import store from './redux/store';               // ✅ Import your configured Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>                    {/* ✅ Wrap App inside Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
