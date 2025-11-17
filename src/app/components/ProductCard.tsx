"use client";

import { useCart } from "../../context/CartContext";

interface Product {
  id?: number;
  name: string;
  descripcion?: string;
  price: number | string;
  image: string;
  stock?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const priceNumber = Number(product.price) || 0;

  // Imagen por defecto si no existe
  const imageSrc = product.image?.trim()
    ? product.image
    : "/product-placeholder.png";

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

      <p
        style={{
          fontWeight: "bold",
          margin: "0.5rem 0",
          borderBottom: "1px solid black",
        }}
      >
        ${priceNumber.toFixed(2)}{" "}
        <span style={{ fontSize: "0.8rem" }}>Inc. IVA</span>
      </p>

      <div
        style={{
          borderBottom: "1px solid black",
          marginBottom: "0.5rem",
          paddingBottom: "0.4rem",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>Información del producto</p>
        <p style={{ margin: "0.2rem 0", fontSize: "0.85rem" }}>
          {product.descripcion ? product.descripcion : "Sin descripción"}
        </p>
        <p style={{ margin: 0, fontSize: "0.8rem" }}>
          Disponibilidad:{" "}
          <span
            style={{
              color: product.stock && product.stock > 0 ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {product.stock && product.stock > 0
              ? `${product.stock} unidades`
              : "Sin stock"}
          </span>
        </p>
      </div>

      <button
        style={{
          padding: "0.4rem 1rem",
          backgroundColor: "#0288d1",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#01579b")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#0288d1")
        }
        onClick={() => {

          addToCart({
            id: Number(product.id),
            name: product.name,
            price: priceNumber,
            image: product.image,
          });
        }}
      >
        + Agregar
      </button>
    </div>
  );
}
