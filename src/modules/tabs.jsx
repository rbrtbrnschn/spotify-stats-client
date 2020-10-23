import React, { Component } from 'react'

export default class Tabs extends Component {
    render() {
        const { tabs } = this.props
        return (
            <div className="tabs is-centered">
                <ul>
                    {/* eslint-disable-next-line */}
                    {tabs.map(t => <li key={`tab-${t.name}`}><a onClick={t.onClick}>{t.name}</a></li>)}
                </ul>
            </div>
        )
    }
}
