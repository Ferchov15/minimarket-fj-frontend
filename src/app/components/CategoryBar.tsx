"use client";

export default function CategoryBar() {
  const categories = ['Lácteos', 'Bebidas', 'Comidas Chatarra'];

  return (
    <div
      style={{
        backgroundColor: '#b36a5e',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0.6rem 0',
        borderRadius: '0 0 50px 50px',
        marginBottom: '1rem'
      }}
    >
      {categories.map((cat, i) => (
        <button
          key={i}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            borderBottom: '3px solid transparent',
            transition: '0.3s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderBottom = '3px solid blue')}
          onMouseLeave={(e) => (e.currentTarget.style.borderBottom = '3px solid transparent')}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
