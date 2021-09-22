import React from 'react';
import AppProvider from "./AppContext";
import Button from "./components/Button/Button";
import './App.scss';

function App() {
  return (
      <AppProvider>
          <div className="App">
              <Button clientId='Provide you user id here as a string'
                      clientSecret='Provide your widgetToken here' />
          </div>
      </AppProvider>
  );
}

export default App;
