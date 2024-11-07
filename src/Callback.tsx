import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      console.log("Authorization code received:", code); // Log the authorization code for debugging
      
      // Exchange the code for an access token
      axios
        .post('http://localhost:4000/exchange-code', { code })
        .then(response => {
          const { access_token } = response.data;
          if (access_token) {
            setAccessToken(access_token);
            localStorage.setItem('github_access_token', access_token);
          } else {
            setError("No access token received.");
          }
        })
        .catch(error => {
          console.error('Error exchanging code for token:', error);
          setError("Token exchange failed.");
        });
    } else {
      setError("No authorization code received.");
    }
  }, [code]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>GitHub OAuth Callback</h2>
      {error ? <p>{error}</p> : <p>Access token received and stored.</p>}
    </div>
  );
};

export default Callback;
