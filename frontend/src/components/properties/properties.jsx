import "./properties.css"
import Card from "../card"
import hotel from "./hotel.webp"
import cabin from "./cabin.webp"
import resort from "./resort.webp"
import villa from "./villa.webp"
import apartment from "./apartment.webp"
import useFetch from "../../hooks/useFetch"


function Properties()
{
    const {data, loading} = useFetch("http://localhost:8800/hotel/countbytype");

    return(
        <div className="properties">
        { loading? ("This portion is loading") :
        (
        <>
        <Card items="items" img={hotel} title="titles" head={data[0]?.count} name="Hotel"/>
        <Card items="items" img={resort} title="titles" head={data[1]?.count} name="Resort"/>
        <Card items="items" img={villa} title="titles" head={data[2]?.count} name="Villa"/>
        <Card items="items" img={cabin} title="titles" head={data[3]?.count} name="Cabin"/>
        <Card items="items" img={apartment} title="titles" head={data[4]?.count} name="Apartment"/>
        </>
        )
        }
        </div>
    )
}

export default Properties