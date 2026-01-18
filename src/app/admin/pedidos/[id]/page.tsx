"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function PedidoDetalle({ params }: any) {
  const { id } = params;

  const [pedido, setPedido] = useState<any>(null);

  const fetchPedido = async () => {
    try {
      const res = await fetch(
        `https://minimarket-jk-backend.onrender.com/api/pedidos/${id}`
      );
      if (!res.ok) throw new Error("Error al obtener el pedido");
      const data = await res.json();
      setPedido(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPedido();
  }, []);

  if (!pedido) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 text-xl">
        Cargando pedido...
      </div>
    );
  }

  const metodoColor =
    pedido.metodoPago === "EFECTIVO"
      ? "bg-green-600"
      : pedido.metodoPago === "DEUNA"
      ? "bg-purple-600"
      : "bg-gray-500";

  return (
    <div className="min-h-screen bg-gray-200 text-black p-6">
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🧾 Detalle del Pedido
        </h1>

        {/* Info principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          <div className="border rounded-lg p-4">
            <p className="text-lg">
              <strong>Cliente:</strong> {pedido.nombreCliente}
            </p>
            <p className="text-lg">
              <strong>Estado:</strong> {pedido.estado}
            </p>
            <p className="text-lg">
              <strong>Total:</strong> ${pedido.total}
            </p>
          </div>

          <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
            <p className="text-lg font-semibold mb-3">Método de pago</p>

            <span
              className={`${metodoColor} text-white px-6 py-2 rounded-full text-lg font-bold shadow`}
            >
              {pedido.metodoPago || "No asignado"}
            </span>
          </div>
        </div>

        {/* Productos */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">🛒 Productos</h2>

          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-amber-600 text-white">
                <th className="border px-4 py-2">Producto</th>
                <th className="border px-4 py-2">Cantidad</th>
                <th className="border px-4 py-2">Precio</th>
              </tr>
            </thead>
            <tbody>
              {pedido.productos.map((prod: any, index: number) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{prod.nombre}</td>
                  <td className="border px-4 py-2">{prod.cantidad}</td>
                  <td className="border px-4 py-2">${prod.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/admin/pedidos"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
          >
            <FaArrowLeft />
            Volver a pedidos
          </Link>
        </div>
      </main>
    </div>
  );
}
