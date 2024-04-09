/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Url } from "../../../../url";
import { useParams } from "react-router-dom";

const Edit_subCategory = () => {
  const { id } = useParams();

  const [categoryName, setCategoryName] = useState("");

  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [showOnMenu, setShowOnMenu] = useState(false);
  const [showOnhomepage, setShowOnhomepage] = useState(false);
  const [main_category, setCategory_main] = useState("");
  const [mainCategory_array, setMainCategory_array] = useState([]);

  const formDataApi = async () => {
    try {
      const res = await axios.get(`${Url}api/category/single/${id}`);
      setCategoryName(res.data[0].name);
      setDescription(res.data[0].description);
      setKeywords(res.data[0].keywords);
      setShowOnMenu(res.data[0].show_on_menu === 1);
      setShowOnhomepage(res.data[0].show_at_homepage === 1)
    } catch (err) {
      console.log(err);
    }
  };

  const EditApi = async () => {
    try {
      await axios.put(`${Url}api/category/edit-sub/${id}`, {
        categoryName,
        description,
        keywords,
        show_on_menu: showOnMenu ? 1 : 0,
show_at_homepage: showOnhomepage ? 1 :0,
        parent_id: main_category,
      });
      
    } catch (err) {
      console.log(err);
    }
  };


  const Main_CategoryApi = async () => {
    try {
      const res = await axios.get(`${Url}api/category/categoryList`);
      setMainCategory_array(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    formDataApi();
    Main_CategoryApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    EditApi();
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="shadow-sm p-3 mb-5  mt-5 bg-white rounded border-0">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="slug" className="form-label">
                Slug
              </label>
              <input
                type="text"
                className="form-control"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="keywords" className="form-label">
                Keywords
              </label>
              <input
                type="text"
                className="form-control"
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showOnMenu"
                checked={showOnMenu}
                onChange={(e) => setShowOnMenu(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="showOnMenu">
                Show on Menu
              </label>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showOnhomepage"
                checked={showOnhomepage}
                onChange={(e) => setShowOnhomepage(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="showOnhomepage">
                Show on Homepage
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="mainCategory" className="form-label">
                Main Category
              </label>
              <select
                className="form-select"
                id="mainCategory"
                value={main_category}
                onChange={(e) => setCategory_main(e.target.value)}
              >
                <option value="">Select Main Category</option>
                {mainCategory_array.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit_subCategory;
