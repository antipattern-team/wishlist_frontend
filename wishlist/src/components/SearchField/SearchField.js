import React from 'react';
import './SearchField.css'


export default class SearchField extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            results:[],
            isLoaded: false,
        }
    }


    render() {
        let  results =[];
        for ( let i = 0; i <Math.min(5, this.state.results); i++) {
            results.push(React.createElement(
                Option,{
                    name:this.state.results[i].name,
                }

            ))
        }
        return (
            <div className="Rectangle" >
                <input className="InputField" type="search" placeholder={this.props.defaultCaption} onChange={this.props.onChange} list="results"/>
            </div>
        )
    }
}