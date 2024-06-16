import "./home.css";
import Navbar from "../navbar/nav";
import Carousel from "../carousel/carousel";
import Cards from "../cards/card";
import About from "../about/about";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
    const [loadData, setLoadData] = useState(null);

    useEffect(() => {
        async function loadCards() {
            try {
                const res = await axios.get("https://eventbookingserver.onrender.com/eventList");
                if (res.status === 200) {
                    setLoadData(res.data);
                } else {
                    console.error(res);
                }
            } catch (err) {
                console.error(err);
            }
        }

        loadCards();
    }, []);

    const loader = () => (
        <div className="loader-main">
            <div className="loader-inner">
                <img src="./images/loading-gif.gif" alt="" />
            </div>
        </div>
    );

    return (
        <>
            {loadData ? (
                <>
                    <Navbar />
                    <Carousel />
                    <div className="card-main">
                        <div className="recents-cards">
                            <h1>Recent On Going</h1>
                            <div className="avaliable-cards">
                                {loadData.recentOnGoing.map((item) => (
                                    <Cards _id={item._id} imgUrl={item.img[0]} name={item.name} key={item._id} />
                                ))}
                            </div>
                        </div>
                        <div className="recents-cards">
                            <h1>TRENDING MOVIES</h1>
                            <div className="avaliable-cards">
                                {loadData.trendingMovie.slice().reverse().map((item) => (
                                    <Cards _id={item._id} imgUrl={item.img[0]} name={item.name} key={item._id} />
                                ))}

                            </div>
                        </div>
                        <div className="recents-cards">
                            <h1>Laughter Therapy</h1>
                            <div className="avaliable-cards">
                                {loadData.laughterTherepy.map((item) => (
                                    <Cards _id={item._id} imgUrl={item.img[0]} name={item.name} key={item._id} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <About />
                </>
            ) : (
                loader()
            )}
        </>
    );
};

export default Home;
