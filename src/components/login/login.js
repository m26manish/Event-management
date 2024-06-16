import "./login.css"
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useData } from "../context/DataContext";



const Login = () => {

    const { isLoading, startLoading, stopLoading,setUser } = useData();
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const baseURL = "https://eventbookingserver.onrender.com"
    

    const signup = async () => {
        if (password !== repass && username && email) {
            window.alert("enter password and Repassword is not matching")
        }
        else {
            try {
                startLoading();
                const user = { username, email, password }
                await axios.post(`${baseURL}/signup`, user).then((res, err) => {
                    if (err) {
                        window.alert(err)
                        stopLoading();
                        document.getElementById("login").style.opacity = "1"
                    }
                    else {
                        window.alert(res.data.message)
                        stopLoading();
                        document.getElementById("login").style.opacity = "1"
                    }
                })
            }
            catch (err) {

                window.alert(err)
                stopLoading();
                document.getElementById("login").style.opacity = "1"
            }
            finally {
                stopLoading();
                document.getElementById("login").style.opacity = "1"
            }
        }
    }

    const login = async () => {
        startLoading();
        const user = { email, password }

        try {

            await axios.post(`${baseURL}/login`, user).then((res, err) => {
                if (err) {
                    window.alert(err)
                    stopLoading();
                    document.getElementById("login").style.opacity = "1"
                }
                else {
                    stopLoading();
                    setUser(res.data.user)
                    sessionStorage.setItem("user", JSON.stringify(res.data.user))
                    window.alert(res.data.msg)
                    document.getElementById("login").style.opacity = "1"
                    navigate("/lsevents")
                }
            })
        }
        catch (err) {

            window.alert(err)
            stopLoading();
            document.getElementById("login").style.opacity = "1"
        }
        finally {
            stopLoading();
            document.getElementById("login").style.opacity = "1"
        }

    }

    const handleChangename = (e) => {
        setUsername(e.target.value)
    }
    const handleChangeemail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangepass = (e) => {
        setPassword(e.target.value)
    }
    const handleChangerepass = (e) => {
        setRepass(e.target.value)
    }
    let loader = ""
    if (isLoading) {
        loader = <img className="loader" src="./images/cheetah.gif" />
        document.getElementById("login").style.opacity = "0.5"
    }

    return (
        <>
        <div className="mainwrap">
                {loader}
                <div className="login" id="login">
                   
                    <div className="signupwrap" id="signupwrap">
                        <h3>WELCOME</h3>
                      <div className="signup" >
                            <input className="username"
                                name="username"
                                type="text"
                                placeholder="Full Name"
                                required
                                onChange={handleChangename}
                            />
                            <input className="email"
                                name="email"
                                type="text"
                                placeholder="Enter Email"
                                required
                                onChange={handleChangeemail}
                            />

                            <input className="password"
                                name="password"
                                type="password"
                                placeholder="Enter the password"
                                required
                                onChange={handleChangepass}
                            />

                            <input className="repassword"
                                name="repassword"
                                type="password"
                                placeholder="Enter the repassword"
                                required
                                onChange={handleChangerepass}
                            />

                            <button className="signupbutton " onClick={() => signup()}>
                                Signup
                            </button>
                            <div className="gotologin">
                                <p>  Allready have Account <a onClick={() => {
                                        document.getElementById("bg3").style.translate="-350px"
                                        document.getElementById("signupwrap").style.translate="-350px"
                                        document.getElementById("loginwrap").style.translate="-350px"
                                }}>Login</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <img className="bg3" id="bg3" src="./images/bg3.jpg" alt=" "/>
                    <div className="loginwrap" id="loginwrap">
                        <h3>WELCOME BACK</h3>
                        <div className="loginmain" >
                            <input className="email"
                                name="email"
                                type="text"
                                placeholder="Enter Email"
                                required
                                onChange={handleChangeemail}
                            /><br />
                            <input className="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Enter the password"
                                onChange={handleChangepass}
                            /><br />
                            <button onClick={() => login()}>
                                Login
                            </button>
                            <div className="gotologin" >
                                <p>  Not have Account <a onClick={() => {
                                    document.getElementById("bg3").style.translate="0px"
                                    document.getElementById("signupwrap").style.translate="0px"
                                    document.getElementById("loginwrap").style.translate="0px"
                                }}>SignUp</a>
                                </p> 
                            </div>
                        </div>
                    </div>
                </div>

         
        </div>

        </>
    )
}
export default Login;