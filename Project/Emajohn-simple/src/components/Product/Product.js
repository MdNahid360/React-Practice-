import React from 'react';
import './Product.css'

const Product = (props) => {
    const { product, productAddToCard} = props;
    let {name, price, seller, img , ratings} = product;
     
    return (
        <div>
            <div className="product-card">
                 <div className="p-img-box">
                    <img src={img} alt="product" className="product-img" />
                 </div>
                 <h3 className="product-name">{name}</h3>
                 <h4 className="product-price">Price: ${price}</h4>
                <div className="abs">
                 <small>Manufacturer: {seller}</small><br />
                 <small>Rating: {ratings} start </small><br />
                 <button onClick={() => productAddToCard(product)} className="buy-btn">Buy Now <span> </span> 
                 </button>
                </div>
            </div>
        </div>
    );
};

export default Product;