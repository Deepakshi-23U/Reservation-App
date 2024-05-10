import React from "react"

function Card(props)
{
    return(
        <div id={props.name} className={props.items}>
          <img src={props.img} alt=""></img>
          <div className={props.title}>
            <h1>{props.name}</h1>
            <h1>{props.head}</h1>
          </div>
        </div>
    )
}

export default Card;