import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductById, submitReviewForProduct, createOrder, addProductToOrder, deleteReview } from '../api'

import {StarRating} from './starRating'

/*As a user, I want to be able to click a product from the all products page 
and get a detailed product page with more information about the product on it.*/

async function fetchSingleProduct(productId, setSingleProduct, setReviews) {
    try {
        const result = await getProductById(productId, setSingleProduct)
        setSingleProduct(result)
        if(result.reviews){
            setReviews(result.reviews);
        }
        return result;
    } catch (error) {
        throw error
    }
}

async function submitReview(token, productId, title, description, stars){
    const result = await submitReviewForProduct(token, productId, title, description, stars);
    console.log("Review is: ", result)
}

async function addProductToCart(token, productId, quantity){
    let activeOrderId = localStorage.getItem("ActiveOrderId");
    if(!activeOrderId) {
        const orderID = await createOrder(token);
        console.log("Setting OrderId", orderID)
        localStorage.setItem("ActiveOrderId", orderID)
        activeOrderId = orderID;
    }

    const addedProduct = await addProductToOrder(token, activeOrderId, productId, quantity);
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const SingleProductView = ({token, match, history, user}) => {
    const productId = match.params.productId;
    const [newReviewDescription, setNewReviewDescription] = useState('');
    const [newReviewTitle, setNewReviewTitle] = useState("");
    const [singleProduct, setSingleProduct] = useState('');
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [showReviews, setShowReviews] = useState(false);

    useEffect(() => {
            fetchSingleProduct(productId, setSingleProduct, setReviews)
    }, [productId, setSingleProduct])

    return (
        <div className="Single-product-render">
            <div className="Single-product-content"> 
                <h1 className="m-3 text-center"><b>{singleProduct.name}</b></h1>
                <div >
                    <div className="centered m-3">
                        <img src= { singleProduct.img_url } alt="Product Cover" style={{width: 300, height: 400}} />
                    </div>
                    <div >
                        <div >
                            <b className="">Description:</b> {singleProduct.description }
                        </div>
                        <div >
                            <b >Price:</b> { singleProduct.price }
                        </div>
                        <div >
                            <b >QTY On-Hand:</b> {singleProduct.inventory_qty > 0 ? singleProduct.inventory_qty : "Sold Out" }
                        </div> 
                        <div >
                            {singleProduct.inventory_qty > 0 ? <div>
                                <label ><b>Quantity</b></label>
                                <input className="m-3 singleProductQuantity" type="number" id="quantity" value={quantity} min="1" max={singleProduct.inventory_qty}
                                    onChange={(event) => setQuantity(Number(event.target.value))} /> 
                            </div> : null}
                            <br></br>

                            {singleProduct.inventory_qty > 0 ? <button className="btn btn-primary btn-danger m-3 shadow" onClick={async(event) => {
                                event.preventDefault();
                                addProductToCart(token, singleProduct.id, quantity);
                                // await delay(1000);
                                // history.push("/cart");
                            }}> Add to Cart
                            </button> : null}
                            <Link to="/products" className='btn btn-primary m-3 shadow'>
                                Back to Products
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <div className="horizGroup">
                    <div className="m-3">
                        <img src= { singleProduct.img_url } alt="Product Cover" style={{width: 300, height: 400}} />
                    </div>
                    <div className="w-75">
                        <div className="form-group">
                            <b className="">Description:</b> {singleProduct.description }
                        </div>
                        <div className="form-group list-group-item-text">
                            <b className="">Price:</b> { singleProduct.price }
                        </div>
                        <div className="form-group list-group-item-text text-danger">
                            <b className="">QTY On-Hand:</b> {singleProduct.inventory_qty }
                        </div>
                        <div className="horizGroup">
                            <label className=""><b>Quantity</b></label>
                            <input className="m-3" type="number" id="quantity" value={quantity} min="1" max="100"
                                onChange={(event) => setQuantity(event.target.value)} />

                            <button className="btn btn-primary btn-danger m-3 shadow" onClick={async(event) => {
                                event.preventDefault();
                                addProductToCart(token, singleProduct.id, quantity);
                                await delay(1000);
                                history.push("/cart");
                            }}> Add to Cart
                            </button>
                            <Link to="/products" className='btn btn-primary m-3 shadow'>
                                Back to Products
                            </Link>
                        </div>
                    </div>
                </div> */}

                
                {!showReviews? <button className="w-25 m-3 btn btn-outline-primary" onClick={ () => setShowReviews(true)}>
                See Reviews
                </button> : (<><button className="w-25 m-3 btn btn-outline-primary" onClick={ () => setShowReviews(false)}>X</button>
                
                <div id="messages" className="centered w-100">
                    <h2><b >Reviews</b></h2>
                {
                    reviews.map((review, index, user, productId) => {
                        return (
                            <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><h3><b>Post: </b> {review.title}</h3></li>
                                    <li className="list-group-item">
                                        <b>From:</b> {review.firstname} {review.lastname}</li>
                                    <li className="list-group-item">
                                        <b>Review:</b> {review.description}</li>
                                    <li>{review.stars}</li>
                                </ul>
                               <button className="m-3 btn btn-outline-primary" onClick={ () => deleteReview(productId)}>Delete</button>
                            </div>
                        )
                    })
                } 
                </div> </> )
               }

                
            {token && (
                !showForm ? <button className="w-25 m-3 btn btn-outline-primary" onClick={ () => setShowForm(true)}>
                Add a Review
            </button> : <button className="w-25 m-3 btn btn-outline-primary" onClick={ () => setShowForm(false)}>X</button>
            )}
            {(token && showForm ?
                <form onSubmit={(event) => {
                    event.preventDefault();
                    
                    submitReview(token, singleProduct.id, newReviewTitle, newReviewDescription);
                    const newReview = {
                        title: newReviewTitle, 
                        description: newReviewDescription
                    }
                    let allReviews = reviews;
                    allReviews.push(newReview);
                    setReviews(allReviews);
                    setNewReviewDescription("");
                    setNewReviewTitle("");
                }}>
                    <div className="m-3">
                        <label htmlFor="messageTextArea" className="form-label"><h5><b >Submit a Review!</b></h5></label>
                        <div className="form-group w-100">
                            <label><b>Title</b></label>
                            <br></br>
                            <input onChange={(event) => setNewReviewTitle(event.target.value)} value={newReviewTitle} type="text" className="form-control" placeholder="Description" required />
                            <br></br>
                        </div>
                        <textarea className="form-control" id="messageTextArea" rows="3" value={newReviewDescription} placeholder="Write your review here..." onChange={({target : {value}}) => {
                            setNewReviewDescription(value);
                        }}></textarea>
                        {/* <br></br> */}
                        <StarRating />
                    </div>
                    <button type="submit" className="btn btn-outline-primary w-25 m-3">Submit Review</button>
                </form>
            : null)}                    
            
        </div>
        </div>
    )
}


export default SingleProductView;