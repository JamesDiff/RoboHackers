import React from "react";
import { Link} from 'react-router-dom';


const AdminPage = () => {


    return (<div id="product-box" className="form-group centered w-75">
                <br />
                <div className="d-flex justify-content-between p-3">
                    <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" alt="orange admin"></img>
                    <img src="https://previews.123rf.com/images/carmendorin/carmendorin1405/carmendorin140500034/28009966-grunge-rubber-stamp-with-text-admin-vector-illustration.jpg" alt="admin"></img>
                    <img src="https://cdn.w600.comps.canstockphoto.com/administration-and-computer-mouse-picture_csp10524671.jpg" alt="admin mouse"></img>
                    <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" alt="orange admin"></img>
                    <img src="https://cdn.w600.comps.canstockphoto.com/administration-and-computer-mouse-picture_csp10524671.jpg" alt="admin mouse"></img>
                    <img src="https://previews.123rf.com/images/carmendorin/carmendorin1405/carmendorin140500034/28009966-grunge-rubber-stamp-with-text-admin-vector-illustration.jpg" alt="admin"></img>
                    <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" alt="orange admin"></img>
                </div>
                <br />
                <Link to="/admin-create" className="btn btn-danger btn-lg btn-block centered w-50">CREATE NEW PRODUCT</Link>
                <br />
                <Link to="/admin-products" className="btn btn-danger btn-info btn-lg btn-block centered w-50">ALL PRODUCTS</Link>
                <br />
                <Link to="/admin-users" className="btn btn-primary btn-danger btn-lg btn-block centered w-50">ALL USERS</Link>
                <br />
                <Link to="/admin-orders" className="btn btn-primary btn-danger btn-lg btn-block centered w-50">ALL ORDERS</Link>
                <br />
                <div className="d-flex justify-content-between p-3">
                    <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" alt="orange admin"></img>
                    <img src="https://previews.123rf.com/images/carmendorin/carmendorin1405/carmendorin140500034/28009966-grunge-rubber-stamp-with-text-admin-vector-illustration.jpg" alt="admin"></img>
                    <img src="https://cdn.w600.comps.canstockphoto.com/administration-and-computer-mouse-picture_csp10524671.jpg" alt="admin mouse"></img>
                    <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" alt="orange admin"></img>
                    <img src="https://cdn.w600.comps.canstockphoto.com/administration-and-computer-mouse-picture_csp10524671.jpg" alt="admin mouse"></img>
                    <img src="https://previews.123rf.com/images/carmendorin/carmendorin1405/carmendorin140500034/28009966-grunge-rubber-stamp-with-text-admin-vector-illustration.jpg" alt="admin"></img>
                    <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" alt="orange admin"></img>
                </div>
            </div>)

}



export default AdminPage;