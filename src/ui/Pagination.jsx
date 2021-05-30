import React from "react";
import { Link } from "react-router-dom";

function Pagination(props) {
  const currentPage = props.pagination.currentPage;
  const numberOfPages = props.pagination.numberOfPages;
  return (
    <div className="pagination">
      <Link
        to={{
          pathname: "/",
          search: `?page=${currentPage - 1}`,
        }}
      >
        &#60;&#60; Previous
      </Link>
      <Link
        to={{
          pathname: "/",
          search: `?page=${currentPage + 1}`,
        }}
      >
        Next &#62;&#62;
      </Link>
    </div>
  );
}

export default Pagination;
