const authReducer = (state={
    isLogin: false,
    loginEmail: ''
},action)=>{
    switch(action.type){
        case 'INIT_AUTH':
            return action.payload
        case 'TOGGLE_LOGIN':
            return action.payload
        default:
            return state
    }
}

export default authReducer;