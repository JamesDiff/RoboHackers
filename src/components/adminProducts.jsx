import React from "react";
import { Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import { getAllProducts, deleteProductById } from "../api";

const AdminProducts = ({ history }) => {

    const [products, setProducts] = useState([]);

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

    return (<div id="product-box" className="form-group w-100">
                <br />
                <Link to="/admin" className='btn btn-primary btn-danger m-3 shadow'>
                    GO BACK
                </Link>
                <br />
                <div className='d-flex justify-content-between p-3 w-100'>
                    <div className="centered">
                        <img src="http://cdn.shopify.com/s/files/1/2478/5296/collections/Our_Products02_Vector.png?v=1615111024"
                            style={{width: 600, height: 100}}
                            alt="All Products"
                            className="" />
                    </div>
                </div>
                <br />
                <div id="product" className="container centered">
                    {products.map((product, index) => {
            
                        return (
                            
                            <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                <div className="form-group list-group-item card-title centered shadow">
                                    <h3 className="card-title">
                                        <b>{ product.name}</b> 
                                    </h3>
                                </div>
                                <div className="horizGroup">
                                    <div className="m-3 shadow">
                                        <img src= { product.img_url } alt="Product Cover" />
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
                                        <div className="horizGroup">
                                            <button 
                                                onClick={async (event) => {
                                                    
                                                try {
                                            
                                                    const response = await deleteProductById(product.id);
                                                    console.log(response)
                                                    history.push("/admin/products")
                                            
                                                }
                                                catch (err) {
                                                    console.error("trouble deleting product", err)
                                                }
                                                }} 
                                    
                                                type="submit" className="btn btn-primary btn-danger m-3 shadow">Delete Product</button>
                                                <Link className="btn btn-primary shadow" to={"/update/" + product.id}>UPDATE</Link>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                            </div>
                        )
                    })}
                </div>
            </div>)

}

export default AdminProducts;