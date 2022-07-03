import React from "react";

const Search = ({ searchHandler }) => {
  return <input type="search" name="location" onKeyPress={searchHandler} />;
};

export default Search;