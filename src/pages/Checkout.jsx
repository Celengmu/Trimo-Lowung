import { Container, Form, Button } from "react-bootstrap"
import { useCart } from "../context/CartContext"

export default function Checkout() {
  const { cart, total, clearCart } = useCart()

  const handleOrder = (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const address = e.target.address.value
    const method = e.target.method.value
    const note = e.target.note.value

    if (cart.length === 0) {
      alert("Keranjang masih kosong")
      return
    }

    // ===== SUSUN NOTA =====
    let message = `*NOTA PEMESANAN*%0A`
    message += `--------------------%0A`

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}%0A`
if (item.level) {
  message += `   🌶 Level: ${item.level}%0A`
}
      message += `   Qty : ${item.qty}%0A`
      message += `   Harga : Rp ${item.price.toLocaleString()}%0A`
      message += `   Subtotal : Rp ${(item.price * item.qty).toLocaleString()}%0A`
    })

    message += `--------------------%0A`
    message += `*Total : Rp ${total.toLocaleString()}*%0A%0A`

    message += `Nama : ${name}%0A`
    message += `Alamat : ${address}%0A`
    message += `Metode : ${method}%0A`

    if (note.trim() !== "") {
      message += `Catatan : ${note}%0A`
    }

    message += `%0A_Terima kasih telah 🙏_`

    // NOMOR WA (ganti dengan punyamu)
    const phone = "6281229648671"

    const url = `https://wa.me/${phone}?text=${message}`

    window.open(url, "_blank")

    // hapus keranjang setelah order
    clearCart()
  }

  return (
    <Container className="py-4" style={{ maxWidth: 600 }}>
      <h4 className="mb-3 text-center">Checkout</h4>

      <Form onSubmit={handleOrder}>
        <Form.Group className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control name="name" required placeholder="Nama pemesan" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            name="address"
            required
            placeholder="Alamat lengkap"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Metode Pengambilan</Form.Label>
          <Form.Select name="method">
            <option>Ambil di tempat</option>
            <option>Diantar</option>
          </Form.Select>
        </Form.Group>

        {/* CATATAN */}
        <Form.Group className="mb-3">
          <Form.Label>Catatan (opsional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="note"
            placeholder="Contoh: tidak pedas, tanpa bawang, dll"
          />
        </Form.Group>

        <Button type="submit" className="w-100" variant="success">
          Pesan via WhatsApp
        </Button>
      </Form>
    </Container>
  )
}