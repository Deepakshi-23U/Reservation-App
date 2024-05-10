import "./hotel.css"
import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import Mail from "../../components/mail/mail"
import Footer from "../../components/footer/footer"
import useFetch from "../../hooks/useFetch";
import Booking from "..//../components/booking/booking.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faStar,
  faLocationDot,
  faIndianRupeeSign
} from "@fortawesome/free-solid-svg-icons";

import oberoi from "./oberoi.webp"
import itc from "./itc.webp"
import umaid from "./umaid.webp"
import taj from "./taj.webp"
import leela from "./leela.webp"


export default function Hotel()
{
    const navigate = useNavigate();
    const location = useLocation();
    
    const id = location.pathname.split("/")[2];
    
    const { data, loading, error } = useFetch(`http://localhost:8800/hotel/${id}`);
    const [openModal, setOpenModal] = useState(false);

    const { name } = useLogin();
    const handleClick = () => {
        if (name) {
          setOpenModal(true);
        } else {
          navigate("/login");
        }
      };


    return (
        <div>
            <Navbar/>
            <Header type="hide"/>

            <div className="hcontainer">
            <h1 className="hoteltitle">{data.name}</h1>

            <div className="himages">
                <img src={oberoi} />
                <img src={itc} />
                <img src={umaid} />
                <img src={taj} />
                <img src={leela} />
                <img src={itc} />
            </div>

            <div className="htext">

                <div className="hinfo">

                <div className="hoteladdress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>  {data.address}, {data.city}</span>
                </div>
                <h3>Type : {data.type}</h3>
                <h3>Pets : {data.pets}</h3>
                <h3>Services : {data.service}</h3>
                <h3>Reviews : {data.review}</h3>
                <h3>Cancellation : {data.cancellation}</h3>
                </div>

                <div className="hbook">
                <span>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo
                </span>
                <h2><FontAwesomeIcon icon={faStar} />{data.rating}</h2>
                <h2><FontAwesomeIcon icon={faIndianRupeeSign} /> {data.cheapestPrice} /night</h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>

            </div>
            
            </div>
            
            {openModal && <Booking setOpen={setOpenModal} hotelId={id}/>}
            <Mail/>
            <Footer/>
        </div>
    )
}