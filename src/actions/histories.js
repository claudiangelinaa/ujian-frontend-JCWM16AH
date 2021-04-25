export const doInitHistories = (allHistories)=>{
    return{
        type: 'INIT_HISTORIES',
        payload: allHistories
    }
}
export const doAddHistories = (newHistories)=>{
    return{
        type: 'ADD_HISTORIES',
        payload: newHistories
    }
}
export const doDeleteHistories = (historyid)=>{
    return{
        type: 'DELETE_HISTORIES',
        payload: historyid
    }
}