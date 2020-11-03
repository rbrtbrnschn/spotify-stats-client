import React, { Component } from 'react'
export default class BigHero6 extends Component {
    render() {
        const { message, onClick } = this.props.hero
        const { isShowing, component } = this.props.progressBar
        return (
            <div className="hero is-link is-fullheight-with-navbar" onClick={onClick}>
                <div className="hero-body">
                    <div className="container">
                        {/* eslint-disable-next-line */}
                        <a >
                            <div className="title">{message}</div>
                        </a>
                        <div className="subtitle">
                            {isShowing ? component : <div style={{ textIndent: "100%", whiteSpace: "nowrap", overflow: "hidden" }}>a</div>}

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
