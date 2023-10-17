import express from "express";
import mysql from 'mysql2'
import cors from 'cors'

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysqldb1",
    database: "music"

})

//allows us to add a json object from the client
app.use(express.json())
app.use(cors())

//test message...if you see this at the localhost:8800 url, then it is working
app.get("/", (req, res) => {
    res.json("This is the backend.")
})

//endpoint to get all songs from database - get request
app.get("/songs", (req, res) => {
    const q = "SELECT * FROM songs"

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//endpoint to get all songs from database sorted by artist - get request
app.get("/songs/artist", (req, res) => {
    const q = "SELECT * FROM songs ORDER BY artist"

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//endpoint to get all songs from database sorted by album - get request
app.get("/songs/album", (req, res) => {
    const q = "SELECT * FROM songs ORDER BY album"

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//endpoint to get a song by id
app.get("/songs/:id", (req, res) => {
    const songId = req.params.id;
    const q = "SELECT * FROM songs WHERE id = ?"

    db.query(q, [songId], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//endpoint to add song to database - post request
app.post("/songs", (req, res) => {
    const q = "INSERT INTO songs (`title`, `artist`, `album`, `cover`, `url`) VALUES (?)"
    const values = [req.body.title, req.body.artist, req.body.album, req.body.cover, req.body.url]

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Song has been created")
    })
})

//endpoint to update song to database - put request
app.put("/songs/:id", (req, res) => {
    const songId = req.params.id;
    const q = "UPDATE songs SET `title` = ?, `artist` = ?, `album` = ?, `cover` = ?, `url` = ? WHERE id = ?"
    const values = [req.body.title, req.body.artist, req.body.album, req.body.cover, req.body.url]

    db.query(q, [...values, songId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Song has been created")
    })
})

//endpoint to delete song from database - delete request
app.delete("/songs/:id", (req, res)=> {
    const songId = req.params.id;
    const q = "DELETE FROM songs WHERE id = ?"

    db.query(q, [songId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Song has been deleted")
    })
})


app.listen(8800, ()=> {
    console.log("connected to backend")
})

//sudo killall node to kill server