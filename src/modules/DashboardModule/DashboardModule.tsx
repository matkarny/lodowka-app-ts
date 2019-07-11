import React, { Component } from 'react'
import './DashboardModule.scss'

export default class DashboardModule extends Component {
    render() {
        return (
            <div className="dashboard-module">
            {this.props.children}
            </div>
        )
    }
}
