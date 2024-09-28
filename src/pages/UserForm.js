import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    searchUser(id);
  }, [id]);
  
  const searchUser = async (id) => {
    const url = `${process.env.REACT_APP_USER_URL}/${id}`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setUser(response.data);
    } catch (err) {
      setError('Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  }

  const updateUser = async () => {
    const url = `${process.env.REACT_APP_USER_URL}/${user.id}`
    setIsLoading(true);
    try {
      const response = await axios.put(url, user)
      setStatus(response.status);
      setTimeout(() => {
        navigate('/user');
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError('Failed to update user');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <div className="text-center mt-40">Loading...</div>;
  if (error) return <div className="text-center mt-40 text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-40 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit User</h1>
      {status === 200 && (
        <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          Update completed successfully
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">ID</label>
        <p className="py-2 px-3 text-gray-700">{user.id}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <p className="py-2 px-3 text-gray-700">{user.username}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input 
          id="email"
          type="text" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={user.email || ''} 
          onChange={(e) => setUser({...user, email: e.target.value})}        
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input 
          id="firstName"
          type="text" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={user.firstName || ''} 
          onChange={(e) => setUser({...user, firstName: e.target.value, username: e.target.value + (user.lastName || '')})}        
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input 
          id="lastName"
          type="text" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={user.lastName || ''} 
          onChange={(e) => setUser({...user, lastName: e.target.value, username: (user.firstName || '') + e.target.value})}        
        />
      </div>
      <div className="flex items-center justify-between">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={updateUser}
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigate('/user')}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default UserForm