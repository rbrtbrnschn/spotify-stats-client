import React, { Component } from 'react'
import TrackHistory from "./track_history"
export default class HistoryTracks extends Component {
    render() {

        const [localState, setLocalState] = this.props.useState()
        const { history: tracks } = localState
        return (
            <div>
                {tracks.map((e, i) => <TrackHistory track={e} index={i++} key={"history-" + i} />)}

            </div>
        )
    }
}
