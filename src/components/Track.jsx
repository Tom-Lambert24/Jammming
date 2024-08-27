import React, { useEffect, useState } from "react";

export function Track(props) {
    const resultsObject = props.resultsObject
    const [namesArray, setNamesArray] = useState([])
    const [artistArray, setArtistArray] = useState([])


    useEffect(() => {
        if (resultsObject.length >= 5) {
            setNamesArray(resultsObject.slice(0, 5).map(result => result.name));
            setArtistArray(resultsObject.slice(0, 5).map(result => result.artists[0].name));
        }
    }, [resultsObject])



    

    return (
        <>
            <ul>
                <li>
                    <p>{namesArray[0]}</p>
                    <button id="button0" >+</button>
                    <p>{artistArray[0]}</p>
                </li>
                <li>
                    <p>{namesArray[1]}</p>
                    <button id="button1">+</button>
                    <p>{artistArray[1]}</p>
                </li>
                <li>
                    <p>{namesArray[2]}</p>
                    <button id="button2">+</button>
                    <p>{artistArray[2]}</p>
                </li>
                <li>
                    <p>{namesArray[3]}</p>
                    <button id="button3">+</button>
                    <p>{artistArray[3]}</p>
                </li>
                <li>
                    <p>{namesArray[4]}</p>
                    <button id="button4">+</button>
                    <p>{artistArray[4]}</p>
                </li>
            </ul>
        </>
    )
}