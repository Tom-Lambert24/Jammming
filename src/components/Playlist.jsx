import React, { useState, useEffect } from "react";
import { Track } from "./Track";
import App from "../App";


export function Playlist(props) {

    const [songToAdd, setSongToAdd] = useState('')
    const [songList, setSongList] = useState([])
    const [playlistRender, setPlaylistRender] = useState([])

    useEffect(() => {
        setSongToAdd(props.songAdd)

        if (songList.length === 1) {
            setSongList([props.songAdd])
        } else if (props.songAdd !== '') {
            setSongList(prev => [...prev, props.songAdd])
        }


    }, [props.songAdd])


    useEffect(() => {
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

    return (
        <div id="playlistContainer">
            {playlistRender}
            <button>Save to Spotify</button>
        </div>
    )
}