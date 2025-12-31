import { Card, Button, Badge } from "react-bootstrap"
import { motion } from "framer-motion"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function MenuList({ data }) {
  const { cart, addItem, decrease } = useCart()
  const [levelMap, setLevelMap] = useState({})

  // Ambil qty sesuai item (dengan / tanpa level)
  const getQty = (item) => {
    if (item.levels) {
      const level = levelMap[item.id]
      if (!level) return 0
      const found = cart.find(i => i.id === `${item.id}-${level}`)
      return found ? found.qty : 0
    } else {
      const found = cart.find(i => i.id === item.id)
      return found ? found.qty : 0
    }
  }

  const handleAdd = (item) => {
    if (item.levels) {
      const level = levelMap[item.id]
      if (!level) {
        alert("Silakan pilih level pedas")
        return
      }

      addItem({
        ...item,
        id: `${item.id}-${level}`,
        level
      })
    } else {
      addItem(item)
    }
  }

  const handleDecrease = (item) => {
    if (item.levels) {
      const level = levelMap[item.id]
      if (!level) return
      decrease(`${item.id}-${level}`)
    } else {
      decrease(item.id)
    }
  }

  return (
    <div className="row g-3">
      {data.map((item, index) => (
        <div className="col-6 col-md-3" key={item.id}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <Card className="menu-card h-100 shadow-sm">
              <div style={{ position: "relative" }}>
                <Card.Img
                  src={item.image}
                  alt={item.name}
                  style={{ height: 150, objectFit: "cover" }}
                />

                {item.levels && getQty(item) > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {getQty(item)}
                  </Badge>
                )}
              </div>

              <Card.Body className="text-center">
                <Card.Title>{item.name}</Card.Title>
                <p className="fw-bold text-brown">
                  Rp {item.price.toLocaleString()}
                </p>

                {/* DROPDOWN LEVEL */}
                {item.levels && (
                  <select
                    className="form-select mb-2"
                    value={levelMap[item.id] || ""}
                    onChange={(e) =>
                      setLevelMap({
                        ...levelMap,
                        [item.id]: e.target.value
                      })
                    }
                  >
                    <option value="">Pilih Level</option>
                    {item.levels.map((lvl, i) => (
                      <option key={i} value={lvl}>
                        🌶 {lvl}
                      </option>
                    ))}
                  </select>
                )}

                <div className="d-flex justify-content-center align-items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => handleDecrease(item)}
                    disabled={item.levels && !levelMap[item.id]}
                  >
                    −
                  </Button>

                  <strong>{getQty(item)}</strong>

                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => handleAdd(item)}
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