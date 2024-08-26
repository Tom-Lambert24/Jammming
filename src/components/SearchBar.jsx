import React, {useState} from 'react'

export function SearchBar(props) {

    

    function changeHandler(e) {
        fetch(`https://api.spotify.com/v1/search?q=${e.target.value}&type=track&limit=5`, {
            method: 'GET',
            headers: {
                'Authorization' : ' Bearer ' + props.token
            }
        }
        ).then(response => response.json()).then(data => {
            console.log(data)
        })
    }

    return (
        <>
            <div id="search">
                <input id="searchInput" type="text" onChange={ e => {changeHandler(e)}} />
                <br></br>
                <button>Search</button>
            </div>
        </>
    )
}