<script lang="ts">
  import Main from "../lib/components/Streams/Main.svelte";
  import Thumbnails from "../lib/components/Streams/Thumbnails.svelte";
</script>

<aside>
  <Thumbnails/>
</aside>

<main>
  <Main/>
</main>

<style>
  aside {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #ffffff11;
    backdrop-filter: blur(6px);
    box-shadow: var(--shadow-6);
    overflow-y: scroll;
    z-index: 9999;
  }

  main {
    height: 100vh;
  }
</style>