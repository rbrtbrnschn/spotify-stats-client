import React, { Component } from 'react'
import LandingPage from "./landingPage"
import History from "./history"
export default class NewHome extends Component {
    constructor(props) {
        super(props)
        // Helpers
        this.changeDisplay = this.changeDisplay.bind(this)
        this.handleSetLocalState = this.handleSetLocalState.bind(this)
        this.useLocalState = this.useLocalState.bind(this)

        // State
        this.displays = { landingPage: () => <LandingPage {...props} changeDisplay={this.changeDisplay} useState={this.useLocalState} />, history: () => <History {...props} changeDisplay={this.changeDisplay} useState={this.useLocalState} /> }
        this.state = {
            display: this.displays["landingPage"],
            localState: {}
        }
    }
    componentDidMount() {
        return
        // Cached LocalState
        const cachedLocalState = JSON.parse(localStorage.getItem("localState"))
        const { fetched } = cachedLocalState
        const isUp2Date = new Date(fetched).getHours() == new Date().getHours() && Math.abs(new Date(fetched).getMinutes() - new Date().getMinutes()) < 3
        if (isUp2Date) {
            console.log("cached", cachedLocalState)
            this.setState({ ...this.state, localState: { ...cachedLocalState } })
            this.changeDisplay("history")
        }
    }

    changeDisplay(displayName, params) {
        // Wrong Display Name
        if (!Object.keys(this.displays).includes(displayName)) return

        // Correct Display Name
        this.setState({ ...this.state, display: this.displays[displayName] })
    }

    handleSetLocalState(newLocalState) {
        localStorage.setItem("localState", JSON.stringify({ ...newLocalState }))
        this.setState({ ...this.state, localState: { ...newLocalState } })
    }
    useLocalState() {
        return [this.state.localState, this.handleSetLocalState]
    }


    render() {
        return (
            <div>
                {this.state.display()}
            </div>
        )
    }
}
