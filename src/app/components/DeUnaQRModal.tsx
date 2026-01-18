"use client";

interface DeUnaQRModalProps {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeUnaQRModal({
  visible,
  onConfirm,
  onClose,
}: DeUnaQRModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-[36rem] max-w-[90%] text-center shadow-2xl">
        
        <h2 className="text-3xl font-bold mb-4">
          Pago con DeUna
        </h2>

        {/* QR MÁS GRANDE */}
        <img
          src="/pagos/qr de una.jpg"
          alt="QR DeUna"
          className="mx-auto w-72 h-72 mb-4"
        />

        <p className="text-xl text-gray-700 mb-6">
          Escanee el código QR con la app DeUna y luego
          confirme el pago.
        </p>

        <div className="flex flex-col gap-3 items-center">
          <button
            onClick={onConfirm}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-2xl rounded-xl w-full max-w-sm"
          >
            ✅ Confirmar pago
          </button>

          <button
            onClick={onClose}
            className="text-2xl text-gray-700 hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
