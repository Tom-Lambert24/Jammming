import React, { useState } from 'react'
import App from '../../src/App.js'
import { SearchResults } from './SearchResults.jsx'

export function SearchBar(props) {
    
    var [currentSearch, setCurrentSearch] = useState({})

    async function changeHandler(e) {

        var search = {}

        await fetch(`https://api.spotify.com/v1/search?q=${e.target.value}&type=track&limit=5`, {
            method: 'GET',
            headers: {
                'Authorization': ' Bearer ' + props.token
            }
        }
        ).then(response => response.json()).then(data => {
            search = data.tracks.href
        })

        fetch(search, {
            method: 'GET',
            headers: {
                'Authorization': ' Bearer ' + props.token
            }
        }).then(response => response.json()).then(
            data => {
                setCurrentSearch(data.tracks.items)
        })

        if (e.target.value.length > 2 && currentSearch[0]) {
            console.log(currentSearch[0].name)
        }
    }
    
    return (
        <>
            <div id="search">
                <input id="searchInput" type="text" onChange={e => { changeHandler(e) }} />
                <br></br>
                <button>Search</button>
            </div>
            <div id="searchResults">
                <h2>Results</h2>
                <p></p>
            </div>
        </>
    )
}