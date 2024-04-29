import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-full h-full bg-gray-600 p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className='flex flex-col items-start justify-center gap-4 text-xl font-semibold text-blue-400 mt-8'>
        <p className="">
          <Link to="/" className="">
            Contacts
          </Link>
        </p>
        <p className="">
          <Link to="/chartmaps" className="">
            Chart & Maps
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
