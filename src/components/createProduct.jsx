import React from 'react';
import { useState } from 'react';
import { createProduct } from '../api';



const CreateForm = ({ history }) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [invQty, setInvQty] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    return (
        <div className="form-container">
          <h1 className="form-header">ADD A PRODUCT</h1>
          <div>
            <form 
                className="centered m-3 w-50" 
                onSubmit={async (event) => {
                event.preventDefault();
                try {
                    await createProduct(name, description, price, invQty, imgUrl);
                    history.push("/products")
                }
                catch (error) {
                    console.error('ERROR with submission for creating a new product!!! 🤦‍♂️');
                    throw error;
                }
            }}>

                <div className="form-group w-75">
                    <label>Product Name</label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Product name..."
                        required
                        onChange={(event) => setName(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-75">
                    <label>Description</label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description..."
                        required
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-75">
                    <label>Price</label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Price..."
                        required
                        onChange={(event) => setPrice(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-75">
                    <label>Quantity In Inventory</label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Inventory quantity..."
                        required
                        onChange={(event) => setInvQty(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-75">
                    <label>Image URL</label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Image URL..."
                        required
                        onChange={(event) => setImgUrl(event.target.value)}
                    />
                    <br></br>
                </div>
    
                <button className="btn btn-primary btn-dark btn-lg btn-block centered w-50" 
                        type="submit">
                    Add Product
                </button>
            </form>
          </div>
        </div>
    )
}




export default CreateForm;