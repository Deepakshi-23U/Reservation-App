import "./mail.css"
import car from "./pngegg.png"

function Mail()
{
    return (
        <div className="mail">

          <div className="mailinfo">
           <h1>Save time, save money!</h1>
           <span>Sign up and we'll send the best deals to you</span>
           <div>
            <input type="text" placeholder="Your Email" />
            <button>Subscribe</button>
           </div>
          </div>

          <div className="mailimg">
          <img src={car} />
          </div>
          
        </div>
      )
}

export default Mail