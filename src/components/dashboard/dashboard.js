import "./dashboard.css"
import { useState} from 'react';
import Account from "./account/account"
import DashboardShow from "./dashboardshow/dashboardshow"
import AddEvent from "./addevent/addevent"
import Clashes from"./clashes/clashes"
import Statics from "./statics/statics";
import Contactus from "./contactus/contactus"
import { FaUser,FaUserCircle,FaSearch,FaGripHorizontal,FaArrowRight,FaArrowLeft,FaPaperPlane,FaSortAmountUp } from 'react-icons/fa';
import { HiViewGridAdd,HiOutlineLogout } from "react-icons/hi";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
  const { isLoading,user } = useData();
    const [ board ,setBoard] =useState(3)
    const navigate = useNavigate()

    if(!user) navigate("/login")
    
    function select(arg){
        setBoard(arg)
        document.getElementById(`${arg}`).style.backgroundColor="white"
        document.getElementById(`${arg}`).style.color="#4e73df"
        document.getElementById(`${(arg+1)%6}`).style.backgroundColor="transparent"
        document.getElementById(`${(arg+2)%6}`).style.backgroundColor="transparent"
        document.getElementById(`${(arg+3)%6}`).style.backgroundColor="transparent"
        document.getElementById(`${(arg+4)%6}`).style.backgroundColor="transparent"
        document.getElementById(`${(arg+5)%6}`).style.backgroundColor="transparent"
        document.getElementById(`${(arg+1)%6}`).style.color="white"
        document.getElementById(`${(arg+2)%6}`).style.color="white"
        document.getElementById(`${(arg+3)%6}`).style.color="white"
        document.getElementById(`${(arg+4)%6}`).style.color="white"
        document.getElementById(`${(arg+5)%6}`).style.color="white"
    }

    let screen 

      switch (board) {
        case 1: screen = <Account/> 
        break;
        case 2: screen = <DashboardShow/> 
        break;
        case 3: screen = <AddEvent/> 
        break;
        case 4: screen = <Clashes/> 
        break;
        case 5: screen = <Statics/> 
        break;
        case 0: screen = <Contactus/> 
        break;
        default: screen = <DashboardShow />
        break;
      }
      let loader = ""
    if (isLoading) {
        loader = <img className="loader" src="./images/loading.png!sw800" />
        document.getElementById("wraper").style.opacity = "0.5"
    }   
    return (
        <>
         {loader}
            <div className="wraper" id="wraper">
                <div className="menubar">
                    <div className="navbtns">
                        <button className="account" id="1" onClick={()=>select(1)}>
                          <FaUserCircle/>  Account
                        </button>
                        <button className="dashboard" id="2"  onClick={()=>select(2)} >
                          <FaGripHorizontal/>  Dashboard
                        </button>
                        <button className="newevent" id="3" onClick={()=>select(3)}>
                           <HiViewGridAdd/> Add Event
                        </button>
                        <button className="clashes" id="4" onClick={()=>select(4)}>
                          <FaArrowRight/> <FaArrowLeft/> See Clashes
                        </button>
                        <button className="statics" id="5" onClick={()=>select(5)}>
                         <FaSortAmountUp/>   Statics
                        </button>
                        <button className="Contactus" id="0" onClick={()=>select(0)}>
                          <FaPaperPlane/>  Contact Us
                        </button>
                        <button className="logout" 
                        
                        onClick={()=>
                          {sessionStorage.removeItem("user");
                          navigate('/login')
                      }} >
                         <HiOutlineLogout/> Logout
                        </button>
                    </div>
                </div>
                <div className="showbar">
                  <div className="dashNav">

                      <div className="dashSerach">
                        <input
                        className="searchBox"
                        type="text"
                        name="search"
                        placeholder="Search For..."
                        />
                        <div className="searchIcons">
                        <FaSearch/>
                        </div>

                      </div>

                      <img className="logo" src="./images/logo2.png" alt="LoGO"/>

                      <div className="navProfile">

                        <div className="profileName">
                          {user?.username}
                        </div>
                        <div className="profileImg">
                        <FaUser/>
                        </div>

                      </div>


                  </div>
                  
                    {screen}
                </div>
            </div>
        </>
    )


}

export default Dashboard;