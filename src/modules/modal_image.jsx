import React, { Component } from 'react'

export default class ModalImage extends Component {
    render() {
        const classes = this.props.classes || ""
        return (
            <div className={"modal "+classes}>
                <div className="modal-background" onClick={this.props.handleClick}></div>
                <div className="modal-content">
                    <p className="image ">
                    <img src={this.props.src} alt={this.props.alt} />
                    </p>
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        )
    }
}
