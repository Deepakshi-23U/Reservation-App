import "./searchcard.css"
import apartment from "../../components/properties/apartment.webp"
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faIndianRupeeSign
} from "@fortawesome/free-solid-svg-icons";


function Searchcard({item})
{
    const navigate = useNavigate();

    function handleSearch()
    {
        navigate(`/hotels/${item._id}`)
    }
    
    return (
       <div className="main">
        
        <div className="image">
        <img src={apartment} />
        </div>
        
        <div className="info">

            <h2>{item.name}</h2>
            <span>{item.review}</span>
            <h3>{item.type}</h3>

            <div className="pd">
            <p>{item.service}</p>
            <h3><FontAwesomeIcon icon={faIndianRupeeSign} />{item.cheapestPrice}</h3>
            </div>

            <h4>{item.cancellation}</h4>

            <div className="extra">   
            <h5>You can cancel later</h5>
            <button className="btn" onClick={handleSearch}>See details</button>
            </div>

        </div>
       </div>
    )
}

export default Searchcard;

