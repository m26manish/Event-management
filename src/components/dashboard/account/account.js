import "./account.css"
import PostedEvent from "./postedEvent/postedEvent"
import Profession from "./profession/professon"
import BankDetail from "./BankAccDetail/bankDetail"
import { FaUser } from 'react-icons/fa';
import { useState} from 'react';


const Account =()=>{
    const [ accboard ,setaccBoard] =useState("event")

    const screenList ={
        "event":<PostedEvent/>,
        "profession":<Profession/>,
        "bank":<BankDetail/> 
    }


    let Screen=screenList[accboard];
    
     return(
            <>

    
            <div className="accountMain">
                <div className="profile">
                    <div className="proImg">
                        <FaUser/>
                        {/* <img src="./images/logo.js" alt="Fauser"/> */}
                    </div>
                    <div className="proName">
                        <p>My Name Is This</p>
                    </div>

                </div>
                <hr/>
                <div className="selectBtn">
                    <button className="Btn1" onClick={()=>setaccBoard("event")}>
                        Event View
                    </button>
                    <button className="Btn2" onClick={()=>setaccBoard("profession")}>
                        About You
                    </button>
                    <button className="Btn4" onClick={()=>setaccBoard("bank")}>
                        Bank Account
                    </button>
                </div>
                <hr/>

                <div className="accountScreen">
                    {Screen}
                </div>

            </div>




    </>
    
    )
}
export default Account;
