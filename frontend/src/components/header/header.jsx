import {
faBed,
faPlane,
faCar,
faTaxi,
faCalendarDays,
faPerson,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
import { useContext } from 'react';
import { SearchContext } from "../../context/SearchContext";

import "./header.css"

import bg3 from "./bg3.png"

function Header(props){

    const [dates, setdate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        },
    ])

    const [opendate, setopendate] = useState(false);
    const [openoptions, setopenoptions] = useState(false);

    const [options, setoptions] = React.useState({
        adult:1,
        children:0,
        room:1
    });

    const [destination, setDestination] = useState("");

    function handlechange(event)
    {
        const value = event.target.value;
        const name = event.target.name;

        setoptions( (previousValue)=>{
            if(name==="adult"){
                return {
                    adult:value,
                    children:previousValue.children,
                    room:previousValue.room
                };
            }
            else if(name==="children"){
                return{
                    adult:previousValue.adult,
                    children:value,
                    room:previousValue.room
                };
            }
            else if(name === "room"){
                return{
                    adult:previousValue.adult,
                    children:previousValue.children,
                    room:value
                };  
            }
        })
    }

    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
    };

    return (
        <div className="header">

        <div className="headerContainer">
 
          <div className="headerinfo">
            <div className="headerList">

                <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
                </div>

                <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
                </div>

                <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span>
                </div>

                <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>Attraction</span>
                </div>

                <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Airport Taxis</span>
                </div>

            </div>
            <br /><br /><br /><br />
            <h1>TRAVEL OPENS THE DOORS TO CREATE MEMORIES</h1>
            <h2>Make TravelGo a part of these precious memories</h2>
            <br /><br/><br /><br /><br />
            <h1 className="headertitle">A lifetime of discounts?</h1>
            <p className="headerDef">
                Get rewarded for your travels - unlock instant savings 
                of 10% or more with a free Travel booking account
            </p>
          </div>
          
          <div className="headerimg">
          <img src={bg3} />
          </div>

        </div>

            {
                props.type!=="hide" && 
            <>
            <div className="headerSearch">
                
                <div className="headerSearchItem">
                 
                 <div className="icon-text">
                 <FontAwesomeIcon icon={faBed} className="headerIcon" />
                 <label htmlFor="dest" id="txtlb">Where are you going?</label>
                 <select id="hdest" name="dest" onChange={(e) => setDestination(e.target.value)}>
                 <option value="">Select</option>
                 <option value="Jaipur">Jaipur</option>
                 <option value="Manali">Manali</option>
                 <option value="Mumbai">Mumbai</option>
                 <option value="Banglore">Banglore</option>
                 <option value="Delhi">Delhi</option>
                 </select>
                 
                 </div>
                </div>

                <div className="headerSearchItem">

                 <div className="icon-text">
                 <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" onClick={()=>setopendate(!opendate)} />
                 <span onClick={()=>setopendate(!opendate)} className="headerSearchText">{`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`} </span>
                 </div>
                 {opendate && <DateRange className="date"
                    editableDateInputs={true}
                    onChange={(item) => setdate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                  />}
                </div>

                <div className="headerSearchItem">

                 <div className="icon-text">
                 <FontAwesomeIcon icon={faPerson} className="headerIcon" onClick={ ()=>setopenoptions(!openoptions)}/>
                 <span className="headerSearchText" onClick={ ()=>setopenoptions(!openoptions)}>{`${options.adult} adult ${options.children} children ${options.room} rooms`}</span>
                 </div>
                 {openoptions && <form className="optionsform">
                  <input type="number" placeholder="Enter adults" onChange={handlechange} name="adult" min={1}/>
                  <input type="number" placeholder="Enter children" onChange={handlechange} name="children" min={0}/>
                  <input type="number" placeholder="Enter rooms" onChange={handlechange} name="room" min={1}/>
                 </form>}
                </div>

                <div className="headerSearchItem">
                    <button className="headerbtn" onClick={handleSearch}>Search</button>
                </div>

            </div>
            </>
            }

        </div>
    )
}

export default Header;