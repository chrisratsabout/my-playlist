import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Add from "./components/Add"
import Update from "./components/Update"
import "./style.css"

function App() {


  return (
    <>
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/add" element={<Add/> } />
          <Route path="/update/:id" element={<Update/> } />
        </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
