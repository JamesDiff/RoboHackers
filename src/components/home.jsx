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
                {/* <h2> Welcome to DVDungeon </h2>
                <h4> A site developed by Team ROBOHACKERS: </h4>
                <h5> Spencer, Derek, Claire, James </h5>
                <> </> */}
                <Link to="/register"> New to the site? Register </Link>
                <Link to="/login"> Already a user? Login </Link>
                <Link to="/products"> Browse our products </Link>
                <br></br>
                <div className="d-flex row w-90 justify-content-center">
                {products.map((product, index) => {
                    let href = `/products/${product.id}`
                    return (
                        <div key={index} className="card p-3 border-dark m-3 shadow bg-body rounded col-sm-12 col-md-6 col-lg-4 col-xl-3 product-card">
                               
                                    <div className="m-3">
                                        <Link to={href}>  
                                        <img src= { product.img_url } alt="Product Cover" style={{width: 175, height: 225}} />
                                        </Link>
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