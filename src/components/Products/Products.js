import React from 'react'
import { useSelector } from 'react-redux'
import Product from './Product/Product'

const Products = () => {
    const products = useSelector(state => state.productsReducer)
    return (
        <div>
            <h2>Products</h2>
            {products.map((product)=>{
                return <Product product={product}/>
            })}
        </div>
    )
}

export default Products
