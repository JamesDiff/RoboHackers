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

    useEffect(() => {
            fetchSingleProduct(productId, setSingleProduct, setReviews)
    }, [productId, setSingleProduct])

    return (
        <div className='centered w-100'>
        <div className="d-flex justify-content-between p-3 w-100">
            
            <img src="https://us.123rf.com/450wm/aquir/aquir1911/aquir191100215/133345268-buy-now-grunge-stamp-with-green-band-buy-now.jpg?ver=6"
                        style={{width: 200, height: 150}}
                        alt="All Current Products"
                        className="" 

                    />
            <img src="https://cdn.xxl.thumbs.canstockphoto.com/good-decision-red-rubber-stamp-over-a-white-background-drawings_csp25277634.jpg"
                        style={{width: 300, height: 200}}
                        alt="All Current Products"
                        className="" 

                    />
            <img src="https://previews.123rf.com/images/vgstudio/vgstudio1304/vgstudio130400059/18917555-happy-smiling-cheerful-business-man-with-thumbs-up-gesture-isolated-over-white-background.jpg"
                        style={{width: 300, height: 350}}
                        alt="All Current Products"
                        className="" 

                    />
            <img src="https://www.seekpng.com/png/detail/243-2434525_free-shipping-to-the-continental-usa-made-in.png"
                        style={{width: 300, height: 200}}
                        alt="All Current Products"
                        className="" 

                    />
            <img src="https://img.favpng.com/25/13/16/child-north-bromsgrove-high-school-raise-your-kids-without-raising-your-voice-dermatitis-gps-tracking-unit-png-favpng-vsR7uv6WgBev6eKL0NzEBNURi.jpg"
                        style={{width: 200, height: 100}}
                        alt="All Current Products"
                        className="" 

                    />
            
        </div>
        <div className="card w-75 p-3 border-dark m-3 shadow bg-body rounded"> 
            <h1 className="card-title shadow centered"><b>{singleProduct.name}</b></h1>
            <div className="horizGroup">
                <div className="m-3 shadow">
                    <img src= { singleProduct.img_url } 
                        alt="Product Cover"
                        style={{width: 200, height: 250}}
                        />
                </div>
                <div className="w-75">
                    <div className="form-group">
                        <b className="shadow">Description:</b> {singleProduct.description }
                    </div>
                    <div className="form-group list-group-item-text">
                        <b className="shadow">Price:</b> { singleProduct.price }
                    </div>
                    <div className="form-group list-group-item-text text-danger">
                        <b className="shadow">QTY On-Hand:</b> {singleProduct.inventory_qty }
                    </div>
                    <div className="horizGroup">
                        <label className="shadow">Quantity</label>
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
            <div id="messages" className="centered w-100">
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
                                            <b>Message:</b> {review.description}</li>
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
                    <button type="submit" className="btn btn-outline-primary w-25 m-3">Send Message</button>
                </form>
            : null)}                    
            
        </div>
        </div>
    )
}


export default SingleProductView;