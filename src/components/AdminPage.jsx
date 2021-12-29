import React from "react";
import { Link} from 'react-router-dom';


const AdminPage = () => {


    return (<div id="product-box" className="form-group centered w-100">
                <br />
                <div className="centered">
                    {/* <img src="https://www.embroiderykhazana.com/admintheme/images/Admin.png" 
                        alt="orange admin"
                        style={{width: 100, height: 100}} /> */}
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cbf3c580-feca-46cf-8a3f-ceb136da5bb1/d39lpuk-d77fd28c-635b-4f63-ba7e-f953b94cbc0c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NiZjNjNTgwLWZlY2EtNDZjZi04YTNmLWNlYjEzNmRhNWJiMVwvZDM5bHB1ay1kNzdmZDI4Yy02MzViLTRmNjMtYmE3ZS1mOTUzYjk0Y2JjMGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gfbHAmoImTwEGpCRgLOAQsSrWWYX0TU-wlDsmTS1Gt4" 
                        alt="admin"
                        style={{width: 500, height: 150}} />
                    {/* <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" 
                        alt="orange admin"
                        style={{width: 600}} /> */}
                    {/* <img src="https://previews.123rf.com/images/carmendorin/carmendorin1405/carmendorin140500034/28009966-grunge-rubber-stamp-with-text-admin-vector-illustration.jpg" 
                        alt="admin"
                        style={{width: 600, height: 300}} /> */}
                    {/* <img src="https://www.seekpng.com/png/detail/347-3472704_admin-icon.png" 
                        alt="orange admin"
                        style={{width: 100, height: 100}} /> */}
                    
                </div>
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
                {/* <div className="d-flex justify-content-between p-3 w-100">
                    <img src="https://www.iirld.com/work/img/admin.png" 
                        alt="orange admin"
                        style={{width: 100, height: 100}} />
                    <img src="https://previews.123rf.com/images/carmendorin/carmendorin1405/carmendorin140500034/28009966-grunge-rubber-stamp-with-text-admin-vector-illustration.jpg" 
                        alt="admin mouse"
                        style={{width: 200}} />
                    <img src="https://static2.bigstockphoto.com/6/9/2/large2/296101924.jpg" 
                        alt="orange admin"
                        style={{width: 600}} />
                    <img src="https://cdn.w600.comps.canstockphoto.com/administration-and-computer-mouse-picture_csp10524671.jpg" 
                        alt="admin mouse"
                        style={{width: 200}} />
                    <img src="https://thumbs.dreamstime.com/b/settings-icon-vector-female-person-profile-avatar-gear-cogwheel-configuration-flat-color-glyph-pictogram-illustration-150122507.jpg" 
                        alt="orange admin"
                        style={{width: 100, height: 100}} />
                </div> */}
            </div>)

}



export default AdminPage;