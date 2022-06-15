import { writable } from 'svelte/store';

export const streams = writable<MediaStream[]>([]);
export const activeStream = writable<MediaStream>();
