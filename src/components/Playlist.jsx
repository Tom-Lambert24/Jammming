import React, { useState, useEffect } from "react";
import { Track } from "./Track";
import App from "../App";


export function Playlist(props) {

    const [songToAdd, setSongToAdd] = useState('')
    const [songList, setSongList] = useState([])
    const [playlistRender, setPlaylistRender] = useState([])
    const [playlistID, setPlaylistID] = useState('')

    useEffect(() => {
        setSongToAdd(props.songAdd)

        if (props.songAdd.length === 3) {
            setSongList(prev => [...prev, props.songAdd])
            
        }
        
    }, [props.songAdd])

    

    useEffect(() => {
        setPlaylistRender([])
        for (let i = 0; i < songList.length; i++) {
            setPlaylistRender(prev => [...prev,
            <ul>
                <li id="playlistSongs">
                    <p>{songList[i][0]}</p>
                    <p>{songList[i][1]}</p>
                </li>
            </ul>

            ])

        }
    }, [songList])



    //save playlist to spotify

    async function handleSave() {
        await fetch('https://api.spotify.com/v1/users/tomlambert1997/playlists', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token,
            },
            body: JSON.stringify({
                'name': 'Test Playlist',
                'description': 'Test Playlist Description',
                'public': false,
            })
        }).then(response => response.json()).then(data => {
            setPlaylistID(data.id)
        })

        fetch('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "uris": [

                ]
            })
        })
    }

    return (
        <div id="playlistContainer">
            {playlistRender}
            <button onClick={handleSave}>Save to Spotify</button>
        </div>
    )
}