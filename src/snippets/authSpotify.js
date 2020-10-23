module.exports = function handleLogin() {
    // Spotify oAuth
    const redirect_uri = "http://localhost:3000/auth/callback"
    var scopes = "ugc-image-upload playlist-modify-public playlist-read-private playlist-modify-private playlist-read-collaborative app-remote-control streaming user-read-playback-position user-read-currently-playing user-modify-playback-state user-library-read user-library-modify user-read-private user-read-email"
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`
    window.location.href = url
}