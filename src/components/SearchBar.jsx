import React, {useState, useEffect} from 'react'

export function SearchBar() {

    const [search, setSearch] = useState()

    function changeHandler() {
        fetch('')
    }


    return (
        <>
            <div id="search">
                <input id="searchInput" type="text" onChange={changeHandler}/>
                <br></br>
                <button>Search</button>
            </div>
        </>
    )
}