
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import MatchDetail from './MatchDetail';
import Matches from './Matches';
import Navbar from './Navbar';
const backgroundStyle = {
  backgroundImage: 'url(/bi.jpeg)', // Replace with the correct path to your image
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
};
function App() {
  return (
    <div style={backgroundStyle}>
        <Matches/>
 
    <Router>
      
      <Routes>
       
        <Route path="/match/:matchId" element={<MatchDetail />} /> 
       
      </Routes>
    </Router>
  
    </div>
  );
}

export default App;

