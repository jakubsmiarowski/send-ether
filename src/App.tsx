import React from 'react';
import './App.scss';
import Button from "./components/Button/Button";
import AppProvider from "./AppContext";

function App() {
  return (
      <AppProvider>
          <div className="App">
              <Button />
          </div>
      </AppProvider>
  );
}

export default App;
