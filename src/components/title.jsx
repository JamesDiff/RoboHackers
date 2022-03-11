import React from 'react';
import { Link } from 'react-router-dom';

// This is just my title header with the title of my project and my name as the developer.

const Title = () => {
    return  <div id="title card centered" className="jumbotron centered shadow-lg">
                
                <Link to='/'><h1 className="text-primary font-anton"><b>DVDungeon</b></h1></Link>
                {/* <h5 className="text font-vuj"><b>Developed by Team</b></h5>
                <h1 className='text-danger font-amatic shadow-lg w-25 centered'><b>ROBOHACKERS</b></h1> */}
            </div>

}

export default Title;