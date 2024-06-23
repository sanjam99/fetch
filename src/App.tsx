import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProfileCard from './components/ProfileCard';
import ProfileModal from './components/ProfileModal';
import { User } from './types';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import BarLoader from './components/BarLoader';
import ErrorComponent from './components/ErrorComponent';

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users');
  if (!response.ok) {
    throw new Error ("not correct URL!");
  }
  return response.json();
};

const App: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<User | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { isLoading, error, data } = useQuery<User[]>({
    queryKey: ['repoData'],
    queryFn: fetchUsers,
  });


  const openModal = (profile: User) => {
    setSelectedProfile(profile);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProfile(null);
    setModalIsOpen(false);
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
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Profiles</h1>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div className='p-2'>
          <ProfileCard key={item.id} user={item} onClick={openModal} />
          </div>
        ))
      ) : (
        <p className="text-gray-600">No data available</p>
      )}
      <ProfileModal isOpen={modalIsOpen} onRequestClose={closeModal} user={selectedProfile} />
      <ReactQueryDevtools />
    </div>
  );
};

export default App;
