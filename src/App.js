import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import React, { useState, useEffect } from 'react';
import { Track } from './components/Track';

function App() {
  const clientID = "36e3f70fe51742af911d9af20b443a96"
  const redirectURI = "http://localhost:3000/"
  const responseType = "token"
  const authEndpoint = "https://accounts.spotify.com/authorize"

  const [token, setToken] = useState('')
  const [resultsObject, setResultsObject] = useState({})
  const [songAdd, setSongAdd] = useState('')

  useEffect(() => {
    const href = window.location.href

    setToken(href.substring(href.indexOf('=') + 1, href.indexOf('&')))
  })

  function handleDataFromSearchBar(data) {
    setResultsObject(data)
  }

  function handleDataFromTrack(data) {
    setSongAdd(data)
  }

  return (
    <>
      <header>
        <h1>Jammming</h1>
        <a href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private`}>
          Login to Spotify
        </a>
      </header>
      <body>
        <>
          <SearchBar token={token} recieveSearch={handleDataFromSearchBar} />
          <section id="listsGrid">
            <div id="searchResults">
              <SearchResults />
              <Track resultsObject={resultsObject} recieveAddedSong={handleDataFromTrack} />
            </div>
            <Playlist songAdd={songAdd} token={token}/>
          </section>
        </>
      </body>
    </>
  );
}

export default App;