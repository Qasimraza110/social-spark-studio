export type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
};

const STORAGE_KEY = "firebase:webConfig:v1";

type FirebaseWebConfigPartial = Partial<FirebaseWebConfig>;

const normalize = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  return v.length ? v : undefined;
};

const safeParseJson = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export function readFirebaseWebConfig(): FirebaseWebConfigPartial | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = safeParseJson(raw);
    if (!parsed || typeof parsed !== "object") return null;

    const obj = parsed as Record<string, unknown>;
    return {
      apiKey: normalize(obj.apiKey),
      authDomain: normalize(obj.authDomain),
      projectId: normalize(obj.projectId),
      appId: normalize(obj.appId),
    };
  } catch {
    return null;
  }
}

export function writeFirebaseWebConfig(config: FirebaseWebConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function clearFirebaseWebConfig() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getFirebaseWebConfigFromEnv(): FirebaseWebConfigPartial {
  const env = import.meta.env as Record<string, unknown>;
  return {
    apiKey: normalize(env.VITE_FIREBASE_API_KEY),
    authDomain: normalize(env.VITE_FIREBASE_AUTH_DOMAIN),
    projectId: normalize(env.VITE_FIREBASE_PROJECT_ID),
    appId: normalize(env.VITE_FIREBASE_APP_ID),
  };
}

export function getFirebaseWebConfigFromWindow(): FirebaseWebConfigPartial {
  if (typeof window === "undefined") return {};

  const cfg = (window as any).__FIREBASE_WEB_CONFIG__ as unknown;
  if (!cfg || typeof cfg !== "object") return {};

  const obj = cfg as Record<string, unknown>;
  return {
    apiKey: normalize(obj.apiKey),
    authDomain: normalize(obj.authDomain),
    projectId: normalize(obj.projectId),
    appId: normalize(obj.appId),
  };
}

export function getFirebaseWebConfig(): FirebaseWebConfigPartial {
  const fromStorage = readFirebaseWebConfig() ?? {};
  const fromWindow = getFirebaseWebConfigFromWindow();
  const fromEnv = getFirebaseWebConfigFromEnv();

  // Precedence: env > window > localStorage
  return { ...fromStorage, ...fromWindow, ...fromEnv };
}

export function isFirebaseWebConfigComplete(
  cfg: FirebaseWebConfigPartial,
): cfg is FirebaseWebConfig {
  return Boolean(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId);
}

export function getFirebaseWebConfigMissingFields(cfg: FirebaseWebConfigPartial) {
  return {
    apiKey: !cfg.apiKey,
    authDomain: !cfg.authDomain,
    projectId: !cfg.projectId,
    appId: !cfg.appId,
  };
}
