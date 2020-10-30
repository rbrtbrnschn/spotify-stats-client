import React, { Component } from 'react'

export default class Modal extends Component {
    render() {
        const classes = this.props.classes || ""
        return (
            <div className={"modal " + classes}>
                <div className="modal-background" onClick={this.props.handleClick}>

                </div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        {this.props.header}
                    </header>
                    <section className="modal-card-body">
                        {this.props.body}
                    </section>
                    <footer className="modal-card-foot">
                        {this.props.footer}
                    </footer>
                </div>
            </div>
        )
    }
}
