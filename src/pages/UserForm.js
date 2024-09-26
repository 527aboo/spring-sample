import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserForm = (props) => {
  const [user, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchUser(props.id);
  }, [props.id]);
  
  const searchUser = async (id) => {
    if (id != null) {
      const url = process.env.REACT_APP_USER_URL;
      setIsLoading(true);
      const response = await axios.get(url, {params: {id: id}});
      setUsers(response.data);
      console.log(response.data);
    }
    
  }


  return (
    <div>UserForm</div>
  )
}

export default UserForm