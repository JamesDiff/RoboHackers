import React from 'react';
import { Link } from 'react-router-dom';

const Title = () => {
    return  <div id="title card centered" className="jumbotron centered shadow-lg">
                
                <Link to='/'><h1 className="site-title"><b>DVDUNGEON</b></h1></Link>
             
            </div>

}

//set up database build command on heroku; want to be able to run db command on heroku-- figure out the correct syntax

export default Title;