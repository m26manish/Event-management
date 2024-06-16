import './bookevent.css'
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/nav';
import About from '../about/about';
import Popup from './popup_book';
import { AiTwotoneHeart, AiTwotoneCalendar, AiFillClockCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Carousel from '../carousel/carousel';
const BookEvent = () => {

    const { event_id } = useParams()

    const [loadData, setLoadData] = useState()

    useEffect(() => {

        async function loadCards() {
            try {
                const res = await axios.get(`https://eventbookingserver.onrender.com/eventid/${event_id}`)
                if (res) {
                    setLoadData(res.data)
                }
                else {
                    console.error(res)
                }
            }

            catch (err) {
                console.log(err)
            }
        }

        loadCards();

    }, [event_id])

    console.log(loadData)

    return (
        <>
            <div id='booking_main_wrapper'>
                <Navbar />
                <div className='booking_main'>
                    <div className='booking_wrapper'>
                        <Carousel/>
                        <div className='booking_img2'>
                            <img src={loadData ? `https://eventbookingserver.onrender.com/img/${loadData.img}` : ""} alt='' />
                            <div className='booking_about'>
                                <div className='event_name'>
                                    {loadData ? loadData.name : "...."}
                                </div>
                                <div className='event_like'>
                                    <p><AiTwotoneHeart /></p>1.5K
                                </div>
                                <div className='event_date'>
                                    <p><AiTwotoneCalendar /></p> {loadData ? loadData.date : "..."}
                                </div>
                                <div className='event_date'>
                                    <p><AiFillClockCircle /></p>  {loadData ? loadData.startTime : "..."}-{loadData ? loadData.endTime : "..."}
                                </div>
                                <div className='event_location'>
                                    <p><FaLocationDot /></p>{loadData ? loadData.city : "..."} {loadData ? loadData.fullAddress : "..."}
                                </div>
                                <div className='event_lang'>
                                    Hindi
                                </div>
                                <div className='event_type'>
                                    Comedy/Action/Thrille
                                </div>
                                <div className='book_btn'>
                                    <button onClick={() => {
                                        document.getElementById("popup").style.display = "block";
                                        document.getElementById("booking_main_wrapper").style.opacity = "0.5"
                                    }
                                    }>Book Tickets</button>
                                </div>
                            </div>
                        </div>
                        <div className='event_about'>
                            <h2>About</h2>
                            <p> Contrary to popular belief, Lorem Ipsum is not
                                simply random text. It has roots in a piece of
                                classical Latin literature from 45 BC, making it
                                over 2000 years old. Richard McClintock, a Latin
                            </p>
                            <p>
                                Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                                of "de Finibus Bonorum et Malorum" (The Extremes of
                                Good and Evil) by Cicero, written in 45 BC. This book
                                is a treatise on the theory of ethics, very popular
                                during the Renaissance. The first line of Lorem Ipsum,
                                "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                            </p>
                        </div>
                    </div>
                </div>
                <About />
            </div>
            <div id='popup' style={{ display: "none" }}>
                <Popup seat_detail={{seats:loadData?.seats,price:loadData?.price,loadData:loadData}} />
            </div>
        </>
    )
}
export default BookEvent;