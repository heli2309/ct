import React, { useState } from 'react';
import "./Matches.css"
function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <h1>Cricket Score Tracker</h1>
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <div style={{display:"block", textAlign: "center",paddingLeft:"0px"}}>
          <a class="nav-link" style={{display:"block", textAlign: "center",paddingLeft:"0px"}} href=" ">MATCHES</a>
          </div>
         
        </li>
        </ul>
      <div className="search-bar" >
        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
}

export default Navbar;
