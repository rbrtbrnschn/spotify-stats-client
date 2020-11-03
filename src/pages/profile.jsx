import React, { Component } from 'react'
import isAuth from '../snippets/isAuth'
import hasSavedUsername from "../snippets/hasSavedUsername"
import authSpotify from "../snippets/authSpotify"
import Notification from "../modules/notification"
import Cookies from "js-cookie"

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)

        // State
        this.state = {
            lastfm_username: "N/A", profile: { display_name: "", email: "", country: "" }, saved: false,
            notification: { isShowing: false, message: "", onClick: () => "" }
        }

    }
    componentDidMount() {
        // Error Handling
        let newState = { ...this.state }
        if (!isAuth()) {
            return this.setState({ ...this.state, notification: { isShowing: true, message: "Please login with spotify first.", onClick: authSpotify } })
        }
        if (!hasSavedUsername()) {
            newState = { ...newState, notification: { isShowing: true, message: "Please set your last.fm username.", color: "is-danger" } }
        }

        // Get Local Data
        let username = localStorage.getItem("lastfm_username")
        if (username == null) username = this.state.lastfm_username

        // Get Spotify Data
        const access_token = Cookies.get("spotify_access_token")
        const url = `https://api.spotify.com/v1/me?access_token=${access_token}`
        fetch(url)
            .then(res => res.json())
            .then(results => {
                newState = { ...newState, profile: results, lastfm_username: username }
                this.setState({ ...newState })
            })
            // Error Handling
            .catch(err => {
                newState = { ...newState, notification: { isShowing: true, message: "An error occurred. Please refresh.", color: "is-warning" }, error: err }
                this.setState({ ...newState })
            })
    }

    handleOnChange(e) {
        const { value } = e.target
        this.setState({ ...this.state, lastfm_username: value, saved: false })
    }
    handleOnClick(e) {
        // Update Localstorge
        localStorage.setItem("lastfm_username", this.state.lastfm_username)

        // Update State
        const newState = { ...this.state, saved: true, notification: { ...this.state.notification, isShowing: true, message: "Saved username.", color:"is-success" } }
        this.setState(newState)

        // Clean Up Notification
        setTimeout(() => {
            this.setState({ ...newState, notification: { ...newState.notification, isShowing: false }, saved: false })
        }, 1500)
    }

    render() {
        return (
            <div className="container is-fullwidth">
                <Notification notification={this.state.notification} />
                <div className="title">Profile</div>
                <div className="subtitle">{this.state.profile.display_name}</div>
                <div className="title is-6">Email</div>
                <div className="subtitle is-6">{this.state.profile.email}</div>
                <div className="title is-6">Country</div>
                <div className="subtitle is-6">{this.state.profile.country}</div>
                <div className="title is-6">Lastfm Username</div>
                <div className="subtitle is-6">{this.state.lastfm_username}</div>
                <div className="field has-addons">
                    <input className="input" onChange={this.handleOnChange} />
                    <button className={this.state.saved === true ? "button is-success" : "button"} onClick={this.handleOnClick}>Save</button>
                </div>
            </div>
        )
    }
}
