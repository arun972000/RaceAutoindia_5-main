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
} from "react-bootstrap";
import PaginatedArticle from "./Pagination_Article";
import { FaFilter, FaSave } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";

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

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const userApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/admin-postList`);
      const user = [];
      const encounteredUsernames = {};

      for (let i = 0; i < res.data.length; i++) {
        const username = res.data[i].username;

        if (!encounteredUsernames[username]) {
          encounteredUsernames[username] = true;

          user.push(res.data[i].username);
        }
      }

      setUsers(user);
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

  const applyFilters = async () => {
    try {
      const res = await axios.get(`${Url}api/post/admin-postList`);
      const value = res.data;

      const filtered = value.filter((item) => {
        if (
          selectedCategory !== "none" &&
          selectedCategory &&
          item.main_category_slug !== selectedCategory
        ) {
          return false;
        }

        if (
          selectedSubCategory &&
          selectedSubCategory !== "none" &&
          item.name_slug !== selectedSubCategory
        ) {
          return false;
        }

        if (
          selectedUsers !== "none" &&
          selectedUsers &&
          item.username !== selectedUsers
        ) {
          return false;
        }

        return true;
      });

      return filtered;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handlePostType = async () => {
    if (selectedPostType === "none") {
      try {
        const res = await axios.get(`${Url}api/post/admin-postList`);
        setData(res.data);
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
      const filteredData = await applyFilters();
      setData(filteredData);
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
      const res=await axios.put(`${Url}api/post/sliderEdit`, {
        slider_type: selectedOption,
      });
      console.log(res)

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
      const res = await axios.get(`${Url}api/post/admin-postList`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  

  useEffect(() => {
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
                {/* Assume selectedUsers is an array of user IDs */}
                <FormControl
                  as="select"
                  value={selectedUsers}
                  onChange={(e) => setSelectedUsers(e.target.value)}
                >
                  <option value={"none"}>None</option>
                  {users.map((item) => (
                    <option value={item} key={item}>
                      {item}
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
                  <option value="none">None</option>
                  {mainCategory_array.map((item) => (
                    <option key={item.id} value={item.name_slug}>
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
                  <option value={"none"}>None</option>

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

        <PaginatedArticle data={data} itemsPerPage={selectedTitleCount} />
      </div>
    </>
  );
};

export default ArticleList;
