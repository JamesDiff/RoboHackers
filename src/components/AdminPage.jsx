import React, {useEffect} from "react";
import { Link, useHistory } from 'react-router-dom';



const AdminPage = ({token}) => {
    const history = useHistory();
    useEffect( () => {
        if(!token){
            history.push('/');
        }
    }, [token, history])

    return (<div id="product-box" className="form-group centered w-100">
                <br />
                {/* <div className="centered">
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cbf3c580-feca-46cf-8a3f-ceb136da5bb1/d39lpuk-d77fd28c-635b-4f63-ba7e-f953b94cbc0c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NiZjNjNTgwLWZlY2EtNDZjZi04YTNmLWNlYjEzNmRhNWJiMVwvZDM5bHB1ay1kNzdmZDI4Yy02MzViLTRmNjMtYmE3ZS1mOTUzYjk0Y2JjMGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gfbHAmoImTwEGpCRgLOAQsSrWWYX0TU-wlDsmTS1Gt4" 
                        alt="admin"
                        style={{width: 500, height: 150}} />
                </div> */}
                <br />
                <br />
                <div className="centered">
                <Link to="/admin-create" className="btn btn-danger btn-lg btn-block centered w-25">CREATE NEW PRODUCT</Link>
                <br />
                <Link to="/admin-products" className="btn btn-danger btn-info btn-lg btn-block centered w-25">ALL PRODUCTS</Link>
                <br />
                <Link to="/admin-users" className="btn btn-primary btn-danger btn-lg btn-block centered w-25">ALL USERS</Link>
                <br />
                <Link to="/admin-orders" className="btn btn-primary btn-danger btn-lg btn-block centered w-25">ALL ORDERS</Link>
                </div>
                <br />
            </div>)

}



export default AdminPage;