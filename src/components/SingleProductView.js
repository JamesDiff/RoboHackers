import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../api'
// import { // all necessary/relevant API calls // } from //wherever they're stored//

/*As a user, I want to be able to click a product from the all products page 
and get a detailed product page with more information about the product on it.*/

async function fetchSingleProduct(productId, setSingleProduct) {
    try {
        const result = await getProductById(productId, setSingleProduct)
        console.log("SINGLE PRODUCT RESULT", result)
        setSingleProduct(result)
        return result;
    } catch (error) {
        throw error
    }
}


const SingleProductView = ({match}) => {
    const productId = match.params.productId;
    const [singleProduct, setSingleProduct] = useState('');

    useEffect(() => {
            fetchSingleProduct(productId, setSingleProduct)
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
        </div>

    )
}


export default SingleProductView;