/* eslint-disable react/prop-types */

import { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./Article.css";
import { MdModeEdit } from "react-icons/md";

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
      <MDBTable align="middle" responsive className="text-center">
        <MDBTableHead>
          <tr>
            <th>ID</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Pageviews</th>
            <th>Posted Date</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={`https://raceautoindia.com/${item.image_small}`}
                    className="image-fluid"
                    style={{ width: 80 }}
                    alt={item.title}
                  ></img>
                  <p className="ms-3 text-small p-0 m-0">{item.title}</p>
                </div>
              </td>
              <td>
                <div className="d-flex table-badge flex-column">
                  <p
                    className="text-small px-2 mb-3"
                    style={{
                      backgroundColor: item.color,
                      borderRadius: 25,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {item.main_category}
                  </p>
                  <p
                    className="text-small px-2 "
                    style={{
                      backgroundColor: item.color,
                      borderRadius: 25,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {item.sub_category}
                  </p>
                </div>
              </td>
              <td>{item.username}</td>
              <td>{item.pageviews}</td>
              <td>{formatDate(item.created_at)}</td>
              <td>
                <Link to={`/admin/edit-post/${item.id}`}>
                  <button className="btn btn-primary me-3">
                    <MdModeEdit size={20} />
                  </button>
                </Link>

              </td>
              
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <div className="d-flex justify-content-center">
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

export default PaginatedArticle;
