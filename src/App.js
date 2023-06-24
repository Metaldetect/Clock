import React, { useState, useEffect } from 'react';

function formatLocaleDate(date) {
  const options = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('uk-UA', options);
}

function App() {
  useEffect(() => {
    const tick = () => {
      const currentDate = new Date();
      const formattedDate = formatLocaleDate(currentDate);

      const element = (
        <div>
          <h1>Поточний час:</h1>
          <h2>Зараз годин: {currentDate.toLocaleTimeString()}.</h2>
          <h2>Поточна дата: {formattedDate}.</h2>
          <h2>Поточний рік: {currentDate.getFullYear()}.</h2>
        </div>
      );
      setRootElement(element);
    };

    const intervalId = setInterval(tick, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [rootElement, setRootElement] = useState(null);

  return <div>{rootElement}</div>;
}

export default App;
