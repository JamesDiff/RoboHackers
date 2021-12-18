import React from "react";
import { useState, useEffect } from "react";
import { getOrderById } from "../api";
import { Link } from 'react-router-dom';

async function fetchActiveOrder(setOrder) {
    const orderId = localStorage.getItem("ActiveOrderId");
    if(!orderId) return {};

    const order = await getOrderById(orderId, setOrder);
}

const Cart = ({token, setToken}) => {
    const [order, setOrder] = useState({})
    
    useEffect(() => {
        fetchActiveOrder(setOrder);
    }, []);

    if(order.id){
        return (
            <div className="centered m-3">
                Order Stuff
            </div>          
        )
    }else{
        return (<div className="centered m-3">
            <h1>Your Cart is Empty!</h1>  
        </div>)
    }
}

export default Cart;