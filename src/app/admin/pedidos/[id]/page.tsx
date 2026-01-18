"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function PedidoDetalle() {
  const { id } = useParams(); // ✅ AQUÍ ESTÁ LA CLAVE

  const [pedido, setPedido] = useState<any>(null);

  const fetchPedido = async () => {
    if (!id) return;

    try {
      const res = await fetch(
        `https://minimarket-jk-backend.onrender.com/api/pedidos/${id}`
      );

      if (!res.ok) throw new Error("Error al obtener el pedido");

      const data = await res.json();
      setPedido(data);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  useEffect(() => {
    fetchPedido();
  }, [id]);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border rounded-lg p-4">
            <p className="text-lg"><strong>Cliente:</strong> {pedido.nombreCliente}</p>
            <p className="text-lg"><strong>Estado:</strong> {pedido.estado}</p>
            <p className="text-lg"><strong>Total:</strong> ${pedido.total}</p>
          </div>

          <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
            <p className="text-lg font-semibold mb-3">Método de pago</p>
            <span className={`${metodoColor} text-white px-6 py-2 rounded-full font-bold`}>
              {pedido.metodoPago || "No asignado"}
            </span>
          </div>
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
