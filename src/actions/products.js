export const doInitProducts=(allProducts)=>{
    return{
        type: 'INIT_PRODUCTS',
        payload: allProducts
    }
}
export const doEditProduct=(editedProduct)=>{
    return{
        type: 'EDIT_PRODUCT',
        payload: editedProduct
    }
}