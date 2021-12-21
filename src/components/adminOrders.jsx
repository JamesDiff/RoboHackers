import React from "react";
import { useState, useEffect } from "react";
import { deleteOrderById, getAllOrders } from "../api";


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


    return (<div id="product-box" className="form-group centered w-75">
                <div id="product" className="container">
                    {orders.map((order, index) => {
            
                        return (
                            
                            <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                <div className="form-group list-group-item-info card-title centered">
                                    <h3 className="card-title">
                                            <b>{ "ORDER #" + order.id}</b> 
                                    </h3>
                                </div>
                                <div className="horizGroup">
                                    <div className="w-75">
                                    <div className="form-group">
                                            <b>USER ID #</b>{order.userId }
                                        </div>
                                        <div className="form-group">
                                            <b>ORDER STATUS:</b> {order.order_status }
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
                                    
                                                type="submit" className="btn btn-primary btn-danger m-3">DELETE</button>
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