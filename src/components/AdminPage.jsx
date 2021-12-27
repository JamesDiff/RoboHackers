import React from "react";
import { Link} from 'react-router-dom';


const AdminPage = () => {


    return (<div id="product-box" className="form-group centered w-100">
                <br />
                <div className="d-flex justify-content-between p-3 w-100">
                    <img src="https://www.embroiderykhazana.com/admintheme/images/Admin.png" 
                        alt="orange admin"
                        style={{width: 100, height: 100}} />
                    <img src="https://cdn.w600.comps.canstockphoto.com/administration-and-computer-mouse-picture_csp10524671.jpg" 
                        alt="admin"
                        style={{width: 300}} />
                    <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" 
                        alt="orange admin"
                        style={{width: 400}} />
                    <img src="https://previews.123rf.com/images/carmendorin/carmendorin1405/carmendorin140500034/28009966-grunge-rubber-stamp-with-text-admin-vector-illustration.jpg" 
                        alt="admin"
                        style={{width: 300}} />
                    <img src="https://www.seekpng.com/png/detail/347-3472704_admin-icon.png" 
                        alt="orange admin"
                        style={{width: 125, height: 100}} />
                    
                </div>
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
                <div className="d-flex justify-content-between p-3 w-100">
                    <img src="https://www.iirld.com/work/img/admin.png" 
                        alt="orange admin"
                        style={{width: 100, height: 100}} />
                    <img src="https://previews.123rf.com/images/carmendorin/carmendorin1405/carmendorin140500034/28009966-grunge-rubber-stamp-with-text-admin-vector-illustration.jpg" 
                        alt="admin mouse"
                        style={{width: 300}} />
                    <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" 
                        alt="orange admin"
                        style={{width: 400}} />
                    <img src="https://cdn.w600.comps.canstockphoto.com/administration-and-computer-mouse-picture_csp10524671.jpg" 
                        alt="admin mouse"
                        style={{width: 300}} />
                    <img src="https://thumbs.dreamstime.com/b/settings-icon-vector-female-person-profile-avatar-gear-cogwheel-configuration-flat-color-glyph-pictogram-illustration-150122507.jpg" 
                        alt="orange admin"
                        style={{width: 100, height: 100}} />
                </div>
            </div>)

}



export default AdminPage;