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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1.5rem',
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  )
}
