import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import {store, persistor } from './features/store';
import { Provider } from 'react-redux';
import './styles/index.css'
import App from './components/App/App';
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from './components/Spinner/Spinner';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
