import app from "@/lib/firebaseConfig";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export { auth };
export default app;
