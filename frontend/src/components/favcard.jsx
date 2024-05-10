import React from "react"

function Favcard(props)
{
    return(
        <div className={props.items}>
          <img src={props.img} alt=""></img>
          <span>{props.name}</span>
          <span>{props.city}</span>
          <span>{props.price}</span>
          <div className={props.rating}>
            <button>{props.star}</button>
            <span>{props.head}</span>
          </div>
        </div>
    )
}

export default Favcard;