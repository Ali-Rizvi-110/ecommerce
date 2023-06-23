import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css-files/showUsers.css"
const ShowUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/v1/userinfo/users');
      const usersInDatabase = response.data.users;
      if (Array.isArray(usersInDatabase)) {
        setUsers(usersInDatabase);
      } else {
        console.log("Error: Users are not in the form of an array", usersInDatabase);
      }
    } catch (error) {
      console.error("Error in Fetching the Users", error);
    }
  };

  return (
    <div className="user-list">
      <h1>User List</h1>
      <div className="user-table">
        <div className="table-row table-header">
          <div>First Name</div>
          <div>Last Name</div>
          <div>Contact</div>
          <div>Email</div>
        </div>
        {users.map((user) => (
          <div className="table-row" key={user._id}>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.contact}</div>
            <div>{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowUsers;
