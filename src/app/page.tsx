import Navbar from './components/Navbar'
import CategoryBar from './components/CategoryBar'
import ProductGrid from './components/ProductGrid'

export default function Home() {
  const products = [
    {
      name: 'Sabritas',
      price: 0.65,
      code: '74784654654654',
      image: '/product-placeholder.png'
    },
    {
      name: 'Sabritas',
      price: 0.65,
      code: '74784654654654',
      image: '/product-placeholder.png'
    },
    {
      name: 'Sabritas',
      price: 0.65,
      code: '74784654654654',
      image: '/product-placeholder.png'
    }
  ]

  return (
    <div>
      <Navbar />
      <CategoryBar />
      <h2 style={{ marginLeft: '2rem' }}>Productos Destacables</h2>
      <ProductGrid products={products} />
    </div>
  )
}
