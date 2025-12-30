import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Food from './pages/Food'
import Drink from './pages/Drink'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Payment from './components/Payment'

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/food" element={<Food />} />
      <Route path="/drink" element={<Drink />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  )
}