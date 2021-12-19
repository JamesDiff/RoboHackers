import React from "react";
import { Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import { deleteProductById, getAllProducts } from "../api";





const AdminPage = ({history}) => {

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
                        <Link to="/create" className="btn btn-primary btn-dark btn-lg btn-block centered w-50">CREATE NEW PRODUCT</Link>

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
                                            Description: {product.description }
                                        </div>
                                        <div className="form-group list-group-item-text">
                                            Price: { product.price }
                                        </div>
                                        <div className="form-group list-group-item-text text-danger">
                                            QTY On-Hand: {product.inventory_qty }
                                        </div>
                                        <div className="form-group">
                                            <button 
                                                onClick={async (event) => {
                                                    
                                                try {
                                            
                                                    const response = await deleteProductById(product.id);
                                                    console.log(response)
                                                    fetchAllProducts(products);
                                                    history.push("/products")
                                            
                                                }
                                                catch (err) {
                                                    console.error("trouble deleting product", err)
                                                }
                                                }} 
                                    
                                                type="submit" className="btn btn-primary btn-dark btn-lg btn-block centered w-50">Delete Product</button>
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
                            </div>)
                    })}
                </div>
            </div>)

}



export default AdminPage;