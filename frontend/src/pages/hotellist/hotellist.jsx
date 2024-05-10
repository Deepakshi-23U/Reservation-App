import React from "react"
import "./hotellist.css"
import Navbar from '../../components/navbar/navbar'
import Header from '../../components/header/header'
import SearchCard from '../../components/searchcard/searchcard'
import {useContext, useState} from "react";
import { SearchContext } from "../../context/SearchContext";
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import {format} from 'date-fns';

import {useLocation} from "react-router-dom"

import useFetch from "../../hooks/useFetch"

function Hotellist()
{
    //location is used with navigation
    const location = useLocation();

    const [destination, setdestination] = useState(location.state.destination);
    const [dates, setdate] = useState(location.state.dates);
    const [options, setOptions] = useState(location.state.options);
  
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);
    const [type, settype] = useState("all");

    
    const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/hotel?city=${destination || "all"}&type=${type}&min=${min || 0 }&max=${max || 3000}`);
    
    const { dispatch } = useContext(SearchContext);
    const handleClick = () => {
        reFetch();
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
      };
    

    return(
        <div>

        <Navbar />
        <Header type="hide"/>
        <div className="hotels">

            <div className="search">

                <div className="searchspace">
                <div className="form">
                    <label htmlFor="dest">Destination</label>
                    <select id="dest" name="dest" onChange={(e) => setdestination(e.target.value)}>
                    <option value="all">Select</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Manali">Manali</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Banglore">Banglore</option>
                    <option value="Delhi">Delhi</option>
                    </select>

                    <label htmlFor="dest">Type</label>
                    <select id="dest" name="types" onChange={(e) => settype(e.target.value)}>
                    <option value="all">Select</option>
                    <option value="Hotel">Hotels</option>
                    <option value="Resort">Resorts</option>
                    <option value="Villa">Villas</option>
                    <option value="Cabin">Cabins</option>
                    <option value="Appartment">Appartments</option>
                    </select>

                    <label htmlFor="dates">Duration*</label>
                    <input name="dates" placeholder={dates} defaultValue={`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}/>
                    <DateRange
                    onChange={(item) => setdate([item.selection])}
                    minDate={new Date()}
                    className="date"
                    ranges={dates}
                    />
                    {console.log(dates)};
                    <div className="lsOptionItem">
                    <span className="s">Min price/per night</span>
                    <input type="number" onChange={(e) => setMin(e.target.value)} className="lsOptionInput"/>
                    </div>

                    <div className="lsOptionItem">
                    <span className="s">Max price/per night</span>
                    <input type="number" onChange={(e) => setMax(e.target.value)} className="lsOptionInput"/>
                    </div>

                    <button className="fbtn" onClick={handleClick}>Search</button>
                </div>
                </div>
                
                { loading? ("hotels are loading") :
                (
                <div className="result">
                {data.map(item=>(
                    <SearchCard key={item._id} item={item} />
                ))}
                </div>
                )
                }
             </div>
            </div>
            
        </div>

    )
}

export default Hotellist