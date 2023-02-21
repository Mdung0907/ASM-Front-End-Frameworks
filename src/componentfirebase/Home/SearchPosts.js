import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function SearchBar({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }

    };


    return (
        <div className="search">
            <div className="topnav">
                <input
                    type="search"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                    onBlur={() => {
                        setTimeout(() => {
                            setWordEntered(''); setFilteredData([])
                        }, 150)
                    }}></input>

            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <a className="dataItem" key={key} href={value.link} target="_blank">
                                <img src={value.downloadURL} alt="" id="search-item-img" width="40px" height="40px" />
                                <p id="search-item-name">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/detail/${value.id}`}> {value.name}</Link></p>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default SearchBar;