import { useEffect, useState } from "react"
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import headerImg from "../assets/img/header.jpg"

export default function AppNavbar() {
  const [show, setShow] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScroll && currentScroll > 80) {
        setShow(false) // scroll ke bawah → sembunyi
      } else {
        setShow(true) // scroll ke atas → tampil
      }

      setLastScroll(currentScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScroll])

  return (
    <Navbar
      sticky="top"
      className="p-0"
      style={{
        transition: "all 0.35s ease",
        transform: show ? "translateY(0)" : "translateY(-100%)",
        opacity: show ? 1 : 0,
        background: "transparent",
        zIndex: 1030,
      }}
    >
      <Link to="/" style={{ width: "100%" }}>
        <img
          src={headerImg}
          alt="Trimo Lowung"
          style={{
            width: "100%",
            height: "90px",     // ✅ TIDAK TERLALU TINGGI
            objectFit: "cover",
            display: "block",
          }}
        />
      </Link>
    </Navbar>
  )
}