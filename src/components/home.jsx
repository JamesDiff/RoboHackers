import React , {useEffect , useState} from "react";
//import { useHistory } from "react-router";
import { getAllProducts } from "../api"
import {Link} from 'react-router-dom';

const Home = () => {
    /*const history = useHistory();*/

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

        return (
            <div className="centered m-3">
                <h1> Welcome to Grace Shopper </h1>
                <h3> A site developed by Team ROBOHACKERS: </h3>
                <h4> Spencer, Derek, Claire, James </h4>
                <> </>
                <Link to="/register"> New to the site? Register </Link>
                <Link to="/login"> Already a user? Login </Link>
                <Link to="/products"> Browse our products </Link>
                <br></br>
                <div className="horizGroupHome">
                {products.map((product, index) => {
                    let href = `products/${product.id}`
                    return (
                        <div key={index} className="card w-60 p-3 border-dark m-3 shadow bg-body rounded centered">
                               
                                    <div className="m-3 shadow">
                                        <a href={href}>
                                        <img src= { product.img_url } alt="Product Cover" style={{width: 175, height: 225}} />
                                        </a>
                                    </div>
                                
                                <br></br>
                            </div>
                    )
                })}
                </div>
            </div>          
        ) 
}

export default Home;