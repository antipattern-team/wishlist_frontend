import React from 'react';
import './GiftPanel.css'
export default class GiftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.manipulate = this.manipulate.bind(this);
    }
    manipulate = () => {
        let bdy = {pid: this.props.pid};
        fetch('https://wishlist.kpacubo.xyz/wishlist'+ this.props.friendId,
            {
                method: this.props.method,
                mode: "cors",
                credentials: 'include',
                body:JSON.stringify(bdy),
            })
    };

    render() {
        return (
            <div className="Panel" >
                <div>
                    <img alt="" src={this.props.image}/>
                    <h1 className="GiftName">{this.props.name}</h1>
                    <h1 className="Price">{this.props.price+".-"}</h1>
                    <h1 className="Description">{this.props.description}</h1>
                </div>
                <button className="FavButton" onClick={this.manipulate}> {this.props.buttonText} </button>
            </div>
        )
    }
}