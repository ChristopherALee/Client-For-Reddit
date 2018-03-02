import React from "react";

const Pagination = props => {
  const currentPage = props.page;

  return <p>{currentPage}/10</p>;
};

export default Pagination;
