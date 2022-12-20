import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import Card from '../Card/Card';
import Product from '../Product/Product';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
const Order = () => {
    const [product, setProduct] = useProducts()
    const [card, setCard] = useCart(product)
    console.log(product);
    return (
        <div className='shop2-container'>
             <div className="products2">
                {
                    product.map(product =><ReviewItem key={product.id} product={product}></ReviewItem>)
                }
             </div>
             <div className="cart2">
                  <Card card={card}></Card>
             </div>
        </div>
    );
};

export default Order;