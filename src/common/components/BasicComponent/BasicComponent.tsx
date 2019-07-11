import React, { Component } from 'react'
import './BasicComponent.scss'

export default class BasicComponent extends Component {
    render() {
        return (
            <div className="basic-element">
            {this.props.children}
            </div>)
    }
}
