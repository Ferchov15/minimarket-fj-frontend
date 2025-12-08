"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

interface Product {
  id?: number;
  name: string;
  descripcion?: string;
  price: number | string;
  descuento?: number | string;
  image: string;
  stock?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cartItems } = useCart();

  const priceNumber = Number(product.price) || 0;
  const descuentoNumber = Number(product.descuento) || 0;
  const productId = Number(product.id);

  // ✅ Precio final con descuento aplicado
  const precioFinal =
    descuentoNumber > 0
      ? priceNumber - (priceNumber * descuentoNumber) / 100
      : priceNumber;

  const imageSrc = product.image?.trim()
    ? product.image
    : "/product-placeholder.png";

  // Stock visible (solo en pantalla)
  const [stockVisible, setStockVisible] = useState(product.stock ?? 0);

  // 🟣 Recalcular stock en tiempo real dependiendo del carrito
  useEffect(() => {
    const enCarrito =
      cartItems.find((p: any) => Number(p.id) === productId)?.quantity || 0;

    const totalOriginal = product.stock ?? 0;
    const restante = totalOriginal - enCarrito;

    setStockVisible(restante >= 0 ? restante : 0);
  }, [cartItems, product.stock, productId]);

  // 🛒 Agregar al carrito
  const handleAdd = () => {
    if (stockVisible <= 0) return;

    addToCart({
      id: productId,
      name: product.name,
      price: precioFinal, // ✅ se guarda con descuento aplicado
      stock: product.stock ?? 0,
      image: product.image,
    });

    setStockVisible((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div
      style={{
        backgroundColor: "#4dd0e1",
        padding: "1rem",
        borderRadius: "10px",
        width: "220px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transition: "transform 0.2s",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "130px" }}>
        <img
          src={imageSrc}
          alt={product.name}
          style={{ width: "100%", height: "130px", objectFit: "contain" }}
        />
      </div>

      <p
        style={{
          fontWeight: "bold",
          fontSize: "1rem",
          margin: "0.6rem 0 0.3rem 0",
          textTransform: "capitalize",
        }}
      >
        {product.name}
      </p>

      {/* ✅ PRECIO CON DESCUENTO */}
      <p
        style={{
          fontWeight: "bold",
          margin: "0.5rem 0",
          borderBottom: "1px solid black",
        }}
      >
        {descuentoNumber > 0 && (
          <span
            style={{
              textDecoration: "line-through",
              marginRight: "6px",
              fontSize: "0.85rem",
              color: "#444",
            }}
          >
            ${priceNumber.toFixed(2)}
          </span>
        )}

        ${precioFinal.toFixed(2)}{" "}
        <span style={{ fontSize: "0.8rem" }}>Inc. IVA</span>
      </p>

      {/* ✅ ETIQUETA DE DESCUENTO */}
      {descuentoNumber > 0 && (
        <p
          style={{
            color: "darkred",
            fontWeight: "bold",
            fontSize: "0.8rem",
            marginBottom: "4px",
          }}
        >
          🔥 {descuentoNumber}% de descuento
        </p>
      )}

      <div
        style={{
          borderBottom: "1px solid black",
          marginBottom: "0.5rem",
          paddingBottom: "0.4rem",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>Información del producto</p>

        <p style={{ margin: "0.2rem 0", fontSize: "0.85rem" }}>
          {product.descripcion || "Sin descripción"}
        </p>

        <p style={{ margin: 0, fontSize: "0.8rem" }}>
          Disponibilidad:{" "}
          <span
            style={{
              color: stockVisible > 0 ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {stockVisible > 0 ? `${stockVisible} unidades` : "Sin stock"}
          </span>
        </p>
      </div>

      <button
        disabled={stockVisible === 0}
        style={{
          padding: "0.4rem 1rem",
          backgroundColor: stockVisible === 0 ? "#9e9e9e" : "#0288d1",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: stockVisible === 0 ? "not-allowed" : "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          stockVisible > 0 &&
          (e.currentTarget.style.backgroundColor = "#01579b")
        }
        onMouseLeave={(e) =>
          stockVisible > 0 &&
          (e.currentTarget.style.backgroundColor = "#0288d1")
        }
        onClick={handleAdd}
      >
        {stockVisible === 0 ? "Sin stock" : "+ Agregar"}
      </button>
    </div>
  );
}
