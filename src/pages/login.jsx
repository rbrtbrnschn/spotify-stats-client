import React from 'react'
import config from "../config"


export default function Login() {
    const handleClick = () => {
        window.location.href = `${config.api}/auth`
        // const client_secret = "b0e2027abb14470d9e79a5512948e61d"
        // const client_id = "f56c63fdd840422da8f4b829f125a426"
        // const redirect_uri = `${config.api}/auth/callback`
        // var scopes = 'user-read-private user-read-email'
        // var scopes = "ugc-image-upload playlist-modify-public playlist-read-private playlist-modify-private playlist-read-collaborative app-remote-control streaming user-read-playback-position user-read-currently-playing user-modify-playback-state user-library-read user-library-modify user-read-private user-read-email"
        // const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`
        // window.location.href = url

    }
    return (
        <div className="container is-fullwidth">
            <div className="title">Login</div>
            <div className="subtitle">Login with spotify</div>
            <input type="text" className="input " />
            <input type="password" className="input " />
            <button className="button">Login</button>
            <p className="mb-5"></p>
            {/* eslint-disable-next-line */}
            <a onClick={handleClick} className="button">Login With Spotify</a>
        </div>
    )
}
