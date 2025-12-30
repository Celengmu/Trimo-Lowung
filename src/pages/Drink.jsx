import { Container } from 'react-bootstrap'
import MenuList from '../components/MenuList'
import { drinks } from '../data/menu'

export default function Drink() {
  return (
    <Container className="py-4">
      <h4>Menu Minuman</h4>
      <MenuList data={drinks} />
    </Container>
  )
}