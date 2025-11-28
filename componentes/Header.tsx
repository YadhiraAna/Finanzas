"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  showLoginButton?: boolean; // opcional
  showRegisterButton?: boolean; // opcional
};

export default function Header({
  showLoginButton = true,
  showRegisterButton = true,
}: Props) {
  const router = useRouter();

  return (
    <header className="site-header">
      <nav className="nav">
        {/* LOGO */}
        <div className="brand">
          <img src="/pesito.png" alt="Pesito a Pesito" className="logo-img" />
        </div>

        {/* BOTONES DE NAVEGACIÓN */}
        <div className="menu">
          {showLoginButton && (
            <button className="btn" onClick={() => router.push("/log-in")}>
              Iniciar sesión
            </button>
          )}

          {showRegisterButton && (
            <button className="btn" onClick={() => router.push("/SignUp")}>
              Registrarse
            </button>
          )}

          {/* Botón de inicio, visible cuando los demás están ocultos */}
          {!showLoginButton && !showRegisterButton && (
            <button className="btn" onClick={() => router.push("/")}>
              Inicio
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
