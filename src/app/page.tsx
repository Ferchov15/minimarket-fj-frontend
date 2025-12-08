"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import ProductGrid from "./components/ProductGrid";

// URL directa al backend (cuando subas a Render, solo cambia esta línea)
const API_URL = "http://localhost:4000/api/productos";

interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagen?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde el backend al iniciar
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <CategoryBar />
      <h2 style={{ marginLeft: "2rem" }}>Productos Destacables</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando productos...</p>
      ) : (
        <ProductGrid
          products={products.map((p) => ({
            id: p.id,
            name: p.nombre,
            descripcion: p.descripcion,
            stock: p.stock,
            price: p.precio,
            image: p.imagenUrl || "/product-placeholder.png",
          }))}
        />
      )}
    </div>
  );
}
