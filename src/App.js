import React, { useEffect } from 'react';
import './App.css';

const queryParams = new URLSearchParams(window.location.search);
const TOKEN = queryParams.get('token');

const CONFIG = [
  {
    id: 'nag_noise_really_too_loud',
    title: '🚨 Really too loud!',
  },
  {
    id: 'nag_noise_too_loud',
    title: '⚠️ Too loud!',
  },
  {
    id: 'nag_noise_is_fine',
    title: '✅ Fine',
  },
];

function App() {
  const [error, setError] = React.useState(null);

  const turnOn = async (id) => {
    try {
      const url = `https://maker.ifttt.com/trigger/${id}/with/key/${TOKEN}`;
      await fetch(url, { mode: 'no-cors' });
      console.log('Turned on:', id);
    } catch (error) {
      console.error('Error turning on:', error);
    }
  };

  useEffect(() => {
    if (!TOKEN) {
      setError('Please provide a token!');
      return;
    }
  }, []);

  return (
    <div>
      <h1>🚦 nag volume light</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {CONFIG.map((config) => (
            <button key={config.id} onClick={() => turnOn(config.id)}>
              {config.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
