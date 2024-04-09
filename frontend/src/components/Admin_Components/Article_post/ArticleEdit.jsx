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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"

const ArticleEdit = () => {
  const { id } = useParams();
const naviagte=useNavigate()
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isBreaking, setIsBreaking] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [isSlider, setIsSlider] = useState("");
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState("");
  const [imageDefault, setImageDefault] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [categoryMain, setCategoryMain] = useState("");
  const [categorySub, setCategorySub] = useState("");
  const [imageDescription,setImageDescription]=useState("")
  const [mainCategoryArray, setMainCategoryArray] = useState([]);
  const [subCategoryArray, setSubCategoryArray] = useState([]);

  // Dropzone styles
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
    setImageDefault(acceptedFiles[0]);
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

  const formDetailApi = async () => {
    try {
      const res = await axios.get(`${Url}api/post/single/${id}`);
      const data = res.data[0];
console.log(res.data[0])
      setTitle(data.title);
      setContent(data.content);
      setSummary(data.summary);
      setIsBreaking(data.is_breaking);
      setIsFeatured(data.is_featured);
      setIsSlider(data.is_slider);
      setKeywords(data.keywords);
      setImageDefault(data.image_mid);
      setCategoryMain(data.parent_id);
      setCategorySub(data.category_id);
      setImageDescription(data.image_description)
    } catch (err) {
      console.log(err);
    }
  };

  const MainCategoryApi = async () => {
    try {
      const res = await axios.get(`${Url}api/category/categoryList`);
      setMainCategoryArray(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const subCategoryApi = async () => {
    try {
      const res = await axios.get(
        `${Url}api/category/main_sub/${categoryMain}`
      );
      setSubCategoryArray(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    switch (name) {
      case "isSlider":
        setIsSlider(checked ? 1 : 0);
        break;
      case "isFeatured":
        setIsFeatured(checked ? 1 : 0);
        break;
      case "isBreaking":
        setIsBreaking(checked ? 1 : 0);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("summary", summary);
    formData.append("category_id", categorySub);
    formData.append("keywords", keywords);
    formData.append("image_default", imageDefault);
    formData.append("is_slider", isSlider);
    formData.append("is_featured", isFeatured);
    formData.append("is_breaking", isBreaking);
    formData.append("image_description", imageDescription)

    try {
      await axios.put(`http://localhost:3000/api/post/update/${id}`, formData);
      toast.success('Article updated', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setTimeout(() => {
          naviagte("/admin/articlelist")
        }, 3000);
        
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    formDetailApi();
  }, []);

  useEffect(() => {
    MainCategoryApi();
    subCategoryApi();
  }, [categoryMain]);

  return (
    <div className="col-12">
      <ToastContainer/>
      <div className="shadow-sm p-3 mb-5 mt-5 bg-white rounded border-0">
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
            <Form.Group controlId="formkeywords" className="mb-3">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter keywords"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
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
                value={categoryMain}
                onChange={(e) => setCategoryMain(e.target.value)}
              >
                {mainCategoryArray.map((item) => (
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
                value={categorySub}
                onChange={(e) => setCategorySub(e.target.value)}
                required
              >
                {subCategoryArray.map((item) => (
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
              checked={isSlider === 1}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              id="featuredCheckbox"
              name="isFeatured"
              label="Is Featured"
              checked={isFeatured === 1}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              id="breakingCheckbox"
              name="isBreaking"
              label="Is Breaking"
              checked={isBreaking === 1}
              onChange={handleCheckboxChange}
            />
            <Form.Group controlId="formKeywords" className="mb-3">
              <Form.Label>Keywords</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
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
