import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
  const [song, setSong] = useState([])

  const [retrievedSong, setRetrievedSong] = useState([])

  const handleChange = e => {
    setSong(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const navigate = useNavigate();

  const location = useLocation();

  const songId = location.pathname.split("/")[2]

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/songs/" + songId, song)
      navigate("/")
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    const fetchSongById = async () => {
      try {
        const res = await axios.get("http://localhost:8800/songs/" + songId)
        setSong(res.data[0])
        setRetrievedSong(res.data[0])
      } catch (err) {
        console.log(err)
      }
    }
    fetchSongById()
  }, [])


  return (
    <div className="update-container">

      <div className="song-to-update-container">
        <img className="update-album-cover" src={retrievedSong.cover} alt="" />
        <p>{retrievedSong.title}</p>
        <p>{retrievedSong.artist}</p>
        <p className='album-title'>{retrievedSong.album}</p>
        

      </div>
      <div className="update-form">
        <h1>Update Song</h1>
        <label htmlFor="cover">Album Cover:</label>
        <input type="text" placeholder='URL of image' name='cover' onChange={handleChange} autoComplete='off' />
        <label htmlFor="title">Song Title:</label>
        <input type="text" placeholder='eg. Welcome To The Jungle' name='title' onChange={handleChange} autoComplete='off' />
        <label htmlFor="artist">Artist Name:</label>
        <input type="text" placeholder="eg. Guns 'N Roses" name='artist' onChange={handleChange} autoComplete='off' />
        <label htmlFor="album">Album Name:</label>
        <input type="text" placeholder='eg. Appetite For Destruction' name='album' onChange={handleChange} autoComplete='off' />
        <label htmlFor="url">URL:</label>
        <input type="text" placeholder='URL of song' name='url' onChange={handleChange} autoComplete='off' />
        <button className="submit-btn" onClick={handleSubmit}>Update Song</button>
      </div>
    </div>
  )
}

export default Update