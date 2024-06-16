import "./style.css"
import QRCode from 'qrcode.react';
import { AiTwotoneCalendar, AiFillClockCircle, AiFillMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

const TicketGenrator = () => {

    const ticket = localStorage.getItem("ticket") ? JSON.parse(localStorage.getItem("ticket")) : ""

    return (
        <>
            <div className="ticket_main">
                <div className="ticket_wrapper">

                    <div className="ticket_logo">
                        <img className="logo" src="./images/logo2.png" alt="" />
                    </div>
                    <div className="qrcode">

                        <QRCode value={ticket?.ticket_hash ? ticket.ticket_hash : "Jassi"} size={240} />
                    </div>
                    <div className='event_name_ticket'>
                        {ticket?.event_name}
                    </div>
                    <div className="ticket_detail">
                        <img src={`https://eventbookingserver.onrender.com/img/${ticket?.img ? ticket.img : "6537f1a015a4f835b862ae97"}`} />
                        <div>

                            <div className="event_date">
                                <p><AiFillMail /></p>
                                {ticket?.email}
                            </div>

                            <div className='event_date'>
                                <p><AiTwotoneCalendar /></p>    {ticket?.date}
                            </div>
                            <div className='event_date'>
                                <p><AiFillClockCircle /></p> {ticket?.startTime} - {ticket?.endTime}
                            </div>
                            <div className='event_location'>
                                <p><FaLocationDot /></p>{ticket?.fullAddress}
                            </div>
                        </div>
                    </div>

                    <div className="ticket_print">
                        <button onClick={window.print}>Print</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default TicketGenrator;