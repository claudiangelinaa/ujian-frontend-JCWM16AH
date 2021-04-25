const cartReducer= (state=[], action)=>{
    switch(action.type){
        case 'INIT_CART':
            return action.payload
        case 'ADD_TOCART':
            return [...state,action.payload]
        case 'UPDATE_CART':
            return state.map((product)=>{
                if(product.id !== action.payload.id){
                    return product
                }else{
                    return action.payload
                }
            })
        case 'DELETE_CART_ITEM':
            let newCartItem= [...state]
            let index= newCartItem.findIndex((cartItem)=>{
                return cartItem.id === action.payload
            })
            newCartItem.splice(index,1)
            return newCartItem
        case 'DELETE_ALLCART':
            return []
        default:
            return state
    }
}
export default cartReducer