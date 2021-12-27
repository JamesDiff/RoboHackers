import React from 'react';
import { useState } from 'react';
import { createProduct } from '../api';
import { Link } from 'react-router-dom';



const CreateForm = ({ history }) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [invQty, setInvQty] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    return (
        <div className="form-group w-100">
            <br />
                <Link to="/admin" className='btn btn-primary btn-danger m-3 shadow'>
                    GO BACK
                </Link>
            {/* <br /> */}
            <div className='form-group centered'>
                <div className="d-flex justify-content-between p-3 w-100">
                    <img src="https://www.quitmanlibrary.org/NEW.png/@@images/image.png"
                        style={{width: 150, height: 150}}
                        alt="New Product" />
                    <img src="https://www.kindpng.com/picc/m/210-2101790_video-clapper-png-clapper-with-white-background-transparent.png"
                        style={{width: 100, height: 100}}
                        alt="New Product" />
                    <img src="https://www.newswire.com/blog/wp-content/uploads/2018/03/newproduct.png"
                        style={{width: 800, height: 300}}
                        alt="New Product"
                        className='text-danger shadow-lg p-3 mb-5 bg-white rounded' />
                    <img src="https://www.kindpng.com/picc/m/210-2101790_video-clapper-png-clapper-with-white-background-transparent.png"
                        style={{width: 100, height: 100}}
                        alt="New Product" />
                    <img src="https://previews.123rf.com/images/captainvector/captainvector1512/captainvector151203567/49752222-product-development.jpg"
                        style={{width: 150, height: 150}}
                        alt="New Product" />
                </div>
            </div>
            
          <div>
            <form 
                className="centered m-3 w-100" 
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

                <div className="form-group w-50">
                    <label className='shadow'><b>Product Name</b></label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control shadow"
                        placeholder="Product name..."
                        required
                        onChange={(event) => setName(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label className='shadow'><b>Description</b></label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control shadow"
                        placeholder="Description..."
                        required
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label className='shadow'><b>Price</b></label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control shadow"
                        placeholder="Price..."
                        required
                        onChange={(event) => setPrice(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label className='shadow'><b>Quantity In Inventory</b></label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control shadow"
                        placeholder="Inventory quantity..."
                        required
                        onChange={(event) => setInvQty(event.target.value)}
                    />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label className='shadow'><b>Image URL</b></label>
                    <br></br>
                    <input
                        type="text"
                        className="form-control shadow"
                        placeholder="Image URL..."
                        required
                        onChange={(event) => setImgUrl(event.target.value)}
                    />
                    <br></br>
                </div>
    
                <button className="btn btn-primary btn-lg btn-block centered w-25 shadow" 
                        type="submit">
                    Add Product
                </button>
            </form>
          </div>
        </div>
    )
}




export default CreateForm;