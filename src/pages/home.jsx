import React, { Component } from 'react'
import LandingPage from "./landingPage"
import History from "./history"
import Cookie from "js-cookie"
import config from "../config"
export default class NewHome extends Component {
    constructor(props) {
        super(props)
        // Helpers
        this.changeDisplay = this.changeDisplay.bind(this)
        this.handleSetLocalState = this.handleSetLocalState.bind(this)
        this.useLocalState = this.useLocalState.bind(this)
        this.libraryAddIf = this.libraryAddIf.bind(this)

        // State
        this.displays = {
            landingPage: () => <LandingPage {...props} changeDisplay={this.changeDisplay} useState={this.useLocalState} />,
            history: () => <History {...props} changeDisplay={this.changeDisplay} useState={this.useLocalState} libraryAddIf={this.libraryAddIf} />
        }
        this.state = {
            display: this.displays["landingPage"],
            localState: { library: [] }
        }
    }

    componentDidMount() {
        // Check If First Ever Visit
        const cookie = Cookie.get("first_login")
        if (cookie) return

        // Reroute To /docs If First Login
        Cookie.set("first_login", "false")
        window.location.href = `${config.domain}/docs`
    }
    changeDisplay(displayName, params) {
        // Wrong Display Name
        if (!Object.keys(this.displays).includes(displayName)) return

        // Correct Display Name
        this.setState({ ...this.state, display: this.displays[displayName] })
    }

    handleSetLocalState(newLocalState) {
        // Add 2 Library Wrapper
        // TODO Add check if track in library 
        // If true; dont call api && use track.duration_ms
        localStorage.setItem("localState", JSON.stringify({ ...newLocalState }))
        this.setState({ ...this.state, localState: { ...newLocalState } })
    }
    useLocalState() {
        return [this.state.localState, this.handleSetLocalState]
    }

    libraryAddIf(track) {
        // Initialization
        const library = this.state.localState.library
        const newLibrary = [...library]
        const hasTrack = library.find(t => t.name == track.name)
        console.log("name", track.name, hasTrack)
        // Error Handling
        if (!hasTrack) newLibrary.push({ id: track.id, name: track.name, artist: track.artist, image: track.image, url: track.url, duration_ms: track.duration_ms })
        if (library === newLibrary) return

        // Update LocalState
        this.handleSetLocalState({ ...this.state.localState, library: [...newLibrary] })
    }


    render() {
        return (
            <div>
                {this.state.display()}
            </div>
        )
    }
}
