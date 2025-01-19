import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularServices from './components/PopularServices';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <PopularServices />
              <HowItWorks />
            </>
          } />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;