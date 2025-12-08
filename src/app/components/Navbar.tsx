"use client";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { getTotalItems } = useCart(); // 👈 usamos la nueva función del contexto

  return (
    <header
      style={{
        backgroundColor: "#e53935",
        padding: "0.8rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        flexWrap: "wrap",
      }}
    >
      {/* Logo / Nombre */}
      <Link
        href="/"
        className="text-white font-bold text-2xl hover:text-yellow-300 transition-colors duration-300"
      >
        MINIMARKET J.K
      </Link>

      {/* 🔍 Buscador y botón de WhatsApp */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          flexGrow: 1,
          justifyContent: "center",
          maxWidth: "500px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar producto"
          style={{
            padding: "0.4rem 0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "70%",
            backgroundColor: "#fff",
          }}
        />
        <button
          style={{
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.4rem 0.6rem",
            cursor: "pointer",
          }}
        >
          🔍
        </button>

        <button className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white flex items-center gap-2">
          Consultar por <FaWhatsapp size={18} />
        </button>
      </div>

      {/* 🛒 Carrito con contador */}
      <Link href="/carrito" className="relative">
        <FaShoppingCart
          size={39}
          className="text-white hover:text-gray-200 cursor-pointer"
        />
        <span
          className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full px-1"
          style={{ minWidth: "18px", textAlign: "center" }}
        >
          {getTotalItems()} {/* 👈 contador dinámico del carrito */}
        </span>
      </Link>

      {/* Botón admin */}
      <Link
        href="/admin"
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
      >
        Iniciar Sesion
      </Link>
    </header>
  );
}
