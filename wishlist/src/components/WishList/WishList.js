import React from 'react';
import './WishList.css'
import  GiftPanel from '../GiftPanel/GiftPanel'
export default class WishList extends React.Component {
    render() {
        return (
                <div className="wishList">
                    <GiftPanel buttonText="Удалить"/>
                    <GiftPanel buttonText="Удалить"/>
                    <GiftPanel buttonText="Удалить"/>
                    <GiftPanel buttonText="Удалить"/>
                    <GiftPanel buttonText="Удалить"/>
                </div>

        )
    }
}