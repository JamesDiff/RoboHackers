import React from "react";
import { Link} from 'react-router-dom';


const AdminPage = () => {


    return (<div id="product-box" className="form-group centered w-75">
                <br />
                <h1>
                    <b style={{ color: 'darkorange' }}>*** ADMIN PAGE ***</b>
                </h1>
                <br />
                <Link to="/admin-create" className="btn btn-success btn-lg btn-block centered w-50">CREATE NEW PRODUCT</Link>
                <br />
                <Link to="/admin-products" className="btn btn-primary btn-info btn-lg btn-block centered w-50">ALL PRODUCTS</Link>
                <br />
                <Link to="/admin-users" className="btn btn-primary btn-warning btn-lg btn-block centered w-50">ALL USERS</Link>
                
            </div>)

}



export default AdminPage;