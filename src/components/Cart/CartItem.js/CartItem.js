import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableCell, TableRow, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doDeleteCart, doUpdateCart } from '../../../actions/cart';
import axios from 'axios'
import Product from '../../Products/Product/Product';


const CartItem = ({cartItem}) => {
    const dispatch= useDispatch()
    
    const cart = useSelector(state => state.cartReducer)
    const products = useSelector(state => state.productsReducer)

    const [qty,setQty]= useState(cartItem.qty)
    const [dialogOpen, setDialogOpen]= useState(false)

    const handleEditClick=()=>{
        setDialogOpen(true)
    }

    const handleClose=()=>{
        setDialogOpen(false)
    }

    const handleEdit=()=>{
        let index= products.findIndex((product)=>{
            return product.id === cartItem.id
        })
        if(parseInt(products[index].stock)<parseInt(qty)){
            alert(`Qty tidak boleh melebihi stock. Silakan input ulang`)
            return
        }
        let newEditedCartItem={
            ...cartItem,
            qty: parseInt(qty),
            subtotal: cartItem.price*parseInt(qty)
        }
        dispatch(doUpdateCart(newEditedCartItem))
        axios.patch(`http://localhost:5000/cart/%{cartItem.id}`, newEditedCartItem)
        handleClose()
    }

    const handleDeleteCartItem=()=>{
        dispatch(doDeleteCart(cartItem.id))
        axios.delete(`http://localhost:5000/cart/${cartItem.id}`)
    }
    return (
            <>
            <TableRow >
                <TableCell>{cartItem.name}</TableCell>
                <TableCell >
                <img src={cartItem.image}/>
                </TableCell>
                <TableCell>{cartItem.price}</TableCell>
                <TableCell>{cartItem.qty}</TableCell>
                <TableCell>{cartItem.subtotal}</TableCell>
                <TableCell>
                    <Button variant="contained" color="primary" onClick={handleEditClick}>EDIT</Button>
                    <Button variant="contained" color="secondary" onClick={handleDeleteCartItem}>DELETE</Button>
                    </TableCell>
            </TableRow>
        
            <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit qty</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please Edit Qty</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="qty"
                        fullWidth
                        type="number"
                        defaultValue={qty}
                        onChange={e=>setQty(e.target.value)}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEdit}>OK</Button>
                </DialogActions>

            </Dialog>
            </>
    )
}

export default CartItem
