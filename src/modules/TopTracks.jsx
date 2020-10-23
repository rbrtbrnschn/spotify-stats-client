import React, { Component } from 'react'
import Cookies from "js-cookie"
import config from '../config'
import TopTrack from "./track_top10"
export default class TopTracks extends Component {
    constructor(props) {
        super(props)
        this.gatherTopTracks = this.gatherTopTracks.bind(this)
    }
    componentDidMount() {
        this.gatherTopTracks()

    }

    gatherTopTracks(args = { limit: 10, sortAlg: (arr) => arr.sort((a, b) => b.times_played - a.times_played) }) {
        // Deconstruct Args
        const limit = args.limit
        const sortAlg = args.sortAlg
        const [state, setState] = this.props.useState()

        // Error Handling
        if (state.topTracks.length > 0) return

        // Initialize
        const { history: tracks } = state
        let topTracks = []
        let uniqueTracks = 0

        for (let track of tracks) {
            const currentTrack = topTracks.find(t => t.name == track.name)

            if (!currentTrack) {
                // Continue If Reached Limit Of Unique Songs
                // if (uniqueTracks === limit) continue

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
                topTracks.push(newTrack)

                // Increment Counter
                uniqueTracks++
            }
            else {
                // Increment Play Time
                currentTrack.times_played++
            }

        }

        // Sort
        const sorted = sortAlg(topTracks).slice(0, limit)
        // Get Spotify Track For Duration
        for (let index in sorted) {
            const track = topTracks[index]
            const access_token = Cookies.get("spotify_access_token")
            const url = `${config.api}/v1/name2track?name=${track.name.split(" ").join("%20")}&spotify_access_token=${access_token}`
            this.fetchWrapper(url, track, index)
        }

        // Update State
        setState({ ...state, topTracks: sorted })
        return sorted
    }

    //  Auto Update State After Fetch
    fetchWrapper(url, track, index) {
        return fetch(url)
            .then(res => res.json())
            .then(results => {
                const fetchedTrack = results.tracks.items[0]

                // Error Handling
                if (!fetchedTrack) return

                // Wait For Track
                let counter = 0
                while (true) {
                    console.log("WHEEEEEEEEEEEEEEEEEEEEEEE", track)
                    const [state, setState] = this.props.useState()
                    const hasTrack = state.topTracks.length > index
                    if (hasTrack) break
                    if (counter === 1000) { counter = 0; break }
                    counter++
                }
                // Add duration
                const [state, setState] = this.props.useState()
                state.topTracks[index].duration_ms = fetchedTrack.duration_ms

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
        const { topTracks: tracks } = state
        return (
            <div>
                {tracks.map((e, i) => <TopTrack track={e} index={i++} key={"history-" + i} />)}
            </div>
        )
    }
}

