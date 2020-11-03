import React, { Component } from 'react'
import BigHero6 from "../modules/hero_big"
import ProgressBar from "../modules/progress_bar"
import isAuth from '../snippets/isAuth'
import hasSavedUsername from "../snippets/hasSavedUsername"
import config from "../config"
import Cookies from "js-cookie"
import Notification from "../modules/notification"


export default class LandingPage extends Component {
    constructor(props) {
        super(props)

        // Take This Up A Notch
        const progressBar = <ProgressBar />
        this.handleBigHeroClick = this.handleBigHeroClick.bind(this)
        this.state = { hero: { message: "Get History", onClick:this.handleBigHeroClick }, progressBar: { isShowing: false, component: progressBar }, notification: { isShowing: false, message: "" } }
    }
    componentDidMount() {
        // Cached LocalState
        const cachedLocalState = JSON.parse(localStorage.getItem("localState")) || { fetched: 0 }
        const { fetched } = cachedLocalState
        const isUp2Date = new Date(fetched).getHours() == new Date().getHours() && Math.abs(new Date(fetched).getMinutes() - new Date().getMinutes()) < config.cacheUp2DateForMin

        // Set State If Cached LocalState Is Up2Date
        if (isUp2Date) {
            const [state, setState] = this.props.useState()
            setState({ ...cachedLocalState })

            // Trust Me... It Is Necessary
            setTimeout(() => {
                // Auto Redirect To History
                // Add Last Display If You Want
                this.props.changeDisplay("history")
            }, 0)
        }

        if (!isAuth()) {
            return this.setState({ ...this.state, notification: { isShowing: true, message: "Click here to login with spotify.", onClick: this.handleLogin } })
        }
        if (!hasSavedUsername()) {
            return this.setState({ ... this.state, notification: { isShowing: true, message: "Click here to set your last.fm username.", onClick: () => this.goTo("profile") } })
        }
    }

    async handleBigHeroClick() {
        // Checks For Authentication
        if (!isAuth()) return this.handleLogin()
        // Checks For Saved Username
        if (!hasSavedUsername()) return this.goTo("profile")

        // Update Message
        const newState = { ...this.state, hero: { message: "This may take a while.", onClick:()=>null }, progressBar: { isShowing: true, component: <ProgressBar value={""} /> } }
        this.setState(newState)

        // Cycle through messages
        let counter = 0
        const timer = setInterval(()=>{
            // All Messages
            let messages = ["If this takes longer than 1 minute, please refresh.","Last.fm is being terribly slow again. We appologize."]
            let message = messages[counter] || newState.hero.message
            
            // Update State Accordingly
            const _newState = {...newState, hero:{message: message}}
            this.setState(_newState)
            counter++
        },5000)

        // Callback On Get History
        // eslint-disable-next-line
        const [state, setState] = this.props.useState()
        const history = await this.getHistory()
        clearInterval(timer)

        // If Error Occurred
        if (history.hasErrored) {
            // TODO
            const progressBar = <ProgressBar value={100} color="is-danger" />
            const errorMessage = "An error occured. Unfortunately we do not know what to do."
            this.setState({ ...this.state, hero: { ...this.state.hero, message: errorMessage }, progressBar: { isShowing: true, component: progressBar } })
        }
        // Expected Outcome
        else {
            // Finish Progressbar
            // Set Message
            const progressBar = <ProgressBar value={100} color="is-success" />
            const completedMessage = `Gathered ${history.recenttracks.track.length} tracks.`
            this.setState({ ...this.state, progressBar: { isShowing: true, component: progressBar }, hero: { ...this.state.hero, message: completedMessage } })

            /*
            Why A Timeout?
            Given Simultanious State Changes Across All Levels
            ProgressBar Update Is Not Visible
            */
            setTimeout(() => {
                // Set LocalState
                const cachedLocalState = JSON.parse(localStorage.getItem("localState"))
                const library = cachedLocalState !== null ? cachedLocalState.library : []
                setState({ history: history.recenttracks.track, topTracks: [], today: [], placeholder: [], library: library, fetched: Date.now() })

                // Change To History Page
                this.props.changeDisplay("history")
            }, 500)

        }
    }

    getHistory() {
        // No Error Handling

        // Url
        const base = `${config.api}/v1/history`
        const user = localStorage.getItem("lastfm_username")
        const access_token = Cookies.get("spotify_access_token")
        const url = `${base}?spotify_access_token=${access_token}&user=${user}`

        // Fetch
        return fetch(url)
            .then(res => res.json())
            .then(results => {
                return results
            })
            .catch(err => {
                if (err) return { ...err, hasErrored: true }
            })
    }

    goTo(route) {
        window.location.href = `${config.domain}/${route}`
    }

    handleLogin() {
        window.location.href = `${config.api}/auth`
    }

    render() {
        return (
            <div>
                <Notification notification={this.state.notification} />
                <BigHero6 handleClick={this.handleBigHeroClick} hero={this.state.hero} progressBar={this.state.progressBar} />
            </div>
        )
    }
}
