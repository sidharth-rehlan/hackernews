import React from "react";

function Pagination(props) {
  const currentPage = props.pagination.currentPage;
  const numberOfPages = props.pagination.numberOfPages;
  return (
    <div>
      <a href="#" disabled={currentPage == 0}>
        {"<<Previous"}
      </a>
      <a href="#" disabled={currentPage == numberOfPages}>
        {"Next>>"}
      </a>
    </div>
  );
}

export default Pagination;
