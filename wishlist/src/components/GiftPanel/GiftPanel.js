import React from 'react';
import './GiftPanel.css'
import  sharkpic from '../../img/shark.webp'
export default class GiftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.deleteWish = this.deleteWish.bind(this);
    }
    deleteWish = () => {
        console.log("pushed!!!");
        let bdy = {pid: this.props.pid};
        fetch('https://wishlist.kpacubo.xyz/wishlist',
            {
                method: "DELETE",
                mode: "cors",
                credentials: 'include',
                body:JSON.stringify(bdy),
            })
    };
    render() {
        return (
            <div className="Panel" >
                <div>
                    <img alt="" src={sharkpic}/>
                    <h1 className="GiftName">{this.props.name}</h1>
                    <h1 className="Price">{this.props.price}</h1>
                    <h1 className="Description">{this.props.description}</h1>
                </div>
                <button className="FavButton" onClick={this.deleteWish}> {this.props.buttonText} </button>
            </div>
        )
    }
}