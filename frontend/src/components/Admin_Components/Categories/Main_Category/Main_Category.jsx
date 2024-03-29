import axios from "axios";
import { Url } from "../../../../url";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const Main_Category = () => {
  const [data, setData] = useState([]);

  const MainCategoryApi = async () => {
    try {
      const res = await axios.get(`${Url}api/category/categoryList`);
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    MainCategoryApi();
  }, []);
  return (
    <div className="col-12">
      <div className="shadow-sm p-3 mb-5  mt-5 bg-white rounded border-0">
        <table className="table text-center">
          <thead className="bg-light">
            <tr>
              <th>Category Name</th>
              <th>Order</th>
              <th>Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category_order}</td>
                <td style={{ backgroundColor: item.color, color: "white" }}>
                  {item.color}
                </td>
                <td>
                  <Link to={`/admin/edit-main-category/${item.id}`}>
                    <button className="btn btn-primary me-3">
                      <MdModeEdit size={20} />
                    </button>
                  </Link>
                  <button className="btn btn-danger">
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main_Category;
