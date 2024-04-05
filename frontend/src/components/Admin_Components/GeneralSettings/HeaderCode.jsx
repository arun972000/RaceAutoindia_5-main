import { useState } from "react";
import axios from "axios";
import { Url } from "../../../url";

const HeaderCode = () => {
  const [headerCode, setHeaderCode] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.put(`${Url}api/settings/update_header`, { headerCode });
      console.log("updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="col-12">
        <div className="shadow-sm p-3 mb-5 mt-5 bg-white rounded border-0">
          <div className="row">
            <div className="form-group" onSubmit={handleSubmit}>
              <label htmlFor="FormControlTextarea1">Enter your code</label>
              <textarea
                className="form-control"
                id="FormControlTextarea1"
                rows="3"
                value={headerCode}
                onChange={(e) => setHeaderCode(e.target.value)}
              ></textarea>
              <button className="btn btn-primary mt-3" type="submit">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderCode;
