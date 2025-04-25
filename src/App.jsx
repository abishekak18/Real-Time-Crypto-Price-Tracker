import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CryptoTable from './CryptoTable';
import { cryptoWebSocket } from './cryptoService';

function App() {
  useEffect(() => {
    cryptoWebSocket.connect();
    return () => cryptoWebSocket.disconnect();
  }, []);

  return (
    <Provider store={store}>
      <div className="app">
        <h1>Real-Time Crypto Price Tracker</h1>
        <CryptoTable />
      </div>
    </Provider>
  );
}

export default App;