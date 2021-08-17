import React from 'react';

const App = () => {
  return (
    <div className="container">
      <div className="valid-keys">
        <span className="matched">emer</span>
        <span className="remainder">son</span>
      </div>
      <div className="typed-keys">asdfemerasdf</div>
      <div className="completed-words">
        <ol>
          <li>cidade</li>
          <li>carro</li>
          <li>profissional</li>
        </ol>
      </div>
    </div>
  );
};

export default App;
