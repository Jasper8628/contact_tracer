import './App.css';
import React from 'react';
import { ContextProvider } from './utils/global'
import Shop from './components/shop';
import Card from './components/card'
import HeadBar from './components/headBar'
function App() {
  return (
    <ContextProvider>
      <div >
        <HeadBar />
        <Card />
        <Shop />
      </div>
    </ContextProvider>
  );
}

export default App;
