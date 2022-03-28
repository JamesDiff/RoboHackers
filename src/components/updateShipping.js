import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";



const UpdateBilling = ({products, setProducts, productId, setPostId, updateMade, setUpdateMade, currentPost, setCurrentPost, headers, setShowUpdate, setUpdateSuccess}) => {  
    const [title, setTitle] = useState(currentPost.title);
    const [description, setDescription] = useState(currentPost.description);
    const [price, setPrice] = useState(currentPost.price);
    const history = useHistory();

    useEffect(() => {
        console.log("update post rendered")

    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/posts/${postId}`, {
            method: "PATCH",
            headers, 
            body: JSON.stringify({
                post: {
                title: title,
                description: description,
                price: price,
                willDeliver: true}
            })
            }); 

            const {data} = await response.json();
            console.log('update data: ', data);
            if(data && data.post.title) {
                // const newPosts = posts.map(post => {
                //     if(post._id === postId) {
                //         return data;
                //     } else {
                //         return post;
                //     }
                //});
                //setPosts(newPosts);
                setUpdateSuccess(true);
                setUpdateMade(updateMade + 1);
                setTitle('');
                setDescription('');
                setShowUpdate(false);
                //setPostId(null);
                // setCurrentPost(data);
                history.push('/');

            }

    }

    return <>
        <h3>Update Post</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <input type="text" placeholder="description" value={description} onChange={(event) => setDescription(event.target.value)} />
            <input type="text" placeholder="price" value={price} onChange={(event) => setPrice(event.target.value)} />
            <button type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
        </>

}

export {UpdatePost};