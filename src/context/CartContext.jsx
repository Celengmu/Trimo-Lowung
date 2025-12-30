import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addItem = (item) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id)
      if (exist) {
        return prev.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const increase = id => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
    )
  }

  const decrease = id => {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
        .filter(i => i.qty > 0)
    )
  }

  const removeItem = id => {
    setCart(prev => prev.filter(i => i.id !== id))
  }
  
  const clearCart = () => setCart([])

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0)

return (
    <CartContext.Provider value={{ cart, addItem, increase, decrease, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)