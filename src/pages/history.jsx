import React, { Component } from 'react'
import Tabs from "../modules/tabs"

import TopTracks from "../modules/TopTracks"
import HistoryTracks from "../modules/HistoryTracks"
import Today from "../modules/Today"

export default class History extends Component {
    constructor(props) {
        super(props)
        // Helpers
        this.changeDisplay = this.changeDisplay.bind(this)

        // State
        this.displays = {
            "history": () => <HistoryTracks {...props} useState={this.props.useState} />,
            "toptracks": () => <TopTracks {...props} useState={this.props.useState} />,
            "today": () => <Today {...props} useState={this.props.useState} />,
        }
        this.state = {
            display: this.displays["history"]
        }
    }

    changeDisplay(displayName) {
        // Wrong Display Name
        if (!Object.keys(this.displays).includes(displayName)) return

        // Correct Display Name
        this.setState({ ...this.state, display: this.displays[displayName] })
    }

    render() {
        const tabs = [
            { name: "history", onClick: () => this.changeDisplay("history") },
            { name: "today", onClick: () => this.changeDisplay("today") },
            { name: "top10", onClick: () => this.changeDisplay("toptracks") },
            { name: "placeholder", onClick: () => this.changeDisplay("placeholder") }
        ]
        return (
            <div className="container is-fullwidth">
                <Tabs tabs={tabs} />
                {this.state.display()}
            </div>
        )
    }
}
