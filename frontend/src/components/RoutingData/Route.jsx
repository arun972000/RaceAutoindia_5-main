/* eslint-disable react/prop-types */
// RouterDataContext.js
import { createContext, useState, useEffect } from 'react';
import axios from "axios"
import { Url } from '../../url';

const RouterDataContext = createContext();

const RouterDataProvider = ({ children }) => {
  const [routerData, setRouterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${Url}api/routing/all-routes`)
      setRouterData(res.data);
    };

    fetchData();
  }, []);

  return (
    <RouterDataContext.Provider value={routerData}>
      {children}
    </RouterDataContext.Provider>
  );
};

export { RouterDataContext, RouterDataProvider };
