import React, { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import { addToDb, getStoredDb } from '../../utilities/fakedb';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [product, setProduct] = useProducts();
    const [card, setCard] = useState([]);
    
    useEffect(() =>{
       const storedCart = getStoredDb();
       const savedCart = [];
       for(const id in storedCart){
          const addedProduct = product.find(product => product.id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct)
          }
       }
       setCard(savedCart)
    },[product])
    const productAddToCard = (selectedProduct) => {
        let newCard = [];
        const exist = card.find(product => product.id === selectedProduct.id)
        if (!exist) {
            selectedProduct.quantity = 1;
            newCard = [...card, selectedProduct]
        }else{
            const rest = card.filter(product => product.id !== selectedProduct.id)
            exist.quantity = exist.quantity +1;
            newCard = [...rest, exist];
        }
        setCard(newCard);
        addToDb(selectedProduct.id)
     }
    return (
        <div className="product-container">
            <div className="products">
                <h2>Products : {product.length}</h2>
               <div className="grid">
                  {
                    product.map(product => <Product key={product.id} product={product} productAddToCard={productAddToCard}></Product>)
                  }
               </div>
            </div>
            <div className="product-card-box">
                <h3>Order Summary</h3>
                 <Card key={product.id} card={card}></Card>
            </div>
        </div>
    );
};

export default Shop;