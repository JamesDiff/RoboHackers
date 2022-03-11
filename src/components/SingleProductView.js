import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductById, submitReviewForProduct, createOrder, addProductToOrder } from '../api'

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

async function submitReview(token, productId, title, description){
    const result = await submitReviewForProduct(token, productId, title, description);
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

const SingleProductView = ({token, match, history}) => {
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
        <div className='centered w-100'>
            <div className="card w-75 p-3 border-dark m-3 shadow bg-body rounded"> 
                <h1 className="card-title shadow centered font-bangers text-primary"><b>{singleProduct.name}</b></h1>
                <div className="horizGroup">
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
                </div>

                {token && (
                !showReviews? <button className="w-25 m-3 btn btn-outline-primary" onClick={ () => setShowReviews(true)}>
                See Reviews
            </button> : <button className="w-25 m-3 btn btn-outline-primary" onClick={ () => setShowReviews(false)}>X</button>
            )}
                {( showReviews ? <div id="messages" className="centered w-100">
                    <h2><b className='shadow'>Reviews</b></h2>
                {
                    reviews.map((review, index) => {
                        return (
                            <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><h3><b>Post: </b> {review.title}</h3></li>
                                    <li className="list-group-item">
                                        <b>From:</b> {review.firstname} {review.lastname}</li>
                                    <li className="list-group-item">
                                        <b>Review:</b> {review.description}</li>
                                </ul>
                            </div>
                        )
                    })
                } </div> : null
                )}

                
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
                        <label htmlFor="messageTextArea" className="form-label"><h5><b className='shadow'>Submit a Review!</b></h5></label>
                        <div className="form-group w-100">
                            <label><b>Title</b></label>
                            <br></br>
                            <input onChange={(event) => setNewReviewTitle(event.target.value)} value={newReviewTitle} type="text" className="form-control" placeholder="Description" required />
                            <br></br>
                        </div>
                        <textarea className="form-control" id="messageTextArea" rows="3" value={newReviewDescription} placeholder="Write your review here..." onChange={({target : {value}}) => {
                            setNewReviewDescription(value);
                        }}></textarea>
                    </div>
                    <button type="submit" className="btn btn-outline-primary w-25 m-3">Submit Review</button>
                </form>
            : null)}                    
            
        </div>
        </div>
    )
}


export default SingleProductView;