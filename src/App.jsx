import { CartProvider } from "./context/CartContext"
//import AppNavbar from "./components/AppNavbar"
import BottomNav from "./components/BottomNav"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Cart from "./components/Cart"
import Checkout from "./pages/Checkout"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

// ================================
// Wrapper untuk AnimatePresence
// Jangan lupa: useLocation harus di dalam BrowserRouter
// ================================
function AnimatedRoutes() {
  const location = useLocation() // 🔹 diganti dari versi sebelumnya
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </AnimatePresence>
  )
}

// ================================
// App utama
// ================================
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter> {/* 🔹 BrowserRouter harus paling luar */}
        <AnimatedRoutes /> {/* 🔹 panggil wrapper AnimatePresence */}
        <BottomNav />
      </BrowserRouter>
    </CartProvider>
  )
}