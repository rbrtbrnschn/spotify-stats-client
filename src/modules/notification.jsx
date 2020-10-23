import React, { Component } from 'react'

export default class Notification extends Component {
    render() {
        const { notification } = this.props
        const { isShowing, message, onClick, color } = notification
        const _isShowing = isShowing == "undefined" ? true : isShowing
        const _message = message || "Missing Text"
        const _color = color || "is-success"
        const _onClick = onClick || function () { alert('Please set last.fm username below and hit save.'); }

        return (<React.Fragment>
            {
                _isShowing
                    ?
                    // eslint-disable-next-line
                    <a onClick={_onClick}>
                        <div className={`notification is-light ${_color}`}>{_message}</div>
                    </a>
                    : ""

            }
        </React.Fragment>

        )
    }
}
