import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import PageTransition from "../components/PageTransition"
import bg from "../assets/img/pwa.png"

export default function Home() {
  return (
    <PageTransition>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.35),
            rgba(0,0,0,0.35)
          ), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container className="text-center text-white">
          <img
            src={bg}
            alt="Trimo Lowung"
            style={{
              maxWidth: 260,
              width: "80%",
              marginBottom: 20,
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          />

          <h2 className="fw-bold mt-3">Selamat Datang</h2>
          <h2 className="fw-bold mt-3">Jangan lupa jajan!</h2>
          <p className="mb-4">Silakan pilih menu favoritmu</p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/menu">
              <Button
                size="lg"
                style={{
                  background: "#c0392b",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: 14,
                  boxShadow: "0 6px 16px rgba(0,0,0,.3)",
                }}
              >
                Pesan Sekarang!
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </PageTransition>
  )
}