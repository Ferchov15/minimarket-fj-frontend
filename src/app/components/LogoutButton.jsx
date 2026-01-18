"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    router.push("/admin/login");
  };

  return (
    <button 
      onClick={logout} 
      className="
        bg-red-600
        hover:bg-red-800
        text-white
        py-4
        px-14
        rounded-xl
        text-2xl
        font-semibold
        transition
        shadow-xl
      "
    >
      Cerrar Sesión
    </button>
  );
}
