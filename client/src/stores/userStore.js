import { writable } from 'svelte/store';
import { fetchGet } from '../util/fetchUtil.js';

export const user = writable(null);

export async function checkAuth() {
    try {
        const data = await fetchGet('/auth/me');
        user.set(data?.data?.user ?? null);
        return data?.data?.user ?? null;
    } catch {
        user.set(null);
        return null;
    }
}