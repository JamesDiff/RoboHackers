import React from "react";
import { useState, useEffect } from "react";
import { getAllProducts } from "../api";


const AllProducts = (props) => {
    const token = props.token;
    const [products, setProducts] = useState([]);

    useEffect(async() => {
        const result = await getAllProducts(token);
        setProducts(result); 
    }, []);

    return (<div id="product-box" className="form-group">
                <h1 className="post-title text-center">ALL PRODUCTS</h1>
                <div id="product" className="container">
                    {products.map((product, index) => {
            
                        return (
                            <div key={index} className="containter">
                                <div className="form-group bg-success list-group-item-text">
                                    Image: { product.img_url }
                                </div>
                                <h2 className="list-group-item-heading">
                                    ID: { product.id }
                                </h2>
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
                                <br></br>
                            </div>)
                    })}
                </div>
            </div>)

}

export default AllProducts;