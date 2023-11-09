import React from 'react'
import { useEffect,useState } from 'react';
import axios from "axios"
import "./Matches.css"

import MatchDetail from './MatchDetail';
import { BrowserRouter as Router, Route, Link,Routes} from 'react-router-dom';
import Navbar from './Navbar';

function formatDateString(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const backgroundStyle = {
    backgroundImage: 'url(/bi.jpeg)', // Replace with the correct path to your image
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };
function Matches(){
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);


  useEffect(() => {
    const initialMatches = [
    {
      team1: 'SL',
      team2: 'NZ',
      score1: '155-9 (40.0)',
      score2: "",
      status: 'In Progress',
      m:'New Zealand opt to bowl',
      date:"2023-11-09",
      venue:"Bengaluru"
    },
    
        {
            team1: 'RSA',
            team2: 'AFG',
            score1: '',
            score2: "",
            status: '',
            m:'Starts at 2:00 pm',
            date:"2023-11-10",
            venue:"Ahmedabad"
        },
       
        {
            team1: 'ENG',
            team2: 'NED',
            score1: '339-9 (50.0)',
            score2: "179-7 (37.2)",
            status: 'Completed',
            m:'England won by 160 runs',
            date:"2023-11-08",
            venue:"Pune",
        },
        {
            team1: 'AUS',
            team2: 'AFG',
            score1: '291-5 (50.0)',
            score2: "293-7 (46.5)",
            status: 'Completed',
            m:'Australia won by 3 wkts',
            date:"2023-11-07",
            venue:"Mumbai",
        },
        
          {
            team1: 'IND',
            team2: 'RSA',
            score1: '326-5 (50.0)',
            score2: "83 (27.1)",
            status: 'Completed',
            m:'India won 243 runs',
            date:"2023-11-05",
            venue:"Kolkata",
        },
        {
            team1: 'IND',
            team2: 'SL',
            score1: '357-8(50.0)',
            score2: "55 (19.4)",
            status: 'Completed',
            m:'India won 302 runs',
            date:"2023-11-01",
            venue:"Mumbai",
        },
        {
            team1: 'RSA',
            team2: 'NZ',
            score1: '375-4 (50.0)',
            score2: "167 (35.3)",
            status: 'Completed',
            m:'South Africa won 190 runs',
            date:"2023-11-01",
            venue:"Pune",
        },
        {
            team1: 'SL',
            team2: 'AFG',
            score1: '241 (49.3)',
            score2: "242-3 (45.2)",
            status: 'Completed',
            m:'Afghanistan won by 7 wkts',
            date:"2023-10-30",
            venue:"Pune",
        },
        {
            team1: 'AUS',
            team2: 'NZ',
            score1: '388 (49.2)',
            score2: "383-9 (50.0)",
            status: 'Completed',
            m:'Australia won by 5 runs',
            date:"2023-10-28",
            venue:"Dharamsala",   
        },

        {
            team1: 'PAK',
            team2: 'RSA',
            score1: '270 (46.4)',
            score2: "271-9 (47.2)",
            status: 'Completed',
            m:'South Africa won by 1 wkts',
            date:"2023-10-27",
            venue:"Chennai",
        },
        {
            team1: 'ENG',
            team2: 'SL',
            score1: '156 (33.2)',
            score2: "160-2 (25.4)",
            status: 'Completed',
            m:'Sri Lanka won by 8 wkts',
            date:"2023-10-26",
            venue:"Bengaluru",
          },
          {
            team1: 'AUS',
            team2: 'NED',
            score1: '399-8 (50.0)',
            score2: "90 (21.0)",
            status: 'Completed',
            m:'Australia won by 309 runs',
            date:"2023-10-25",
            venue:"Delhi",
          },
      {
        team1: 'ENG',
        team2: 'NZ',
        score1: '282-9 (50.0)',
        score2: "283-1 (36.2)",
        status: 'Completed',
        m:'New Zealeand won by 9 wkts',
        date:"2023-10-05",
        venue:"Ahmedabad",
      },
     ];

    axios.post('http://localhost:3001/add-matches', initialMatches)
      .then(() => {
        // Fetch matches from the server
        axios.get(`http://localhost:3001/get-matches`)
        .then((response) => {
          setMatches(response.data);
          setFilteredMatches(response.data);
        })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

 const handleSearch = (searchTerm) => {
    // Filter matches based on the search term
    const filtered = matches.filter((match) =>
      match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMatches(filtered);
  }
 

return (
  <div>
     <Router>
    <div className="App" style={backgroundStyle}>
    <Navbar onSearch={handleSearch} />
   
     
      <div className="match-list">
  {filteredMatches.map((match) => (
    <div className="match-card" key={match._id}>
    
      <div className='mv'> {formatDateString(match.date)}<ul><li>{match.venue}</li></ul></div>
      <div className="team">{match.team1} {match.score1} </div> 
      <div className="team">{match.team2}  {match.score2}</div> 
      <div className='Status'>{match.status === "In Progress" ?(<Link to={`/match/${match._id}`}><div id="b"><button className="btn btn-primary">Show Details</button></div></Link>):null}</div>
<div className='m'> Status: {match.m}</div>

    
    </div>
  ))}
</div>

    </div>
     
  
    <Routes>
       
          <Route path="/match/:matchId" element={<MatchDetail matches={matches}  target="_blank"/>} />
      </Routes>

      
    </Router>

  </div>
   
   
  );
}

export default Matches