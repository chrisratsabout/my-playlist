import React from 'react'
import {useEffect, useState} from 'react'
import Home from './Home'

const Login = () => {
    const CLIENT_ID = "45c809389b8e49269bb512691c384305"
    const REDIRECT_URI = "http://localhost:5173"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")

    useEffect(()=> {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if(!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
    })

  return (
    <>
    
{
    !token ?
    <div>
    <h1>Spotify React</h1>
    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
    </div>
    :
    <Home token={token} setToken={setToken}/>

}

    </>
   
  )
}

export default Login