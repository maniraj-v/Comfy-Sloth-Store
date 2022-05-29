import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type === ADD_TO_CART){
    const {id, color, amount, product} = action.payload;
    const tempItem = state.cart.find((c) => c.id === id+color);
    if(tempItem){
        const updatedCart = state.cart.map((cartItem) =>{
          if(cartItem.id === id+color){
              let newAmount = cartItem.amount + amount;
              if(newAmount > cartItem.max){
                newAmount = cartItem.max;
              }
              return {...cartItem, amount: newAmount}
          }
          return cartItem
        })
        return {...state, cart: updatedCart}
    }else{
      const newItem = {
        id: id+color,
        name: product.name,
        color,
        amount,
        max: product.stock,
        price: product.price,
        image: product.images[0].url,
      }
      return {...state, cart:[...state.cart, newItem]}
    }
  }
  if(action.type === REMOVE_CART_ITEM){
    const restItems = state.cart.filter((cartItem) => cartItem.id !== action.payload)
    return {...state, cart:restItems}
  }
  if(action.type === CLEAR_CART){
    return {...state, cart:[]}
  }
  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    const {id, value} = action.payload;
    const updatedCart = state.cart.map((cartItem) =>{
        if(cartItem.id === id){
          let newAmount;
          if(value === 'add'){
            newAmount = cartItem.amount + 1 
            if(newAmount > cartItem.max){
              newAmount = cartItem.max
            }
          }
          if(value === 'sub'){
            newAmount = cartItem.amount - 1 
            if(newAmount < 1){
              newAmount = 1
            }
          }
          return {...cartItem, amount: newAmount}
        }
        return cartItem
    })
    return {...state, cart:updatedCart}
  }
  if(action.type === COUNT_CART_TOTALS){

    const {total_items, total_amount} = state.cart.reduce((total, cartItem) => {
        const {amount, price} = cartItem;
        total.total_items += amount;
        total.total_amount += (amount * price); 
        return total
    }, {total_items :0, total_amount:0})

    return {...state, total_amount, total_items}
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
