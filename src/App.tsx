import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  const handleLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
    window.location.href = githubAuthUrl;
  };

  const fetchUserDetails = async () => {
    const accessToken = localStorage.getItem('github_access_token');
    if (!accessToken) {
      alert('You need to login first!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/get-user-details', { accessToken });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>GitHub OAuth Login</h1>
      <button onClick={handleLogin}>Login with GitHub</button>

      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchUserDetails}>Get User Details</button>
        {userData && (
          <div style={{ marginTop: '20px' }}>
            <h3>User Details:</h3>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
