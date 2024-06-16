import "./bookevent.css"
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { AiTwotoneCalendar, AiFillClockCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import Payment from "./payment";
import { useEffect } from "react";

const Popup = ({ seat_detail }) => {

    const [quantity, setQuantity] = useState({ front: 0, middel: 0, back: 0, primium: 0, normal: 0 });
    const [totalAmount,setTotalAmount]= useState(0)
    console.log(seat_detail)
    function handleChange(e) {
        const { name, value } = e.target;
        setQuantity((prevData) => ({
            ...prevData,
            [name]: Number(value ? value : 0),
        }))
    }
    function handleSub(e) {
        const { name } = e.target;
        setQuantity((prevData) => ({
            ...prevData,
            [name]: Math.max(Number(quantity[name] - 1), 0)
        }))
    }

    function handleAdd(e) {
        const { name } = e.target;
        setQuantity((prevData) => ({
            ...prevData,
            [name]: Math.min(Number(quantity[name] + 1), seat_detail?.seats[name] ? seat_detail.seats[name] : 0)
        }))
    }

    useEffect( () => {

        const front = seat_detail?.price?.front ? seat_detail.price.front : 0
        const middle = seat_detail?.price?.middel ? seat_detail.price.middel : 0
        const back = seat_detail?.price?.back ? seat_detail.price.back : 0
        const primium = seat_detail?.price?.primium ? seat_detail.price.primium : 0
        const normal = seat_detail?.price?.normal ? seat_detail.price.normal : 0
        setTotalAmount (front * quantity.front + middle * quantity.middel + back * quantity.back + primium * quantity.primium + normal * quantity.normal)

    },[quantity])
    
    const [email, setEmail] = useState("")


    return (
        <>

        
            <div className="popup_main" id="popup_main">
                <div className="popup_close">
                    <p><FaWindowClose onClick={() => {
                        document.getElementById("popup").style.display = "none";
                        document.getElementById("booking_main_wrapper").style.opacity = "1"
                    }} /></p>
                </div>
                <div className="popup_wrapper" id="popup_wrapper">
                    <div className="popup_content">
                        <div className="select_seat">
                            <h2>SELECT SEATS</h2>
                            <table className="select_table">
                                <tr className="heading">
                                    <td>
                                        Seat Type
                                    </td>
                                    <td>
                                        Avaliable
                                    </td>
                                    <td>
                                        Price
                                    </td>
                                    <td>
                                        Quantity
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        Front
                                    </td>
                                    <td>
                                        {seat_detail?.seats?.front ? seat_detail.seats.front : "0"}
                                    </td>
                                    <td>
                                        {seat_detail?.price?.front ? seat_detail.price.front : "0"}
                                    </td>
                                    <td className="select_field">
                                        <button name="front" onClick={handleSub}>-</button><input type="number" className="quantity_show" name="front" value={quantity.front} onChange={handleChange} /><button name="front" onClick={handleAdd}>+</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Middle
                                    </td>
                                    <td>
                                        {seat_detail?.seats?.middel ? seat_detail.seats.middel : "0"}
                                    </td>
                                    <td>
                                        {seat_detail?.price?.middel ? seat_detail.price.middel : "0"}
                                    </td>
                                    <td className="select_field">
                                        <button name="middel" onClick={handleSub}>-</button><input type="number" className="quantity_show" name="middle" value={quantity.middel} onChange={handleChange} /><button name="middel" onClick={handleAdd}>+</button>
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        Back
                                    </td>
                                    <td>
                                        {seat_detail?.seats?.back ? seat_detail.seats.back : "0"}
                                    </td>
                                    <td>
                                        {seat_detail?.price?.back ? seat_detail.price.back : "0"}
                                    </td>
                                    <td className="select_field">
                                        <button name="back" onClick={handleSub}>-</button><input type="number" className="quantity_show" name="back" value={quantity.back} onChange={handleChange} /><button name="back" onClick={handleAdd}>+</button>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        Primium
                                    </td>
                                    <td>
                                        {seat_detail?.seats?.primium ? seat_detail.seats.primium : "0"}
                                    </td>
                                    <td>
                                        {seat_detail?.price?.primium ? seat_detail.price.primium : "0"}
                                    </td>
                                    <td className="select_field">
                                        <button name="primium" onClick={handleSub}>-</button><input type="number" className="quantity_show" name="primium" value={quantity.primium} onChange={handleChange} /><button name="primium" onClick={handleAdd}>+</button>
                                    </td>
                                </tr>
                                <tr>

                                    <td>
                                        Normal
                                    </td>
                                    <td>
                                        {seat_detail?.seats?.normal ? seat_detail.seats.normal : "0"}
                                    </td>
                                    <td>
                                        {seat_detail?.price?.normal ? seat_detail.price.normal : "0"}
                                    </td>
                                    <td className="select_field">
                                        <button name="normal" onClick={handleSub}>-</button><input type="number" className="quantity_show" name="normal" value={quantity.normal} onChange={handleChange} /><button name="normal" onClick={handleAdd}>+</button>
                                    </td>
                                </tr>
                            </table>
                            <input className="book_input"
                                name="email"
                                placeholder="Enter Your Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="amount_payable">

                                <h3 className="amount">
                                    Amount Payable
                                </h3>
                                <h3> {totalAmount} </h3>
                            </div>

                        </div>
                        <div className="priview_all">
                            <div className="select_seat_">
                                <h2>Ticket Priview</h2>
                            </div>
                            <div className='priview_wrapper'>
                                <img className="preview_img" src={seat_detail?.loadData ? `https://eventbookingserver.onrender.com/img/${seat_detail?.loadData.img}` : ""} alt='' />
                                <div className='priview_about'>
                                    <div className='event_name'>
                                        {seat_detail?.loadData ? seat_detail?.loadData.name : "...."}
                                    </div>
                                    <div className='event_date'>
                                        <p><AiTwotoneCalendar /></p> {seat_detail?.loadData ? seat_detail.loadData.date : "..."}
                                    </div>
                                    <div className='event_date'>
                                        <p><AiFillClockCircle /></p>  {seat_detail?.loadData ? seat_detail.loadData.startTime : "..."}-{seat_detail?.loadData ? seat_detail.loadData.endTime : "..."}
                                    </div>
                                    <div className='event_location'>
                                        <p><FaLocationDot /></p>{seat_detail?.loadData ? seat_detail?.loadData.city : "..."} {seat_detail?.loadData ? seat_detail.loadData.fullAddress : "..."}
                                    </div>
                                    <div className="selectedSeat">
                                        <h4> Selected Seats</h4>
                                        <p>{quantity.front ? "Front" + " " + quantity.front : ""} </p>
                                        <p>{quantity.middel ? "Middle" + " " + quantity.middel : ""} </p>
                                        <p>{quantity.back ? "Back" + " " + quantity.back : ""} </p>
                                        <p>{quantity.primium ? "Primium" + " " + quantity.primium : ""} </p>
                                        <p>{quantity.normal ? "Normal" + " " + quantity.normal : ""} </p>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="popup_bottom_nav">
                        <div>
                            <button> </button>
                            <button onClick={() => { document.getElementById("popup_wrapper").style.translate = '-350px' }}><FaCircleArrowRight /> </button>
                        </div>
                        <div>
                            <button onClick={() => { document.getElementById("popup_wrapper").style.translate = '0px' }}> <FaCircleArrowLeft /></button>
                            <div>
                                <Payment loadData={seat_detail.loadData} seat={quantity} email={email} amount={totalAmount*100} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}
export default Popup;