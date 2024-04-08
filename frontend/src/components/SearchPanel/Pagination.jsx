/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Pagination = ({ data }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="items">
        {currentItems.map((item) => (
          <div className="col-12 mt-3" key={item.id}>
             <Link className="link-style" to={`/post/${item.title_slug}`}>
            <div className="row">
              <div className="col-md-4">
                <img
                  src={`http://raceautoindia.com/${item.image_big}`}
                  className="img-fluid search-image"
                  alt="Responsive image"
                />
              </div>
              <div className="col-md-8">
                <h4>{item.title}</h4>
                <p>{formatDate(item.created_at)}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-5" style={{ zIndex: 0 }}>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
};

export default Pagination;
