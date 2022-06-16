import { get, writable } from 'svelte/store';

export const streams = writable<MediaStream[]>([]);
export const activeStream = writable<MediaStream>();

setInterval(() => {
	const $streams = get(streams);
	const endedStreams = $streams.find((s) => s.active == false);
	if (endedStreams) {
		streams.set($streams.filter((s) => s.active == true));
	}
}, 500);
