import React, { Component } from 'react'
import config from "../config"

export default class Docs extends Component {
    render() {
        return (
            <div>

                <div className="hero is-link is-bold is-fullheight-with-navbar">
                    <div className="hero-body">
                        <div className="container is-widescreen">
                            <div className="title is-1">Statify</div>
                            <div className="subtitle">A Spotify-Last.fm Wrapper<br /><br />
                                1. First, login with spotify.<br />
                                2. Then go to <strong>/profile</strong> and link your <em>Last.fm</em> username.<br />
                                <br />
                                You are all set and done.<br />
                                Click <strong>Home</strong> and get your <em>complete</em> Spotify history.

                            </div>

                        </div>
                    </div>
                    <div className="hero-foot">
                        <nav className="tabs is-boxed">
                            <div className="container">
                                <ul>
                                    <li ><a href="/">Get History</a></li>
                                    <li ><a href="/profile">Profile</a></li>
                                    <li ><a href="/docs">Docs</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>


            </div >

        )
    }
}
