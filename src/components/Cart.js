import React from "react";
import { useState, useEffect } from "react";
import { getOrderById } from "../api";

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

const Cart = ({token, setToken}) => {
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
                        <div id="lineItems" className="container">
                            {order.lineItems.map((lineItem, index) => {
                                return (                                
                                    <div key={index} className="card w-100 p-3 border-dark m-3 shadow bg-body rounded horizGroup">
                                        <div className="m-3">
                                            <img src= { lineItem.img_url } alt="Product Cover"/>
                                        </div>
                                        <h3 className="w-50 card-title"><b>{lineItem.name}</b></h3>
                                        <div className="w-50 horizGroup alignLeft">
                                            <div className="m-5 form-group list-group-item-text">
                                                Quantity: {lineItem.quantity }

                                                <label>Quantity</label>
                                                <input className="m-3" type="number" id="quantity" 
                                                    value={(updatedQtys[lineItem.id] ? updatedQtys[lineItem.id] : lineItem.quantity)
                                                    } min="1" max="100"
                                                    onChange={({target : {value}}) => {
                                                        let newQuantities = updatedQtys;
                                                        newQuantities[lineItem.id] = value;
                                                        setUpdatedQtys(newQuantities);
                                                }} />
                                            </div>
                                            <div className="m-5 form-group list-group-item-text">
                                                Price:  {lineItem.price}
                                            </div>
                                            <div className="m-5 form-group list-group-item-text">
                                                <button className="btn btn-primary m-3" onClick={async(event) => {
                                                        event.preventDefault();
                                                    }}> Update
                                                </button>            
                                                <button className="btn btn-primary btn-danger m-3" onClick={async(event) => {
                                                        event.preventDefault();
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
                    }}> Complete Order
                </button>
            </div>
        )
    }else{
        return (<div className="d-flex justify-content-between p-3 w-100">
            <img src="https://pngimg.com/uploads/kim_kardashian/kim_kardashian_PNG52.png"
                style={{width: 350, height: 300}}
                        alt="Shopping cart is empty"
                        className="" />
            <img src="http://www.brushaplush.com/assets/img/icon/emptybag3.png"
                style={{width: 700, height: 325}}
                        alt="Shopping cart is empty"
                        className="shadow" />
            <img src="https://media.istockphoto.com/photos/angry-senior-man-redneck-with-two-thumbs-down-hand-gestures-picture-id613788900"
                style={{width: 500, height: 300}}
                        alt="Shopping cart is empty"
                        className="" />  
        </div>)
    }
}

export default Cart;