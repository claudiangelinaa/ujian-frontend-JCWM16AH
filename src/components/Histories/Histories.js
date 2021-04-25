import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { History } from './History/History'

const Histories = () => {
    const histories = useSelector(state => state.historiesReducer)
    return (
        <div>
            <h2>Histories</h2>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Cart</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {histories.map((history)=>{
                        return <History history={history} />
                    })}
                </TableBody>
            </TableContainer>
        </div>
    )
}

export default Histories
