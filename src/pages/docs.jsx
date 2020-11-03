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
                                3. If you don't have a <a href="https://www.last.fm"><strong>Last.fm</strong></a> account, be sure to create one and link your spotify account there.<br />
                                <br/>
                                You are all set and done.<br />
                                Click <strong>Home</strong> and get your <em>complete</em> Spotify history.

                                <br/>
                                <div className="button is-info mt-5"><a href="https://www.last.fm/about/trackmymusic#spotify">Link Last.fm Account</a></div>

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
