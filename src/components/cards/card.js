import "./card.css"
import { FaStar } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Cards = ({ imgUrl, rating, votes, name, type, _id }) => {

    const navigate = useNavigate();

    return (
        <>

            <div className="cardMain" onClick={() => { navigate(`/bookevent/${_id}`) }}>
                <div className="cardImages-wrapper">
                    <img className="card-images" src={imgUrl ? `https://eventbookingserver.onrender.com/img/${imgUrl}` : "./images/card-1.jpg"} alt="coming" />
                </div>
                <div className="rating-votes">
                    <div className="rating">
                        <FaStar /> {rating ? rating : "4.5/5"}
                    </div>
                    <div className="votes">
                        {votes ? votes : "4.5"} k Votes
                    </div>
                </div>
                <div className="show-name">
                    {name ? name : "Mera Naam Ballu"}
                </div>
                <div className="show-type">
                    {type ? type : "Comedy/Drama/Action"}
                </div>

            </div>

        </>
    )
}

export default Cards;