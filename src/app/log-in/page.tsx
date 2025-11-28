"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, configureAuthPersistence } from "@/lib/firebase-client";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  // Importa FirebaseError para una comprobación más específica si es necesario.
  // Pero lo manejamos con el guardián de tipos genérico para mayor compatibilidad.
} from "firebase/auth";
// Importa las clases del módulo CSS
import styles from './login.module.css';
import Header from "@/componentes/Header";

// === FUNCIÓN GUARDIÁN DE TIPOS ===
// Comprueba si un objeto de error (e) tiene la propiedad 'message' de tipo string.
function isErrorWithMessage(e: unknown): e is { message: string } {
  return (
    typeof e === 'object' &&
    e !== null &&
    'message' in e &&
    typeof (e as { message: unknown }).message === 'string'
  );
}

export default function LoginPage() {
  // === ESTADOS ===
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null); // Se usa 'err' para el mensaje de error

  // === HOOKS ===
  const router = useRouter();
  const sp = useSearchParams();
  const redirectTo = sp.get("redirectTo") ?? "/dashboard";

  // === LÓGICA DE SESIÓN (Server Session) ===
  async function sessionLogin() {
    const user = auth.currentUser;
    const idToken = await user?.getIdToken(true);
    if (!idToken) throw new Error("No se  obtener el token de sesión.");

    const res = await fetch("/api/sessionLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken, remember }),
    });

    if (!res.ok) {
      let msg = "No se crear la sesión en el servidor.";
      try {
        const j = await res.json();
        if (j?.error) msg = j.error;
      } catch {
        // Ignorar si la respuesta no es JSON
      }
      throw new Error(msg);
    }
  }

  // === HANDLER: Login con Email y Contraseña ===
  async function onEmailPass(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await configureAuthPersistence(remember);
      await signInWithEmailAndPassword(auth, email, password);
      await sessionLogin();
      router.push(redirectTo);
      router.refresh();
    } catch (e: unknown) {
      // ✅ CORRECCIÓN: Uso del guardián de tipos
      const errorMessage = isErrorWithMessage(e) 
        ? e.message 
        : "Error al iniciar sesión. Verifica tu conexión.";
      setErr(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // === HANDLER: Login con Google ===
  async function onGoogle() {
    setErr(null);
    setLoading(true);
    try {
      await configureAuthPersistence(remember);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      await sessionLogin();
      router.push(redirectTo);
      router.refresh();
    } catch (e: unknown) {
      // ✅ CORRECCIÓN: Uso del guardián de tipos
      const errorMessage = isErrorWithMessage(e) 
        ? e.message 
        : "Error con Google. Intenta de nuevo.";
      setErr(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // === RENDER ===
  return (
    <div>
       <Header showLoginButton={false} /> 

      <main className={styles.loginPage}>
        <section className={styles.loginBox}>
          
          <h1>Bienvenida a Pesito a Pesito</h1> 

          <div className={styles.card}>
            
            <h2 className={styles.cardTitle}>Iniciar Sesión</h2> 

            {/* ✅ CORRECCIÓN: Usa la variable de estado 'err' */}
            {err && <p className={styles.error}>{err}</p>}

            {/* Formulario de Login */}
            <form onSubmit={onEmailPass} className={styles.form}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="tucorreo@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />

              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"  
                required
                disabled={loading}
              />
              {/* Opcional: Aquí podrías añadir el checkbox 'Recuérdame' */}

              <button 
                type="submit" 
                className={styles.btnMain} 
                disabled={loading}
              >
                {loading ? "Cargando..." : "Entrar"}
              </button>
            </form>

            <div className={styles.divider}>O</div>

            {/* Botón de Google */}
          
            <button onClick={onGoogle} className={styles.btnGoogle} disabled={loading}>
               <img src="/google-icon.png" alt="Google" className={styles.icon} />
              {/* 

[Image of Google G logo]
 */}
              Continuar con Google
            </button>

            <Link href="/forgot-password" className={styles.link}>
              ¿Olvidaste tu contraseña?
            </Link>

            <p className={styles.legalMessage}>
              Si continúas, aceptas nuestras <strong>condiciones de servicio</strong> y reconoces que leíste nuestra <strong>Política de privacidad</strong>.
            </p>

            <Link href="/SignUp" className={styles.link}>
              ¿Aún no estás en Pesito a Pesito? <strong>Regístrate</strong>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}