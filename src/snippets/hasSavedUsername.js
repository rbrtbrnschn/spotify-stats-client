module.exports = function hasSavedUsername() {
    const lfm_user = localStorage.getItem("lastfm_username")
    return lfm_user !== null
}