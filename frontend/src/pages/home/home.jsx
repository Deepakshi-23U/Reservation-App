import react from 'react';
import "./home.css"
import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import Featured from "../../components/featured/featured";
import Properties from "../../components/properties/properties"
import Favourites from "../../components/favourites/favourites"
import Mail from "../../components/mail/mail"
import Footer from "../../components/footer/footer"

function Home(){
    return(
        <div>
          <Navbar />
          <Header/>
          <div className="homeContainer">
            <Featured/>
            <h1 className="homeTitle">Browse by property type</h1>
            <Properties/>
            <h1 className="homeTitle">Users Choice</h1>
            <Favourites />
            <Mail />
            <Footer />
          </div>
    </div>
    )
}

export default Home;