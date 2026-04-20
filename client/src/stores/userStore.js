import { writable } from "svelte/store";
import { fetchGet } from "../util/fetchUtil.js";

export const user = writable(null);
export const authReady = writable(false);

export async function checkAuth() {
  try {
    const result = await fetchGet("/auth/me");
    user.set(result?.data?.user ?? null);
  } catch {
    user.set(null);
  } finally {
    authReady.set(true);
  }
}
