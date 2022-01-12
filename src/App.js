import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => {
      const productInCartList = prevState.cartList.find(
        each => each.id === product.id,
      )
      console.log(productInCartList)
      if (productInCartList === undefined) {
        return {cartList: [...prevState.cartList, product]}
      }
      return {
        cartList: prevState.cartList.map(eachProduct => {
          if (eachProduct.id === product.id) {
            return {...product, quantity: eachProduct.quantity + 1}
          }
          return eachProduct
        }),
      }
    })
    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          return {...eachProduct, quantity: eachProduct.quantity + 1}
        }
        return eachProduct
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      console.log(prevState.cartList)
      const productInCart = prevState.cartList.find(
        eachProduct => eachProduct.id === id,
      )
      console.log(productInCart)
      if (productInCart.quantity > 1) {
        return {
          cartList: prevState.cartList.map(eachProduct => {
            if (eachProduct.id === id) {
              return {...eachProduct, quantity: eachProduct.quantity - 1}
            }
            return eachProduct
          }),
        }
      }
      return {
        cartList: prevState.cartList.filter(
          eachProduct => eachProduct.id !== id,
        ),
      }
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachProduct => eachProduct.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
