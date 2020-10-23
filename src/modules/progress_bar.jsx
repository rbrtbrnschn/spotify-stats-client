import React, { Component } from 'react'

export default class ProgressBar extends Component {
    render() {
        const { color, value, size } = this.props
        const _color = color || "is-info"
        const _size = size || "is-medium"
        const _value = value || ""
        const hasValue = _value !== ""
        const classes = `progress ${_size} ${_color}`
        return (
            <progress className={classes} {...hasValue ? { value: _value } : ""} max="100">15%</progress>
        )
    }
}
