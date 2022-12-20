import { useEffect, useState } from "react"
import { getStoredDb } from "../utilities/fakedb";

const useCart = (products) =>{
    const [card, setCard] = useState([]);
    useEffect(()=>{
        const storedCard = getStoredDb()
        const saveCard = [];
        for(const id in storedCard){
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                const quantity = storedCard[id];
                addedProduct.quantity = quantity;
                saveCard.push(addedProduct);
            }
        }
        setCard(saveCard)
    },[products]);
    return [card, setCard];
}
export default useCart;