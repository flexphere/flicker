<script lang="ts">
  import {activeStream, streams} from './store'

  function ContentLoaded(el:HTMLVideoElement) {
    const stream = $streams.find(s => s.id == el.getAttribute("data-id"))
    if (stream) {
      el.srcObject = stream;
    }
  }

  async function addStream() {
    const stream = await navigator.mediaDevices.getDisplayMedia({audio:false,video:true});
    if (stream) {
      console.log(stream.getTracks()[0].getConstraints())
      streams.set([...$streams, stream]);
      activeStream.set(stream);
    }
  }

  function activate(stream:MediaStream) {
    activeStream.set(stream);
  }
  function remove(stream:MediaStream){
    let streamID = stream.id;
    stream.getTracks().forEach(t => t.stop());
    stream.getTracks().forEach(t => stream.removeTrack(t));
    streams.set($streams.filter(s => s.id != streamID));
    if($streams.length){
      activate($streams[0]);
    }
  }
</script>

<div class="container">
  {#each $streams as stream}
    <!-- svelte-ignore a11y-media-has-caption -->
    <div class="thumbails" style="position: relative; flex-shrink:1">
      <video use:ContentLoaded on:click={()=>{activate(stream)}} data-id="{stream.id}" autoplay></video>
      <div class="close" on:click={()=>{remove(stream)}}>&times;</div>
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

  .thumbnails {
    position: relative;
    flex-shrink: 1;
  }

  video {
    width: 100%;
    max-width: var(--size-11);
    /* margin: var(--size-3); */
    border: solid var(--border-size-1) var(--gray-9);
    border-radius: var(--radius-2);
    box-shadow: var(--shadow-2);
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
    transition: all .3s;
  }
  
  video:hover {
    border-color: var(--gray-6);
  }

  video:hover + .close {
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
    transition: all .3s;
  }
  button:hover {
    background: var(--blue-8);
  }
</style>