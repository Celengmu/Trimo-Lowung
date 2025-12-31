import { Container, Card, Table, Button } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"
import PageWrapper from "../components/PageWrapper"

export default function Cart() {
  const { cart, increase, decrease, removeItem, total } = useCart()

  if (cart.length === 0) {
    return (
      <PageWrapper>
        <Container className="py-4 text-center">
          <h5>Keranjang masih kosong</h5>
          <Link to="/menu" className="btn btn-outline-secondary mt-3">
            Kembali ke Menu
          </Link>
        </Container>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Container className="py-4">
        <h4 className="mb-3">🛒 Keranjang</h4>

        <Table bordered hover>
          <thead className="table-light text-brown">
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>
  {item.name}
  {item.level && (
    <div className="text-danger small">
      🌶 {item.level}
    </div>
  )}
</td>
                <td>Rp {item.price.toLocaleString()}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-secondary" size="sm" onClick={() => decrease(item.id)}>−</Button>
                    <strong>{item.qty}</strong>
                    <Button variant="outline-secondary" size="sm" onClick={() => increase(item.id)}>+</Button>
                  </div>
                </td>
                <td>Rp {(item.price * item.qty).toLocaleString()}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>✕</Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="text-end fw-bold">Total</td>
              <td colSpan={2} className="fw-bold">Rp {total.toLocaleString()}</td>
            </tr>
          </tfoot>
        </Table>

        <Link to="/checkout" className="btn btn-primary w-100 mt-3">
          Lanjut ke Checkout
        </Link>
      </Container>
    </PageWrapper>
  )
}