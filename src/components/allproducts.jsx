import React from "react";
import { useState, useEffect } from "react";
import { getAllProducts } from "../api";
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';


// This component renders the All Products page (maps out all the products in the database)
const AllProducts = ({ history }) => {
    // const token = props.token;
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

    return (<div id="product-box" className="form-group centered w-100">
                <br />
                <div className="d-flex justify-content-between p-3 w-100">
                
                    <img src="https://kickstartendurance.files.wordpress.com/2013/05/order-now-go-shopping-shop-online-now-button.png"
                        style={{width: 400, height: 150}}
                        alt="All Current Products"
                        className="" 

                    />
                    <img src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX24748048.jpg"
                        style={{width: 200, height: 150}}
                        alt="All Current Products"
                        className="" 

                    />
                    <img src="https://live.staticflickr.com/6130/6021227717_cb4b0c19a7.jpg"
                        style={{width: 400, height: 250}}
                        alt="All Current Products"
                        className="" 

                    />
                    <img src="https://png.pngtree.com/element_our/png/20181227/movie-icon-which-is-designed-for-all-application-purpose-new-png_287896.jpg"
                        style={{width: 200, height: 150}}
                        alt="All Current Products"
                        className="" 

                    />
                    <img src="https://img.favpng.com/25/13/16/child-north-bromsgrove-high-school-raise-your-kids-without-raising-your-voice-dermatitis-gps-tracking-unit-png-favpng-vsR7uv6WgBev6eKL0NzEBNURi.jpg"
                        style={{width: 400, height: 150}}
                        alt="All Current Products"
                        className="" 

                    />
                </div>
                <br />
                <div id="product" className="container centered">
                    {products.map((product, index) => {
            
                        return (
                            
                            <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded centered">
                                <div className="form-group list-group-item card-title centered shadow">
                                    <h3 className="card-title">
                                        <Link to={"/products/" + product.id} className="link shadow">
                                            <b>{ product.name}</b> 
                                        </Link>
                                    </h3>
                                </div>
                                <div className="horizGroup">
                                    <div className="m-3 shadow">
                                        <img src= { product.img_url } alt="Product Cover"/>
                                    </div>
                                    <div className="w-75">
                                        <div className="form-group">
                                            <b className="shadow">Description:</b> {product.description }
                                        </div>
                                        <div className="form-group list-group-item-text">
                                            <b className="shadow">Price:</b> { product.price }
                                        </div>
                                        <div className="form-group list-group-item-text text-danger">
                                            <b className="shadow">QTY On-Hand:</b> {product.inventory_qty }
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                            </div>)
                    })}
                </div>
            </div>)

}

export default AllProducts;