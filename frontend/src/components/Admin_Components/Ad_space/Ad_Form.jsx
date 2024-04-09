/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Url } from "../../../url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [textValue, setTextValue] = useState("");
  const [title, setTitle] = useState([]);

  const handleTextareaChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const titleApi = async () => {
    try {
      const res = await axios.get(`${Url}api/ad_space/titles`);
      setTitle(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageapi = async () => {
    try {
      const res = await axios.get(
        `${Url}api/ad_space/single_ad/${selectedOption}`
      );
      setTextValue(res.data[0].ad_code_728);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editImageApi = async () => {
    try {
      await axios.put(`${Url}api/ad_space/update_ad/${selectedOption}`, {
        image_code: textValue,
      });
      toast.success('Link updated', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
    } catch (err) {
      console.log(err);
      
    }
  };

  useEffect(() => {
    imageapi();
  }, [selectedOption]);

  useEffect(() => {
    titleApi();
  }, []);
  return (

    <div className="col-12">
     <ToastContainer />
      <div className="shadow-sm p-3 mb-5  mt-5 bg-white rounded border-0">
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Select a category:</Form.Label>
            <Form.Control
              as="select"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">None</option>
              {title.map((item) => (
                <option key={item.ad_space} value={item.ad_space}>
                  {item.ad_space.split("_").join(" ")}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="Form.ControlTextarea1" className="mt-3">
            <Form.Label>Add Image Code</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={textValue ? textValue : ""}
              onChange={handleTextareaChange}
            />
          </Form.Group>
          {/* <Form.Group controlId="Form.ControlTextarea1">
            <Form.Label>Add Image Code</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={textValue}
              onChange={handleTextareaChange}
            />
          </Form.Group> */}
        </Form>
        <button className="btn btn-primary mt-3" onClick={editImageApi}>
          save changes
        </button>
      </div>
    </div>
  );
};

export default AdForm;
