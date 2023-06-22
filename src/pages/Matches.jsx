import React, { useEffect, useState } from 'react';
import SingleMatch from '../components/SingleMatch';

const Matches = () => {
  const [allMatches, setAllMatches] = useState(null);

  const fetchMatches = async () => {
    try {
      const response = await fetch(`http://localhost:3001/matches`);
      const data = await response.json();
      setAllMatches(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      try {
        const response = await fetch(`http://localhost:3001/matches/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('Match deleted successfully');
          // Perform any additional actions after successful deletion
        } else {
          console.log('Failed to delete the match');
        }
        fetchMatches();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className='p-5 flex flex-col items-center h-screen justify-center'>
      <h1 className='text-3xl mb-4'>All Match List</h1>
      <div>
        {allMatches &&
          allMatches.map((match, idx) => {
            return (
              <SingleMatch
                key={idx}
                match={match}
                deleteHandler={deleteHandler}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Matches;
