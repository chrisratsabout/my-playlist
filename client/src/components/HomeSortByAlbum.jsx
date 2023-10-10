import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HomeSortByAlbum = () => {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8800/songs/album")
            .then(res => {
                setSongs(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/songs/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e.target.value)
        if(e.target.value === "sort-by"){
            return;
        } else if(e.target.value === "order-added"){
            navigate("/")
        } else {
            navigate(`/${e.target.value}`)
        }
    }
    
    return (
        <>
            <div className="playlist-container">
                <h1>My Playlist</h1>
                <select name="sort" id="sort" onChange={handleChange}>
                    <option value="sort-by">Sort By:</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                    <option value="order-added">Order Added</option>
                </select>
                <table className='content-table'>
                    <thead>
                        <tr>
                            <th>Artwork</th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Update/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            songs.map((song) => {
                                return <tr key={song.id}>
                                    <td><img className="album-cover" src={song.cover} alt={song.album} /></td>
                                    <td><a href={song.url} target='blank'>{song.title}</a></td>
                                    <td>{song.artist}</td>
                                    <td className='album-title'>{song.album}</td>
                                    <td>
                                        <button className="update-btn" ><Link to={`/update/${song.id}`}><i className="fa-regular fa-pen-to-square"></i></Link></button>
                                        <button className="delete-btn" onClick={() => { handleDelete(song.id) }}><i className="fa-solid fa-trash-can"></i></button></td>

                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <button className="add-btn"><Link to="/add">Add Song</Link></button>
            </div>
        </>
    )
}

export default HomeSortByAlbum