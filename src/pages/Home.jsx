import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isMatchStarted, setIsMatchStarted] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:3001/teams');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountrySelection = (country) => {
    // Check if the country is already selected
    if (selectedCountries.includes(country.id)) {
      setSelectedCountries((prevSelectedCountries) =>
        prevSelectedCountries.filter(
          (selectedCountry) => selectedCountry !== country.id
        )
      );
    } else {
      // Check if two countries are already selected
      if (selectedCountries.length < 2) {
        setSelectedCountries((prevSelectedCountries) => [
          ...prevSelectedCountries,
          country.id,
        ]);
      }
    }
  };

  const handleStartMatch = () => {
    // Add your logic to navigate to the toss route or start the match
    setIsMatchStarted(true);
  };

  return (
    <div className='p-5 flex flex-col items-center h-screen justify-center'>
      <h1 className='text-3xl mb-4'>Lets Play Cricket</h1>
      <div className='grid grid-cols-3 gap-4'>
        {countries.map((country) => (
          <div
            key={country.id}
            className={`p-4 border ${
              selectedCountries.includes(country.id)
                ? 'border-blue-500'
                : 'border-gray-200'
            } rounded shadow flex items-center`}
            onClick={() => handleCountrySelection(country)}
          >
            <img
              src={country.flagUrl}
              alt={country.name}
              className='w-8 h-8 mr-2'
            />
            <h2 className='text-lg font-bold'>{country.name}</h2>
          </div>
        ))}
      </div>
      {selectedCountries.length === 2 && !isMatchStarted && (
        <Link
          to={`/toss?country1=${selectedCountries[0]}&country2=${selectedCountries[1]}`}
          className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
        >
          Toss
        </Link>
      )}
    </div>
  );
};

export default Home;
