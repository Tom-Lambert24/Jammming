import './App.css';
import { SearchBar } from './components/SearchBar';
import { Playlist } from './components/Playlist';
import React, { useState, useEffect } from 'react';
import { Track } from './components/Track';

function App() {
  
  //const redirectURI = "https://tom-lambert24.github.io/PlayLister/"

  const redirectURI = "http://localhost:3000/PlayLister"
  const responseType = "token"
  const authEndpoint = "https://accounts.spotify.com/authorize"

  const [userName, setUserName] = useState('')
  const [token, setToken] = useState('')
  const [resultsObject, setResultsObject] = useState({})
  const [songAdd, setSongAdd] = useState('')
  const [clientID, setClientID] = useState(null)

  useEffect(() => {
    async function getClientID() {
        try {
            const response = await fetch('http://localhost:5000/getClientID'); // Correct URL
            if (!response.ok) {
                throw new Error('Failed to fetch client ID');
            }
            const data = await response.json();
            setClientID(data.clientID); // Access the clientID from the JSON response
        } catch (error) {
            console.error('Error fetching client ID:', error);
        }
    }
    getClientID();
}, []);

  useEffect(() => {
    console.log(clientID)
  }, [clientID])

  useEffect(() => {
    const href = window.location.href

    setToken(href.substring(href.indexOf('=') + 1, href.indexOf('&')))
  })

  useEffect(() => {
    if (token) {
      document.getElementById("login").style.display = 'none'
      document.getElementById("welcomeUser").style.display = 'inline-block'

      fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response => response.json()).then(data => {
        setUserName('Welcome, ' + data.display_name)
      })

    } else {
      document.getElementById("login").style.display = 'inline-block'
      document.getElementById("welcomeUser").style.display = 'none'
    }
  }, [token])

  function handleDataFromSearchBar(data) {
    setResultsObject(data)
  }

  function handleDataFromTrack(data) {
    setSongAdd(data)
  }

  function handleLogout() {
    setToken('')
    //window.location.href = 'https://tom-lambert24.github.io/PlayLister/'
    window.location.href = 'http://localhost:3000/PlayLister'
  }

  return (
    <>
      <header>
        <h1>PlayLister</h1>
        <a id="login" href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private`}>
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