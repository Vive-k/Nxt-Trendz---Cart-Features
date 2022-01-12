// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      console.log(cartList)

      const amountsOnEachQuantity = cartList.map(
        eachProduct => eachProduct.quantity * eachProduct.price,
      )

      console.log(amountsOnEachQuantity)

      return (
        <>
          <div className="summary-amount-container">
            <h1 className="order-text">Order Total: </h1>
            <h1 className="amount">
              {'  '}
              Rs{' '}
              {amountsOnEachQuantity.reduce(
                (totalCarrier, eachAmount) => totalCarrier + eachAmount,
              )}
            </h1>
          </div>
          <p className="no-of-items-at-checkout">
            {cartList.length} Items in cart
          </p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
