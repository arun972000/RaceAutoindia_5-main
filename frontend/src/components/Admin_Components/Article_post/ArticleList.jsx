/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import axios from "axios";
import { Url } from "../../../url";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Pagination,
} from "react-bootstrap";

import { FaFilter, FaSave } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdCreateNewFolder, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

const ArticleList = () => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [selectedTitleCount, setSelectedTitleCount] = useState(15);
  const [selectedUsers, setSelectedUsers] = useState("none");
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedPostType, setSelectedPostType] = useState("");
  const [mainCategory_array, setMainCategory_array] = useState([]);
  const [subCategory_array, setSubCategory_array] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginationApi = async () => {
    try {
      const res = await axios.get(
        `${Url}api/post/admin-post?username=${selectedUsers}&mainCategory=${selectedCategory}&subCategory=${selectedSubCategory}&offset=${currentPage}`
      );
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

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

  const userApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/post-user`);

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalPageApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/admin-post`);
      setTotalItems(res.data.totalPost);
    } catch (err) {
      console.log(err);
    }
  };

  const MainCategoryApi = async () => {
    try {
      const res = await axios.get(`${Url}api/category/categoryList`);
      setMainCategory_array(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const subCategoryApi = async () => {
    try {
      const res = await axios.get(
        `${Url}api/category/main_sub/${selectedCategory}`
      );
      setSubCategory_array(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const subCategoryValue = () => {
    if (selectedCategory === "none") {
      setSelectedSubCategory("none");
    }
  };

  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handlePostType = async () => {
    if (selectedPostType === "none") {
      try {
        const res = await axios.get(
          `${Url}api/post/admin-post?username=${selectedUsers}&mainCategory=${selectedCategory}&subCategory=${selectedSubCategory}&offset=${currentPage}`
        );
        setData(res.data.data);
        setTotalItems(res.data.totalPost);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.get(
          `${Url}api/post/is_available/${selectedPostType}`
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleApplyFilter = async () => {
    try {
      const res = await axios.get(
        `${Url}api/post/admin-post?username=${selectedUsers}&mainCategory=${selectedCategory}&subCategory=${selectedSubCategory}&offset=${currentPage}`
      );
      setData(res.data.data);
      
      setTotalItems(res.data.totalPost);
      handleClose();
      subCategoryValue();
    } catch (err) {
      console.log(err);
    }
  };

  const sliderApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/sliderView`);
      setSelectedOption(res.data[0].slider_type);
    } catch (err) {
      console.log(err);
    }
  };

  const SliderChangeApi = async () => {
    try {
      const res = await axios.put(`${Url}api/post/sliderEdit`, {
        slider_type: selectedOption,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const SliderChange = () => {
    SliderChangeApi();
    setSelectedPostType("none");
  };

  const allPostApi = async () => {
    try {
      const res = await axios.get(
        `${Url}api/post/admin-post?offset=${currentPage}`
      );
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    paginationApi();
  }, [currentPage]);

  useEffect(() => {
    totalPageApi();
    userApi();
    sliderApi();
    allPostApi();
    MainCategoryApi();
    subCategoryApi();
  }, [selectedCategory, selectedUsers]);

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center my-3">
          <div style={{ width: 80 }}>
            <Button variant="primary" onClick={handleOpen}>
              <FaFilter />
            </Button>
          </div>
          {selectedPostType == "is_slider" && (
            <div className="d-flex">
              <h6>Slider Type</h6>
              <Form.Check
                type="radio"
                label="Option 1"
                name="options"
                id="option1"
                value={1}
                className="mx-2"
                checked={selectedOption == 1}
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="Option 2"
                name="options"
                id="option2"
                value={2}
                className="mx-2"
                checked={selectedOption == 2}
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="Option 3"
                name="options"
                id="option3"
                value={3}
                className="mx-2"
                checked={selectedOption == 3}
                onChange={handleOptionChange}
              />
              <Button variant="primary" onClick={SliderChange}>
                <FaSave />
              </Button>
            </div>
          )}
          <div className="d-flex align-items-center">
            <FormGroup>
              <FormControl
                as="select"
                value={selectedPostType}
                onChange={(e) => setSelectedPostType(e.target.value)}
              >
                <option value={"none"}>None</option>
                <option value={"is_featured"}>Featured</option>
                <option value={"is_slider"}>Slider</option>
                <option value={"is_breaking"}>Breaking</option>
              </FormControl>
            </FormGroup>
            <Button variant="primary" className="ms-3" onClick={handlePostType}>
              <BiCategory />
            </Button>
          </div>
          <div>
            <Link to="/admin/article">
              <Button variant="primary">
                <MdCreateNewFolder />
              </Button>
            </Link>
          </div>
        </div>
        <Modal show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Filter Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <FormLabel>Show</FormLabel>
                <FormControl
                  as="select"
                  value={selectedTitleCount}
                  onChange={(e) =>
                    setSelectedTitleCount(parseInt(e.target.value))
                  }
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={60}>60</option>
                  <option value={100}>100</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Users</FormLabel>
                <FormControl
                  as="select"
                  value={selectedUsers}
                  onChange={(e) => setSelectedUsers(e.target.value)}
                >
                  <option value={""}>None</option>
                  {users.map((item) => (
                    <option value={item.username} key={item.username}>
                      {item.username}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Category</FormLabel>
                <FormControl
                  as="select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">None</option>
                  {mainCategory_array.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Sub Category</FormLabel>
                <FormControl
                  as="select"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                >
                  <option value={""}>None</option>

                  {subCategory_array.map((item) => (
                    <option key={item.id} value={item.name_slug}>
                      {item.name}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </Modal.Footer>
        </Modal>
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
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={`https://raceautoindia.com/${item.image_small}`}
                      className="image-fluid"
                      style={{ width: 80 }}
                      alt={item.id}
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

        {(selectedPostType == "" || selectedPostType == "none") && (
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
            />
            {pageNumbers.map((page) => {
              if (totalPages > 5 && Math.abs(page - currentPage) > 2) {
                return null;
              }

              return (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
            />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
        )}
      </div>
    </>
  );
};

export default ArticleList;
