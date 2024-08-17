import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MatchList.css'; // Ensure you create and import the CSS file
import './const-file';
import { getUserId } from './Utils'; // Adjust the path as needed
import Cookies from 'js-cookie';

import Loading from './Loading';



const MatchList = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 5);

    return () => clearInterval(intervalId); // Cleanup ounmount
  }, []);
  console.log("I am inside MatchList");
  const [matches, setMatches] = useState([]);
  const [userData, setUserData] = useState({});
  const userId = getUserId(); 

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const source1 = axios.CancelToken.source();
            const timeout1 = setTimeout(() => {
                source1.cancel('Request timed out');
            }, 50000); // 5 seconds in milliseconds
            const response1 = await axios.post('http://localhost:8080/user/get', { user_id : userId}, 
                {
                headers: {
                  'Content-Type': 'application/json',
                },
                cancelToken: source1.token,});

            const source2 = axios.CancelToken.source();
            const timeout2 = setTimeout(() => {
                source1.cancel('Request timed out');
            }, 50000); // 5 seconds in milliseconds
            const response2 = await axios.post('http://localhost:8080/get/payout', { user_id : userId}, 
                {
                headers: {
                  'Content-Type': 'application/json',
                },
                cancelToken: source2.token,});
    

        const source = axios.CancelToken.source();
            const timeout = setTimeout(() => {
                source.cancel('Request timed out');
            }, 50000); // 5 seconds in milliseconds
            const response = await axios.post('http://localhost:8080/homepage/get', { user_id : userId}, 
                {
                headers: {
                  'Content-Type': 'application/json',
                },
                cancelToken: source.token,});
        // const response = await fetch(''); // Replace with your actual API endpoint
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        const data = response.data;
        console.log('Fetched data:', data); // Add this line to check the response
        setMatches(data.matches);
        setUserData({
          user_name: response1.data.user.name,
          user_money: response2.data.current_payout.totalAmount
        });
        localStorage.setItem("user_money", response2.data.current_payout.totalAmount);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <header >
        {userData.user_name ? (
          <header className="App-header">
            <h1>Welcome, {userData.user_name}</h1>
            <p>Your balance: ${userData.user_money?.toFixed(2)}</p>
          </header>
        ) : (
          <Loading/>
        )}
      </header>
      <main>
        <ul className="match-list">
          {matches.map(match => (
            <li key={match.match_id} className="match-item">
              <Link to={`/matchpage/${match.match_id}`}>
                <div className="match-details">
                  <span className="team-name">{match.team_one}</span>
                  <span className="vs">vs</span>
                  <span className="team-name">{match.team_two}</span>
                  <span>{match.is_live_match === false ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) :  (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                    </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default MatchList;
