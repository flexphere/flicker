<script lang="ts">
import { onMount } from 'svelte';

  import {writable} from 'svelte/store';
  import Main from "../lib/components/Streams/Main.svelte";
  import Thumbnails from "../lib/components/Streams/Thumbnails.svelte";


  const hideThumbnails = writable<boolean>(false);

  onMount(()=>{
    document.addEventListener('keydown', (e)=>{
      if (e.key === "Escape") {
        hideThumbnails.set(!$hideThumbnails);
      }
    })
  })
</script>

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