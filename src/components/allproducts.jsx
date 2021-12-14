import React from "react";
import { useState, useEffect } from "react";
import { getAllProducts } from "../api";
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';


// This component renders the All Products page (maps out all the products in the database)
const AllProducts = (props) => {
    const token = props.token;
    const [products, setProducts] = useState([]);
 
    // const [cart, setCart] = useState([]);
    // const [cartItemCount, setCartItemCount] = useState(1);
    // const history = useHistory();

    const fetchAllProducts = async () => {
        try {
            const list = await getAllProducts();
            setProducts(list.data);
        } 
        catch (error) {
            console.error("ERROR fetching all products");
            throw error;
        }
    }



    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (<div id="product-box" className="form-group">
                <h1 className="post-title text-center">ALL PRODUCTS PAGE</h1>
                <div id="product" className="container">
                    {products.map((product, index) => {
            
                        return (
                            
                            <div key={index} className="container">
                                <div className="form-group bg-success list-group-item-text">
                                    Image: { product.img_url }
                                </div>
                                <div className="form-group list-group-item-info">
                                    <Link to="/products/:productId" className="link">
                                        ID: { product.id }
                                    </Link>
                                </div>
                                <div className="form-group list-group-item-info">
                                    Name: { product.name}
                                </div>
                                <div className="form-group bg-success">
                                    Description: {product.description }
                                </div>
                                <div className="form-group bg-success list-group-item-text">
                                    Price: { product.price }
                                </div>
                                <div className="form-group list-group-item-text bg-success text-danger">
                                    QTY On-Hand: {product.inventory_qty }
                                </div>
                                <div>
                                {/* This is a link to take us to the the review page to see an individual product's review page */}
                                    <Link to="/products/:productId/reviews/:reviewId" className="link">
                                        PRODUCT REVIEWS
                                    </Link>
                                </div>
                                {/* <div>
                                    <Link to="/user/:id/cart" className="link">
                                        <button 
                                            onCLick={ () => {
                                                setCartItemCount(cartItemCount + 1);
                                                alert("Item added to your cart 👌");
                                            }}
                                            type="button" id="addcart">
                                        ADD TO CART
                                        </button>
                                    </Link>
                                </div> */}
                                <br></br>
                            </div>)
                    })}
                </div>
            </div>)

}

export default AllProducts;