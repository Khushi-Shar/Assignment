import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import UserDetails from './UserDetails';
import ReactPaginate from 'react-paginate';
import './App.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    
    const [gender, setGender] = useState('');
    const [results, setResults] = useState(50);
    const [currentPage, setCurrentPage] = useState(0);
   const [selectedUserId, setSelectedUserId] = useState(null);
    useEffect(() => {
      fetchData();
    }, [gender, results]);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://randomuser.me/api?results=${results}&gender=${gender}`
        );
        const userData = response.data.results;
        setUsers(userData);
        
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    
  };

  const handleResultsChange = (e) => {
    setResults(e.target.value);
    setCurrentPage(0);
    
  };
 const usersPerPage = 10;
const offset = currentPage * usersPerPage;
const pageCount = Math.ceil(users.length / usersPerPage);

const handleUserClick = (userId) => {
  setSelectedUserId(userId);
};
  return (
    <>
      <div className="filters">
      <label>
          Number of Results:
          <input
            type="number"
            min="1"
            max="100"
            value={results}
            onChange={handleResultsChange}
          />
        </label>
        <div className="custom-dropdown">
        <label>
          Gender:
          <select value={gender} onChange={handleGenderChange}>
            <option  value="" >All</option>
            <option  value="male" >Male</option>
            <option  value="female" >Female</option>
          </select>
        </label>
        </div>
      </div>

      <div className="user-list">
        {users.slice(offset, offset + usersPerPage).map((user, index) => (
          <div
            key={user.login.uuid}
            onClick={() => handleUserClick(user.login.uuid)} 
            className="user-item"
            style={{ textDecoration: 'none', color: 'black' }}
          >
             <span>{`${index + offset + 1}. `}</span>
            <span>{` ${user.name.first} ${user.name.last}`}</span>
          </div>
        ))}
      
      </div>
      
      <ReactPaginate
      previousLabel={<button style={{ cursor: 'pointer' }}>prev</button>}
      nextLabel={<button style={{ cursor: 'pointer' }}>next</button>}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={({ selected }) => setCurrentPage(selected)}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
    {selectedUserId && <UserDetails userId={selectedUserId} />}
    </>
  );
};

export default UserList;