import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Add from "./components/Add"
import Update from "./components/Update"
import "./style.css"
import HomeSortByArtist from "./components/HomeSortByArtist"
import HomeSortByAlbum from "./components/HomeSortByAlbum"
import Login from "./components/Login"
import Search from "./components/Search"


function App() {


  return (
    <>
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/> }/>
          <Route path="/search" element={<Search/> }/>
          <Route path="/home" element={<Home/> } />
          <Route path="/artist" element={<HomeSortByArtist/> } />
          <Route path="/album" element={<HomeSortByAlbum/> } />
          <Route path="/add" element={<Add/> } />
          <Route path="/update/:id" element={<Update/> } />
        </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
