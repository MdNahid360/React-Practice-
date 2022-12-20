import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name, img, price, quantity} = props.product;
    return (
        <div className='flex'>
            <img src={img} alt="" />
            <div className="details">
                <h4 className='text-blue-900'>{name}</h4>
                <p>price: ${price}</p>
                <b>Quantity: {quantity}</b>
            </div>
            <button className='delete'>
                Delete
            </button>
        </div>
    );
};

export default ReviewItem;