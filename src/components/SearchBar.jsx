import React, { useState } from 'react'
import App from '../../src/App.js'
import { SearchResults } from './SearchResults.jsx'

export function SearchBar(props) {
    
    var [currentSearch, setCurrentSearch] = useState([])

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

        if (currentSearch[0]) {
            const currentSearchArrayNames = currentSearch.map(search => {
                return search.name
            })
        }
        //send data to app.js

        props.recieveSearch(currentSearch)

    }
    
    return (
        <>
            <div id="search">
                <input id="searchInput" type="text" onChange={e => { changeHandler(e) }} />
                <br></br>
                <button>Search</button>
            </div>
        </>
    )
}