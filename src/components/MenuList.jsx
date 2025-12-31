import { Card, Button, Badge } from "react-bootstrap"
import { motion } from "framer-motion"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function MenuList({ data }) {
  const { cart, addItem, increase, decrease } = useCart()
  const [levelMap, setLevelMap] = useState({})

  // ambil qty berdasarkan id + level
  const getQty = (id, level) => {
    const item = cart.find(i => i.id === `${id}-${level}`)
    return item ? item.qty : 0
  }

  const handleAdd = (item) => {
    const level = levelMap[item.id]

    if (item.levels && !level) {
      alert("Silakan pilih level pedas dulu")
      return
    }

    addItem({
      ...item,
      id: item.levels ? `${item.id}-${level}` : item.id,
      level
    })

    // reset dropdown setelah klik +
    setLevelMap(prev => ({
      ...prev,
      [item.id]: ""
    }))
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

                {item.levels &&
                  levelMap[item.id] &&
                  getQty(item.id, levelMap[item.id]) > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {getQty(item.id, levelMap[item.id])}
                    </Badge>
                  )}
              </div>

              <Card.Body className="text-center">
                <Card.Title>{item.name}</Card.Title>
                <p className="fw-bold text-brown">
                  Rp {item.price.toLocaleString()}
                </p>

                {/* DROPDOWN LEVEL PEDAS */}
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
                    <option value="">Pilih level pedas</option>
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
                    disabled={item.levels && !levelMap[item.id]}
                    onClick={() =>
                      decrease(
                        item.levels
                          ? `${item.id}-${levelMap[item.id]}`
                          : item.id
                      )
                    }
                  >
                    −
                  </Button>

                  <strong>
                    {item.levels
                      ? getQty(item.id, levelMap[item.id])
                      : getQty(item.id)}
                  </strong>

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