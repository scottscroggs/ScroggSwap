import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Calculator from './components/calculator'
import Coins from './components/coins'
import Navbar from './components/navbar'
import CoinDetail from './components/CoinDetail'
import EditComment from './components/EditComment'

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<Calculator />} path="/" default/>
          <Route element={<Coins />} path="/coins" />
          <Route element={<CoinDetail />} path="/coins/:id" />
          <Route element={<EditComment />} path="/comment/edit/:id"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
