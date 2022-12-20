import { useEffect, useState } from "react"

const useProducts = () => {
    const [products, setUseProducts] = useState([])
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setUseProducts(data))
    },[])

    return [products, setUseProducts]
}
export default useProducts;