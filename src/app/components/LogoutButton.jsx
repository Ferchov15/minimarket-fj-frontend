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
      style={{
        background: "red",
        padding: "10px",
        color: "white",
        borderRadius: "5px",
        marginTop: "10px"
      }}
    >
      Cerrar Sesión
    </button>
  );
}
