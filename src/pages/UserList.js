import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [first, setFirst] = useState(true);
    const [last, setLast] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, [])
    
    const fetchUsers = async (pageNum = page, pageSize = size) => {
        const url = process.env.REACT_APP_USER_URL;
        setIsLoading(true);
        try {
            const response = await axios.get(url, {
                params: {
                    page: pageNum,
                    size: pageSize
                }
            });
            setUsers(response.data.content);
            setFirst(response.data.first);
            setLast(response.data.last);
            setTotalPages(response.data.totalPages);
            setPage(pageNum);
            setSize(pageSize);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const changePage = (newPage) => {
        fetchUsers(newPage, size);
    }

    const changeSize = async (e) => {
        const newSize = parseInt(e.target.value);
        fetchUsers(0, newSize);
    }

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 5; // 表示するボタンの最大数
        let start = Math.max(0, page - Math.floor(maxButtons / 2));
        let end = Math.min(totalPages - 1, start + maxButtons - 1);

        // 開始ページを調整
        start = Math.max(0, end - maxButtons + 1);

        for (let i = start; i <= end; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => changePage(i)}
                    className={`px-3 py-2 rounded-lg ${page === i ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-100'}`}
                >
                    {i + 1}
                </button>
            );
        }

        return buttons;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-blue-50">
            <h1 className="text-3xl font-bold mb-6 text-blue-800">User List</h1>
            <div className="flex justify-between items-center mb-4">
                <p>表示件数：
                    <select name="limit" id="limit" value={size} onChange={changeSize} className="ml-2 p-2 border rounded">
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                        <option value="200">200</option>
                    </select>
                </p>
                <p>ページ {page + 1} / {totalPages}</p>
            </div>

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
                                        <Link to={`/user/${user.id}`} className="text-blue-600 hover:underline">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center space-x-2 mt-4">
                        <button 
                            onClick={() => changePage(0)}
                            disabled={first}
                            className="px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                        >
                            First
                        </button>
                        <button 
                            onClick={() => changePage(page - 1)}
                            disabled={first}
                            className="px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {renderPaginationButtons()}
                        <button 
                            onClick={() => changePage(page + 1)}
                            disabled={last}
                            className="px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                        >
                            Next
                        </button>
                        <button 
                            onClick={() => changePage(totalPages - 1)}
                            disabled={last}
                            className="px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserList