import React, { Component } from 'react'

export default class Track extends Component {
    render() {
        const { track, index } = this.props
        const last_played = track.date !== undefined ? new Date(`${track.date["#text"]} UTC`).toLocaleString() : "Currently playing............."

        return (
            <div className="level is-mobile">
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
        )
    }
}