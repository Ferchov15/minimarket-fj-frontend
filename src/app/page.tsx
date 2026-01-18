"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import ProductGrid from "./components/ProductGrid";

const API_URL = "https://minimarket-jk-backend.onrender.com/api/productos";

interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagenUrl?: string;
  stock: number;
  categoria?: string;
  createdAt?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [search, setSearch] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al obtener productos");

        const data = await res.json();
        const productosSeguros: Product[] = Array.isArray(data) ? data : [];

        setProducts(productosSeguros);

        // 🔥 categorías únicas
        const categoriasUnicas = [
          ...new Set(
            productosSeguros
              .map((p) => p.categoria)
              .filter(
                (c): c is string =>
                  typeof c === "string" && c.trim() !== ""
              )
          ),
        ];

        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Error:", error);
        setProducts([]);
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //  FILTRO + ORDEN (igual que admin)
  const productosFiltrados = products
    .filter((p) => {
      const coincideCategoria =
        categoriaActiva === "todas" || p.categoria === categoriaActiva;

      const coincideBusqueda =
        p.nombre.toLowerCase().includes(search.toLowerCase());

      return coincideCategoria && coincideBusqueda;
    })
    .sort((a, b) => {
      if (orden === "recientes")
        return (
          new Date(b.createdAt ?? "").getTime() -
          new Date(a.createdAt ?? "").getTime()
        );

      if (orden === "antiguos")
        return (
          new Date(a.createdAt ?? "").getTime() -
          new Date(b.createdAt ?? "").getTime()
        );

      return 0;
    })

  return (
    <div>
      <Navbar search={search} onSearch={setSearch} />

      <CategoryBar
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onSelect={setCategoriaActiva}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
          marginTop: "1rem",
        }}
      >
        <h2>Productos Destacables</h2>

        {/* FILTRO */}
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          style={{
            padding: "0.5rem 0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          <option value="recientes">Más recientes</option>
          <option value="antiguos">Más antiguos</option>
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando productos...</p>
      ) : (
        <ProductGrid
          products={productosFiltrados.map((p) => ({
            id: p.id,
            name: p.nombre,
            descripcion: p.descripcion,
            stock: p.stock,
            price: p.precio,
            image: p.imagenUrl || "/product-placeholder.png",
          }))}
        />
      )}

      {!loading && productosFiltrados.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            opacity: 0.7,
          }}
        >
          No se encontraron productos
        </p>
      )}
    </div>
  );
}
