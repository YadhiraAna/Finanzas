import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ✅ Si ya hay una app inicializada, usa esa; si no, inicialízala.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Opcional — solo en entorno navegador
if (typeof window !== "undefined") {
  getAnalytics(app);
}

// ✅ Exporta lo necesario
export const auth = getAuth(app);
export { app };