/* eslint-disable react/prop-types */

import { useState } from "react";
import { Table } from "react-bootstrap";

import ReactPaginate from "react-paginate";
import { Url } from "../../../url";
import axios from "axios";
import { Link } from "react-router-dom";

function PaginatedArticle({ itemsPerPage, data }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  // const dropdownApi = async (id) => {
  //   try {
  //     const res = await axios.put(`${Url}api/post/update_is_available/${id}`, {
  //       is_slider: slider,
  //       is_breaking: breaking,
  //       is_featured: featured,
  //     });
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Pageviews</th>
            <th>Posted Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={`https://raceautoindia.com/${item.image_small}`}
                    className="image-fluid"
                    alt={item.title}
                  ></img>
                  <h6 className="ms-3">{item.title}</h6>
                </div>
              </td>
              <td>
                <p
                  className="text-center"
                  style={{
                    fontSize: 12,
                    color: "white",
                    backgroundColor: item.color,
                    borderRadius: 5,
                  }}
                >
                  {item.main_category}
                </p>
                <p
                  className="text-center"
                  style={{
                    fontSize: 12,
                    color: "white",
                    backgroundColor: item.color,
                    borderRadius: 5,
                  }}
                >
                  {item.sub_category}
                </p>
              </td>
              <td>{item.username}</td>
              <td>{item.pageviews}</td>
              <td>{item.created_at}</td>
              <td>
                <Link to={`/admin/edit-post/${item.id}`}>
                  <button type="button" className="btn btn-info">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
    </>
  );
}

export default PaginatedArticle;
