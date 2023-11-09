import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import "./Matches.css"
function formatDateString(dateString) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
function MatchDetail({ matches }) {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    if (matches) {
      const foundMatch = matches.find((m) => m._id === matchId);

      if (foundMatch) {
        setMatch(foundMatch);
      }
    }
  }, [matchId, matches]);

  if (!match) {
    return <div className='status'>Match not found.</div>;
  }

  return (
    <div>
      <h2 className='h2'>Match Details</h2>
     
      <div className="match-list">
      <div className="match-card">
      <div className='mv'> {formatDateString(match.date)}<ul><li>{match.venue}</li></ul></div>
      <div className="team">{match.team1} {match.score1} </div> 
      <div className="team">{match.team2}  {match.score2}</div> 
<div className='status'>{match.status}</div>
<div className='m'>{match.m}</div>
        </div>
      </div>
    </div>
  );
}

export default MatchDetail;

