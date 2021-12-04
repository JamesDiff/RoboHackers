import React from "react";
import { useState, useEffect } from "react";
import { getAllProducts, getUser } from "../api";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



const AllProducts = ({token, setUser}) => {
    
    const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState([]);
    // const [cartItemCount, setCartItemCount] = useState(1);
    const history = useHistory();

    useEffect(async() => {
        const result = await getAllProducts();
        console.log("ALL PRODUCTS: ", result);
        setProducts(result); 
    }, []);

    useEffect(async() => {
        if(token) {
            const user = await getUser(token, setUser);
            console.log("User is: ", user);
        }
    }, [token]);

    return (<div id="product-box" className="form-group">
                <h1 className="post-title text-center">ALL PRODUCTS</h1>
                <div id="product" className="container">
                    {products.map((product, index) => {
            
                        return (
                            
                            <div key={index} className="containter">
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
                                    <Link to="/reviews/:productId" className="link">
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