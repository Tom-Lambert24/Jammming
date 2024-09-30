import React, { useState, useEffect } from 'react'

export function SearchBar(props) {

    var [currentSearch, setCurrentSearch] = useState([])

    async function changeHandler(e) {

        var search = {}
        if (props.token) {
            if (e.target.value) {
                await fetch(`https://api.spotify.com/v1/search?q=${e.target.value}&type=track&limit=5`, {
                    method: 'GET',
                    headers: {
                        'Authorization': ' Bearer ' + props.token
                    }
                }
                ).then(response => response.json()).then(data => {
                    search = data.tracks.href
                })

                await fetch(search, {
                    method: 'GET',
                    headers: {
                        'Authorization': ' Bearer ' + props.token
                    }
                }).then(response => response.json()).then(
                    data => {
                        setCurrentSearch(data.tracks.items)
                    })
            }
        } else {
            alert('Please login first...')
            
        }

    }

    //send data to App.js

    useEffect(() => {
        props.recieveSearch(currentSearch)
    }, [currentSearch])

    return (
        <>
            <div id="search">
                <input id="searchInput" type="text" placeholder="Song Search Bar" onChange={e => { changeHandler(e) }} />
            </div>
        </>
    )
}