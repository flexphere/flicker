import { get, writable } from 'svelte/store';

export const streams = writable<MediaStream[]>([]);
export const activeStream = writable<MediaStream>();

export async function addStream() {
	const stream = await navigator.mediaDevices.getDisplayMedia({ audio: false, video: true });
	if (stream) {
		console.log(stream.getTracks()[0].getConstraints());
		streams.set([...get(streams), stream]);
		activeStream.set(stream);
	}
}

export function activateStream(stream: MediaStream) {
	activeStream.set(stream);
}

export function removeStream(stream: MediaStream) {
	let streamID = stream.id;
	stream.getTracks().forEach((t) => t.stop());
	stream.getTracks().forEach((t) => stream.removeTrack(t));

	const $streams = get(streams);
	streams.set($streams.filter((s) => s.id != streamID));

	if (get(streams).length) {
		activateStream($streams[0]);
	}
}

setInterval(() => {
	const $streams = get(streams);
	const endedStreams = $streams.find((s) => s.active == false);
	if (endedStreams) {
		streams.set($streams.filter((s) => s.active == true));
	}
}, 500);
