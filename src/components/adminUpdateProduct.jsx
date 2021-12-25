import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductById, updateProduct } from '../api';


async function fetchSingleProduct(productId, setSingleProduct) {
    try {
        const result = await getProductById(productId, setSingleProduct)
        console.log("SINGLE PRODUCT RESULT", result)
        setSingleProduct(result)
        console.log("Result ", result);
        return result;
    } catch (error) {
        throw error
    }
}

const AdminUpdate = ({history, match}) => {

    const productId = match.params.productId;
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newInvQty, setNewInvQty] = useState("");
    const [newImgUrl, setNewImgUrl] = useState("");
    const [singleProduct, setSingleProduct] = useState('');


    useEffect(() => {
        fetchSingleProduct(productId, setSingleProduct)
    }, [productId, setSingleProduct])

    useEffect(() => {
        setNewName(singleProduct.name);
        setNewDescription(singleProduct.description);
        setNewPrice(singleProduct.price);
        setNewInvQty(singleProduct.inventory_qty);
        setNewImgUrl(singleProduct.img_url);
    }, [singleProduct])

    return (
        <div className="form-container">
            <Link to="/admin" className='btn btn-primary btn-danger m-3'>
                            GO BACK
            </Link>
            <br />
            <br />
          <h1 className="form-header">UPDATE PRODUCT</h1>
          <div>
            <form 
                className="centered m-3 w-50" 
                onSubmit={async (event) => {
                event.preventDefault();
                try {
                    await updateProduct(productId, newName, newDescription, newPrice, newInvQty, newImgUrl);
                    
                    history.push("/admin");
                }
                catch (error) {
                    console.error('ERROR with submission for updating the product!!!');
                    throw error;
                }
            }}>

                <div className="form-group w-75">
                    <label>Product Name</label>
                    <br></br>
                    <input
                        type="text"
                        value={newName}
                        className="form-control"
                        placeholder={singleProduct.name}
                        onChange={(event) => setNewName(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-75">
                    <label>Description</label>
                    <br></br>
                    <input
                        type="text"
                        value={newDescription}
                        className="form-control"
                        placeholder={singleProduct.description}
                        onChange={(event) => setNewDescription(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-75">
                    <label>Price</label>
                    <br></br>
                    <input
                        type="text"
                        value={newPrice}
                        className="form-control"
                        placeholder={singleProduct.price}
                        onChange={(event) => setNewPrice(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-75">
                    <label>Quantity In Inventory</label>
                    <br></br>
                    <input
                        type="text"
                        value={newInvQty}
                        className="form-control"
                        placeholder={singleProduct.inventory_qty}
                        onChange={(event) => setNewInvQty(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-75">
                    <label>Image URL</label>
                    <br></br>
                    <input
                        type="text"
                        value={newImgUrl}
                        className="form-control"
                        placeholder={singleProduct.img_url}
                        onChange={(event) => setNewImgUrl(event.target.value)}
                    />
                    <br></br>
                </div>
    
                <button className="btn btn-primary btn-dark btn-lg btn-block centered w-50" 
                        type="submit">
                    Update Product
                </button>
            </form>
          </div>
        </div>
    )
}

export default AdminUpdate;