import "./favourites.css"
import Fav from "../favcard"
import React from "react"
import oberoi from "./oberoi.webp"
import itc from "./itc.webp"
import umaid from "./umaid.webp"
import taj from "./taj.webp"
import leela from "./leela.webp"

function Favourites()
{
    return(
        <div className="favourites">
           <Fav items="items" img={oberoi} rating="rating" name="The Oberoi Udaivilas" city="Udaipur" price="500$/day" star="9.8" head="Beautiful"/>
           <Fav items="items" img={taj} rating="rating" name="Taj Holiday Village Resort & Spa" city="Goa" price="1000$/day" star="9.5" head="Amazing service"/>
           <Fav items="items" img={leela} rating="rating" name="The Leela Palace" city="Udaipur" price="400$/day" star="10" head="Heaven on a lake"/>
           <Fav items="items" img={umaid} rating="rating" name="Umaid Bhawan Palace" city="Jodhpur" price="300$/day" star="9.2" head="Royal"/>
           <Fav items="items" img={itc} rating="rating" name="ITC Maurya, A Luxury Collection" city="New Delhi" price="1200$/day" star="9" head="Elegant"/>
        </div>
    )
}

export default Favourites