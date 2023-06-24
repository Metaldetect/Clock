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
        <div className="d-flex justify-content-center align-items-center flex-column text-light ">
          <h1 className="display-4 mb-5 mt-5 fw-bold">Поточний час:</h1>
          <div className="d-flex flex-row d-grid gap-3 ">
            <h2 className="lead fs-1 fst-italic">
              {currentDate.toLocaleTimeString()}
            </h2>
            <h2 className="lead fs-1 fst-italic">{formattedDate}</h2>
            <h2 className="lead fs-1 fst-italic">
              {currentDate.getFullYear()}
            </h2>
          </div>
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
