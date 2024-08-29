import React, { useState, useEffect } from "react";


export function Playlist(props) {

    const [songToAdd, setSongToAdd] = useState('')
    const [songList, setSongList] = useState([])
    const [playlistRender, setPlaylistRender] = useState([])

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
                    <p id="topP">{songList[i][0]}</p>
                    <p>{songList[i][1]}</p>
                </li>
            </ul>

            ])

        }
    }, [songList])

    //get uris list
    function getUriList() {
        var uriList = []

        for (let i = 0; i < songList.length; i++) {
            uriList.push(songList[i][2])
        }

        return uriList
    }

    //save playlist to spotify

    async function handleSave() {
        var playlistID = ''
        var playlistName = document.getElementById('playlistNameInput').value

        if (!playlistName) {
            playlistName = 'NewJammmerPlaylist'
        }

        await fetch('https://api.spotify.com/v1/users/tomlambert1997/playlists', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token,
            },
            body: JSON.stringify({
                'name': playlistName,
                'description': '',
                'public': false,
            })
        }).then(response => response.json()).then(data => {
            playlistID = data.id
        })

        console.log(playlistID)
        fetch('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "uris":getUriList(),
                'position' : 0,
            })
        }).then(response => response.json()).then(data => console.log(data))


    }

    return (
        <div id="playlistContainer">
            <input id="playlistNameInput" type="text" placeholder="Playlist Name"></input>
            {playlistRender}
            <button onClick={handleSave}>Save to Spotify</button>
        </div>
    )
}