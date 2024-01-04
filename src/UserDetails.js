import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useParams} from 'react-router-dom';
import './App.css';
const UserDetails = ({ userId }) => {
  //const history = useHistory();
   // const { userId } = useParams();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://randomuser.me/api/?seed=${userId}`
          );
          const userData = response.data.results[0];
          setUser(userData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [userId]);
    
  
    if (!user) {
      return <div>Loading...</div>;
    }
    return (
        <div className="user-details">
          <img src={user.picture.large} alt={user.name.first} />
          <h2>{`${user.name.first} ${user.name.last}`}</h2>
          <p>{user.email}</p>
          
        </div>
      );
    };
    
    export default UserDetails;