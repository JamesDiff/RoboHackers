import React from "react";
import { useState, useEffect } from "react";
import { getAllProducts } from "../api";
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

import Search from "./Search";


// This component renders the All Products page (maps out all the products in the database)
const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    

    const fetchAllProducts = async () => {
        try {
            const list = await getAllProducts();
            setProducts(list.data);
            setFilteredResults(list.data);
        }
        catch (error) {
            console.error("ERROR fetching all products");
            throw error;
        }
    }



    useEffect(() => {
        fetchAllProducts();
    }, []);

    return (
        <>
        {<Search products={products} filteredResults={filteredResults} setFilteredResults={setFilteredResults}/>}
     
        <div id="product-box" className="form-group centered w-100">

        {/* <div className="centered">
            <h1 className="font-lora text-danger shadow-lg w-50 centered">
                <b>ALL PRODUCTS</b>
            </h1>
        </div> */}
        
        <Row id="product" >
            {filteredResults.map((product, index) => {
            let href = `/products/${product.id}`

            
                return (

                    <div key={index} className="card p-3 border-dark m-3 shadow bg-body rounded col-sm-12 col-md-6 col-lg-4 col-xl-3 product-card">
                               
                                    <div className="m-3">
                                        <Link to={href}>  
                                        <img src= { product.img_url } alt="Product Cover" style={{width: 170, height: 220}} />
                                        </Link>
                                        
                                    </div>
                                    <div className="form-group list-group-item-text">
                                        <b className="">Price:</b> { product.price }
                                    </div>
                                    <div className="form-group list-group-item-text text-danger">
                                        <b className="">QTY On-Hand:</b> {product.inventory_qty > 0 ? product.inventory_qty : "Sold Out"}
                                    </div>
                                <br></br>
                    </div>
                    
                    
                        // <Col sm={12} md={6} lg={4} xl={3}>
                        // <div className="m-3 shadow">
                        //    <Link to={"/products/" + product.id}> 
                        //     <Card >
                        //         <Card.Body>
                        //             <Card.Title>{ product.name}</Card.Title>
                        //             <div > {/* className="d-flex align-items-center" look up bootstrap flex box classes, bootstrap margin, bootstrap padding, etc whatever style */}
                        //                 <Card.Img variant="center" src={product.img_url} style={{width: 175, height: 225}}/>

                        //                 {/* <Card.Text>
                        //                     {product.description}
                        //                 </Card.Text> */}
                        //             </div>
                        //             <Card.Text>
                        //                 Price: {product.price} 
                        //             </Card.Text>
                        //             <Card.Text>
                        //                 Qty in stock: {product.inventory_qty}
                        //             </Card.Text>
                        //             {/* <Button variant="primary">Go somewhere</Button> */}
                        //         </Card.Body>
                        //     </Card>
                        //     </Link>
                        //     </div>
                        // </Col>


                    
                    // <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded centered">
                    //     <div className="form-group list-group-item card-title centered shadow">
                    //         <h3 className="card card-title border-dark p-3 rounded shadow w-75 centered">
                    //             <Link to={"/products/" + product.id} className="link font-bangers">
                    //                 <h1><b>{ product.name}</b></h1> 
                    //             </Link>
                    //         </h3>
                    //     </div>
                    //     <div className="horizGroup">
                    //         <div className="m-3 shadow">
                    //             <img src= { product.img_url } alt="Product Cover" style={{width: 175, height: 225}} />
                    //         </div>
                    //         <div className="w-75">
                    //             <div className="form-group">
                    //                 <b className="">Description:</b> {product.description }
                    //             </div>
                    //             <div className="form-group list-group-item-text">
                    //                 <b className="">Price:</b> { product.price }
                    //             </div>
                    //             <div className="form-group list-group-item-text text-danger">
                    //                 <b className="">QTY On-Hand:</b> {product.inventory_qty }
                    //             </div>
                    //         </div>
                    //     </div>
                    //     <br></br>
                    // </div>

                )
            })}
        </Row>
    </div>
      </>
    )
}

export default AllProducts;