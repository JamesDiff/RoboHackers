import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductById, submitReviewForProduct } from '../api'
// import { // all necessary/relevant API calls // } from //wherever they're stored//

/*As a user, I want to be able to click a product from the all products page 
and get a detailed product page with more information about the product on it.*/

async function fetchSingleProduct(productId, setSingleProduct, setReviews) {
    try {
        const result = await getProductById(productId, setSingleProduct)
        console.log("SINGLE PRODUCT RESULT", result)
        setSingleProduct(result)
        console.log("Result ", result);
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
}

const SingleProductView = ({token, match}) => {
    const productId = match.params.productId;
    const [newReviewDescription, setNewReviewDescription] = useState('');
    const [newReviewTitle, setNewReviewTitle] = useState("");
    const [singleProduct, setSingleProduct] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
            fetchSingleProduct(productId, setSingleProduct, setReviews)
    }, [productId, setSingleProduct])

    return (
        <div className="card w-75 p-3 border-dark m-3 shadow bg-body rounded"> 
            <h3 className="card-title">{singleProduct.name}</h3>
            <div className="horizGroup">
                <div className="m-3">
                    <img src= { singleProduct.img_url } alt="Product Cover"/>
                </div>
                <div className="w-75">
                    <div className="form-group">
                        Description: {singleProduct.description }
                    </div>
                    <div className="form-group list-group-item-text">
                        Price: { singleProduct.price }
                    </div>
                    <div className="form-group list-group-item-text text-danger">
                        QTY On-Hand: {singleProduct.inventory_qty }
                    </div>
                    <div>
                        Product Reviews:
                    </div>
                    <div className="horizGroup">
                        <button className="btn btn-primary btn-danger m-3" onClick={async(event) => {
                            event.preventDefault();
                                // try {
                                //     const result = await handleAddToCart();
                                //     setCart(result)
                                // } catch(error) {
                                //     console.error(error)
                                // };
                            }}> Add to Cart
                        </button>
                        <Link to="/products">
                            <button className="btn btn-primary m-3">
                                Back to All Products
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div id="messages" className="centered w-100">
                <h2>Reviews</h2>
                    {
                        reviews.map((review, index) => {
                            return (
                                <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><h3>Post: {review.title}</h3></li>
                                        <li className="list-group-item">From: {review.firstname} {review.lastname}</li>
                                        <li className="list-group-item">Message: {review.description}</li>
                                    </ul>
                                </div>
                            )
                    })
                }
            </div>   
            {(token ?
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
                        <label htmlFor="messageTextArea" className="form-label">Submit a Review!</label>
                        <div className="form-group w-75">
                            <label>Title</label>
                            <br></br>
                            <input onChange={(event) => setNewReviewTitle(event.target.value)} value={newReviewTitle} type="text" className="form-control" placeholder="Description" required />
                            <br></br>
                        </div>
                        <textarea className="form-control" id="messageTextArea" rows="3" value={newReviewDescription} onChange={({target : {value}}) => {
                            setNewReviewDescription(value);
                        }}></textarea>
                    </div>
                    <button type="submit" className="btn btn-outline-primary w-25 m-3">Send Message</button>
                </form>
            : null)}                    
            
        </div>

    )
}


export default SingleProductView;