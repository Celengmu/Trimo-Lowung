import { Container } from 'react-bootstrap'
import MenuList from '../components/MenuList'
import { foods } from '../data/menu'

export default function Food() {
  return (
    <Container className="py-4">
      <h4>Menu Makanan</h4>
      <MenuList data={foods} />
    </Container>
  )
}