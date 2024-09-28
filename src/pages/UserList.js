import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      fetchUsers();
    }, [])
    
    const fetchUsers = async () => {
        const url = process.env.REACT_APP_USER_URL;
        setIsLoading(true);
        const response = await axios.get(url);
        // console.log(response);
        setUsers(response.data);
        setIsLoading(false);
    }

    const searchUser = async (id) => {
        console.log(id)
        if (id != null) {
          const url = process.env.REACT_APP_USER_URL + "/" + id;
          setIsLoading(true);
          const response = await axios.get(url, {params: {"id": id}});
          console.log(response.data);
        //   setUsers(response.data);
          setIsLoading(false);
        }
     }
    

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50">
    <h1 className="text-3xl font-bold mb-6 text-blue-800">User List</h1>
    {isLoading ? (
        <div className="text-center text-blue-600">Loading...</div>
    ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-blue-700">
                <thead className="text-xs text-white uppercase bg-blue-600">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">First Name</th>
                        <th scope="col" className="px-6 py-3">Last Name</th>
                        <th scope="col" className="px-6 py-3">Birthdate</th>
                        <th scope="col" className="px-6 py-3">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className={`border-b ${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'} hover:bg-blue-200`}>
                            <td className="px-6 py-4">{user.id}</td>
                            <td className="px-6 py-4 font-medium whitespace-nowrap">{user.username}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.firstName}</td>
                            <td className="px-6 py-4">{user.lastName}</td>
                            <td className="px-6 py-4">{user.birthdate}</td>
                            <td className="px-6 py-4">
                                <Link to={`/user/${user.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}
</div>
  )
}

export default UserList