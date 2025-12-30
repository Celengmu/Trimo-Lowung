import { Container } from "react-bootstrap"
import MenuList from "../components/MenuList"
import { foods, drinks } from "../data/menu"
import PageWrapper from "../components/PageWrapper"

export default function Menu() {
  return (
    <PageWrapper>
      <Container className="py-4">
        <h1 className="mb-3 text-center"> Menu Makanan</h1>
        <MenuList data={foods} />

        <h1 className="mt-5 mb-3 text-center">Menu Minuman</h1>
        <MenuList data={drinks} />
      </Container>
    </PageWrapper>
  )
}