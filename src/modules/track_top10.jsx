import React, { Component } from 'react'

export default class TrackTop10 extends Component {
    render() {
        const { track, index } = this.props
        return (
            <div className="level">
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
        )
    }
}
