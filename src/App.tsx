import React from 'react';
import AppProvider from "./AppContext";
import Button from "./components/Button/Button";
import './App.scss';

function App() {
    return (
        <AppProvider>
            <div className="App">
                <Button clientSecret={process.env.REACT_APP_WIDGET_TOKEN}/>
            </div>
        </AppProvider>
    );
}

export default App;
