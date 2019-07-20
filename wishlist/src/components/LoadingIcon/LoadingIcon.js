import React from 'react';
import './LoadingIcon.css'
import  icon from '../../img/Loading.png'
export default class LoadingIcon extends React.Component {
    render() {
        return (
            <div className="loadingArea">
                <img className="spinner" src={icon}/>
            </div>

        )
    }
}