import './App.css';
import { SearchBar } from './components/SearchBar';
import { Playlist } from './components/Playlist';
import React, { useState, useEffect } from 'react';
import { Track } from './components/Track';

function App() {
  const redirectURI = "https://playlister-portfolio-1c5c28cc9523.herokuapp.com/PlayLister";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [resultsObject, setResultsObject] = useState({});
  const [songAdd, setSongAdd] = useState('');
  const [clientID, setClientID] = useState(null);

  useEffect(() => {
    async function getClientID() {
      try {
        const response = await fetch('https://playlister-portfolio-1c5c28cc9523.herokuapp.com/getClientID');
        if (!response.ok) {
          throw new Error('Failed to fetch client ID');
        }
        const data = await response.json();
        setClientID(data.clientID);
      } catch (error) {
        console.error('Error fetching client ID:', error);
      }
    }
    getClientID();
  }, []);

  useEffect(() => {
    const href = window.location.href;
    const code = new URLSearchParams(window.location.search).get('code');
    
    if (code) {
      // Call backend to exchange the authorization code for an access token
      fetch('https://playlister-portfolio-1c5c28cc9523.herokuapp.com/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          console.log("access token data:" + data.access_token)
          setToken(data.access_token);
          window.history.replaceState({}, document.title, window.location.pathname); // Clear the code from URL
        }
      })
      .catch(error => console.error('Error fetching access token:', error));
    }
  }, []);

  useEffect(() => {
    if (token) {
      document.getElementById("login").style.display = 'none';
      document.getElementById("welcomeUser").style.display = 'inline-block';

      fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      }).then(response => response.json()).then(data => {
        setUserName('Welcome, ' + data.display_name);
      });
    } else {
      document.getElementById("login").style.display = 'inline-block';
      document.getElementById("welcomeUser").style.display = 'none';
    }
  }, [token]);

  function handleDataFromSearchBar(data) {
    setResultsObject(data);
  }

  function handleDataFromTrack(data) {
    setSongAdd(data);
  }

  function handleLogout() {
    setToken('');
    window.location.href = 'https://playlister-portfolio-1c5c28cc9523.herokuapp.com/PlayLister';
  }

  function handleLogin() {
    console.log('handle login ran')
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientID,
      scope: scope,
      redirect_uri: redirectURI,
      state: state,
    });

    // Redirect the user to Spotify for login
    console.log(`${authEndpoint}?${params.toString()}`)
    window.location.href = `${authEndpoint}?${params.toString()}`;
  }

  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  return (
    <>
      <header>
        <h1>PlayLister</h1>
        <a id="login" onClick={handleLogin}>
          Login to Spotify
        </a>
        <div id="welcomeUser">
          <div id="welcomeText">{userName}</div>
          <button onClick={handleLogout} id="logout">Logout</button>
        </div>
      </header>
      <body>
        <>
          <SearchBar token={token} recieveSearch={handleDataFromSearchBar} />
          <section id="listsGrid">
            <div id="searchResults">
              <h2>Search Results</h2>
              <Track resultsObject={resultsObject} recieveAddedSong={handleDataFromTrack} />
            </div>
            <Playlist songAdd={songAdd} token={token} />
          </section>
        </>
      </body>
    </>
  );
}

export default App;