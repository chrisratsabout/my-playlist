import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8800/songs")
            .then(res => {
                console.log(res.data)
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
    return (
        <>
            <div className="playlist-container">


                <h1>My Playlist</h1>
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
                                        <button className="delete-btn" onClick={()=>{handleDelete(song.id)}}><i className="fa-solid fa-trash-can"></i></button></td>

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

export default Home