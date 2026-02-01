"use client";

import Navbar from "../components/Navbar";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useState } from "react";
import PaymentModal from "../components/PaymentModal";
import DeUnaQRModal from "../components/DeUnaQRModal";

export default function CarritoPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [nombreCliente, setNombreCliente] = useState("");
  const [search, setSearch] = useState("");
  const [mostrarPago, setMostrarPago] = useState(false);
  const [mostrarQR, setMostrarQR] = useState(false);

  const total = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const guardarPedido = async (metodoPago: "EFECTIVO" | "DEUNA") => {
    if (!nombreCliente.trim()) {
      alert("⚠️ Ingrese su nombre antes de continuar");
      return;
    }

    try {
      const pedido = {
        nombreCliente,
        metodoPago,
        productos: cartItems.map((item) => ({
          id: item.id,
          cantidad: item.quantity,
        })),
      };

      const res = await fetch(
        "https://minimarket-jk-backend.onrender.com/api/pedidos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedido),
        }
      );

      if (!res.ok) throw new Error("Error al guardar pedido");

      clearCart();
      setMostrarPago(false);
      setMostrarQR(false);
      alert(`✅ Pedido registrado correctamente (${metodoPago})`);
    } catch (error) {
      console.error(error);
      alert("No se pudo registrar el pedido");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar search={search} onSearch={setSearch} />

      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          🛒 Resumen de Compra
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center mt-10 bg-white p-12 rounded-2xl shadow-sm border border-gray-200">
            <img
              src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
              alt="Carrito vacío"
              className="w-32 h-32 mx-auto opacity-20"
            />
            <p className="mt-6 text-xl text-gray-400 font-medium">Su carrito está vacío actualmente.</p>
            <Link href="/" className="mt-8 inline-block bg-[#e53935] text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-md">
              Ir a comprar ahora
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            <div className="block md:hidden space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#e53935] flex justify-between items-center border border-gray-200">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-800 text-lg leading-tight">{item.name}</span>
                    <span className="text-sm text-gray-500 font-medium">Cantidad: {item.quantity}</span>
                    <span className="text-[#e53935] font-black text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-50 p-4 rounded-full text-red-500 active:bg-red-100 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-hidden rounded-2xl border-2 border-gray-200 shadow-sm bg-white">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-6 py-4 font-semibold">Quitar</th>
                    <th className="px-6 py-4 text-left font-semibold">Producto</th>
                    <th className="px-6 py-4 font-semibold">Cantidad</th>
                    <th className="px-6 py-4 font-semibold">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:scale-125 transition-transform duration-200"
                        >
                          🗑️
                        </button>
                      </td>
                      <td className="px-6 py-4 text-left font-bold text-gray-700">{item.name}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{item.quantity}</td>
                      <td className="px-6 py-4 font-black text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-[30px] border-2 border-gray-300 shadow-[0_10px_40px_rgba(0,0,0,0.1)] mb-10">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
                
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-5 bg-[#e53935] rounded-full"></div>
                    <label className="text-sm font-black text-gray-600 uppercase tracking-widest">
                      Nombre del Cliente
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Ingrese su nombre para el pedido"
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 outline-none focus:border-[#e53935] transition-all bg-gray-50 text-lg font-bold shadow-inner"
                  />
                </div>

                <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-6">
                  <div className="bg-gray-800 text-white px-8 py-4 rounded-2xl shadow-lg border-b-4 border-red-600 w-full text-center md:text-right">
                    <p className="text-gray-400 font-bold text-xs uppercase mb-1">Total a cancelar</p>
                    <h2 className="text-4xl font-black">
                      <span className="text-[#e53935] mr-1">$</span>
                      {total.toFixed(2)}
                    </h2>
                  </div>
                  
                  <div className="flex gap-4 w-full sm:w-80">
                    <Link
                      href="/"
                      className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-xl text-center hover:bg-gray-100 transition-all active:scale-95 shadow-sm"
                    >
                      Atrás
                    </Link>
                    <button
                      onClick={() => setMostrarPago(true)}
                      className="flex-[2] bg-[#e53935] text-white font-black py-4 px-8 rounded-xl shadow-[0_5px_15px_rgba(229,57,53,0.3)] hover:bg-red-700 transition-all active:scale-95 uppercase tracking-wider"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <PaymentModal
        visible={mostrarPago}
        onClose={() => setMostrarPago(false)}
        onSelectMetodo={(metodo) => {
          if (metodo === "EFECTIVO") {
            guardarPedido("EFECTIVO");
          } else {
            setMostrarPago(false);
            setMostrarQR(true);
          }
        }}
      />

      <DeUnaQRModal
        visible={mostrarQR}
        onClose={() => setMostrarQR(false)}
        onConfirm={() => guardarPedido("DEUNA")}
      />
    </div>
  );
}