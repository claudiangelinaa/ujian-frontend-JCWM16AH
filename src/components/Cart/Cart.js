import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doDeleteAllCart } from '../../actions/cart'
import { doAddHistories } from '../../actions/histories'
import { doEditProduct } from '../../actions/products'
import CartItem from './CartItem.js/CartItem'

const Cart = () => {
    const cart = useSelector(state => state.cartReducer)
    const products = useSelector(state=>state.productsReducer)
    const [dialogOpen,setDialogOpen]= useState(false)
    const dispatch=useDispatch()

    const handleCheckoutClick=()=>{
        setDialogOpen(true)
    }
    const handleClose=()=>{
        setDialogOpen(false)
    }

    const handleCheckout =()=>{
        let newHistories ={
            status: "belum dibayar",
            cart: cart

        }
        dispatch(doAddHistories(newHistories))
        axios.post("http://localhost:5000/histories",newHistories)

        dispatch(doDeleteAllCart())
        cart.map((cartItem)=>{
            axios.delete(`http://localhost:5000/cart/${cartItem.id}`)

        })
        cart.map((cartItem)=>{
            let index = products.findIndex((product)=>{
                return product.id === cartItem.id
            })

            let newProduct={
                ...products[index],
                stock: products[index].stock - cartItem.qty

            }
            dispatch(doEditProduct(newProduct))
            axios.patch(`http://localhost:5000/products/${cartItem.id}`,newProduct)
        })

        handleClose()
    }
    return (
        <>
        <div>
            <h2>Cart</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Subtotal</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((cartItem)=>{
                            return <CartItem cartItem={cartItem}/>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="secondary" onClick={handleCheckoutClick}>CHECKOUT</Button>

            <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
             >
            <DialogTitle id="form-dialog-title">CHECKOUT CONFIRMATION</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Are you sure?
                </DialogContentText>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCheckout}>OK</Button>
            </DialogActions>
        </Dialog>
        </div>
        </>
    )
}

export default Cart
