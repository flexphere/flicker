<script lang="ts">
  import { streams, activeStream, activateStream, addStream } from '$lib/components/Streams/store';
  import {writable} from 'svelte/store';
  import { onMount } from 'svelte';
  import Main from "../lib/components/Streams/Main.svelte";
  import Thumbnails from "../lib/components/Streams/Thumbnails.svelte";

  const hideThumbnails = writable<boolean>(false);

  function shortcuts(e:KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      hideThumbnails.set(!$hideThumbnails);
    }
    else if (e.metaKey && e.key === "ArrowRight") {
      e.preventDefault();
      const activeIndex = $streams.findIndex(s => s.id == $activeStream.id)
      if (activeIndex < $streams.length - 1) {
        activateStream($streams[activeIndex + 1])
      }
    }
    else if (e.metaKey && e.key === "ArrowLeft") {
      e.preventDefault();
      const activeIndex = $streams.findIndex(s => s.id == $activeStream.id)
      if (activeIndex > 0) {
        activateStream($streams[activeIndex - 1])
      }
    }
    else if (e.metaKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      addStream();
    }
  }
</script>

<svelte:window on:keydown={shortcuts} />

<main>
  <Main/>
</main>

<aside class:hide={$hideThumbnails}>
  <Thumbnails/>
</aside>

<style>
  aside {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: var(--thumbnail-bg);
    backdrop-filter: blur(6px);
    box-shadow: var(--shadow-6);
    overflow-y: scroll;
    z-index: 9999;
    transition: all .3s;
  }

  aside.hide {
    transform: translateY(100%);
  }



  main {
    height: 100vh;
  }
</style>