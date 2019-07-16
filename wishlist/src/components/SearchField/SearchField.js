import React from 'react';
import './SearchField.css'
export default class SearchField extends React.Component {
    render() {
        return (
            <div className="Rectangle" >
                <input className="InputField" type="text" value={this.props.defaultCaption}/>
            </div>
        )
    }
}