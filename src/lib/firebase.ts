import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import {
  getFirebaseWebConfig,
  getFirebaseWebConfigMissingFields,
  isFirebaseWebConfigComplete,
} from "@/lib/firebaseWebConfig";

const firebaseConfig = getFirebaseWebConfig();

export const firebaseConfigured = isFirebaseWebConfigComplete(firebaseConfig);
export const firebaseConfigMissingFields = getFirebaseWebConfigMissingFields(firebaseConfig);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isFirebaseWebConfigComplete(firebaseConfig)) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
}

export { auth };
export default app;
