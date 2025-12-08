"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductosAdminPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [filtroOrden, setFiltroOrden] = useState("recientes");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [categorias, setCategorias] = useState<string[]>([]);

  const router = useRouter();

  const cargarProductos = async () => {
    const res = await fetch("http://localhost:4000/api/productos");
    const data = await res.json();
    setProductos(data);

    // ✅ EXTRAER CATEGORÍAS ÚNICAS (SIN REPETIR)
    const categoriasUnicas = [
      ...new Set(
        data
          .map((p: any) => p.categoria)
          .filter((c: string) => c && c.trim() !== "")
      ),
    ];

    setCategorias(categoriasUnicas);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // ✅ FILTRO REAL COMBINADO
  const productosFiltrados = productos
    .slice()
    .sort((a, b) => {
      if (filtroOrden === "recientes")
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

      if (filtroOrden === "antiguos")
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

      return 0;
    })
    .filter((p) => (filtroOrden === "bajo-stock" ? p.stock < 10 : true))
    .filter((p) =>
      filtroCategoria === "todas" ? true : p.categoria === filtroCategoria
    );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Administración de Productos
        </h1>

        {/* BARRA SUPERIOR */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <Link
            href="/admin/productos/nuevo"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow"
          >
            + Nuevo Producto
          </Link>

          <div className="flex gap-4">
            {/* ✅ FILTRO DE ORDEN */}
            <select
              value={filtroOrden}
              onChange={(e) => setFiltroOrden(e.target.value)}
              className="border p-3 rounded-lg shadow"
            >
              <option value="recientes">Más recientes</option>
              <option value="antiguos">Más antiguos</option>
              <option value="bajo-stock">Stock &lt; 10</option>
            </select>

            {/* ✅ FILTRO DE CATEGORÍAS DINÁMICAS */}
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="border p-3 rounded-lg shadow"
            >
              <option value="todas">Todas las categorías</option>

              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productosFiltrados.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">${p.precio}</td>

                  <td
                    className={`p-3 ${
                      p.stock < 10
                        ? "text-red-600 font-bold"
                        : "text-green-700"
                    }`}
                  >
                    {p.stock}
                  </td>

                  <td className="p-3">
                    {p.categoria || "Sin categoría"}
                  </td>

                  <td className="p-3 flex gap-2">
                    <Link
                      href={`/admin/productos/editar/${p.id}`}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Editar
                    </Link>

                    <button
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                      onClick={async () => {
                        if (!confirm("¿Eliminar producto?")) return;

                        await fetch(
                          `http://localhost:4000/api/productos/${p.id}`,
                          { method: "DELETE" }
                        );

                        cargarProductos();
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {productosFiltrados.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-6 text-gray-500"
                  >
                    No hay productos con estos filtros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BOTÓN VOLVER */}
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard")}
          className="mt-8 bg-gray-700 text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-800 transition w-full shadow"
        >
          Volver al Panel Principal
        </button>
      </div>
    </div>
  );
}
