"use client";
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <header
      style={{
        backgroundColor: '#e53935',
        padding: '0.8rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexWrap: 'wrap'
      }}
    >
      {/* Logo */}
      <Link href="/" className="text-white font-bold text-2xl hover:text-yellow-300 transition-colors duration-300">
        MINIMARKET J.K
      </Link>

      {/* Buscador */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          flexGrow: 1,
          justifyContent: 'center',
          maxWidth: '500px'
        }}
      >
        <input
          type="text"
          placeholder="Buscar producto"
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '70%',
            backgroundColor: '#fff'
          }}
        />
        <button
          style={{
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.4rem 0.6rem',
            cursor: 'pointer'
          }}
        >
          🔍
        </button>

        {/* Botón WhatsApp */}
        <button className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white flex items-center gap-2">
          Consultar por <FaWhatsapp size={18} />
        </button>
      </div>

      {/* Carrito */}
      <Link href="/carrito" className="relative">
        <FaShoppingCart size={39} className="text-white hover:text-gray-200 cursor-pointer" />
        <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full px-1">
          0
        </span>
      </Link>

      {/* Administrador */}
      <Link
        href="/admin"
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
      >
        Admin
      </Link>
    </header>
  )
}

