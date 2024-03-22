/* eslint-disable react/prop-types */
import { useState } from "react";
import "./PostList.css";
import ReactPaginate from "react-paginate";
import PostListCard from "./PostListCard";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PaginatedItems({ data }) {
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

  const smallPostItem = itemOffset + 1;
  const itemsPerPage = 9;
  const topitemPerPage = 1;
  const endTopItem = itemOffset + topitemPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(smallPostItem, endOffset);
  const topitem = data.slice(itemOffset, endTopItem);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {topitem.map((item) => (
        <Col sm={12} key={item.id} className="mb-3">
          <Card className="border-0 bg-transparent ">
            <Link className="link-style" to={`/post/${item.title_slug}`}>
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={`https://raceautoindia.com/${item.image_big}`}
                  className="varient-image"
                  style={{
                    aspectRatio: "16/9",
                    objectFit: "fill",
                    borderRadius: 0,
                  }}
                />
              </div>
              <Card.Body>
                <h6 className="mt-3 card-heading-top">{item.title}</h6>

                <p className="card-summary">{item.summary}</p>
                <p className="card-text text-muted small">
                  {formatDate(item.created_at)}
                </p>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
      {currentItems.map((item) => (
        <PostListCard key={item.id} item={item} />
      ))}
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
}

export default PaginatedItems;
