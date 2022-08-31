import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Calculator from './components/calculator'
import Coins from './components/coins'
import Navbar from './components/navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<Calculator />} path="/" default/>
          <Route element={<Coins />} path="/coins" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
