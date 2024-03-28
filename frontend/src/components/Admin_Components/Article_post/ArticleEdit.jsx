/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useMemo, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FaFileImage } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Url } from "../../../url";
import { useParams } from "react-router-dom";
import EditorToolbar, { formats, modules } from "./TextEditor/Toolbar";
// import , { modules, formats } from "./EditorToolbar";
const ArticleEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isBreaking: "",
    isFeatured: "",
    isSlider: "",
    summary: "",
    category_main: "",
    category_sub: "",
    keywords: "",
    image_default: "",
  });
  const [isFileSelected, setIsFileSelected] = useState(false);

  const [category_main, setCategory_main] = useState("");
  const [category_sub, setCategory_sub] = useState(formData.category_sub);

  const [image_default, setImage_default] = useState(null);
  const [mainCategory_array, setMainCategory_array] = useState([]);
  const [subCategory_array, setSubCategory_array] = useState([]);

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const onDrop = useCallback((acceptedFiles) => {
    setImage_default(acceptedFiles[0]);
    setFormData.image_default(true);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const formDetailApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/single/${id}`);

      setFormData({
        ...formData,
        title: res.data[0].title,
        content: res.data[0].content,
        summary: res.data[0].summary,
        isBreaking: res.data[0].is_breaking,
        isFeatured: res.data[0].is_featured,
        isSlider: res.data[0].is_slider,
        image_default: res.data[0].image_mid,
        category_main: res.data[0].main_category_slug,
        category_sub: res.data[0].sub_category,
        keywords: res.data[0].keywords,
      });
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
        `${Url}api/category/main_sub/${formData.category_main}`
      );
      setSubCategory_array(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? 1 : 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.content ||
      !formData.summary ||
      !formData.category_main ||
      !formData.category_sub ||
      !formData.keywords ||
      !formData.image_default
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // const formData = new FormData();

    // formData.append("title", title);
    // formData.append("content", content);
    // formData.append("summary", summary);
    // formData.append("category_id", category_sub);
    // formData.append("keywords", keywords);
    // formData.append("image_default", image_default);
    // formData.append("is_slider", isSlider);
    // formData.append("is_featured", isFeatured);
    // formData.append("is_recommended", isRecommended);
    // formData.append("is_breaking", isBreaking);

    try {
      await axios.post("http://localhost:3000/api/post/upload", formData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    formDetailApi();
    MainCategoryApi();
    subCategoryApi();
  }, []);

  console.log(formData.category_main);

  return (
    <div className="col-12">
      <div className="shadow-sm p-3 mb-5  mt-5 bg-white rounded border-0">
        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formContent" className="mb-3">
              <Form.Label>Content</Form.Label>
              <EditorToolbar />
              <ReactQuill
                modules={modules}
                formats={formats}
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </Form.Group>

            <Form.Group controlId="formLocation" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="MainCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={formData.category_main}
                onChange={(e) =>
                  setFormData({ ...formData, category_main: e.target.value })
                }
              >
                {mainCategory_array.map((item) => (
                  <option key={item.id} value={item.name_slug}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="subCategory" className="mb-3">
              <Form.Label>Sub Category</Form.Label>
              <Form.Control
                as="select"
                value={formData.category_sub}
                onChange={(e) =>
                  setFormData({ ...formData, category_sub: e.target.value })
                }
                required
              >
                {subCategory_array.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Check
              type="checkbox"
              id="sliderCheckbox"
              name="isSlider"
              label="Is Slider"
              checked={formData.isSlider === 1}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              id="featuredCheckbox"
              name="isFeatured"
              label="Is Featured"
              checked={formData.isFeatured === 1}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              id="breakingCheckbox"
              name="isBreaking"
              label="Is Breaking"
              checked={formData.isBreaking === 1}
              onChange={handleCheckboxChange}
            />

            <Form.Group controlId="formKeywords" className="mb-3">
              <Form.Label>Keywords</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter keywords"
                value={formData.keywords}
                onChange={(e) =>
                  setFormData({ ...formData, keywords: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="image_default" className="mb-3">
              <Form.Label>Select Image</Form.Label>
              <div {...getRootProps({ style })}>
                <input
                  {...getInputProps()}
                  name="image_default"
                  style={{ display: "none" }}
                />
                {isFileSelected ? (
                  <p>Image file selected</p>
                ) : (
                  <div className="text-center">
                    <FaFileImage className="mb-3" style={{ fontSize: 35 }} />
                    <p>
                      Drag 'n' drop image files here, or click to select files
                    </p>
                  </div>
                )}
              </div>
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
