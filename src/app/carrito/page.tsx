"use client";

import Navbar from "../components/Navbar";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function CarritoPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [nombreCliente, setNombreCliente] = useState("");

  // Calcular total correctamente
  const total = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  // Confirmar pedido
  const handleConfirmar = async () => {
    if (!nombreCliente.trim()) {
      alert("⚠️ Por favor, ingrese su nombre antes de confirmar el pedido.");
      return;
    }

    try {
      const pedido = {
        nombreCliente,
        total,
        productos: cartItems.map((item) => ({
          id: item.id,
          nombre: item.name,
          cantidad: item.quantity,
          precio: item.price,
        })),
      };

      console.log("📦 Enviando pedido al backend:", pedido);

      const res = await fetch("http://localhost:4000/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!res.ok)
        throw new Error("Error al guardar el pedido en la base de datos");

      clearCart();
      alert(`✅ Pedido registrado correctamente para ${nombreCliente}.`);
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo guardar el pedido. Intente nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="flex flex-col items-center p-6">
        <h1 className="text-xl font-semibold mb-4">Su carrito de compra:</h1>

        {cartItems.length === 0 ? (
          <div className="text-center mt-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
              alt="Carrito vacío"
              className="w-56 h-56 mx-auto opacity-70"
            />
            <p className="mt-4 text-lg text-gray-600">Su carrito está vacío.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              <div className="text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
                  alt="Carrito"
                  className="w-40 h-40 mx-auto"
                />
              </div>

              <table className="border border-gray-400 text-center">
                <thead>
                  <tr className="bg-purple-300">
                    <th className="border px-4 py-2">Eliminar</th>
                    <th className="border px-4 py-2">Producto</th>
                    <th className="border px-4 py-2">Cantidad</th>
                    <th className="border px-4 py-2">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="bg-purple-100">
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 font-bold text-lg"
                        >
                          🗑️
                        </button>
                      </td>
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">{item.quantity}</td>
                      <td className="border px-4 py-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
              <h2 className="text-lg font-bold">
                Total: ${total.toFixed(2)}
              </h2>

              <input
                type="text"
                placeholder="Ingrese su nombre"
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                className="border border-gray-400 rounded-md p-2 w-64"
              />

              <div className="flex gap-4 mt-3 md:mt-0">
                <Link
                  href="/"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Seguir comprando
                </Link>

                <button
                  className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-2 rounded-md"
                  onClick={handleConfirmar}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
