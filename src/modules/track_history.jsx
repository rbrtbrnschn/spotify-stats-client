import React, { Component } from 'react'
import { isMobile } from "react-device-detect"
import ImageModal from "./modal_image"
export default class Track extends Component {
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
        const last_played = track.date !== undefined ? new Date(`${track.date["#text"]} UTC`).toLocaleString() : "Currently playing............."

        return (
            <div>
                {!isMobile ?
                <div className="level is-mobile" onClick={this.handleClick}>
                    <div className="level-item level-left has-text-left">
                        {index + 1}
                        <a href={track.url} className="ml-1 mr-5">
                            <img src={track.image[1]["#text"]} alt={track.name} className="image" />
                        </a>
                        {track.artist["#text"]}
                    </div>
                    <div className="level-item has-text-centered">
                        {track.name}
                    </div>
                    <div className="level-item level-right has-text-right">
                        {last_played}
                    </div>
                </div>
                :
                <div className="level is-mobile" onClick={this.handleClick}>
                        <div className="level-left">
                            {index + 1}
                            <a href={track.url} className="ml-1 mr-5">
                                <img src={track.image[1]["#text"]} alt={track.name} className="image" />
                            </a>
                            {track.name}
                        </div>



                    </div>
                }
                <ImageModal classes={this.state.hasBeenClicked ? "is-active" : ""} handleClick={this.handleClick} src={track.image[3]["#text"]} alt={track.name}/>
            </div>
        )
    }
}