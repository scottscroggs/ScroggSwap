import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Calculator from './components/Calculator'
import Coins from './components/Coins'
import Navbar from './components/Navbar'
import CoinDetail from './components/CoinDetail'
import EditComment from './components/EditComment'

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          {/* When you don't specify a sub-path, it will re-direct to "/coins" */}
          <Route element={<Navigate to="/coins"/> } path="/" default/> 
          
          <Route element={<Calculator />} path="/calculator" />
          <Route element={<Coins />} path="/coins" />
          <Route element={<CoinDetail />} path="/coins/:id" />
          <Route element={<EditComment />} path="/comment/edit/:id"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
