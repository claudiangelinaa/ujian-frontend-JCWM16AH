export const doInitAuth=(authStatus)=>{
    return {
        type: 'INIT_AUTH',
        payload: authStatus
    }
}

export const doToggleLogin=(authStatus)=>{
    return {
        type: 'TOGGLE_LOGIN',
        payload: authStatus
    }
}