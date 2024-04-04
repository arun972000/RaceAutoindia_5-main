import { useState } from "react";
import axios from "axios";
import { Url } from "../../../url";


const HeaderCode = () => {
  const [headerCode, setHeaderCode] = useState("");
  


  const handleSubmit = async () => {
    try {
      await axios.put(`${Url}api/settings/update_header`, { headerCode });
      console.log("updated");


      // Generate Helmet data

      // Update helmetData state
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch header code whenever meta changes

  return (
    <>
      <div className="col-12">
        <div className="shadow-sm p-3 mb-5 mt-5 bg-white rounded border-0">
          <div className="row">
            <div className="form-group">
              <label htmlFor="FormControlTextarea1">Enter your code</label>
              <textarea
                className="form-control"
                id="FormControlTextarea1"
                rows="3"
                value={headerCode}
                onChange={(e) => setHeaderCode(e.target.value)}
              ></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default HeaderCode;
