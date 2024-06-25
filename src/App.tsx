import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from './types';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import BarLoader from './components/BarLoader';
import ErrorComponent from './components/ErrorComponent';
import { AuroraHero } from './components/AuroraHero';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users');
  if (!response.ok) {
    throw new Error ("not correct URL!");
  }
  return response.json();
};

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { isLoading, error, data } = useQuery<User[]>({
    queryKey: ['repoData'],
    queryFn: fetchUsers,
  });


  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen bg-violet-600">
      <BarLoader />
    </div>
  )
  
  if (error) return (
  <div className="flex items-center justify-center h-screen bg-violet-700 text-white text-xl">
    <ErrorComponent />
    Error: {error.message}
  </div>
)

  return (
    <div className="flex flex-col">
      <AuroraHero />
      <div className="flex">
        <div className="w-1/2 p-4 max-h-screen overflow-y-auto border-r" id='here'>
          <h1 className="text-2xl font-semibold mb-4">Users</h1>
          <UserList users={data || []} onUserClick={handleUserClick} />
        </div>
        <div className="w-1/2 p-4 max-h-screen overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-4">User Details</h1>
          {selectedUser ? (
            <UserDetails user={selectedUser} />
          ) : (
            <p className="text-gray-600">Select a user to see details</p>
          )}
        </div>
      </div>
      <ReactQueryDevtools />
    </div>
  );
};

export default App;
