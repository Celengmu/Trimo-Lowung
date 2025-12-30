import { Card, Button, Badge } from "react-bootstrap"
import { motion } from "framer-motion"
import { useCart } from "../context/CartContext"
import { useState, useEffect } from "react"

export default function MenuList({ data }) {
  const { cart, addItem, increase, decrease } = useCart()
  const [popIds, setPopIds] = useState([])

  const getQty = (id) => {
    const item = cart.find(i => i.id === id)
    return item ? item.qty : 0
  }

  useEffect(() => {
    if (cart.length === 0) return
    cart.forEach(item => {
      if (item.qty > 0 && !popIds.includes(item.id)) {
        setPopIds(ids => [...ids, item.id])
        setTimeout(() => {
          setPopIds(ids => ids.filter(i => i !== item.id))
        }, 300)
      }
    })
  }, [cart])

  return (
    <div className="row g-3">
      {data.map((item, index) => (
        <div className="col-6 col-md-3" key={item.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="menu-card h-100">
              <div style={{ position: "relative" }}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: 150, objectFit: "cover" }}
                />
                {getQty(item.id) > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className={`position-absolute top-0 start-100 translate-middle badge-pop`}
                  >
                    {getQty(item.id)}
                  </Badge>
                )}
              </div>

              <Card.Body className="text-center">
                <Card.Title>{item.name}</Card.Title>
                <p className="text-brown fw-bold">
                  Rp {item.price.toLocaleString()}
                </p>

                <div className="d-flex justify-content-center align-items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => decrease(item.id)}
                    disabled={getQty(item.id) === 0}
                  >
                    −
                  </Button>

                  <strong>{getQty(item.id)}</strong>

                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => addItem(item)}
                  >
                    +
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </div>
      ))}
    </div>
  )
}