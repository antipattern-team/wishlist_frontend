import React from 'react';
import './GiftPanel.css'
import  sharkpic from '../../img/shark.webp'
export default class GiftPanel extends React.Component {
    render() {
        return (
            <div className="Panel" >
                <div>
                    <img src={sharkpic}/>
                    <h1 className="GiftName">АКУЛА ИЗ ИКЕИ</h1>
                    <h1 className="Price">1 499.–</h1>
                    <h1 className="Description">Эта большая, но абсолютно безопасная синяя акула позволит вам познакомиться
                        с загадочным подводным миром. Она плавает очень далеко, ныряет глубоко и издалека услышит биение
                        вашего сердца.</h1>
                </div>
                <button className="FavButton"> {this.props.buttonText} </button>
            </div>
        )
    }
}