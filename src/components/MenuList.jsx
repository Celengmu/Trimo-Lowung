import { Card, Button, Badge } from "react-bootstrap"
import { motion } from "framer-motion"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function MenuList({ data }) {
  const { cart, addItem, increase, decrease } = useCart()

  // simpan level per menu
  const [levelMap, setLevelMap] = useState({})

  const getQty = (id, level) => {
    const item = cart.find(i => i.id === `${id}-${level}`)
    return item ? item.qty : 0
  }

  const handleAdd = (item) => {
    const level = levelMap[item.id]

    if (item.levels && !level) {
      alert("Pilih level pedas dulu")
      return
    }

    addItem({
      ...item,
      level,
      id: item.levels ? `${item.id}-${level}` : item.id
    })

    // ✅ AUTO RESET LEVEL SETELAH TAMBAH
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

                {/* 🔥 SLIDER LEVEL PEDAS */}
                {item.levels && (
                  <>
                    <label className="small fw-semibold">
                      Level pedas:
                      <span className="text-danger ms-1">
                        {levelMap[item.id] || "-"}
                      </span>
                    </label>

                    <input
                      type="range"
                      min="1"
                      max={item.levels.length}
                      step="1"
                      value={levelMap[item.id] || ""}
                      onChange={(e) =>
                        setLevelMap({
                          ...levelMap,
                          [item.id]: `Pedas ${e.target.value}`
                        })
                      }
                      className="form-range"
                    />
                  </>
                )}

                <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() =>
                      decrease(
                        item.levels
                          ? `${item.id}-${levelMap[item.id]}`
                          : item.id
                      )
                    }
                    disabled={item.levels && !levelMap[item.id]}
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