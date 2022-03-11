import React, {useState} from "react";

//const [posts, setPosts] = useState([]);
//const [searchTerm, setSearchTerm] = useState('');


export default ({setFilteredResults, posts}) => {
    const [searchTerm, setSearchTerm] = useState("");

    function filterPosts(posts, searchTerm){
        searchTerm = searchTerm.toLowerCase();
        return posts.filter((post, index) => {
            const myPostTitle = post.title.toLowerCase();
            return myPostTitle.includes(searchTerm);

        })
    }

    return (
        <div>
            <h4>Search</h4>
            <input value={searchTerm} onChange={(event) => {setSearchTerm(event.target.value); const myFilteredPosts = filterPosts(posts, event.target.value); setFilteredResults(myFilteredPosts)}} placeholder="search" />
        </div>
    );
};