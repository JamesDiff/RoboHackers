import React from "react";
import { useState, useEffect } from "react";
import { deleteOrderById, getAllOrders } from "../api";
import { Link } from "react-router-dom";


const AdminOrders = ({history}) => {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const list = await getAllOrders();
            setOrders(list.data);
        } 
        catch (error) {
            console.error("ERROR fetching all orders - useEffect in AdminOrders");
            throw error;
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);


    return (<div id="product-box" className="form-group w-100">
                <br />
                <Link to="/admin" className='btn btn-primary btn-danger m-3 shadow'>
                    GO BACK
                </Link>
                <br />
                <div className="centered">
                <br />
                    <img src="https://www.erplain.com/sites/default/files/uploaded_images/Purchase-Order-Main.png"
                        style={{width: 600, height: 200}}
                        alt="All Orders"
                        className="" />
                </div>
                <br />
                <div id="product" className="container centered">
                    {orders.map((order, index) => {
            
                        return (
                            
                            <div key={index} className="card w-50 p-3 border-dark m-3 shadow bg-body rounded centered">
                                <div className="form-group list-group-item card-title centered shadow">
                                    <h3 className="card-title shadow">
                                            <b>{ "ORDER #" + order.id}</b> 
                                    </h3>
                                </div>
                                <div className="horizGroup">
                                    <div className="w-75">
                                    <div className="form-group">
                                            <b className="shadow">USER ID #</b>{order.userId }
                                        </div>
                                        <div className="form-group">
                                            <b className="shadow">ORDER STATUS:</b> {order.order_status }
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <button 
                                                onClick={async (event) => {
                                                    
                                                try {
                                            
                                                    const response = await deleteOrderById(order.id);
                                                    console.log(response)
                                                    history.push("/admin")
                                            
                                                }
                                                catch (err) {
                                                    console.error("trouble deleting order", err)
                                                }
                                                }} 
                                    
                                                type="submit" className="btn btn-primary btn-danger m-3 shadow">DELETE</button>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                            </div>)
                    })}
                </div>
            </div>)



}

export default AdminOrders;