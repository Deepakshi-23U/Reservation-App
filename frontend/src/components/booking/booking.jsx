import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./booking.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Booking = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  //rooms belonging to this hotelid
  const { data } = useFetch(`http://localhost:8800/hotel/room/${hotelId}`);
  //dates is a state jo header.jsx me define hua tha
  const { dates } = useContext(SearchContext);
  console.log("hdate",dates);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) 
    {
      dates.push(date.toISOString());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  
  //startDate and endDate are properties of 'dates' state
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
 //so now, all the rooms of a hotel are in data and all the dates for which the user booked a room from data is in dates

  const isAvailable = (roomNumber) => {
    
    for (const date of roomNumber.unavailableDates) {
        if (alldates.includes(new Date(date).getTime())) {
            return false;
        }
    }
    // If no overlapping dates found, room is available
    return true;
};

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    console.log("sr", selectedRooms);
    console.log("dates",alldates);
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.put(`http://localhost:8800/room/availability/${roomId}`, {dates: alldates});
          console.log("data", res.data);
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } 
    catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.capacity}</b>
              </div>
              <div className="rPrice">Rs {item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                  {console.log("isAvailable", isAvailable(roomNumber))}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Booking;