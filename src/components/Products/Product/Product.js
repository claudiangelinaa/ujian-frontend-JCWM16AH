import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { doAddToCart, doUpdateCart } from '../../../actions/cart';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';


const useStyles = makeStyles({
  root: {
    maxWidth: 505,
    display:'inline-block',
    margin: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

const Product = ({product})=>{
    const dispatch=useDispatch()
    const cart = useSelector(state => state.cartReducer)
    const auth= useSelector(state=>state.authReducer)
    const history = useHistory()

    const [qty,setQty]= useState(1)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleAddToCartClick=()=>{
        if(!auth.isLogin){
            alert(`Harap login terlebih dahulu`)
            history.push("/login")
            return
        }
        
        setDialogOpen(true)
    }

    const handleClose=()=>{
        setDialogOpen(false)
    }
    const handleAddToCart=()=>{
        console.log(cart)
        let index= cart.findIndex((cartItem)=>{
            console.log(cartItem)
            console.log(cartItem.id , product.id)
            return cartItem.id === product.id

        })
        console.log(index)
        if(index>=0){
            if(parseInt(qty)+parseInt(cart[index].qty) > product.stock){
                alert(`Stok barang hanya ${product.stock}, silakan input ulang!`)
                return
            }
            let newSameItem = {
                id:product.id,
                name: product.name,
                price: product.price,
                image: product.img,
                qty: parseInt(cart[index].qty) + parseInt(qty),
                subtotal: product.price * (parseInt(cart[index].qty) + parseInt(qty))
            }
            dispatch(doUpdateCart(newSameItem))
            axios.patch(`http://localhost:5000/cart/${product.id}`,newSameItem)
        }else{
            if(parseInt(qty)>product.stock){
                alert(`Stok barang hanya ${product.stock}, silakan input ulang!`)
                return
            }
            let newDifferentItem ={
                id:product.id,
                name: product.name,
                price: product.price,
                image: product.img,
                qty: parseInt(qty),
                subtotal: product.price 
            }
            dispatch(doAddToCart(newDifferentItem))
            axios.post("http://localhost:5000/cart",newDifferentItem)
        }
        alert(`Anda berhasil memasukkan ${product.name} ke keranjang`)
        handleClose()
    }
    
    const classes = useStyles();
  
    return (
        <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="540"
            image={product.img}

          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography>
                {product.price}
            </Typography>
            <Typography>
                {product.stock}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="secondary" variant="contained" onClick={handleAddToCartClick}>
            ADD TO CART
          </Button>
        </CardActions>
      </Card>

        <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Input Qty</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Please input quantity
                </DialogContentText>
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
                <Button onClick={handleAddToCart}>OK</Button>
            </DialogActions>
        </Dialog>
        </>
    );
  }

export default Product;