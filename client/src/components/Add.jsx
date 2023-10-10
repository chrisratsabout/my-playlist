import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {
const [song, setSong] = useState({
  cover: "",
  title: "",
  artist: "",
  album: "",
  url: ""
})

const handleChange = e => {
  setSong(prev => ({...prev, [e.target.name]: e.target.value}))
}

const navigate = useNavigate();

const handleSubmit = async e => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:8800/songs", song)
    navigate("/")
  } catch (err) {
    console.log(err)
  }
}



  return (
   <div className="form">
    <h1>Add Song</h1>
    <label htmlFor="cover">Album Cover:</label>
    <input type="text" placeholder='URL of image' name='cover' onChange={handleChange} autoComplete='off'/>
    <label htmlFor="title">Song Title:</label>
    <input type="text" placeholder='eg. Welcome To The Jungle' name='title' onChange={handleChange} autoComplete='off'/>
    <label htmlFor="artist">Artist Name:</label>
    <input type="text" placeholder="eg. Guns 'N Roses" name='artist' onChange={handleChange} autoComplete='off'/>
    <label htmlFor="album">Album Name:</label>
    <input type="text" placeholder='eg. Appetite For Destruction' name='album' onChange={handleChange} autoComplete='off'/>
    <label htmlFor="url">URL:</label>
    <input type="text" placeholder='URL of song' name='url' onChange={handleChange} autoComplete='off'/>
    <button className="submit-btn" onClick={handleSubmit}>Add Song</button>
   </div>
  )
}

export default Add