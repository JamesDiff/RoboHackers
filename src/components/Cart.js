import React from "react";
import { useState, useEffect } from "react";
import { getOrderById, removeLineItemByID, closeOrderById } from "../api";
import { Link } from 'react-router-dom';

async function fetchActiveOrder(setOrder, setUpdatedQtys) {
    const orderId = localStorage.getItem("ActiveOrderId");
    if(!orderId) return {};

    const order = await getOrderById(orderId, setOrder);

    if(order && order.lineItems){
        let newQtys = [];
        order.lineItems.forEach(lineItem => {
            newQtys[lineItem.id] = lineItem.quantity;
        });
        setUpdatedQtys(newQtys);
    }
}

async function removeLineItem(lineItemId, setOrder, setUpdatedQtys){
    const deletedItem = await removeLineItemByID(lineItemId);
    await fetchActiveOrder(setOrder, setUpdatedQtys);
}

async function closeOrder(orderId, setOrder, setUpdatedQtys) {
    const closedOrder = await closeOrderById(orderId);
    localStorage.removeItem("ActiveOrderId");
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const Cart = ({token, setToken, history}) => {
    const [order, setOrder] = useState({})
    const [updatedQtys, setUpdatedQtys] = useState({});
    
    useEffect(() => {
        fetchActiveOrder(setOrder, setUpdatedQtys);
    }, []);

    if(order.id){
        return (
            <div>
                <div className="horizGroup">   
                    {(order.user ?
                    <div className="card w-50 p-3 border-dark m-3 shadow bg-body rounded"> 
                        <h3 className="card-title"><b><u>Shipping Information</u></b></h3>

                        <div className="w-75">
                            <div className="form-group">
                                {order.user.firstname} {order.user.lastname}
                            </div>
                            <div className="form-group list-group-item-text">
                                { order.user.email }
                            </div>
                            <div className="form-group list-group-item-text">
                                {order.user.street}
                            </div>   
                            <div className="form-group list-group-item-text">
                                {order.user.city}, {order.user.state} {order.user.zip}
                            </div>   
                            <div className="form-group list-group-item-text">
                                {order.user.phone}
                            </div>   
                        </div>       
                    </div>  : <h3>Please Login/Register to have Shipping Information</h3>)}
                    {(order.user ?
                    <div className="card w-50 p-3 border-dark m-3 shadow bg-body rounded"> 
                        <h3 className="card-title"><b><u>Billing Information</u></b></h3>

                        <div className="w-75">
                            <div className="form-group">
                                {order.user.firstname} {order.user.lastname}
                            </div>
                            <div className="form-group list-group-item-text">
                                { order.user.email }
                            </div>
                            <div className="form-group list-group-item-text">
                                {order.user.street}
                            </div>   
                            <div className="form-group list-group-item-text">
                                {order.user.city}, {order.user.state} {order.user.zip}
                            </div>   
                            <div className="form-group list-group-item-text">
                                {order.user.phone}
                            </div>   
                        </div>       
                    </div>  : <h3>Please Login/Register to have Billing Information</h3>)}
                </div>
                {(order.lineItems ? 
                    <div id="product-box" className="form-group centered w-100">
                        <div id="lineItems" className="container ">
                            {order.lineItems.map((lineItem, index) => {
                                return (                                
                                    <div key={index} className="card w-100 p-3 border-dark m-3 shadow bg-body rounded horizGroup">
                                        <div className="m-3">
                                            <img src= { lineItem.img_url } 
                                                alt="Product Cover"
                                                style={{width: 175, height: 225}} 
                                            />
                                        </div>
                                        <h3 className="w-50 card-title"><b>{lineItem.name}</b></h3>
                                        <div className="w-100 horizGroup alignLeft">
                                            <div className="m-5 form-group list-group-item-text">
                                                Quantity: {lineItem.quantity }
                                            </div>
                                            <div className="m-5 form-group list-group-item-text">
                                                <b>Price Per:</b>  ${lineItem.price}
                                            </div>
                                            <div className="m-5 form-group list-group-item-text">
                                                <b>Total Price:</b>  ${lineItem.price * lineItem.quantity}
                                            </div>        
                                            {/* <div className="m-5 form-group list-group-item-text">
                                                <label>Update Quantity</label>
                                                <input className="m-3" type="number" id="quantity" 
                                                    min="1" max="100"
                                                    onChange={({target : {value}}) => {
                                                        let newQuantities = updatedQtys;
                                                        newQuantities[lineItem.id] = value;
                                                        setUpdatedQtys(newQuantities);
                                                }} />
                                                <button className="btn btn-primary m-3" onClick={async(event) => {
                                                        event.preventDefault();
                                                    }}> Update
                                                </button>   
                                            </div>  */}
                                            <div className="m-5 form-group list-group-item-text">         
                                                <button className="btn btn-primary btn-danger m-3" onClick={async(event) => {
                                                        event.preventDefault();
                                                        removeLineItem(lineItem.id, setOrder, setUpdatedQtys)
                                                    }}> Remove
                                                </button>
                                            </div>
                                        </div>
                                </div>)
                            })}
                        </div>
                    </div>  
                : <h3>Please add items to your cart to see line items</h3> )}
                <button className="btn btn-success m-3" onClick={async(event) => {
                        event.preventDefault();
                        closeOrder(order.id);
                        await delay(1000);
                        history.push('/products');
                    }}> Complete Order
                </button>
            </div>
        )
    }else{
        return (
            <div>
                <div className="centered">
                    <img src="https://previews.123rf.com/images/doomu/doomu1304/doomu130400038/19117901-blau-einkaufswagen-symbol-auf-einem-wei%C3%9Fen-hintergrund.jpg"
                        style={{width: 300, height: 200}}
                        alt="Shopping cart is empty"
                        className="" />
                </div>
                <div className="form-group centered">
                    <br />
                    <h1 className="">
                        <b className="text-danger p-3 mb-5 bg-white rounded">*** Your shopping cart is empty ***</b>
                    </h1>
                </div>
                <br />
                <div className="centered">
                    <Link to="/products" className='btn'>
                        <img src="https://aradiafarm.com/wp-content/uploads/2020/03/button-shop-now.jpg"
                            alt="Shop now"
                            style={{width: 200, height: 75}} />
                    </Link>
                </div>
            </div>)
    }
}

export default Cart;