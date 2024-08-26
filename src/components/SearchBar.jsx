import React, { useState } from 'react'
import App from '../../src/App.js'

export function SearchBar(props) {


    async function changeHandler(e) {

        var currentSearch = ''

        await fetch(`https://api.spotify.com/v1/search?q=${e.target.value}&type=track&limit=5`, {
            method: 'GET',
            headers: {
                'Authorization': ' Bearer ' + props.token
            }
        }
        ).then(response => response.json()).then(data => {
            currentSearch = data.tracks.href
        })

        fetch(currentSearch, {
            method: 'GET',
            headers: {
                'Authorization': ' Bearer ' + props.token
            }
        }).then(response => response.json()).then(
            data => {
                App.setResultsArray = data.tracks.items
        })

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