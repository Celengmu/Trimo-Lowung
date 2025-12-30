import { useEffect, useState, useRef } from "react"
import { Nav } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { FaHome, FaUtensils, FaShoppingCart } from "react-icons/fa"
import { useCart } from "../context/CartContext"

export default function BottomNav() {
  const location = useLocation()
  const { cart } = useCart()
  const totalQty = cart.reduce((a, b) => a + b.qty, 0)
  const navRef = useRef(null)
  const [navHeight, setNavHeight] = useState(0)
  const [animate, setAnimate] = useState(false)
  const prevQtyRef = useRef(totalQty)

  useEffect(() => {
    if (navRef.current) setNavHeight(navRef.current.offsetHeight)
  }, [])

  useEffect(() => {
    const content = document.querySelector("#root")
    if (content) content.style.paddingBottom = `${navHeight}px`
  }, [navHeight])

  // animasi pop badge
  useEffect(() => {
    if (prevQtyRef.current !== totalQty) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 300)
      prevQtyRef.current = totalQty
      return () => clearTimeout(timer)
    }
  }, [totalQty])

  return (
    <div ref={navRef} className="bottom-nav d-md-none">
      <Nav className="justify-content-around">
        <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
          <FaHome />
          <small>Home</small>
        </Nav.Link>

        <Nav.Link as={Link} to="/menu" active={location.pathname === "/menu"}>
          <FaUtensils />
          <small>Menu</small>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/cart"
          className="position-relative"
          active={location.pathname === "/cart"}
        >
          <FaShoppingCart />
          {totalQty > 0 && (
            <span className={`badge bg-danger position-absolute top-0 start-100 translate-middle ${animate ? 'badge-pop' : ''}`}>
              {totalQty}
            </span>
          )}
          <small>Keranjang</small>
        </Nav.Link>
      </Nav>
    </div>
  )
}