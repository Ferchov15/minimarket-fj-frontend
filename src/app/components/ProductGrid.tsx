import ProductCard from './ProductCard'

interface Product {
  name: string
  descripcion?: string
  price: number
  image: string
  stock?: number
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '1rem'
      }}
    >
      {products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  )
}
