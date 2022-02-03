import React, { useEffect, useState } from 'react';

type Weather = {
  temperature: number;
  updatedAt: string;
  notes: string;
};

const App = () => {
  const [weather, setWeather] = useState<Weather>({ temperature: 0, updatedAt: '', notes: '' });

  useEffect(() => {
    const source = new EventSource(`https://ds.shub.dev/e/temperatures`);

    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });

    source.addEventListener('message', (e) => {
      console.log(e.data);
      const data: Weather = JSON.parse(e.data);

      setWeather(data);
    });

    source.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <div>
      <h1>Weather status</h1>
      <hr/>
      <h3>Total temperature: {weather.temperature}</h3>
      <h3>Total updatedAt: {weather.updatedAt}</h3>
      <h3>Total notes: {weather.notes}</h3>

    </div>
  );
}

export default App;