import React from 'react';
import { Link } from 'react-router-dom';

const Title = () => {
    return  <div id="title card centered" className="jumbotron centered shadow-lg">
                
                <Link to='/'><h1 className="site-title"><b>DVDungeon</b></h1></Link>
             
            </div>

}

export default Title;