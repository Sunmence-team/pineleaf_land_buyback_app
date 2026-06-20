import AsyncStorage from "@react-native-async-storage/async-storage";
import { globals } from "@/lib/constants";

const TTL_MS = 10 * 60 * 1000; // 10 minutes

export interface PendingVerification {
  flow: "email_verification";
  email: string;
  savedAt: number;
}

export async function savePendingVerification(email: string): Promise<void> {
  const payload: PendingVerification = {
    flow: "email_verification",
    email,
    savedAt: Date.now(),
  };
  await AsyncStorage.setItem(
    globals.PENDING_VERIFICATION_KEY,
    JSON.stringify(payload),
  );
}

export async function getPendingVerification(): Promise<PendingVerification | null> {
  const raw = await AsyncStorage.getItem(globals.PENDING_VERIFICATION_KEY);
  if (!raw) return null;

  try {
    const parsed: PendingVerification = JSON.parse(raw);
    const isExpired = Date.now() - parsed.savedAt > TTL_MS;
    if (isExpired) {
      await clearPendingVerification();
      return null;
    }
    return parsed;
  } catch {
    await clearPendingVerification();
    return null;
  }
}

export async function clearPendingVerification(): Promise<void> {
  await AsyncStorage.removeItem(globals.PENDING_VERIFICATION_KEY);
}
