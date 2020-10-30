import React, { Component } from 'react'
import Cookies from "js-cookie"
import config from "../config"
export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href={config.domain}>
                        <img src={`${config.api}/images/logo_blue_shadow_big.png`} alt={"statify"} />
                    </a>

                    {/* eslint-disable-next-line */}
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => {
                        document.querySelector('.navbar-menu').classList.toggle('is-active');
                    }}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/">
                            Home
      </a>

                        <a className="navbar-item" href="/profile">
                            Profile
      </a>
                        <a className="navbar-item" href="/docs">
                            Docs
                        </a>


                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {
                                    Cookies.get("spotify_access_token") === undefined ? <a className="button is-primary" href={`${config.api}/auth`}>
                                        <strong>Log in</strong>
                                    </a> : ""
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        )
    }
}
