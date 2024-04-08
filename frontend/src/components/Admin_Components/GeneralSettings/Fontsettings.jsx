/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Url } from "../../../url";
import parse from "html-react-parser";

const FontSetting = () => {
  const [Font, setFont] = useState([]);

  const [singleFont, setSingleFont] = useState("");

  const [selectedFont, setSelectedFont] = useState("");

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const singleFontApi = async () => {
    const res = await axios.get(`${Url}api/settings/font/${selectedFont}`);
    setSingleFont(res.data[0].font_url);
    console.log(singleFont);
  };

  const fontapi = async () => {
    try {
      const res = await axios.get(`${Url}api/settings/fonts`);
      setFont(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyChanges = async () => {
    try {
      await axios.put(`${Url}api/settings/font-edit/${selectedFont}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fontapi();
    singleFontApi();
  }, [selectedFont]);

  return (
    <div className="col-12">
      <div className="shadow-sm p-3 mb-5 mt-5 bg-white rounded border-0">
        <div className="row">
          <Form>
            <Form.Group controlId="fontSelect">
              <Form.Label>Select Font:</Form.Label>
              <Form.Control
                as="select"
                value={selectedFont}
                onChange={handleFontChange}
              >
                {Font.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.font_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={applyChanges}>
              Apply Changes
            </Button>
          </Form>
          <Helmet>{parse(singleFont)}</Helmet>
        </div>
      </div>
    </div>
  );
};

export default FontSetting;
