import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doDeleteHistories } from '../../../actions/histories'
import { doEditProduct } from '../../../actions/products'

export const History = ({history}) => {
    const dispatch=useDispatch()
    const products = useSelector(state => state.productsReducer)
    const histories = useSelector(state => state.historiesReducer)

    const handleCancelOrderClick=(historyid)=>{
        dispatch(doDeleteHistories(historyid))
        axios.delete(`http://localhost:5000/histories/${historyid}`)

        let index = histories.findIndex((history)=>{
            return historyid === history.id
        })

        histories[index].cart.map((cartItem)=>{
            let index=products.findIndex((product)=>{
                return product.id === cartItem.id
            })
            let newProduct={
                ...products[index],
                stock: products[index].stock + parseInt(cartItem.qty)
            }

            dispatch(doEditProduct(newProduct))
            axios.patch(`http://localhost:5000/products/${cartItem.id}`,newProduct)
        })
    }

    return (

            <TableRow>
                <TableCell>
                    {history.id}
                </TableCell>

                <TableCell>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Product Qty</TableCell>
                                <TableCell>Product Subtotal</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {history.cart.map((historyCartItem)=>{
                                return(
                                    <TableRow>
                                        <TableCell>{historyCartItem.name}</TableCell>
                                        <TableCell>{historyCartItem.price}</TableCell>
                                        <TableCell>{historyCartItem.qty}</TableCell>
                                        <TableCell>{historyCartItem.subtotal}</TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableCell>
                <TableCell>
                {history.status}                
                </TableCell>
                <TableCell>
                    <Button variant="contained" color="secondary" onClick={()=>{handleCancelOrderClick(history.id)}}>BATALKAN PESANAN</Button>
                </TableCell>
            </TableRow>

    )
}
