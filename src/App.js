import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import React, { useState, useEffect } from 'react';
import { Track } from './components/Track';

function App() {
  const clientID = "36e3f70fe51742af911d9af20b443a96"
  const clientSecret = "86e0c43c5ed64fedaba801f0a43d043e"

  const [token, setToken] = useState('')
  const [resultsObject, setResultsObject] = useState({})
  console.log(resultsObject)
  


  useEffect(() => {
    fetch('https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
      }).then(response => response.json()).then(data => {
        setToken(data.access_token)
      })
  }, [])

  function handleDataFromSearchBar(data) {
    setResultsObject(data)
  }

  return (
    <>
      <header>
        <h1>Jammming</h1>
      </header>
      <body>
        <>
          <SearchBar token={token} recieveSearch={handleDataFromSearchBar} />
          <div id="searchResults">
            <SearchResults />
            <Track resultsObject={resultsObject} />
          </div>
          <Playlist />
        </>
      </body>
    </>
  );
}

export default App;