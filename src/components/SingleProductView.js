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
    // const [cart, setCart] = useState([]);



    useEffect(() => {
            fetchSingleProduct(productId, setSingleProduct)
    }, [productId, setSingleProduct])
       

  


    //returns a single product card view, displaying that product's details//
    //displays a button to return back to the all products view//
    //displays a button that, when clicked, adds the product to the user's cart//
    //displays a button that, when clicked, displays the user's cart next to the single product view//


    return (
        <div className="singleProductView"> 
        <h3>SINGLE PRODUCT INFO HERE</h3>
            <span className="productName"> {singleProduct.name} </span>
                {/* <ul className="productDetails">
                        <li>{singleProduct.description}</li>
                        <li>{singleProduct.price}</li>
                        <li>{singleProduct.inventoryQuantity}</li>
                </ul> */}

                    <div>
                        <Link to="/AllProducts">
                            <button type="button" id="backToAllProducts">
                                Back to All Products
                            </button>
                        </Link>
                    </div>

                    <div>
                        {/* <button type="submit" id="addToCartButton" onClick={async(event) => {
                            event.preventDefault();
                            try {
                                const result = await handleAddToCart();
                                setCart(result)
                            } catch(error) {
                                console.error(error)
                            };
                        }}> Add to Cart
                        </button> */}
                    </div>

                    <div>
                        {/* <button type="submit" id="viewCartButton" onClick={async(event) => {
                            event.preventDefault();
                            try {
                                const result = await handleViewCart();
                            } catch(error) {
                                console.error(error)
                            };
                        }}> View Cart 
                        </button> */}
                    </div>

        </div>

    )
}


export default SingleProductView;