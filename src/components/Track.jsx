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

    //generating the render code
    var renderCode = []


    if (namesArray[0]) {
        for (let i = 0; i < 5; i++) {
            renderCode.push(
                <li>
                    <p>{namesArray[i]}</p>
                    <button id={"button" + i} >+</button>
                    <p>{artistArray[i]}</p>
                </li>
            )
        }
    }


    console.log(renderCode)

    return (
        <>
            <ul>
                {renderCode}
            </ul>
        </>
    )
}