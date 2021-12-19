import React from "react";
import { Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import { getAllProducts } from "../api";





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
                <br />
                <Link to="/create" className="btn btn-primary btn-dark btn-lg btn-block centered w-50">CREATE NEW PRODUCT</Link>
                <br />
                <Link to="/admin/products" className="btn btn-primary btn-dark btn-lg btn-block centered w-50">ALL PRODUCTS</Link>
                <br />
                <Link to="/admin/users" className="btn btn-primary btn-dark btn-lg btn-block centered w-50">ALL USERS</Link>
                
            </div>)

}



export default AdminPage;