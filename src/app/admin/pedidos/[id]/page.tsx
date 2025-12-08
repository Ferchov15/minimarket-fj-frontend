"use client";

import React, { useEffect, useState } from "react";
import { FaReceipt, FaArrowLeft } from "react-icons/fa";

export default function PedidoDetalleCliente({ params }: any) {
  const { id } = React.use(params);
  const [pedido, setPedido] = useState<any>(null);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/pedidos/${id}`);
        const data = await res.json();
        setPedido(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };

    fetchPedido();
  }, [id]);

  if (!pedido)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="text-xl text-gray-700 animate-pulse">Cargando pedido...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-200 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        {/* TÍTULO */}
        <div className="flex items-center gap-3 mb-6">
          <FaReceipt size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Detalle del Pedido #{pedido.id}
          </h1>
        </div>

        {/* DATOS PRINCIPALES */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 mb-6">
          <p className="text-lg"><span className="font-semibold">Cliente:</span> {pedido.nombreCliente}</p>
          <p className="text-lg mt-1">
            <span className="font-semibold">Estado:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-white ${
                pedido.estado === "Completado"
                  ? "bg-green-600"
                  : pedido.estado === "Cancelado"
                  ? "bg-red-600"
                  : "bg-yellow-600"
              }`}
            >
              {pedido.estado}
            </span>
          </p>
          <p className="text-lg mt-1">
            <span className="font-semibold">Fecha:</span> {new Date(pedido.fecha).toLocaleString()}
          </p>
        </div>

        {/* TABLA DE PRODUCTOS */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Productos</h2>

        <div className="overflow-hidden rounded-xl shadow-lg mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-lg">
                <th className="p-3 border">Producto</th>
                <th className="p-3 border">Precio</th>
                <th className="p-3 border">Cantidad</th>
                <th className="p-3 border">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {pedido.productos.map((prod: any) => {
                const subtotal =
                  prod.PedidoProducto.cantidad * parseFloat(prod.precio);

                return (
                  <tr key={prod.id} className="bg-white border-b text-lg">
                    <td className="p-3 border">{prod.nombre}</td>
                    <td className="p-3 border">${prod.precio}</td>
                    <td className="p-3 border">{prod.PedidoProducto.cantidad}</td>
                    <td className="p-3 border font-semibold">
                      ${subtotal.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* TOTAL */}
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white py-4 px-6 rounded-xl shadow-lg text-xl font-bold">
            Total a pagar: ${pedido.total}
          </div>
        </div>

        {/* VOLVER */}
        <div className="mt-8 flex justify-start">
          <a
            href="/admin/pedidos"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-lg shadow-md transition"
          >
            <FaArrowLeft /> Volver
          </a>
        </div>
      </div>
    </div>
  );
}
