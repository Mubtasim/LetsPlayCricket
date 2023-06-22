import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='bg-black py-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link to='/' className='text-white text-lg font-bold'>
          Home
        </Link>
        <div>
          <Link to='/matches' className='text-white mx-4 hover:text-gray-300'>
            All Matches
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
