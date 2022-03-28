import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";



const UpdateBilling = () => {  //need to get token; should it be passed in?
    const [name, setName] = useState(""); //currentPost.title
    const [email, setEmail] = useState(""); //currentPost.description
    const [address, setAddress] = useState(""); //currentPost.price
    const [updateMade, setUpdateMade] = useState(0);
    const history = useHistory();

    useEffect(() => {
        console.log("update post rendered")

    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(``, {
           
            }); 

            const {data} = await response.json();
            console.log('update data: ', data);
            if(data && data.billing.title) { //where is billing info?
                

                setUpdateMade(updateMade + 1);
                setName('');
                setEmail('');
                // setShowUpdate(false);
                //setPostId(null);
                // setCurrentPost(data);
                history.push('/');

            }

    }

    return <>
        <h3>Update Billing</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
            <input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="text" placeholder="address" value={address} onChange={(event) => setAddress(event.target.value)} />
            <button type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
        </>

}

export {UpdateBilling};