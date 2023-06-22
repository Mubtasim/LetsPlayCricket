import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Toss = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const country1 = parseInt(searchParams.get('country1'), 10);
  const country2 = parseInt(searchParams.get('country2'), 10);
  const [selectedCountry, setSelectedCountry] = useState(-1);
  const [country1FlagUrl, setCountry1FlagUrl] = useState('');
  const [country2FlagUrl, setCountry2FlagUrl] = useState('');
  const [nextMatchId, setNextMatchId] = useState(-1);

  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };

  const addMatch = async (newMatch) => {
    try {
      const response = await fetch(
        'https://cricket-service-1f7n.onrender.com/matches',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMatch),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add match');
      }

      const addedMatch = await response.json();
      console.log('Added match:', addedMatch);
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  const handleStartMatch = () => {
    // const uuid = generateUUID(); // Replace with your UUID generation logic
    const addMatchEndNext = async () => {
      try {
        const newMatch = {
          id: nextMatchId,
          team1: country1,
          team2: country2,
          wholeMatch: [],
          tossWinner: selectedCountry,
          firstBowl: selectedCountry,
        };
        await addMatch(newMatch);

        navigate(`/play/${nextMatchId}`);
      } catch (error) {
        console.log(error);
      }
    };
    addMatchEndNext();
  };

  useEffect(() => {
    const fetchCountryFlags = async () => {
      try {
        const response = await fetch(
          'https://cricket-service-1f7n.onrender.com/teams'
        );
        const data = await response.json();
        const flagUrl1 = data.find((team) => team.id === country1)?.flagUrl;
        const flagUrl2 = data.find((team) => team.id === country2)?.flagUrl;
        setCountry1FlagUrl(flagUrl1 || '');
        setCountry2FlagUrl(flagUrl2 || '');

        const matchesResponse = await fetch(
          'https://cricket-service-1f7n.onrender.com/matches'
        );
        const matchesData = await matchesResponse.json();
        let max = 0;
        matchesData.forEach((match) => {
          max = Math.max(max, match.id);
        });
        max++;
        setNextMatchId(max);
      } catch (error) {
        console.error('Error fetching country flags:', error);
      }
    };
    fetchCountryFlags();
  });

  return (
    <div className='p-5 flex flex-col items-center h-screen justify-center'>
      <h1 className='text-3xl mb-4'>Select who will bowl</h1>
      <div className='flex gap-40'>
        <div className='flex gap-5'>
          {/* <h2>Country 1: {country1}</h2> */}

          <input
            type='radio'
            value={country1}
            checked={selectedCountry === country1}
            onChange={() => handleCountrySelection(country1)}
          />
          <img
            src={country1FlagUrl} // Replace with the flag URL for country1
            alt={country1}
            className='w-25 h-20 mr-2'
          />
        </div>
        <div className='flex gap-5'>
          {/* <h2>Country 2: {country2}</h2> */}

          <input
            type='radio'
            value={country2}
            checked={selectedCountry === country2}
            onChange={() => handleCountrySelection(country2)}
          />
          <img
            src={country2FlagUrl} // Replace with the flag URL for country2
            alt={country2}
            className='w-25 h-20 mr-2'
          />
        </div>
      </div>
      {selectedCountry && (
        <button
          onClick={handleStartMatch}
          className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
        >
          Start Match
        </button>
      )}
    </div>
  );
};

export default Toss;
