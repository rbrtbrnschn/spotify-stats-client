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
        // if (state.topTracks.length > 0) return

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
        const sorted = sortAlg(topTracks).slice(0, limit)
        const library = state.library

        // Filter Out Existing Tracks In Library
        const newOnes = sorted.map(s => library.find(l => l.name.toLowerCase() == s.name.toLowerCase()) ? null : s)
        const makeCallsFor = newOnes.filter(e => e != null)
        console.log("newOnes", newOnes)
        console.log("makeCallsFor", makeCallsFor)

        // Get Spotify Track For Duration
        for (let index in makeCallsFor) {
            const track = makeCallsFor[index]
            const access_token = Cookies.get("spotify_access_token")
            const url = `${config.api}/v1/track?name=${track.name.toLowerCase().split(" ").join("%20")}&artist=${track.artist.name.split(" ").join("%20")}&spotify_access_token=${access_token}`
            console.log(url)
            this.fetchWrapper(url, track, index)
        }

        // Update State
        setState({ ...state, topTracks: sorted })
        return sorted
    }

    //  Auto Update State After Fetch
    fetchWrapper(url, track, index, refetch = false) {
        return fetch(url)
            .then(res => res.json())
            .then(results => {
                const fetchedTrack = results.tracks.items[0]
                const [state, setState] = this.props.useState()

                // Error Handling
                if (!fetchedTrack) return
                if (fetchedTrack.name.toLowerCase() != track.name.toLowerCase()) {
                    // Inner Error Handling

                    const _track = state.topTracks.find(t => t.name.toLowerCase() == track.name.toLowerCase())
                    const _index = state.topTracks.indexOf(_track)
                    state.topTracks[_index].duration_ms = 180000
                    console.log('_track', state.topTracks[_index])

                }

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
                // Add Missing Properties: duration, id
                const _track = state.topTracks.find(t => t.name.toLowerCase() == track.name.toLowerCase())
                const _index = state.topTracks.indexOf(_track)
                state.topTracks[_index].duration_ms = fetchedTrack.duration_ms

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
        const { topTracks: tracks } = state
        return (
            <div>
                {tracks.map((e, i) => <TopTrack track={e} index={i++} key={"history-" + i} />)}
            </div>
        )
    }
}

