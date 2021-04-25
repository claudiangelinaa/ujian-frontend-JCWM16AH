const productsReducer = (state=[], action)=>{
    switch(action.type){
        case 'INIT_PRODUCTS':
            return action.payload
        case 'EDIT_PRODUCT':
            return state.map((product)=>{
                if(product.id !== action.payload.id){
                    return product
                }else{
                    return action.payload
                }
            })
        default:
            return state
    }
}
export default productsReducer