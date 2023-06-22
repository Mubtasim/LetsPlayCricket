import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingleMatch = ({ match, deleteHandler }) => {
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      console.log('match', match);
      const team1Id = match.team1;
      const team2Id = match.team2;
      const team1Response = await fetch(
        `http://localhost:3001/teams/${team1Id}`
      );
      const team1Data = await team1Response.json();
      setTeam1(team1Data);

      const team2Response = await fetch(
        `http://localhost:3001/teams/${team2Id}`
      );
      const team2Data = await team2Response.json();
      setTeam2(team2Data);
    } catch (error) {
      console.log(error);
    }
  };

  const detailsHandler = (id) => {
    navigate(`/matches/${id}`);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className='flex items-center justify-center gap-4'>
      {team1 && team2 && (
        <p>
          {team1.name} vs {team2.name}
        </p>
      )}
      {match && (
        <button
          onClick={() => detailsHandler(match.id)}
          className='my-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm'
        >
          Details
        </button>
      )}
      {match && (
        <button
          onClick={() => deleteHandler(match.id)}
          className='my-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm'
        >
          X
        </button>
      )}
    </div>
  );
};

export default SingleMatch;
