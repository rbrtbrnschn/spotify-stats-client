import React, { Component } from 'react'
import TrackHistory from "../modules/track_history"
import TrackTop10 from "../modules/track_top10"
import Tabs from "../modules/tabs"
import Cookies from "js-cookie"

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            args: "",
            results: {
                recenttracks: {
                    track: []
                }
            },
            filtered: [],
            displayType: "none",
            error: false
        }
        this.handleTextarea = this.handleTextarea.bind(this)
    }
    componentDidMount() {
        if (localStorage.getItem("lastfm_username") == null) localStorage.setItem("lastfm_username", "rj")
    }
    async handleTop10(args) {
        args = addToArgs(args)
        const spotify_access_token = Cookies.get("spotify_access_token") || "undefined"
        if (spotify_access_token === "undefined") {
            this.setState({ ...this.state, error: { error: true, message: "Please Login" } })
            return
        }

        const limit = 10
        const raw = [...this.state.results.recenttracks.track]
        let top10 = []
        let promises = []
        let unique_counter = 0

        for (let t of raw.reverse()) {
            let current = top10.find(_track => _track.name === t.name)
            if (!current) {
                if (unique_counter === 10) continue
                const name = encodeURIComponent(t.name)
                let artist = encodeURIComponent(t.artist["#text"])
                const needsArtist = name.length <= 15
                if (artist.includes("'")) artist = ""
                const query = !needsArtist ? `&name=${name}` : `&name=${name}+${artist}`


                const url = `http://localhost:3000/v1/name2track?a=1&` + args + query
                promises.push(fetchWrapper(url))

                let _new = {}
                _new.name = t.name
                _new.artist = {}
                _new.artist.name = t.artist["#text"]
                _new.times_played = 1
                _new.duration_ms = 0
                _new.last_played = t.date !== undefined ? new Date(t.date["#text"]).toLocaleDateString() : "Currently playing..."
                _new.image = t.image[1]["#text"]
                _new.url = t.url
                top10.push(_new)
                unique_counter++
            }
            else {
                current.times_played++
                current.last_played = t.date !== undefined ? t.date["#text"] : "Currently playing..."
            }
        }



        let counter = 0
        Promise.all(promises)
            .then(values => {
                values.forEach(v => {
                    if (v === "undefined" || !v) {
                        top10[counter].durations_ms = 60 * 3 * 1000

                    }
                    top10[counter].duration_ms = v.tracks.items[0].duration_ms
                    top10[counter].artist.image = "undefined"
                    top10[counter].artist.link = v.tracks.items[0].artists[0].external_urls.spotify
                    top10[counter].artist.spotifyId = v.tracks.items[0].artists[0].id
                    counter++
                })
                top10 = top10.sort((a, b) => b.times_played - a.times_played).slice(0, limit)
                this.setState({ ...this.state, error: { error: false, msg: "" }, displayType: "top10", filtered: top10 })
            })
        return
    }

    handleName2Track(args) {
        const spotify_access_token = Cookies.get("spotify_access_token") || "undefined"
        if (spotify_access_token === "undefined") {
            this.setState({ ...this.state, error: { error: true, message: "Please Login" } })
            return
        }

        const url = `http://localhost:3000/v1/name2track?spotify_access_token=${spotify_access_token}` + args + `&user=${localStorage.getItem("lastfm_username")}`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(results => {
                console.log(results)
                return results
            })
            .catch(err => {
                if (err) return err
            })
    }

    handle2History(args) {
        const spotify_access_token = Cookies.get("spotify_access_token") || "undefined"
        if (spotify_access_token === "undefined") {
            this.setState({ ...this.state, error: { error: true, message: "Please Login" }, displayType: "history" })
            return
        }

        const url = `http://localhost:3000/v1/2history?spotify_access_token=${spotify_access_token}` + args + `&user=${localStorage.getItem("lastfm_username")}`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(results => {
                console.log(results)
                this.setState({ ...this.state, results: results, filtered: results.recenttracks.track, displayType: "history" })
            })
            .catch(err => {
                if (err) return err
            })
    }

    handleTextarea(e) {
        this.setState({ ...this.state, args: e.target.value })
    }
    handleRefreshToken() {
        const refresh_token = Cookies.get("spotify_refresh_token") || "undefined"
        if (refresh_token === "undefined") {
            this.setState({ ...this.state, error: { error: false, message: "" } })
            return
        }

        const url = `http://localhost:3000/auth/refresh?spotify_refresh_token=${refresh_token}`

        fetch(url)
            .then(res => res.json())
            .then(results => {
                console.log(results)
                Cookies.set("spotify_access_token", results.access_token, { expires: 3600000 })
            })
            .catch(err => { if (err) return err })
    }

    render() {

        return (
            <div className="container is-fullwidth">
                {this.state.error.error ? <div className="notification is-danger is-light">{this.state.error.message}</div> : ""}
                <div className="title">Home</div>
                <div className="subtitle">Spotify-Stats</div>
                <input name="args" id="args" cols="30" rows="10" className="textarea" onChange={this.handleTextarea} placeholder="extra search query" />
                <button onClick={() => { return this.handleTop10(this.state.args) }} className="button">Top10</button>
                <button onClick={() => { return this.handleName2Track(this.state.args) }} className="button">Name2Track</button>
                <button onClick={() => { return this.handle2History(this.state.args) }} className="button">2History</button>
                <button className="button" onClick={this.handleRefreshToken}>Refresh Access Token</button>
                {/* <div className="box"><pre>{JSON.stringify(this.state.results, null, 2)}</pre></div> */}

                {this.state.displayType === "none"
                    ? <div className="box"><pre>{JSON.stringify(this.state.results, null, 2)}</pre></div>
                    : this.state.displayType === "history"
                        ? this.state.results.recenttracks.track.map((t, i) => <TrackHistory key={"history-" + i} track={t} index={i} />)
                        : this.state.displayType === "top10"
                            ? this.state.filtered.map((t, i) => <TrackTop10 key={"Top10-" + i} track={t} index={i} />)
                            : ""

                }
            </div>
        )
    }
}

function addToArgs(args) {
    const spotify_access_token = Cookies.get("spotify_access_token")
    const lfm_user = localStorage.getItem("lastfm_username")
    const _args = { spotify_access_token: spotify_access_token, user: lfm_user }

    const qs = Object.keys(_args)
        .map(key => `${key}=${_args[key]}`)
        .join('&');
    return `${args}&${qs}`
}

function fetchWrapper(url) {
    return fetch(url)
        .then(res => res.json())
        .then(results => results)
}