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
import { FaFilter } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

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

  const applyFilters = () => {
    const filtered = data.filter((item) => {
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
      let filtered = data.filter((item) => {
        if (selectedPostType === "breaking") {
          return item.is_breaking === 1;
        } else if (selectedPostType === "featured") {
          return item.is_featured === 1;
        } else if (selectedPostType === "slider") {
          return item.is_slider === 1;
        }
      });
      setData(filtered);
    }
  };

  const handleApplyFilter = () => {
    const filteredData = applyFilters();
    setData(filteredData);
    handleClose();
    subCategoryValue();
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
    allPostApi();
    MainCategoryApi();
    subCategoryApi();
  }, [selectedCategory, selectedUsers]);

  return (
    <>
      <div className="container-fluid">
        <div style={{ width: 80 }} className="my-3">
          <Button variant="primary" onClick={handleOpen}>
            <FaFilter />
          </Button>
          <Button variant="primary" onClick={handlePostType}>
            <BiCategory />
          </Button>
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
        <FormGroup>
          <FormLabel>Show</FormLabel>
          <FormControl
            as="select"
            value={selectedPostType}
            onChange={(e) => setSelectedPostType(e.target.value)}
          >
            <option value={"none"}>None</option>
            <option value={"featured"}>Featured</option>
            <option value={"slider"}>Slider</option>
            <option value={"breaking"}>Breaking</option>
          </FormControl>
        </FormGroup>
        <PaginatedArticle data={data} itemsPerPage={selectedTitleCount} />
      </div>
    </>
  );
};

export default ArticleList;
