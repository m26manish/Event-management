import "./about.css"
import { AiFillGithub, AiFillLinkedin, AiFillInstagram, AiFillMail } from 'react-icons/ai'
const About = () => {
    return (
        <>
            <div className="about-main">
                <div className="box">
                    <footer className="footer">
                        <div className="NFT-marketplace">
                            <p className="eventick"><span className="span">BOOKING</span> <span className="span">Office</span></p>

                            <p className="p">
                                Booking Office is a global self-service ticketing platform for live experiences that allows anyone to create,
                                share, find and attend events that fuel their passions and enrich their lives.
                            </p>
                            <a className='ancherTag' href='https://github.com/jaswant2111058'><AiFillGithub /></a>
                            <a className='ancherTag' href='https://www.linkedin.com/in/jaswant-kushwaha-037281252/'><AiFillLinkedin /></a>
                            <a className='ancherTag' href='https://www.instagram.com/jassi_maurya/'><AiFillInstagram /></a>
                            <a className='ancherTag' href='mailto:jkstar0123@gmail.com'><AiFillMail /></a>
                        </div>
                        <div className="marketplace">
                            <div className="div">Plan Events</div>
                            <p className="text-wrapper">Create and Set Up<br />Sell Tickets<br />Online RSVP <br />Online Events</p>
                        </div>
                        <div className="my-account">
                            <div className="div">Office</div>
                            <p className="text-wrapper">
                                About Us<br />Press<br />Contact Us<br />Help Center<br />How it Works<br />Privacy<br />Terms
                            </p>

                        </div>
                        <div className="stay-loop">
                            <div className="div">Stay In The Loop</div>
                            <p className="text-wrapper-2">Join our mailing list to stay in the loop with our newest for Event and concert</p>

                            <div className="overlap-group">
                                <input className="input-email"
                                    placeholder="Enter Your Emial Addreses"
                                />
                                <button className="send-email">SEND</button>
                            </div>
                        </div>

                    </footer>
                    <div className="copyright">
                        <p className="text-wrapper-5">Copyright © 2023 Jaswant Kushwaha</p>
                    </div>
                </div>
            </div>
        </>
    )

}

export default About;
