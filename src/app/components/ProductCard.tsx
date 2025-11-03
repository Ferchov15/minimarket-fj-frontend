"use client";

interface Product {
  name: string
  price: number
  code: string
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      style={{
        backgroundColor: '#4dd0e1',
        padding: '1rem',
        borderRadius: '10px',
        width: '220px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s'
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: '130px', objectFit: 'contain' }}
      />
      <p style={{ fontWeight: 'bold', margin: '0.5rem 0', borderBottom: '1px solid black' }}>
        ${product.price.toFixed(2)} <span style={{ fontSize: '0.8rem' }}>Inc. IVA</span>
      </p>
      <div style={{ borderBottom: '1px solid black', marginBottom: '0.5rem' }}>
        <p style={{ margin: 0 }}>Información del producto</p>
        <p style={{ margin: 0, fontSize: '0.8rem' }}>cod: {product.code}</p>
      </div>
      <button
        style={{
          padding: '0.4rem 1rem',
          backgroundColor: '#0288d1',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#01579b')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0288d1')}
      >
        + Agregar
      </button>
    </div>
  )
}

