export const doInitCart=(allCartItem)=>{
    return{
        type: 'INIT_CART',
        payload: allCartItem
    }
}
export const doAddToCart=(newCartItem)=>{
    return {
        type: 'ADD_TOCART',
        payload: newCartItem
    }
}

export const doUpdateCart=(updatedCartItem)=>{
    return{
        type: 'UPDATE_CART',
        payload: updatedCartItem
    }
}

export const doDeleteCart=(productid)=>{
    return{
        type: 'DELETE_CART_ITEM',
        payload: productid
    }
}
export const doDeleteAllCart=()=>{
    return{
        type: 'DELETE_ALLCART',
    }
}
