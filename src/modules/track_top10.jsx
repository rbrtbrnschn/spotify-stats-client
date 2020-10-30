import React, { Component } from 'react'
import { isMobile } from "react-device-detect"
import Modal from "./modal"
export default class TrackTop10 extends Component {
    constructor(props) {
        super(props)
        this.state = { hasBeenClicked: false }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.setState({ ...this.state, hasBeenClicked: !this.state.hasBeenClicked })
    }
    render() {
        const { track, index } = this.props
        const modalHead = <div>
            <div className="title">{track.name}</div>
            <div className="subtitle">By {track.artist.name}</div>
        </div>
        const modalBody = <div>

            <div className="title">Play Time</div>
            <div className="subtitle">
                <div className="tag is-medium is-primary">{track.times_played * track.duration_ms}ms</div><br />
                <div className="tag is-medium is-link">{Math.floor(track.times_played * track.duration_ms / 60000)}min<br /></div><br />
                <div className="tag is-medium is-link">{Math.floor(track.times_played * track.duration_ms / 60000 / 60)}h<br /></div><br />
                <div className="tag is-medium is-success">{Math.floor(track.times_played * track.duration_ms / 60000 / 60 / 24)}d</div><br />
            </div>
            <div className="subtitle">Played: {track.times_played} times</div>
            <div className="subtitle">Last Played: {new Date(track.last_played).toLocaleString()}</div>

        </div>
        return (
            <div>
                {!isMobile ?
                    <div className="level" onClick={this.handleClick}>
                        <div className="level-item level-left has-text-left">
                            {index + 1}
                            <a href={track.url} className="ml-1 mr-5">
                                <img src={track.image} alt={track.name} className="image" />
                            </a>
                            {track.name}

                        </div>
                        <div className="level-item level-right">

                        </div>
                        <div className="level-item level-right has-text-right">
                            {`${track.times_played}x - ${Math.floor(track.times_played * track.duration_ms / 60000)}min - ${track.last_played}`}
                        </div>
                    </div>

                    :
                    <div className="level is-mobile" onClick={this.handleClick}>
                        <div className="level-left">
                            {index + 1}
                            <a href={track.url} className="ml-1 mr-5">
                                <img src={track.image} alt={track.name} className="image" />
                            </a>
                            {track.name}
                        </div>



                    </div>
                }

                <Modal classes={this.state.hasBeenClicked ? "is-active" : ""} handleClick={this.handleClick} header={modalHead} body={modalBody} />
            </div>
        )
    }
}