const historiesReducer = (state=[],action)=>{
    switch(action.type){
        case 'INIT_HISTORIES':
            return action.payload;
        case 'ADD_HISTORIES':
            return [...state, action.payload]
        case 'DELETE_HISTORIES':
            let newHistories= [...state]
            let index= newHistories.findIndex((history)=>{
                return history.id === action.payload

            })
            newHistories.splice(index,1)
            return newHistories
        default:
            return state
    }
}
export default historiesReducer;