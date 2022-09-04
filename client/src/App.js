import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Calculator from './components/calculator'
import Coins from './components/coins'
import Navbar from './components/navbar'
import CoinDetail from './components/CoinDetail'

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<Calculator />} path="/" default/>
          <Route element={<Coins />} path="/coins" />
          <Route element={<CoinDetail />} path="/coins/:id" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
