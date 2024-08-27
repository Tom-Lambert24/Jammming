import React, { useEffect, useState } from "react";

export function Track(props) {
    const resultsObject = props.resultsObject
    const [namesArray, setNamesArray] = useState([])
    const [artistArray, setArtistArray] = useState([])


    useEffect(() => {
        if (resultsObject[0]) {
            setNamesArray([
                resultsObject[0].name,
                resultsObject[1].name,
                resultsObject[2].name,
                resultsObject[3].name,
                resultsObject[4].name
            ])

            setArtistArray([
                resultsObject[0].artists[0].name,
                resultsObject[1].artists[0].name,
                resultsObject[2].artists[0].name,
                resultsObject[3].artists[0].name,
                resultsObject[4].artists[0].name
            ])
        }
    }, [resultsObject])

    return (
        <>
            <ul>
                <li>
                    <p>{namesArray[0]}</p>
                    <p>{artistArray[0]}</p>
                </li>
                <li>
                    <p>{namesArray[1]}</p>
                    <p>{artistArray[1]}</p>
                </li>
                <li>
                    <p>{namesArray[2]}</p>
                    <p>{artistArray[2]}</p>
                </li>
                <li>
                    <p>{namesArray[3]}</p>
                    <p>{artistArray[3]}</p>
                </li>
                <li>
                    <p>{namesArray[4]}</p>
                    <p>{artistArray[4]}</p>
                </li>
            </ul>
        </>
    )
}