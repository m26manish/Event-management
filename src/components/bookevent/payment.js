import axios from "axios";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

export default function Payment({email,amount,loadData, seat }) {
    const [Razorpay] = useRazorpay();
    const navigate = useNavigate();
    console.log(email,amount)
    const handlePayment =  async () => {
        const order = await axios.post("https://eventbookingserver.onrender.com/createorder", {
            email: email,
            amount:Number(amount)
        })
        console.log(order)

        const options = {
            key: "rzp_test_lIAffka8ZIqfaU",
            currency: "INR",
            name: "Booking Office",
            description: "Test Transaction",
            image: "./images/logo2.jpg",
            order_id: order.data,
            handler: async (res) => {
                console.log(res);
                const details = {
                    order_id:res.razorpay_order_id,
                    payment_id:res.razorpay_payment_id,
                    signature:res.razorpay_signature
                }
                const response = await axios.post("https://eventbookingserver.onrender.com/paymentverification", details)
                console.log(response.data)
                if (response.data) {
                    const data = {
                        event_id: loadData._id,
                        event_name: loadData.name,
                        payment_id: res.razorpay_payment_id,
                        date: loadData.date,
                        startTime: loadData.startTime,
                        endTime:loadData.endTime,
                        fullAddress: loadData.fullAddress,
                        seat: seat,
                        price: amount,
                        email: email
                    }

                    await axios.post("https://eventbookingserver.onrender.com/bookticket", data).then((res, err) => {
                        if (err) {
                            window.alert(err)
                        }
                        else {
                            localStorage.setItem("ticket", JSON.stringify({...res.data,img:loadData?.img}))
                            navigate("/gen")
                        }
                    })
                }
            },
            prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#0892f5",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }

    return (
        <button className="pay_btn" onClick={()=>handlePayment()}>Pay</button>
    );
}