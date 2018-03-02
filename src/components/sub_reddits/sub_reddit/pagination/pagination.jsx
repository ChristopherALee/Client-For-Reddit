import React from "react";

const Pagination = props => {
  const currentPage = props.page;

  return <p className="page-number">{currentPage}/10</p>;
};

export default Pagination;
