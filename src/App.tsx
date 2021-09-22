import React from 'react';
import './App.scss';
import Button from "./components/Button/Button";
import AppProvider from "./AppContext";

function App() {
  return (
      <AppProvider>
          <div className="App">
              <Button clientId='1'
                      clientSecret='eyJhbGciOiJIUzI1NiJ9.NDg4Njg1NjY.J_HsnVAv-N061RI6qnX3JgSoVlOsRsChrc7xDFVnEWQ' />
          </div>
      </AppProvider>
  );
}

export default App;
