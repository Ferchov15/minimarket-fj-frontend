"use client";

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectMetodo: (metodo: "EFECTIVO" | "DEUNA") => void;
}

export default function PaymentModal({
  visible,
  onClose,
  onSelectMetodo,
}: PaymentModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-10 w-[36rem] max-w-[90%] text-center shadow-2xl">
        
        <h2 className="text-3xl font-bold mb-8">
          Seleccione método de pago
        </h2>

        <div className="flex flex-col gap-7">
          <button
            onClick={() => onSelectMetodo("EFECTIVO")}
            className="bg-green-600 hover:bg-green-700 text-white py-5 text-2xl rounded-xl"
          >
            💵 Pago en efectivo
          </button>

          <button
            onClick={() => onSelectMetodo("DEUNA")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-5 text-2xl rounded-xl"
          >
            📲 Pagar con DeUna
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-8 text-2xl text-gray-700 hover:underline"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
