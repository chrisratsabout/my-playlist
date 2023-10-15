import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Search = () => {
    const [token, setToken] = useState("")
    const [tracks, setTracks] = useState([])
    const [song, setSong] = useState({
        cover: "",
        title: "",
        artist: "",
        album: "",
        url: ""
    })

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
    })
    const [searchKey, setSearchKey] = useState("")

    const searchTracks = async (e) => {

        e.preventDefault();
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "track"
            }
        })

        setTracks(data.tracks.items);
    }

    const navigate = useNavigate();

    const addSongToPlaylist = async (e) => {        
        song.cover = e.target.parentElement.parentElement.children[0].children[0].getAttribute('src')
        song.title = e.target.parentElement.parentElement.children[1].children[0].innerText
        song.artist = e.target.parentElement.parentElement.children[2].innerText
        song.album = e.target.parentElement.parentElement.children[3].innerText
        song.url = e.target.parentElement.parentElement.children[1].children[0].getAttribute("href")

        console.log(song)
        
        e.preventDefault();
        try {
          await axios.post("http://localhost:8800/songs", song)
          navigate("/")
        } catch (err) {
          console.log(err)
        }
    }

    const renderTracks = () => {
        return tracks.map((track) => {
            return <tr key={track.id}>
                <td><img className="album-cover" src={track.album.images[0].url} alt={track.album.name} /></td>
                <td><a href={!track.preview_url ? "https://www.spotify.com" : track.preview_url} target='blank'>{track.name}</a></td>
                <td>{track.album.artists[0].name}</td>
                <td className='album-title'>{track.album.name}</td>
                <td><i class="fa-solid fa-plus" onClick={addSongToPlaylist}></i></td>
            </tr>
        })
    }

    return (
        <>
            <div className="playlist-container">

                <h2>Search for tracks:</h2>
                <form className="search-form" onSubmit={searchTracks}>
                    <input type="text" onChange={(e) => setSearchKey(e.target.value)} placeholder='eg. We Will Rock You'/>
                    <button className="search-btn" type="submit"><i class="fa-solid fa-magnifying-glass"></i>Search</button>
                </form>

                <table className='content-table'>
                    <thead>
                        <tr>
                            <th>Artwork</th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Add to Playlist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTracks()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Search