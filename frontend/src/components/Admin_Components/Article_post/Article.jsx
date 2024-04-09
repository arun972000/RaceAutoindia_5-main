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
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import EditorToolbar, { formats, modules } from "./TextEditor/Toolbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Article = () => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSlider, setIsSlider] = useState(0);
  const [isFeatured, setIsFeatured] = useState(0);
  const [isRecommended, setIsRecommended] = useState(0);
  const [isBreaking, setIsBreaking] = useState(0);
  const [summary, setsummary] = useState("");
  const [category_main, setCategory_main] = useState("");
  const [category_sub, setCategory_sub] = useState("");
  const [keywords, setKeywords] = useState("");
  const [image_default, setImage_default] = useState(null);
const [imageDescription,setImageDescription]=useState("")
  const [mainCategory_array, setMainCategory_array] = useState([]);
  const [subCategory_array, setSubCategory_array] = useState([]);

  const cookieData = Cookies.get("token");
  const token = jwtDecode(cookieData);
  const user_id = token.userid;

  


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
    setIsFileSelected(true);
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

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
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
        `${Url}api/category/main_sub/${category_main}`
      );
      setSubCategory_array(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const toggleCheckbox = (setState) => {
    setState((prevState) => (prevState === 1 ? 0 : 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !content ||
      !summary ||
      !category_main ||
      !category_sub ||
      !keywords ||
      !image_default
    ) {

      toast.info('Please fill out all inputs', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

        });
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("summary", summary);
    formData.append("category_id", category_sub);
    formData.append("keywords", keywords);
    formData.append("image_default", image_default);
    formData.append("is_slider", isSlider);
    formData.append("is_featured", isFeatured);
    formData.append("is_recommended", isRecommended);
    formData.append("is_breaking", isBreaking);
    formData.append("user_id", user_id);
    formData.append("image_description",imageDescription)

    try {
      await axios.post("http://localhost:3000/api/post/upload", formData);
      toast.success('Post Submitted', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
       setTitle("")
       setContent("")
       setCategory_sub("")
       setCategory_main("")
       setKeywords("")
       setIsBreaking(0)
       setIsSlider(0)
       setIsFeatured(0)
       setIsRecommended(0)
       setsummary("")
       setImageDescription("")
       setImage_default(null)
    } catch (err) {
      console.log(err);
      toast.warn('An error occurred while submitting the form. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

        });
    }
  };
  useEffect(() => {
    MainCategoryApi();
    subCategoryApi();
  }, [category_main]);

  return (
    <div className="col-12">
      <ToastContainer/>
      <div className="shadow-sm p-3 mb-5  mt-5 bg-white rounded border-0">
        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formsummary" className="mb-3">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Summary"
                value={summary}
                onChange={(e) => setsummary(e.target.value)}
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
                value={content}
                onChange={(value) => setContent(value)}
              />
            </Form.Group>


            
            <Form.Group controlId="formdescription" className="mb-3">
              <Form.Label>Image Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Description"
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="MainCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category_main}
                onChange={(e) => setCategory_main(e.target.value)}
                required
              >
                <option value="none">None</option>
                {mainCategory_array.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="subCategory" className="mb-3">
              <Form.Label>Sub Category</Form.Label>
              <Form.Control
                as="select"
                value={category_sub}
                onChange={(e) => setCategory_sub(e.target.value)}
                required
              >
                <option value="none">None</option>
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
              label="Is Slider"
              checked={isSlider === 1}
              onChange={() => toggleCheckbox(setIsSlider)}
            />
            <Form.Check
              type="checkbox"
              id="featuredCheckbox"
              label="Is Featured"
              checked={isFeatured === 1}
              onChange={() => toggleCheckbox(setIsFeatured)}
            />
            <Form.Check
              type="checkbox"
              id="recommendedCheckbox"
              label="Is Recommended"
              checked={isRecommended === 1}
              onChange={() => toggleCheckbox(setIsRecommended)}
            />
            <Form.Check
              type="checkbox"
              id="breakingCheckbox"
              label="Is Breaking"
              checked={isBreaking === 1}
              onChange={() => toggleCheckbox(setIsBreaking)}
            />

            <Form.Group controlId="formKeywords" className="mb-3">
              <Form.Label>Keywords</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter keywords"
                value={keywords}
                onChange={handleKeywordsChange}
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

export default Article;
