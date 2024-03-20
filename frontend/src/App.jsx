
import './App.css'
import { Routes, Route } from "react-router-dom"
import NewsLetter from './components/NewsLetter/NewsLetter'
import Layout1 from './components/EventPage/Layouts/Layout1'
import Layout2 from './components/EventPage/Layouts/Layout2'
import Layout3 from './components/EventPage/Layouts/Layout3'
import Admin_newLetter from './components/Admin_Components/Admin_newLetter'
import Admin_Event from './components/Admin_Components/Admin_Event'
import PDFPage from './components/NewsLetter/PDFPage'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import SearchPage from './components/SearchPanel/SearchPage'
import MyNavbar from './components/Header/Navbar'






function App() {

  return (
    <>
      <MyNavbar/>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/newsletter" element={<NewsLetter />} />
        <Route path="/pdf/:title" element={<PDFPage/>}/>
        <Route path="/event" element={<Layout1 />} />
        <Route path="/eventlist/:category" element={<Layout2 />} />
        <Route path="/eventpage/:title" element={<Layout3 />} />
        <Route path="admin_newsletter" element={<Admin_newLetter/>}/>
        <Route path="admin_event" element={<Admin_Event/>}/>
        <Route path="search/:word" element={<SearchPage/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
