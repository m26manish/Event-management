
import Homepage from "./components/homepage/home";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import TicketVerification from "./components/tickets/ticket_verification";
import TicketGenrator from "./components/tickets/ticket_genrate";
import CoomingSoon from "./components/utils/commingSoon";

import { HashRouter, Routes, Route, } from "react-router-dom";
import BookEvent from "./components/bookevent/bookevent";
import Payment from "./components/bookevent/payment";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/lsevents' element={<Dashboard />} />
        <Route exact path='/ticket' element={<TicketVerification />} />
        <Route exact path='/gen' element={<TicketGenrator />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/payment' element={<Payment />} />
        <Route exact path='/commingsoon' element={<CoomingSoon />} />
        <Route exact path='/bookevent/:event_id' element={<BookEvent />} />
      </Routes>
    </HashRouter>
  );
}


export default App;

