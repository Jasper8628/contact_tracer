import './App.css';
import React from 'react';
import { ContextProvider } from './utils/global'
import Shop from './components/shop';
import Card from './components/card';
function App() {
  return (
    <ContextProvider>
      <div >
        <Card />
        <Shop />
      </div>
    </ContextProvider>
  );
}

export default App;
