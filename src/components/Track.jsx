import React, { useEffect, useState } from "react";

export function Track(props) {
    const resultsObject = props.resultsObject
    const [namesArray, setNamesArray] = useState([])
    const [artistArray, setArtistArray] = useState([])
    const [songToAdd, setSongToAdd] = useState([])
    const [urisArray, setUrisArray] = useState([])


    useEffect(() => {
        if (resultsObject.length >= 5) {
            setNamesArray(resultsObject.slice(0, 5).map(result => result.name));
            setArtistArray(resultsObject.slice(0, 5).map(result => result.artists[0].name));
            setUrisArray(resultsObject.slice(0, 5).map(result => result.uri))
        }
    }, [resultsObject])




    function handleButtonClick(button) {
            setSongToAdd([namesArray[button], artistArray[button], urisArray[button]])
    }

    useEffect(() => {
        props.recieveAddedSong(songToAdd)
    }, [songToAdd])

    //generating the render code
    var renderCode = []

    if (namesArray[0]) {
        for (let i = 0; i < 5; i++) {
            renderCode.push(
                <li key={"list" + i}>
                    <p>{namesArray[i]}</p>
                    <button id={"button" + i} onClick={() => handleButtonClick(i)}>+</button>
                    <p>{artistArray[i]}</p>
                </li>
            )
        }
    }

    return (
        <>
            <ul>
                {renderCode}
            </ul>
        </>
    )
}