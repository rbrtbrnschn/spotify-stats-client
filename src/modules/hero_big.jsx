import React, { Component } from 'react'
export default class BigHero6 extends Component {
    render() {
        const { message } = this.props.hero
        const { isShowing, component } = this.props.progressBar
        const { handleClick } = this.props
        return (
            <div className="hero is-link is-fullheight-with-navbar">
                <div className="hero-body">
                    <div className="container">
                        {/* eslint-disable-next-line */}
                        <a onClick={handleClick}>
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
