"use client";
import { useState } from "react";
import Header from "../componentes/Header";
import Link from "next/link";
import { createUserWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase-client";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario creado:", cred.user);
      setSuccess(true);
    } catch (error) {
      const err = error as { code?: string; message: string };
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("El correo ya está en uso.");
          break;
        case "auth/invalid-email":
          setError("El correo no es válido.");
          break;
        case "auth/weak-password":
          setError("La contraseña es muy débil.");
          break;
        default:
          setError("Ocurrió un error al crear la cuenta.");
      }
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const sigUpWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log("Usuario registrado con Google:", user);
        console.log("Token de acceso:", token);
      })
      .catch((error) => {
        console.error("Error al registrarse con Google:", error.code, error.message);
        setError("Error al registrarse con Google: " + error.message);
      });
  };

  return (
    <>
      <Header showLoginButton={false} showRegisterButton={false} />

      <section className="signup-container">
        <div className="signup-left">
          <h1>Te damos la bienvenida a</h1>
          <img src="/pesito.png" alt="Pesito a Pesito" className="signup-logo" />
        </div>

        <div className="signup-right">
          <div className="signup-card">
            <header className="signup-header">
              <div className="icon-container">
                <svg viewBox="0 0 24 24" className="icon-user" fill="currentColor">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 6v1h16v-1c0-3.33-2.67-6-8-6Z" />
                </svg>
              </div>
              <h2>Crear cuenta</h2>
              <p>Completa los campos para registrarte</p>
            </header>

            <form onSubmit={onSubmit} className="signup-form">
              <label>Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />

              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@dominio.com" required />

              <label>Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" required />

              <label>Confirmar contraseña</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" required />

              <div className="terms">
                <label>
                  <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} /> Acepto términos y privacidad
                </label>
                <Link href="/login" className="login-link">¿Ya tienes cuenta?</Link>
              </div>

              {error && <p className="error-msg">{error}</p>}
              {success && <p className="success-msg">¡Cuenta creada correctamente!</p>}

              <button type="submit" className="btn-main" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>

            <div className="divider">o</div>

            <button type="button" className="btn-google" onClick={sigUpWithGoogle}>
              <img src="/google.svg" alt="Google" className="google-icon" />
              Continuar con Google
            </button>

            <p className="help-text">
              ¿Necesitas ayuda? <Link href="/#faq" className="faq-link">FAQ</Link>
            </p>
          </div>
        </div>
      </section>

      <footer className="signup-footer">Hecho con 💚 · © 2025 Pesito a Pesito</footer>
    </>
  );
}
