const DB_NAME = "jahpoddesistir";
const DB_VERSION = 1;
const STORE = "progress";
const PROGRESS_KEY = "player";

export type PlayerProgress = {
  level: number;
  xp: number;
  clicks: number;
  secretUnlocked: boolean;
};

export const DEFAULT_PROGRESS: PlayerProgress = {
  level: 1,
  xp: 0,
  clicks: 0,
  secretUnlocked: false,
};

export const XP_PER_LEVEL = 10;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB open failed"));
  });
}

function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const store = tx.objectStore(STORE);
        const request = run(store);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () =>
          reject(request.error ?? new Error("IndexedDB request failed"));

        tx.oncomplete = () => db.close();
        tx.onerror = () => {
          db.close();
          reject(tx.error ?? new Error("IndexedDB transaction failed"));
        };
      }),
  );
}

function isValidProgress(value: unknown): value is PlayerProgress {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.level === "number" &&
    v.level >= 1 &&
    typeof v.xp === "number" &&
    v.xp >= 0 &&
    v.xp < XP_PER_LEVEL &&
    typeof v.clicks === "number" &&
    v.clicks >= 0 &&
    typeof v.secretUnlocked === "boolean"
  );
}

export async function loadProgress(): Promise<PlayerProgress> {
  if (typeof indexedDB === "undefined") return DEFAULT_PROGRESS;

  try {
    const raw = await withStore("readonly", (store) => store.get(PROGRESS_KEY));
    if (isValidProgress(raw)) return raw;
    return DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export async function saveProgress(progress: PlayerProgress): Promise<void> {
  if (typeof indexedDB === "undefined") return;

  try {
    await withStore("readwrite", (store) => store.put(progress, PROGRESS_KEY));
  } catch {
    /* persistence is best-effort */
  }
}
