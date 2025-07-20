import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import JoinUs from './pages/JoinUs';
import BoardApplication from './pages/BoardApplication';
import Footer from './components/Footer/Footer';
import './styles/globals.css';

function App() {
  return (
    <Router basename={import.meta.env.DEV ? '/' : '/isamm-microsoft-club'}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/board-application" element={<BoardApplication />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
