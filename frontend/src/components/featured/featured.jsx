import "./featured.css"
import jaipur from './jaipur.webp'
import udaipur from './udaipur.webp'
import manali from './manali.webp'
import Card from "../card"
import Fetchinfo from "../../hooks/useFetch"

function Featured()
{
  const {data, loading, error } = Fetchinfo("http://localhost:8800/hotel/countbycity?cities=Jaipur,Udaipur,Manali");
    return(
      <div className="featured">
      { loading ? ("Loading please wait") :
        (
        <>
        <Card items="featuredItem" img={jaipur} title="featuredTitle" head={`${data[0]} properties`} name="Jaipur"/>
        <Card items="featuredItem" img={udaipur} title="featuredTitle" head={`${data[1]} properties`} name="Udaipur"/>
        <Card items="featuredItem" img={manali} title="featuredTitle" head={`${data[2]} properties`} name="Manali" />
        </>
        )
      }
      </div>
    )
}

export default Featured