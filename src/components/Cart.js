import React from "react";
import { useState, useEffect } from "react";
import { getOrderById, removeLineItemByID } from "../api";
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
                        <div id="lineItems" className="container ">
                            {order.lineItems.map((lineItem, index) => {
                                return (                                
                                    <div key={index} className="card w-100 p-3 border-dark m-3 shadow bg-body rounded horizGroup">
                                        <div className="m-3">
                                            <img src= { lineItem.img_url } 
                                                alt="Product Cover"
                                                style={{width: 175, height: 225}}
                                                // style={{width: 200, height: 250}} 

                                            />
                                        </div>
                                        <h3 className="w-50 card-title"><b>{lineItem.name}</b></h3>
                                        <div className="w-100 horizGroup alignLeft">
                                            <div className="m-5 form-group list-group-item-text">
                                                <b>Quantity:</b> {lineItem.quantity }

                                                <label><b className="text-danger">Quantity</b></label>
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
                                                <b>Price Per:</b>  ${lineItem.price}
                                            </div>
                                            <div className="m-5 form-group list-group-item-text">
                                                <b>Total Price:</b>  ${lineItem.price * lineItem.quantity}
                                            </div>        
                                            <br />
                                            <div className="m-5 form-group list-group-item-text">
                                                <button className="btn btn-primary m-3" onClick={async(event) => {
                                                        event.preventDefault();
                                                    }}> Update
                                                </button>            
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
                    }}> Complete Order
                </button>
            </div>
        )
    }else{
        return (
            <div>
                <div className="centered">
                    {/* <img src="https://pngimg.com/uploads/kim_kardashian/kim_kardashian_PNG52.png"
                        style={{width: 350, height: 300}}
                        alt="Shopping cart is empty"
                        className="" /> */}
                    <img src="https://previews.123rf.com/images/doomu/doomu1304/doomu130400038/19117901-blau-einkaufswagen-symbol-auf-einem-wei%C3%9Fen-hintergrund.jpg"
                        style={{width: 300, height: 200}}
                        alt="Shopping cart is empty"
                        className="" />
                    {/* <img src="https://media.istockphoto.com/photos/angry-senior-man-redneck-with-two-thumbs-down-hand-gestures-picture-id613788900"
                        style={{width: 400, height: 300}}
                        alt="Shopping cart is empty"
                        className="" /> */}
             
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
                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczrP3dnq84Qw8U9-BbKYUVB3yfEF-zz1g5AA7TbVjB_yRXQdzYg-_a7AjVrjzMml4S2A&usqp=CAU"
                        style={{width: 500, height: 150}}
                        alt="Hurry up"
                        className="centered" /> */}
                </div>
            </div>)
    }
}

export default Cart;