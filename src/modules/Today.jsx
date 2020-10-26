import React, { Component } from 'react'
import TopTrack from "./track_top10"
import Cookies from "js-cookie"
import config from "../config"

export default class Today extends Component {
    componentDidMount() {
        this.gatherTodays()
    }
    isFromToday(track) {
        /* track 
            { 
                @attr?:{},
                date?: {},
                album: {},
                artist: {},
                image:[{},{},{},{}],
                mbid: String,
                name: String,
                streamable: "Int",
                url: String
                
            }
        */

        // Error Handling
        if (track["@attr"] && track["@attr"].nowplaying == "true") return true

        // Dates
        const trackDate = track.date["#text"]
        const someDate = new Date(trackDate)
        const today = new Date()

        // Return True If someDate Is Today
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()

    }
    gatherTodays(args = { limit: 10, sortAlg: (arr) => arr.sort((a, b) => b.times_played - a.times_played) }) {
        // Deconstruct Args
        const limit = args.limit
        const sortAlg = args.sortAlg
        const [state, setState] = this.props.useState()

        // Error Handling
        // if (state.today.length > 0) return

        // Initialize
        const { history: tracks } = state
        let todaysTracks = []
        let uniqueTracks = 0

        for (let track of tracks) {
            // Error Handling
            if (!this.isFromToday(track)) continue

            const currentTrack = todaysTracks.find(t => t.name == track.name)

            if (!currentTrack) {
                // Continue If Reached Limit Of Unique Songs
                // if (uniqueTracks === limit) continue

                //TODO
                // fetch for spotify track
                // add duration_ms in seperate for loop

                // Assemble Track
                const newTrack = {}
                newTrack.name = track.name
                newTrack.artist = {}
                newTrack.artist.name = track.artist["#text"]
                newTrack.times_played = 1
                newTrack.duration_ms = 0
                newTrack.last_played = track.date !== undefined ? new Date(track.date["#text"]).toLocaleDateString() : "Currently playing..."
                newTrack.image = track.image[1]["#text"]
                newTrack.url = track.url
                todaysTracks.push(newTrack)

                // Add Duration Incase Libray Has Track
                const libraryTrack = state.library.find(l => track.name.toLowerCase() == l.name.toLowerCase())
                if (libraryTrack) newTrack.duration_ms = libraryTrack.duration_ms

                // Increment Counter
                uniqueTracks++
            }
            else {
                // Increment Play Time
                currentTrack.times_played++
            }

        }

        // Sort
        // Allowing For Custom Sorting Later On
        const sorted = sortAlg(todaysTracks).slice(0, limit)

        // Filter Out Existing Tracks In Library
        const library = state.library
        const newOnes = sorted.map(s => library.find(l => l.name.toLowerCase() == s.name.toLowerCase()) ? null : s)
        const makeCallsFor = newOnes.filter(e => e != null)
        console.log("newOnes", newOnes)
        console.log("makeCallsFor", makeCallsFor)

        // Get Spotify Track For Duration
        for (let index in makeCallsFor) {
            const track = makeCallsFor[index]
            const access_token = Cookies.get("spotify_access_token")
            const url = `${config.api}/v1/name2track?name=${track.name.toLowerCase().split(" ").join("%20")}&artist=${track.artist.name.split(" ").join("%20")}&spotify_access_token=${access_token}`
            this.fetchWrapper(url, track, index)
        }

        // Update State
        setState({ ...state, today: sorted })
        return sorted
    }

    //  Auto Update State After Fetch
    fetchWrapper(url, track, index, refetch = false) {
        return fetch(url)
            .then(res => res.json())
            .then(results => {
                const fetchedTrack = results.tracks.items[0]

                // Error Handling
                if (!fetchedTrack) return
                if (fetchedTrack.name.toLowerCase() != track.name.toLowerCase()) {
                    // Inner Error Handling
                    if (refetch === true) {
                        state.today[index].duration_ms = 180000
                        return
                    }

                    const access_token = Cookies.get("spotify_access_token")
                    const _url = `${config.api}/v1/name2track?name=${track.name.split(" ").join("%20")}&spotify_access_token=${access_token}`
                    // console.table({ query: track.name, got: fetchedTrack.name, new_url: _url })
                    // console.log("track", track, "fetchedTrack", fetchedTrack)
                    return this.fetchWrapper(_url, track, index, true)
                }


                // Wait For Track
                let counter = 0
                while (true) {
                    console.log("WHEEEEEEEEEEEEEEEEEEEEEEE")
                    const [state, setState] = this.props.useState()
                    const hasTrack = state.today.length > index
                    if (hasTrack) break
                    if (counter === 1000) { counter = 0; break }
                    counter++
                }
                // Add duration
                const [state, setState] = this.props.useState()
                state.today[index].duration_ms = fetchedTrack.duration_ms

                // Add 2 Library
                // Add 2 Library
                const library = state.library
                const libraryHasTrack = library.find(e => fetchedTrack.name.toLowerCase() == e.name.toLowerCase())
                if (!libraryHasTrack || libraryHasTrack == "undefined") library.push({ id: fetchedTrack.id, name: track.name, artist: fetchedTrack.artists[0].name, image: track.image, url: fetchedTrack.external_urls.spotify, duration_ms: fetchedTrack.duration_ms })


                // Update State
                setState({ ...state })

                return results
            })
            .catch(err => {
                if (err) console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRR:", err)
            })
    }

    render() {
        const [state, setState] = this.props.useState()
        const { today: tracks } = state
        return (
            <div>
                {tracks.map((e, i) => <TopTrack track={e} index={i++} key={"history-" + i} />)}
            </div>
        )
    }
}
