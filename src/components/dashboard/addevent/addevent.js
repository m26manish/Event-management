import { useState, useEffect } from "react"
import "./addevent.css"
import axios from "axios"
import { useData } from "../../context/DataContext"

const AddEvent = () => {

    const { startLoading, stopLoading, user } = useData();


    const [imgurl, setImgurl] = useState([])
    console.log(imgurl)
    const [formData, setFormData] = useState({})
  //  const [saveData, setsaveData] = useState()
    const baseURL = "http://localhost:5000"

    async function upload() {
        startLoading()
        var formData = new FormData();
        var imagefile = document.querySelector('#file');
        formData.append("image", imagefile.files[0]);
      
        try {
            await axios.post(`${baseURL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${user.token}`
                }
            }).then((res, err) => {
                if (err) {
                    window.alert(err)
                    stopLoading()
                }
                else {
                    setImgurl([...imgurl, res.data])
                    stopLoading()
                }
            })
        }
        catch (err) {

            window.alert(err)
            stopLoading();
            document.getElementById("wraper").style.opacity = "1"

        }
        finally {
            stopLoading();
            document.getElementById("wraper").style.opacity = "1"
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem('incomplete');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    function handleChange(e) {
        let data = formData
        data[e.target.name] = e.target.value
        setFormData(data)
        localStorage.setItem("incomplete", JSON.stringify(formData))
        console.log(formData)
    }
    let imgpreview = imgurl.map((id) => {
        return (
            <>
                <img className="priview" src={baseURL + `/img/${id}`} alt="img" />
            </>
        )
    })


    async function finalSubmit() {

        startLoading()
        let data = {
            name: formData.name,
            startTime: formData.startTime,
            endTime: formData.endTime,
            date: formData.date,
            fullAddress: formData.fullAddress,
            city: formData.city,
            seats: {
                front: formData.front,
                middel: formData.middel,
                back: formData.back,
                normal: formData.normal,
                primium: formData.primium,
            },
            available_seats: {
                front: formData.front,
                middel: formData.middel,
                back: formData.back,
                normal: formData.normal,
                primium: formData.primium,
            },
            price: {
                front: formData.pricefront,
                middel: formData.pricemiddel,
                back: formData.priceback,
                normal: formData.pricenormal,
                primium: formData.priceprimium,
            },
            event_type: formData.event_type,
            user_id: user.user_id,
            content: formData.content,
            img: imgurl
        }
        console.log(data);
        try {
            await axios.post("https://eventbookingserver.onrender.com/addevent", data,
                {
                    headers: {
                        'Authorization': `${user.token}`
                    }
                }
            ).then((res, err) => {
                if (err) {
                    window.alert(err)
                    stopLoading()
                    document.getElementById("wraper").style.opacity = "1"
                }
                else {
                    window.alert(res.data.msg)
                    stopLoading()
                    document.getElementById("wraper").style.opacity = "1"
                    localStorage.removeItem("incomplete")
                }
            })
        }
        catch (err) {

            window.alert(err)
            stopLoading();
            document.getElementById("wraper").style.opacity = "1"

        }
        finally {
            stopLoading();
            document.getElementById("wraper").style.opacity = "1"
        }
    }

    // function handleChangeN(e) {
    //     setsaveData(e.target.value)
    // }
    return (
        <>
            <div className="mainwraper">
                <h2>EVENT DETAIL</h2>
                <div className="mainadd">
                    {/* <div className="upperhalf"> */}
                        <div className="detail">
                            <p>Name Of Event</p>
                            <input className="name"
                                name="name"
                                type="text"
                                // value={saveData}
                                placeholder="Enter Name"
                                onChange={handleChange}
                                required
                            />
                            <p>City</p>
                            <input className="city"
                                name="city"
                                type="text"
                                placeholder="Enter City"
                                onChange={handleChange}
                                required
                            />
                            <p>Full Adderess</p>
                            <input className="address"
                                name="fullAddress"
                                type="text"
                                placeholder="Enter Address"
                                onChange={handleChange}
                                required
                            />

                            <p>Date</p>
                            <input className="date"
                                name="date"
                                type="date"
                                onChange={handleChange}
                                required
                            />

                            <p>Stating Time</p>
                            <input className="time"
                                name="startTime"
                                type="time"
                                placeholder="Enter the time"
                                onChange={handleChange}
                                required
                            />
                            <p>End Time</p>
                            <input className="time"
                                name="endTime"
                                type="time"
                                placeholder="Enter the time"
                                onChange={handleChange}
                                required
                            />
                            <div>
                                <p>Event Type</p>
                                <select name="event_type" id="event_type" onChange={handleChange}>
                                    <option value="">select</option>
                                    <option value="movie">movie</option>
                                    <option value="sports">sports</option>
                                    <option value="play">play</option>
                                    <option value="standup">standup</option>
                                    <option value="streams">streams</option>
                                    <option value="other">other</option>
                                </select>
                            </div>
                        </div>
                        <div className="upperhalf2">
                            <p>Title</p>
                            <input className="title"
                                name="title"
                                type="string"
                                placeholder="Enter the Title"
                                onChange={handleChange}
                                required
                            />
                            <p>Content</p>
                            <textarea className="content"
                                name="content"
                                type="string"
                                placeholder="Enter the content"
                                onChange={handleChange}
                                required
                            />
                            <div className="lowerhalf">
                                <p>Enter Seat Details</p>

                                <div className="definetag">

                                    <table>
                                        <tr>
                                            <td className="td">Seat Type</td>
                                            <td className="td">Total Avilable</td>
                                            <td className="td">price</td>
                                        </tr>
                                        <tr>
                                            <td className="td">Front</td>
                                            <td className="td">
                                                <input className="fronts"
                                                    name="fronts"
                                                    type="text"
                                                    placeholder="Available fronts seats"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td className="td">
                                                <input className="pricefronts"
                                                    name="pricefronts"
                                                    type="string"
                                                    placeholder="Enter the back"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="td">middel</td>
                                            <td className="td">
                                                <input className="middel"
                                                    name="middel"
                                                    type="string"
                                                    placeholder="Enter the middel"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td className="td">
                                                <input className="pricemiddel"
                                                    name="pricemiddel"
                                                    type="string"
                                                    placeholder="Enter the back"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="td">Back</td>
                                            <td className="td">
                                                <input className="back"
                                                    name="back"
                                                    type="string"
                                                    placeholder="Enter the back"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td className="td">
                                                <input className="priceback"
                                                    name="priceback"
                                                    type="string"
                                                    placeholder="Enter the back"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="td">Normal</td>
                                            <td className="td">
                                                <input className="normal"
                                                    name="normal"
                                                    type="string"
                                                    placeholder="Enter the normal"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td className="td">
                                                <input className="pricenormal"
                                                    name="pricenormal"
                                                    type="string"
                                                    placeholder="Enter the back"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="td">primium</td>
                                            <td className="td">
                                                <input className="primium"
                                                    name="primium"
                                                    type="string"
                                                    placeholder="Enter the primium"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td className="td">
                                                <input className="priceprimium"
                                                    name="priceprimium"
                                                    type="string"
                                                    placeholder="Enter the back"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>



                    {/* </div> */}
                    <div>
                        <div className="upperhalf3">
                            <p>Upload Images </p>
                            <input className="file"
                                id="file"
                                name="image"
                                type="file"
                                accept="image/*"
                                placeholder="Enter the content"
                                required
                            />
                            <button className="imgUploadBtn" onClick={upload}>Upload </button>
                            <p>Image Preview</p>
                            <div className="imgpreview">
                                {imgpreview}
                            </div>
                        </div>
                        <button className="submitBtn" onClick={finalSubmit}><h3>{"Next"}</h3></button>
                    </div>
                </div>

            </div>
        </>
    )

}
export default AddEvent
