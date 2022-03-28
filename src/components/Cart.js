import React from "react";
import { useState, useEffect } from "react";
import { getOrderById, removeLineItemByID, closeOrderById } from "../api";
import { Link } from 'react-router-dom';
import { UpdateBilling } from './updateBilling';
import { Form } from 'react-bootstrap';


async function fetchActiveOrder(setOrder, setUpdatedQtys) {
    const orderId = localStorage.getItem("ActiveOrderId");
    if (!orderId) return {};

    const order = await getOrderById(orderId, setOrder);

    if (order && order.lineItems) {
        let newQtys = [];
        order.lineItems.forEach(lineItem => {
            newQtys[lineItem.id] = lineItem.quantity;
        });
        setUpdatedQtys(newQtys);
    }
}

async function removeLineItem(lineItemId, setOrder, setUpdatedQtys) {
    const deletedItem = await removeLineItemByID(lineItemId);
    await fetchActiveOrder(setOrder, setUpdatedQtys);
}

async function closeOrder(orderId, setOrder, setUpdatedQtys) {
    const closedOrder = await closeOrderById(orderId);
    localStorage.removeItem("ActiveOrderId");
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const Cart = ({ token, setToken, history }) => {
    const [order, setOrder] = useState({})
    const [updatedQtys, setUpdatedQtys] = useState({});
    const [showUpdate, setShowUpdate] = useState(false);
    const [billingForm, setBillingForm] = useState({
        billingfirstname: "",
        billinglastname: "",
        billingstreet: "",
        billingcity: "",
        billingstate: "",
        billingzip: ""
    }); 

    useEffect(() => {
        fetchActiveOrder(setOrder, setUpdatedQtys);
        // setTimeout(() => {
        //     setBillingForm({
        //         billingfirstname: order.user.billingfirstname,
        //         billinglastname: order.user.billinglastname,
        //         billingstreet: order.user.billingstreet,
        //         billingcity: order.user.city,
        //         billingstate: order.user.state,
        //         billingzip: order.user.zip
        //     })

        // }, 1000)
    }, []);

    function handleFormUpdate(e){
        setBillingForm({...billingForm, [e.target.name]: e.target.value});

    }

    if (order.id) {
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
                                    {order.user.email}
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
                        </div> : <h3>Please Login/Register to have Shipping Information</h3>)}
                    {(order.user ?
                        <div className="card w-50 p-3 border-dark m-3 shadow bg-body rounded">
                            <h3 className="card-title"><b><u>Billing Information</u></b></h3>
                            {!showUpdate ? (
                                <div className="w-75">
                                    <div className="form-group">
                                        {order.user.billingfirstname} {order.user.billinglastname}
                                    </div>
                                    <div className="form-group list-group-item-text">
                                        {order.user.billingstreet}
                                    </div>
                                    <div className="form-group list-group-item-text">
                                        {order.user.billingcity}, {order.user.billingstate} {order.user.billingzip}
                                    </div>
                                    {token && (!showUpdate ? <button className="m-3 btn btn-outline-primary" onClick={() => setShowUpdate(true)}>
                                        Update Billing
                                    </button> : <button className="w-25 m-3 btn btn-outline-primary" onClick={() => setShowUpdate(false)}>X</button>
                                    )}
                                    {/* <button className="btn btn-primary btn-danger m-3 shadow" onClick={async(event) => {
                               
                                setShowUpdate(true)
                            }}>Update Billing</button> */}
                                </div>
                            ) : (<Form>
                                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control type="email" placeholder="Enter email" />
                              <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                              </Form.Text>
                            </Form.Group> */}

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control name="billingfirstname" onChange={handleFormUpdate} type="text" value={billingForm.billingfirstname} placeholder={order.user.billingfirstname} />
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control name="billinglastname" onChange={handleFormUpdate} type="text" value={billingForm.billinglastname} placeholder={order.user.billinglastname} />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control type="last-name" placeholder={order.user.lastname} />
                            </Form.Group> */}
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Control name="billingstreet" onChange={handleFormUpdate} type="text" value={billingForm.billingstreet} placeholder={order.user.billingstreet} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control name="billingcity" onChange={handleFormUpdate} type="text" value={billingForm.billingcity} placeholder={order.user.billingcity} />
                                </Form.Group>
                                <div className="d-flex">
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control name="billingstate" onChange={handleFormUpdate} type="text" value={billingForm.billingstate} placeholder={order.user.billingstate} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId={"formBasicPassword"}>
                                        <Form.Label>Zip code</Form.Label>
                                        <Form.Control name="billingzip" onChange={handleFormUpdate} type="text" value={billingForm.billingzip} placeholder={order.user.billingzip} />
                                    </Form.Group>
                                </div>

                                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                              <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                                <button className="btn btn-primary btn-danger m-3 shadow" type="submit">
                                    Submit
                                </button>
                                <button className="btn btn-primary btn-danger m-3 shadow" onClick= {() => setShowUpdate(false)}>
                                    X
                                </button>
                            </Form>

                            )

                            }

                        </div> : <h3>Please Login/Register to have Billing Information</h3>)}
                </div>
                {(order.lineItems ?
                    <div id="product-box" className="form-group centered w-100">
                        <div id="lineItems" className="container ">
                            {order.lineItems.map((lineItem, index) => {
                                return (
                                    <div key={index} className="card w-100 p-3 border-dark m-3 shadow bg-body rounded horizGroup">
                                        <div className="m-3">
                                            <img src={lineItem.img_url}
                                                alt="Product Cover"
                                                style={{ width: 175, height: 225 }}
                                            />
                                        </div>
                                        <h3 className="w-50 card-title"><b>{lineItem.name}</b></h3>
                                        <div className="w-100 horizGroup alignLeft">
                                            <div className="m-5 form-group list-group-item-text">
                                                Quantity: {lineItem.quantity}
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
                                                <button className="btn btn-primary btn-danger m-3" onClick={async (event) => {
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
                    : <h3>Please add items to your cart to see line items</h3>)}
                <button className="btn btn-outline-primary m-3" onClick={async (event) => {
                    event.preventDefault();
                    closeOrder(order.id);
                    await delay(1000);
                    // history.push('/products');
                }}> Complete Order
                </button>
                <b></b>
                <button className="btn btn-outline-primary m-3" onClick={async (event) => {

                    history.push('/products');
                }}> Continue Shopping
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <div className="centered">
                    <img src="https://previews.123rf.com/images/doomu/doomu1304/doomu130400038/19117901-blau-einkaufswagen-symbol-auf-einem-wei%C3%9Fen-hintergrund.jpg"
                        style={{ width: 250, height: 150 }}
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
                            style={{ width: 200, height: 75 }} />
                    </Link>
                </div>
            </div>)
    }
}

export default Cart;