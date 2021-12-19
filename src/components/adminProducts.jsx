import React from "react";
import { Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import { getAllProducts, deleteProductById } from "../api";

const AdminProducts = ({ history }) => {

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

    return (<div id="product-box" className="form-group centered w-75">
                <div id="product" className="container">
                    {products.map((product, index) => {
            
                        return (
                            
                            <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                <div className="form-group list-group-item-info card-title centered">
                                    <h3 className="card-title">
                                        <Link to={"/products/" + product.id} className="link">
                                            { product.name} 
                                        </Link>
                                    </h3>
                                </div>
                                <div className="horizGroup">
                                    <div className="m-3">
                                        <img src= { product.img_url } alt="Product Cover"/>
                                    </div>
                                    <div className="w-75">
                                        <div className="form-group">
                                            <b>Description:</b> {product.description }
                                        </div>
                                        <div className="form-group list-group-item-text">
                                            <b>Price:</b> { product.price }
                                        </div>
                                        <div className="form-group list-group-item-text text-danger">
                                            <b>QTY On-Hand:</b> {product.inventory_qty }
                                        </div>
                                        <div className="form-group">
                                            <button 
                                                onClick={async (event) => {
                                                    
                                                try {
                                            
                                                    const response = await deleteProductById(product.id);
                                                    console.log(response)
                                                    fetchAllProducts(products);
                                                    history.push("/admin/products")
                                            
                                                }
                                                catch (err) {
                                                    console.error("trouble deleting product", err)
                                                }
                                                }} 
                                    
                                                type="submit" className="btn btn-primary btn-danger m-3">Delete Product</button>
                                        </div>
                                    </div>
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
                            </div>
                        )
                    })}
                </div>
            </div>)

}

export default AdminProducts;