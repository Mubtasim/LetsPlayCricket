import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Play = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [matchOver, setMatchOver] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [bowlCount, setBowlCount] = useState(0);

  useEffect(() => {
    // Fetch the match data based on the provided ID
    const fetchMatchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/matches/${id}`);
        const data = await response.json();
        setMatchData(data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatchData();
  }, [id]);

  const handleBowl = async () => {
    if (matchOver || bowlCount === 12) {
      return;
    }

    const run = getRandomRun(); // Replace with your logic to generate a random run between 1 and 6

    try {
      const updatedMatchData = {
        ...matchData,
        wholeMatch: [...matchData.wholeMatch, run],
      };

      const response = await fetch(`http://localhost:3001/matches/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMatchData),
      });

      if (response.ok) {
        setMatchData(updatedMatchData);
        setBowlCount((prevCount) => prevCount + 1);

        if (bowlCount === 11) {
          setMatchOver(true);
        }
      } else {
        console.error('Error updating match data');
      }
    } catch (error) {
      console.error('Error updating match data:', error);
    }
  };

  const getRandomRun = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  return (
    <div>
      <h1>Lets Play Cricket</h1>
      <p>Match ID: {id}</p>
      <p>
        {matchData && (
          <>
            {matchData.team1} vs {matchData.team2}
          </>
        )}
      </p>
      <table>
        <thead>
          <tr>
            <th>Over</th>
            <th>Run</th>
          </tr>
        </thead>
        <tbody>
          {matchData &&
            matchData.wholeMatch.map((run, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{run}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!matchOver && bowlCount < 12 && (
        <button onClick={handleBowl}>Bowl</button>
      )}
      {matchOver && <p>The match is over</p>}
    </div>
  );
};

export default Play;
