import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../api'
// import { // all necessary/relevant API calls // } from //wherever they're stored//

/*As a user, I want to be able to click a product from the all products page 
and get a detailed product page with more information about the product on it.*/



/*PRODUCTS Must have name, description, price, and inventory quantity*/

const SingleProductView = ({productId}) => {

    const [product, setProduct] = useState([]);
    // const [cart, setCart] = useState([]);


    useEffect(async () => {
        const result = await getProductById(productId);
        console.log("Product is: ", result);
        setProduct(result);
    }, [productId])


    //returns a single product card view, displaying that product's details//
    //displays a button to return back to the all products view//
    //displays a button that, when clicked, adds the product to the user's cart//
    //displays a button that, when clicked, displays the user's cart next to the single product view//


    return (
        <div className="singleProductView"> 
            <span className="productName"> {product.name} </span>
                <ul className="productDetails">
                        <li>{product.description}</li>
                        <li>{product.price}</li>
                        <li>{product.inventoryQuantity}</li>
                </ul>

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