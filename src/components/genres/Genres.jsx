import React from "react";
import "./style.scss";

const Genres = ({ genre_ids }) => {
  return (
    <div className="genreIds">
      {genre_ids?.map((id) => (
        <div className="genreId" key={id}>
          {id}
        </div>
      ))}
    </div>
  );
};

export default Genres;
