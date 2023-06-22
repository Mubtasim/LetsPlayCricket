import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const MatchDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [matchData, setMatchData] = useState(null);
  // const [bowlCount, setBowlCount] = useState(0);
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [tossWinner, setTossWinner] = useState(null);
  const [totalRun, setTotalRun] = useState(0);
  const [team1Run, setTeam1Run] = useState(0);
  const [team2Run, setTeam2Run] = useState(0);

  useEffect(() => {
    // Fetch the match data based on the provided ID
    const fetchMatchData = async () => {
      try {
        const response = await fetch(
          `https://cricket-service-1f7n.onrender.com/matches/${id}`
        );
        const data = await response.json();
        setMatchData(data);

        let currentTotalRun = 0;
        data.wholeMatch.forEach((run) => {
          currentTotalRun += run;
          console.log('currenttotalrun', currentTotalRun);
        });
        setTotalRun(currentTotalRun);

        const team1Response = await fetch(
          `https://cricket-service-1f7n.onrender.com/teams/${data.team1}`
        );
        const team1Data = await team1Response.json();
        setTeam1(team1Data);

        const team2Response = await fetch(
          `https://cricket-service-1f7n.onrender.com/teams/${data.team2}`
        );
        const team2Data = await team2Response.json();
        setTeam2(team2Data);

        if (team1Data.id === data.tossWinner) setTossWinner(team1Data);
        else setTossWinner(team2Data);

        // if (data.wholeMatch.length === 12) {
        //   setMatchOver(true);
        // }

        let team1runn = 0;
        let team2runn = 0;

        data.wholeMatch.forEach((run, idx) => {
          if (idx < 6) {
            if (data.tossWinner.id === team1Data.id) team2runn += run;
            else team1runn += run;
          } else {
          }
        });
        setTeam1Run(team1runn);
        setTeam2Run(team2runn);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatchData();
  }, [id]);

  return (
    <div className='p-5 flex flex-col items-center justify-center'>
      <h1 className='text-3xl mb-4'>Match Details</h1>
      {/* <p>Match ID: {id}</p> */}
      <p>
        {team1 && team2 && (
          <>
            <span className='font-semibold'>{team1.name}</span> vs{' '}
            <span className='font-semibold'>{team2.name}</span>
          </>
        )}
      </p>
      <p>
        {tossWinner && (
          <>
            <span className='font-semibold'>{tossWinner.name}</span> has won the
            toss and elected to bowl first
          </>
        )}
      </p>
      <p>
        {totalRun && (
          <>
            Total Run: <span className='font-semibold'>{totalRun}</span>
          </>
        )}
      </p>
      {team1Run === team2Run && <p>The match is draw</p>}
      {team1Run > team2Run && <p>{team1.name} is the winner</p>}
      {team2Run > team1Run && <p>{team2.name} is the winner</p>}
      {/* {matchOver && <p>Match Finished Welldone</p>} */}
      <table className='w-full bg-white border border-gray-200 divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='px-4 py-2 text-left'>Over</th>
            <th className='px-4 py-2 text-left'>Run</th>
          </tr>
        </thead>
        <tbody>
          {matchData &&
            matchData.wholeMatch.map((run, index) => (
              <tr key={index}>
                <td className='px-4 py-2'>
                  {Math.floor(index / 6)}.{(index % 6) + 1}
                </td>
                <td className='px-4 py-2'>{run}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* {matchOver && <p>The match is over</p>} */}
    </div>
  );
};

export default MatchDetails;
