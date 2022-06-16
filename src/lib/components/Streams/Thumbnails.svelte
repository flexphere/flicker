<script lang="ts">
  import {activeStream, streams, addStream, activateStream, removeStream} from './store'

  function ContentLoaded(el:HTMLVideoElement) {
    const stream = $streams.find(s => s.id == el.getAttribute("data-id"))
    if (stream) {
      el.srcObject = stream;
    }
  }
</script>

<div class="container">
  {#each $streams as stream}
    <!-- svelte-ignore a11y-media-has-caption -->
    <div style="position: relative; flex-shrink:1">
      <video use:ContentLoaded on:click={()=>{activateStream(stream)}} class:active={stream.id == $activeStream.id} data-id="{stream.id}" autoplay></video>
      <div class="close" on:click={()=>{removeStream(stream)}}>&times;</div>
    </div>
  {/each}
  <div class="action">
    <button on:click={addStream}>+</button>
  </div>
</div>


<style>
  .container {
    display: flex;
    justify-content:center;
    height: var(--size-11);  
    align-items: center;
    gap: var(--size-3);
    padding-right: var(--size-8);
  }

  video {
    width: 100%;
    max-height: var(--size-10);
    border: solid var(--border-size-1) var(--thumbnail-bg);
    border-radius: var(--radius-2);
    box-shadow: var(--shadow-3);
    cursor: pointer;
    transition: all .3s;
  }
  video + .close {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--size-3);
    height: var(--size-3);
    opacity: 0;
    background: var(--red-7);
    border-radius: var(--radius-round);
    font-size: var(--font-size-00);
    text-align: center;
    transform: translate(-50%, -50%);
    pointer-events: none;
    cursor: pointer;
    transition: all .5s;
  }

 
  video.active,
  video:hover {
    border-color: var(--thumbnail-border);
    box-shadow: var(--shadow-6);
  }

  video:hover + .close {
    color: var(--gray-0);
    opacity: 1;
    pointer-events: auto;
    z-index: 9999;
  }
  .close:hover{
    opacity: 1;
    pointer-events: auto;
    z-index: 9999;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    width: var(--size-8);
    height: 100%;
    background: var(--blue-9);
    color: var(--gray-0);
    transition: all .3s;
  }
  button:hover {
    background: var(--blue-8);
  }
</style>