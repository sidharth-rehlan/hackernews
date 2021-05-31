import React from "react";
import { Link } from "react-router-dom";

function Pagination(props) {
  const currentPage = props.pagination.currentPage;
  const numberOfPages = props.pagination.numberOfPages;
  return (
    <div className="pagination">
      <Link
        className={currentPage === 0 ? "pagination--disable" : null}
        to={{
          pathname: "/",
          search: `?page=${currentPage - 1}`,
        }}
      >
        &#60;&#60; Previous
      </Link>
      <Link
        className={
          currentPage === numberOfPages - 1 ? "pagination--disable" : null
        }
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
