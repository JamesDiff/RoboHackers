import React, {useState} from "react";

//const [posts, setPosts] = useState([]);
//const [searchTerm, setSearchTerm] = useState('');


export default ({setFilteredResults, products}) => {
    const [searchTerm, setSearchTerm] = useState("");

    function filterProducts(products, searchTerm){
        searchTerm = searchTerm.toLowerCase();
        return products.filter((product, index) => {
            const myProductName = product.name.toLowerCase();
            return myProductName.includes(searchTerm);

        })
    }

    return (
        <div className="SearchComponent">
            <h4>Search</h4>
            <input value={searchTerm} onChange={(event) => {setSearchTerm(event.target.value); const myFilteredProducts = filterProducts(products, event.target.value); setFilteredResults(myFilteredProducts)}} placeholder="search" />
        </div>
    );
};