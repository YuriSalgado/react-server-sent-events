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

  const boxStyle = { 
    fontFamily: 'Montserrat',
    background: '#d22222',
    display: 'flex',
    alignItems: 'center', 
    flexDirection: 'column'
  };

  const cardStyle = {
    backgroundColor: '#fcfdfd',
    borderRadius: '10px',
    margin: '5%',
    padding: '25px',
    boxShadow: '0px 31px 35px -26px #080c21'
  }

  const colorStyle = {
    color: 'rgba(0,0,0,0.5)'
  }

  return (
    <div style={boxStyle as React.CSSProperties}>
      <div style={cardStyle as React.CSSProperties}>
        <h1>Weather status</h1>
        <hr/>
        <h3><span style={colorStyle}>Total temperature: </span>{weather.temperature}</h3>
        <h3><span style={colorStyle}>Total updatedAt: </span>{weather.updatedAt}</h3>
        <h3><span style={colorStyle}>Total notes: </span>{weather.notes}</h3>
      </div>
    </div>
  );
}

export default App;