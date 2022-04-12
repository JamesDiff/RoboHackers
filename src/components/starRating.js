import React, {useEffect, useState} from "react";


const StarRating = ({newReviewStars, setNewReviewStars, hover, setHover}) => {

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || newReviewStars) ? "on" : "off"}
            onClick={() => setNewReviewStars(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(newReviewStars)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export {StarRating};