import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" alt={"bulma"} width="112" height="28" />
                    </a>

                    {/* eslint-disable-next-line */}
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
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
                        <a className="navbar-item" href="/login">
                            Login
                        </a>


                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary" href="/login">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light" href="/login">
                                    Log in
          </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        )
    }
}