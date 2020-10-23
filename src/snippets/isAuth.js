module.exports = function(){
    const Cookies = require("js-cookie")
    return Cookies.get("spotify_access_token") == null ? false : true
}