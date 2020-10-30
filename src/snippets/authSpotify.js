module.exports = function handleLogin() {
    const config = require("../config")
    const url = `${config.api}/auth`
    window.location.href = url
}