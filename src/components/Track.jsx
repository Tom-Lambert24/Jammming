import React, { useEffect, useState } from "react";

export function Track(props) {
    const resultsObject = props.resultsObject
    const [namesArray, setNamesArray] = useState()
    const [artistArray, setArtistArray] = useState()


    useEffect(() => {
        if (resultsObject[0]) {
            setNamesArray([
                resultsObject[0].name,
                resultsObject[1].name,
                resultsObject[2].name,
                resultsObject[3].name,
                resultsObject[4].name
            ])
            
            setArtistArray ([
                resultsObject[0].artists[0].name,
                resultsObject[1].artists[0].name,
                resultsObject[2].artists[0].name,
                resultsObject[3].artists[0].name,
                resultsObject[4].artists[0].name
            ])
        }
    },[resultsObject])
}