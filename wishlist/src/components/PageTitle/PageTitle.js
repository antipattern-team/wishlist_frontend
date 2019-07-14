import React from "react";
import './PageTitle.css'
export default class PageTitle extends React.Component {
    render() {
        return(
            <h1 className="PageTitle">{this.props.text}</h1>
        )
    }
}